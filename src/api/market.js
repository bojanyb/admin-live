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

// 在线用户列表
export function exportOnlineUserData(data) {
  return request({
    url: api.market.exportOnlineUserData,
    responseType: 'blob',
    method: 'post',
    data
  })
}

// 市场监测配置管理 - 添加
export function adConfList(data) {
  return request({
    url: api.market.addAdConf,
    method: 'post',
    data
  })
}

// 市场监测配置管理 - 启用/停用
export function handleAdConf(data) {
  return request({
    url: api.market.handleAdConf,
    method: 'post',
    data
  })
}

// 市场监测配置管理 - 媒体下拉框列表
export function getAdSelect(data) {
  return request({
    url: api.market.getAdSelect,
    method: 'post',
    data
  })
}