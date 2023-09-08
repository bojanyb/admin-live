import request from '@/utils/request2'
import api from '@/request/index'

// 动态管理

// 删除动态
export function delMoments(data) {
    return request({
        url: api.dynamic.delMoments,
        method: 'post',
        data
    })
}

// 删除评论
export function deleteMsg(data) {
    return request({
        url: api.dynamic.deleteMsg,
        method: 'post',
        data
    })
}

// 删除评论
export function multiDeleteMsg(data) {
  return request({
      url: api.dynamic.multiDeleteMsg,
      method: 'post',
      data
  })
}

// 动态审核操作
export function check(data) {
  return request({
      url: api.dynamic.check,
      method: 'post',
      data
  })
}

// 置顶动态
export function setTopMoment(data) {
  return request({
      url: api.dynamic.setTopMoment,
      method: 'post',
      data
  })
}

// 删除置顶动态
export function delTopList(data) {
  return request({
      url: api.dynamic.delTopList,
      method: 'post',
      data
  })
}
