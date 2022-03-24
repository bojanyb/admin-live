import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
// 	const {
// 		mockXHR
// 	} = require('../mock')
// 	mockXHR()
// }

Vue.use(Element, {
	size: Cookies.get('size') || 'medium' // set element-ui default size
	//	locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.directive('input-limit', {
	bind(el, binding) {
		var wins_0 = /[^\d]/g // 整数判断
		var wins_1 = /[^\d^\.]/g // 小数判断
		var flag = true
		var points = 0
		var lengths = 0
		var remainder = 0
		var no_int = 0
		const target = el instanceof HTMLInputElement ? el : el.querySelector('input')
		target.addEventListener('compositionstart', e => {
			flag = false
		})
		target.addEventListener('compositionend', e => {
			flag = true
		})
		target.addEventListener('input', e => {
			setTimeout(function() {
				if (flag) {
					if (binding.value == 0) {
						if (wins_0.test(e.target.value)) {
							e.target.value = e.target.value.replace(wins_0, '')
							e.target.dispatchEvent(new Event('input')) // 手动更新v-model值
						}
					}
					if (binding.value == 1) {
						if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/,
								'$1'))) {
							remainder = true
						}
						if ((e.target.value.split('.')).length - 1 > 1) {
							points = true
						}
						if (e.target.value.toString().split('.')[1] != undefined) {
							if (e.target.value.toString().split('.')[1].length > 1) {
								lengths = true
							}
						}
						if (e.target.value.toString().indexOf('.') != -1) {
							no_int = false
						} else {
							no_int = true
						}
						if (wins_1.test(e.target.value) || lengths || points || remainder) {
							if (!no_int) {
								e.target.value = e.target.value.replace(wins_1, '').replace('.',
										'$#$').replace(/\./g, '').replace(
										'$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
									.substring(0, e.target.value.indexOf(
										'.') + 2)
							} else {
								e.target.value = e.target.value.replace(wins_0, '')
							}
							e.target.dispatchEvent(new Event('input'))
						}
					}

					let num = binding.value
					if (binding.value == num) {
						if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/,
								'$1'))) {
							remainder = true
						}
						if ((e.target.value.split('.')).length - 1 > 1) {
							points = true
						}
						if (e.target.value.toString().split('.')[1] != undefined) {
							if (e.target.value.toString().split('.')[1].length > num) {
								lengths = true
							}
						}
						if (e.target.value.toString().indexOf('.') != -1) {
							no_int = false
						} else {
							no_int = true
						}
						let numText = ""
						for (var i = 0; i < num; i++) {
							numText += '\\d'
						}
						if (wins_1.test(e.target.value) || lengths || points || remainder) {
							if (!no_int) {
								e.target.value = e.target.value.replace(wins_1, '').replace('.',
										'$#$').replace(/\./g, '').replace(
										'$#$', '.').replace(/^(\-)*(\d+)\.(numText).*$/,
										'$1$2.$3')
									.substring(0, e.target.value.indexOf(
										'.') + (num + 1))
								return
							} else {
								e.target.value = e.target.value.replace(wins_0, '')
								return
							}
							e.target.dispatchEvent(new Event('input'))
						}
					}
				}
			}, 0)
		})
	}
})

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
