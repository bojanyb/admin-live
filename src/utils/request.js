import axios from 'axios'
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import {
	getToken
} from '@/utils/auth'
import { error } from '@/utils/common'
import { createUniqueTraceId } from '@/utils/index'

let isRefreshFail = true;
// 时间戳+随机字符串
let traceId = createUniqueTraceId();
// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 60000 * 5 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent

		if (store.getters.token) {
			// let each request carry token
			// ['X-Token'] is a custom headers key
			// please modify it according to the actual situation
			config.headers['X-Token'] = getToken()
		}
		config.headers['X-REQUEST-ID'] = traceId;
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
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
		if (res.code !== 20000) {
			let message = res.message || 'Error';
			if(res.code === 400 || res.code === 500) {
				message = message + traceId
			}
			error(message)

			// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
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
			}

			if(res.code == 3000 && res.msg == "请重新登录"){
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
			}else if(res.code == 3991){
				Message.warning(res.msg);
				return
			}

			return Promise.reject(new Error(message))
		} else {
			return res
		}
	},
	error => {
		console.log('err' + error) // for debug
		error(error.message)
		return Promise.reject(error)
	}
)

export default service
