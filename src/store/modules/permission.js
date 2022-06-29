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
          let array = []
          let routes = JSON.parse(JSON.stringify(asyncRoutes))
          let user_pids = res.data.user_pids
          res.data.list.forEach(item => {
            if(user_pids.indexOf(item.id) !== -1) {
              array.push(item)
            }
            if(item.child && item.child.length > 0) {
              item.child.forEach(a => {
                if(user_pids.indexOf(a.id) !== -1) {
                  array.push(a)
                  if(user_pids.indexOf(item.id) === -1) {
                    array.push(item)
                  }
                }
                if(a.child && a.child.length > 0) {
                  a.child.forEach(x => {
                    if(user_pids.indexOf(x.id) !== -1) {
                      array.push(x)
                      if(user_pids.indexOf(a.id) === -1) {
                        array.push(a)
                      }
                      if(user_pids.indexOf(item.id) === -1) {
                        array.push(item)
                      }
                    }
                  })
                }
              })
            }
          })
          console.log(routes, 'routes----------------')
          array.forEach(item => {
            routes.forEach(a => {
              if(item.child && item.child.length > 0) {
                // a.
              }
            })
          })
          let arr = []
          console.log(arr.concat(array), 'array------------')
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
