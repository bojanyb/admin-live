import { asyncRoutes, constantRoutes } from '@/router'
// 引入api
import { editAdmin } from '@/api/admin.js'
import Layout from '@/layout'

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
      editAdmin({ admin_id }).then(res => {
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


          let sv = (list, list2) => {
            list.forEach(item => {
              list2.forEach(a => {
                if(item.h5_path === a.path) {
                  item.params = {
                    component: a.component,
                    meta: a.meta,
                    name: a.name,
                    path: a.path,
                    redirect: a.redirect
                  }
                }
                if(item.child && item.child.length > 0 && a.children && a.children.length > 0) {
                  sv(item.child, a.children)
                }
              })
            })
          }

          sv(arr, asyncRoutes)

          arr.forEach((item,index) => {
            array.push({
              component: item.params.component,
              meta: item.params.meta,
              name: item.params.name,
              path: item.params.path,
              redirect: item.params.redirect
            })
            array[index].meta.title = item.title
            if(item.child && item.child.length > 0) {
              array[index].children = []
              item.child.forEach((a,b) => {
                array[index].children.push({
                  component: a.params.component,
                  meta: a.params.meta,
                  name: a.params.name,
                  path: a.params.path,
                })
                array[index].children[b].meta.title = a.title
                if(a.child && a.child.length > 0) {
                  array[index].children[b].children = []
                  a.child.forEach((x,s) => {
                    array[index].children[b].children.push({
                      component: x.params.component,
                      meta: x.params.meta,
                      path: x.params.path,
                      name: x.params.name,
                    })
                    array[index].children[b].children[s].meta.title = x.title
                  })
                }
              })
            }
          })

          array.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })

          // 获取储存路由
          let jumpPath = localStorage.getItem('jumpPath')
          array.push({
            path: '/',
            component: Layout,
            redirect: jumpPath
          })

          let accessedRoutes
          if (roles.includes('admin')) {
            accessedRoutes = array || []
          } else {
            accessedRoutes = filterAsyncRoutes(array, roles)
          }

          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)

        }
      })
      
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
