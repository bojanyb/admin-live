import request from '@/utils/request2'
import api from '@/request/index'

// 用户编辑
export function edit(data) {
  return request({
    url: api.user.edit,
    method: 'post',
    data
  })
}

// 用户封禁/启用
export function getUserSave(data) {
  return request({
    url: api.user.userSave,
    method: 'post',
    data
  })
}

// 一键换图
export function defaultFace(data) {
  return request({
    url: api.user.defaultFace,
    method: 'post',
    data
  })
}

// 用户信息
export function getUser(data) {
  return request({
    url: api.user.list,
    method: 'post',
    data
  })
}
