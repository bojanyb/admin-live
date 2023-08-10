import request from '@/utils/request2'
import api from '@/request/index'

/****
 *
 * accountlist
  create
  delete
  recharge
  diamondLog
  rechargeLog
  rechargeLogExport
  diamondLogExport
 *
 * ***/

// 代充账号列表
export function accountlist(params) {
  return request({
    url: api.substitute.accountlist,
    method: 'post',
    data: params
  })
}
// 添加代充用户
export function createFun(params) {
  return request({
    url: api.substitute.createFun,
    method: 'post',
    data: params
  })
}
// 删除代充用户
export function deleteFun(params) {
  return request({
    url: api.substitute.deleteFun,
    method: 'post',
    data: params
  })
}
// 充值/扣款代充账户
export function recharge(params) {
  return request({
    url: api.substitute.recharge,
    method: 'post',
    data: params
  })
}
// 红钻明细
export function diamondLog(params) {
  return request({
    url: api.substitute.diamondLog,
    method: 'post',
    data: params
  })
}
// 充值金币记录
export function rechargeLog(params) {
  return request({
    url: api.substitute.rechargeLog,
    method: 'post',
    data: params
  })
}
// 充值金币记录导出
export function rechargeLogExport(params) {
  return request({
    url: api.substitute.rechargeLogExport,
    method: 'post',
    data: params
  })
}
// 红钻明细导出
export function diamondLogExport(params) {
  return request({
    url: api.substitute.diamondLogExport,
    method: 'post',
    data: params
  })
}