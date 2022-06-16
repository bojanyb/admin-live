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

// 获取支付类型 - 新
export function getChannelTypeList(params) {
  return request({
    url: api.pay.getChannelTypeList,
    method: 'post',
    params
  })
}

// 设置支付类型
export function setPayType(params) {
  return request({
    url: api.pay.editChannelType,
    method: 'post',
    data: params
  })
}

// 获取四方支付
export function getAdaPayConfig(params) {
  return request({
    url: api.pay.getAdaPayConfig,
    method: 'post',
    data: params
  })
}

// 设置四方支付
export function setAdaPayConfig(params) {
  return request({
    url: api.pay.setAdaPayConfig,
    method: 'post',
    data: params
  })
}

// 获取非四方支付
export function getWxPay(params) {
  return request({
    url: api.pay.getWxPay,
    method: 'post',
    data: params
  })
}

// 设置非四方支付
export function setWxpay(params) {
  return request({
    url: api.pay.setWxpay,
    method: 'post',
    data: params
  })
}

