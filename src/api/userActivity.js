import request from '@/utils/request2'
import api from '@/request/index'

// 获取支付类型
export function configDW(params) {
  return request({
    url: api.userActivity.dwActivity.configDW,
    method: 'post',
    data: params
  })
}

// 平台活动 - 首充 - 新增
export function addFirstCharge(params) {
  return request({
    url: api.platformActivity.addFirstCharge,
    method: 'post',
    data: params
  })
}

