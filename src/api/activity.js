import request from '@/utils/request2'
import api from '@/request/index'

// 添加资源位配置
export function addResourceConfig(data) {
  return request({
    url: api.activity.addResourceConfig,
    method: 'post',
    data
  })
}


// 修改资源位配置
export function editResource(data) {
  return request({
    url: api.activity.editResource,
    method: 'post',
    data
  })
}
// 删除资源
export function delResource(data) {
  return request({
    url: api.activity.delResource,
    method: 'post',
    data
  })
}
/********************************************/
// 2022/12/6 21：44
// 获取奖池名
export function getPoolName(data) {
  return request({
    url: api.activity.getPoolName,
    method: 'post',
    data
  })
}
// 获取轮数
export function getRound(data) {
  return request({
    url: api.activity.getRound,
    method: 'post',
    data
  })
}

// 祈福抽奖记录
export function fuList(data) {
  return request({
    url: api.activity.fuList,
    method: 'post',
    data
  })
}

// 碎片来源类型
export function sourceType(data) {
  return request({
    url: api.activity.sourceType,
    method: 'post',
    data
  })
}

// 景点数据
export function getTraveList(data) {
  return request({
    url: api.activity.getTraveList,
    method: 'post',
    data
  })
}

// 景点数据 详情数据
export function getTraveListDetail(data) {
  return request({
    url: api.activity.getTraveListDetail,
    method: 'post',
    data
  })
}

