import request from '@/utils/request2'
import api from '@/request/index'

// 配置监测链接
export function configChain(data) {
  return request({
    url: api.market.configChain,
    method: 'post',
    data
  })
}

// 删除监测链接
export function market(data) {
  return request({
    url: api.market.delChain,
    method: 'post',
    data
  })
}

// 获取监测链接
export function getChain(data) {
  return request({
    url: api.market.chain,
    method: 'post',
    data
  })
}

