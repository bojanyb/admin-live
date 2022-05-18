import request from '@/utils/request2'
import api from '@/request/index'

// 获取支付类型
export function getPayType(params) {
    return request({
      url: api.pay.getConfigType,
      method: 'post',
      params
    })
}

// 设置支付类型
export function setPayType(params) {
    return request({
      url: api.pay.setConfigType,
      method: 'post',
      data: params
    })
}

