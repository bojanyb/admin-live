import request from '@/utils/request2'
import api from '@/request/index'

// 用户编辑
export function addResourceConfig(data) {
  return request({
    url: api.activity.addResourceConfig,
    method: 'post',
    data
  })
}