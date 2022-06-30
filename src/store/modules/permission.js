import { asyncRoutes, constantRoutes } from '@/router'
// 引入api
import { editAdmin } from '@/api/admin.js'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    
    return new Promise(resolve => {
      let admin_id = Number(localStorage.getItem('admin_id'))
      console.log(asyncRoutes, 'asyncRoutes----------')
      editAdmin({ admin_id }).then(res => {
        console.log(res, 'res------------')
        let array = []
        let arr = JSON.parse(JSON.stringify(res.data.list))
        let user_pids = res.data.user_pids
        if(arr && arr.length > 0) { // 递归删除所有不需要展示的菜单
          let prv = (list, params) => {
            list.forEach((item,index) => {
              if(user_pids.indexOf(item.id) === -1 || item.status === 0) {
                if(item.pid === 0) {
                  arr.splice(index, 1)
                  prv(arr)
                } else {
                  if(params) {
                    params.child.splice(index, 1)
                    prv(item.child, item)
                  }
                }
              }
              if(item.child && item.child.length > 0) {
                prv(item.child, item)
              }
            })
          }
          prv(arr)

          console.log(arr, 'arr-------------------')

          let sv = (list, list2) => {
            list.forEach(item => {
              list2.forEach(a => {
                // if(item.)
              })
            })
          }

          sv(arr, asyncRoutes)
          

        }
      })
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
