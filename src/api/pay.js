import request from '@/utils/request2'

// 获取支付类型
export function getPayType(params) {
    return request({
      url: '/admin/PayConfig/getConfigType',
      method: 'post',
      params
    })
}

// 设置支付类型
export function setPayType(params) {
    return request({
      url: '/admin/Payconfig/setConfigType',
      method: 'post',
      data: params
    })
}

// 获取操作记录
export function getPayOptLog(params) {
    return request({
      url: '/admin/Payconfig/getPayOptLog',
      method: 'post',
      params
    })
}

