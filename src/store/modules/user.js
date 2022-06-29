// import { login, logout, getInfo } from '@/api/user'
import {
	getRoomLogin,
	getRoomLogout
} from '@/api/videoRoom.js'

import { editAdmin } from '@/api/admin.js'

import {
	logout,
	getInfo
} from '@/api/user'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'
import router, {
	resetRouter
} from '@/router'

const state = {
	token: getToken(),
	name: '',
	avatar: '',
	introduction: '',
	roles: []
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	}
}

const actions = {
	login({
		commit
	}, userInfo) {
		const {
			account,
			password
		} = userInfo
		return new Promise((resolve, reject) => {
			var params = {
				"account": account.trim(),
				"password": password,
			}
			getRoomLogin(params).then(response => {
				const {
					data
				} = response
				commit('SET_TOKEN', data.token)
				setToken(data.token)
				localStorage.setItem('admin_id', data.admin_id)
				resolve(data.admin_id)
			}).catch(error => {
				reject(error)
			})
		})
	},

	// get user info
	getInfo({
		commit,
		state
	}) {
		return new Promise((resolve, reject) => {
			// getInfo(state.token).then(response => {
			// 	const {
			// 		data
			// 	} = response

			// 	if (!data) {
			// 		reject('Verification failed, please Login again.')
			// 	}

			// 	console.log("--79---",data)
			// 	const {
			// 		roles,
			// 		name,
			// 		avatar,
			// 		introduction
			// 	} = data

			// 	// roles must be a non-empty array
			// 	if (!roles || roles.length <= 0) {
			// 		reject('getInfo: roles must be a non-null array!')
			// 	}

			// 	commit('SET_ROLES', roles)
			// 	commit('SET_NAME', name)
			// 	commit('SET_AVATAR', avatar)
			// 	commit('SET_INTRODUCTION', introduction)
			// 	resolve(data)
			// }).catch(error => {
			// 	reject(error)
			// })
			var data = {
				'roles': ['admin'],
				'name': 'Super Admin',
				'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
				'introduction': 'I am a super administrator'
			}

			commit('SET_ROLES', data.roles)
			commit('SET_NAME', data.name)
			commit('SET_AVATAR', data.avatar)
			commit('SET_INTRODUCTION', data.introduction)
			resolve(data)
		})
	},

	// user logout
	logout({
		commit,
		state,
		dispatch
	}) {
		return new Promise((resolve, reject) => {
			var params = {
				"account": "admin"
			}
			getRoomLogout(params).then(() => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				removeToken()
				resetRouter()
				dispatch('tagsView/delAllViews', null, {
					root: true
				})
				localStorage.removeItem('permissionList')

				resolve()
			}).catch(error => {
				reject(error)
			})
		})
	},

	// 获取当前角色路由权限
	editAdminFunc({ commit }, admin_id) {
		return new Promise((resolve, reject) => {
			editAdmin({ admin_id }).then((res) => {
				let array = []
				if(res.data && res.data.list.length > 0) {
					let user_pids = res.data.user_pids
					res.data.list.forEach(item => {
						if(user_pids.indexOf(item.id) !== -1) {
							array.push(item.title)
						}  
						if(item.child && item.child.length > 0) {
							item.child.forEach(a => {
								if(user_pids.indexOf(a.id) !== -1) {
									array.push(a.title)
									if(user_pids.indexOf(item.id) === -1) {
										array.push(item.title)
									}
								}
								if(a.child && a.child.length > 0) {
									a.child.forEach(x => {
										if(user_pids.indexOf(x.id) !== -1) {
											array.push(x.title)
											if(user_pids.indexOf(item.id) === -1) {
												array.push(item.title)
											}
										}
									})
								}
							})
						}
					})
					localStorage.setItem('permissionList', array)
				}

				resolve(res)
			}).catch(error => {
				reject(error)
			})
		})
	},


	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			removeToken()
			resolve()
		})
	},

	// dynamically modify permissions
	async changeRoles({
		commit,
		dispatch
	}, role) {
		const token = role + '-token'

		commit('SET_TOKEN', token)
		setToken(token)

		const {
			roles
		} = await dispatch('getInfo')

		resetRouter()

		// generate accessible routes map based on roles
		const accessRoutes = await dispatch('permission/generateRoutes', roles, {
			root: true
		})
		// dynamically add accessible routes
		router.addRoutes(accessRoutes)

		// reset visited views and cached views
		dispatch('tagsView/delAllViews', null, {
			root: true
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
