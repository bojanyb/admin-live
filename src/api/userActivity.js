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


