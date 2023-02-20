import axios from 'axios'
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth' // get token from cookie
import { error } from '@/utils/common'
let isRefreshFail = true;
var baseUrlApi = ENV_DOMAINHTTPS;
console.log(baseUrlApi);

// create an axios instance
const service = axios.create({
	baseURL: baseUrlApi, // url = base url + request url
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		store.commit('app/SET_LOADING', true)
		// do something before request is sent
		const hasToken = getToken()
		config.headers['Admin-Token'] = hasToken
		return config
	},
	error => {
		// do something with request error
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */

	/**
	 * Determine the request status by custom code
	 * Here is just an example
	 * You can also judge the status by HTTP Status Code
	 */
	response => {
		const res = response.data
		// if the custom code is not 20000, it is judged as an error.
		if (res.code !== 2000) {
			store.commit('app/SET_LOADING', false)
			if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
				// to re-login
				MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again',
					'Confirm logout', {
						confirmButtonText: 'Re-Login',
						cancelButtonText: 'Cancel',
						type: 'warning'
					}).then(() => {
					store.dispatch('user/resetToken').then(() => {
						location.reload()
					})
				})
			}else if(res.code == 3000 && res.msg == "请重新登录"){
        if (isRefreshFail) {
          error(res.msg || '登录过期，请重新登录')
          isRefreshFail = false
          setTimeout(() => {
            isRefreshFail = true;
          }, 2000);
        }
        setTimeout(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }, 2000);
				return
			}
			error(res.msg)
			return Promise.reject(res.msg || new Error('Error'))
		} else {
			store.commit('app/SET_LOADING', false)
			return res
		}
	},
	error => {
		store.commit('app/SET_LOADING', false)
		error(error.msg)
		return Promise.reject(error)
	}
)

export default service
export const request = axios
