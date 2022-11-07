import request from '@/utils/request2'
import api from '@/request/index'

// 添加资源位配置
export function addResourceConfig(data) {
  return request({
    url: api.activity.addResourceConfig,
    method: 'post',
    data
  })
}


// 修改资源位配置
export function editResource(data) {
  return request({
    url: api.activity.editResource,
    method: 'post',
    data
  })
}
// 删除资源
export function delResource(data) {
  return request({
    url: api.activity.delResource,
    method: 'post',
    data
  })
}
