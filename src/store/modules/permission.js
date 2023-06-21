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
  addRoutes: [],
  btnArr: [],
  curBtnArr: [],
  userPids: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BTN: (state, btnArr) => {
    state.btnArr = btnArr
  },
  SET_CUR_BTN: (state, fullPath) => {
   state.btnArr.reduce((pev, cur) => {
      if ((fullPath === cur.h5_path)) {
        if (state.userPids.indexOf(cur.id) !== -1) {
          pev.push(cur.api_controller);
        }
      }
      return pev;
    }, []).forEach(item => {
      state.curBtnArr.push(item)
    })

    state.curBtnArr = Array.from(new Set(state.curBtnArr))
  },
  SET_USER_PIDS: (state, userPids) => {
    state.userPids = userPids
  },
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let admin_id = Number(localStorage.getItem('admin_id'))
      editAdmin({ admin_id }).then(res => {
        let array = []
        let arr = JSON.parse(JSON.stringify(res.data.list))
        let user_pids = res.data.user_pids
        commit('SET_USER_PIDS', user_pids)
        let btnArr = []
        if(arr && arr.length > 0) { // 递归删除所有不需要展示的菜单
          let prv = (list, params) => {
            list.forEach((item,index) => {
              if(user_pids.indexOf(item.id) === -1 || item.status === 0 || item.is_menu === 0) {
                if(item.pid === 0) {
                  arr.splice(index, 1)
                  prv(arr)
                } else {
                  if(params) {
                    params.child.splice(index, 1)
                    prv(item.child, item)
                  }

                  if(item.child && item.child.length > 0) {
                    prv(item.child, item)
                  }
                }
              }

              if (item.is_menu === 0) {
                btnArr.push(item)
                commit('SET_BTN', btnArr)
               }
              if(item.child && item.child.length > 0) {
                prv(item.child, item)
              }
            })
          }
          prv(arr)

          let ri = (list, params) => {
            list.forEach((item, index) => {
              if (user_pids.indexOf(item.id) === -1 || item.status === 0 || item.is_menu === 0) {
                if(params) {
                  params.child.splice(index, 1)
                  ri(params.child, params)
                }
              }

              if(item.child && item.child.length > 0) {
                ri(item.child, item)
              }
            })
          }
          ri(arr)

          let asyncArr = []
          let as = (list) => {
            list.forEach(item => {
              asyncArr.push(item)
              if(item.children && item.children.length > 0) {
                as(item.children)
              }
            })
          }
          as(asyncRoutes)
          let newList = [];
          let sv = (list) => {
            list.forEach((item, index) => {
              let params = asyncArr.find(a => { return item.h5_path === a.path })
              if(params) {
                item.params = {
                  component: params ? params.component : Layout,
                  meta: params ? params.meta : { title: 'default' },
                  name: params ? params.name : 'default',
                  path: params ? params.path : `/default${index}`,
                  redirect: params ? params.redirect : 'noRedirect'
                }
              }
              if(item.child && item.child.length > 0) {
                sv(item.child);
                if(item.params && item.params.name){
                  newList.push(item)
                }
              }
            })
          }
          sv(newList.length > 0? newList : arr, asyncRoutes);

          let ax = (list) => {
            list.forEach((item,index) => {
              if(!item.params) {
                list.splice(index, 1)
              }
              if(item.child && item.child.length > 0) {
                ax(item.child)
              }
            })
          }
          ax(newList.length > 0? newList : arr)

          newList.forEach((item,index) => {
            array.push({
              component: item.params ? item.params.component : Layout,
              meta: item.params ? item.params.meta : { title: 'default' },
              name: item.params ? item.params.name : 'default',
              path: item.params ? item.params.path : `/default${index}`,
              redirect: item.params ? item.params.redirect : 'noRedirect'
            })
            array[index].meta.title = item.title
            if(item.child && item.child.length > 0) {
              array[index].children = []
              item.child.forEach((a,b) => {
               if(a.params){
                array[index].children.push({
                  component: a.params ? a.params.component : Layout,
                  meta: a.params ? a.params.meta : { title: 'default' },
                  name: a.params ? a.params.name : 'default',
                  path: a.params ? a.params.path : `/default${index}`,
                })
                if(array[index].children[b]){
                  array[index].children[b].meta.title = a.title
                }
               }
                if(a.child && a.child.length > 0) {
                  array[index].children[b].children = []
                  a.child.forEach((x,s) => {
                    array[index].children[b].children.push({
                      component: x.params ? x.params.component : Layout,
                      meta: x.params ? x.params.meta : { title: 'default' },
                      path: x.params ? x.params.name : 'default',
                      name: x.params ? x.params.path : `/default${index}`,
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
