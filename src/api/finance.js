import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'

// 体现操作 - 通过 - 驳回
export function doCash(data) {
  return request({
    url: REQUEST.CashHisity.doCash,
    method: 'post',
    data
  })
}

// 充值记录
export function diamondRecharge(data) {
  return request({
    url: REQUEST.CashHisity.diamondRecharge,
    method: 'post',
    data
  })
}

// 获取支付渠道
export function payList(data) {
  return request({
    url: REQUEST.pay.payList,
    method: 'post',
    data
  })
}

// 上传支付宝证书
export function uploadFile(data) {
  return request({
    url: REQUEST.pay.uploadFile,
    method: 'post',
    data
  })
}

// 添加提现商户
export function create(data) {
  return request({
    url: REQUEST.pay.create,
    method: 'post',
    data
  })
}

// 启用支付渠道
export function payChannelWaySave(data) {
  return request({
    url: REQUEST.pay.payChannelWaySave,
    method: 'post',
    data
  })
}

// 使用提现
export function useCash(data) {
  return request({
    url: REQUEST.pay.useCash,
    method: 'post',
    data
  })
}

// 充值记录导出
export function diamondRechargeAll(data) {
  return request({
    url: REQUEST.finance.diamondRechargeAll,
    method: 'post',
    data
  })
}

// 提现导出excel
export function getCashHisityAll(data) {
  return request({
    url: REQUEST.finance.getCashHisityAll,
    method: 'post',
    data
  })
}

// 推广补单通过csv格式
export function regReplenishmentByCsv(data) {
  return request({
    url: REQUEST.finance.regReplenishmentByCsv,
    method: 'post',
    data
  })
}

// 修改支付使用状态
export function changePayStatus(data) {
  return request({
    url: REQUEST.finance.changePayStatus,
    method: 'post',
    data
  })
}
