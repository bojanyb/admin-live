import axios from 'axios'
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
var baseUrlApi = '';
switch (process.env.NODE_ENV) {
	case 'development':
		baseUrlApi = 'http://api.huida.vip'
		break
	case 'test':
		baseUrlApi = 'http://api.huida.vip'
		break
	case 'production':
		baseUrlApi = 'http://api.aiyi.live'
		break
	default:
		break
}
console.log(baseUrlApi);

// create an axios instance
const service = axios.create({
	baseURL: baseUrlApi, // url = base url + request url
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		// do something before request is sent
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
		if (res.code !== 2000) {
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
				Message({
					message: res.msg,
					type: 'error',
					duration: 5 * 1000
				})
				setTimeout(res=>{
					store.dispatch('user/resetToken').then(() => {
						location.reload()
					})
				},2000)
				return
			}
			return Promise.reject(res.msg || new Error('Error'))
		} else {
			return res
		}
	},
	error => {
		console.log('err' + error) // for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service
