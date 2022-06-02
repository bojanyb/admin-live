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

// 
export function diamondRecharge(data) {
  return request({
    url: REQUEST.CashHisity.diamondRecharge,
    method: 'post',
    data
  })
}