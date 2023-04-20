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

// 资源位列表
export function posList(data) {
  return request({
    url: api.activity.posList,
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

/*** 娃娃机2.0 ***/
export function getPoolNameV2(data) {
  return request({
    url: api.activity.getPoolNameV2,
    method: 'post',
    data
  })
}
// 获取轮数
export function getRoundV2(data) {
  return request({
    url: api.activity.getRoundV2,
    method: 'post',
    data
  })
}
/*** 娃娃机2.0 ***/

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

/***农场物语*****/
// 获取奖池列表
export function getPoolNameV3(data) {
  return request({
    url: api.activity.getPoolNameV3,
    method: 'post',
    data
  })
}
// 获取喂养列表
export function poolDetailV3(data) {
  return request({
    url: api.activity.poolDetailV3,
    method: 'post',
    data
  })
}
// 获取轮次
export function getRoundV3(data) {
  return request({
    url: api.activity.getRoundV3,
    method: 'post',
    data
  })
}

// 星际穿越
// 获取奖池列表
export function getPoolNameV4(data) {
  return request({
    url: api.activity.getPoolNameV4,
    method: 'post',
    data
  })
}
// 获取探索列表
export function poolDetailV4(data) {
  return request({
    url: api.activity.poolDetailV4,
    method: 'post',
    data
  })
}
// 获取轮次
export function getRoundV4(data) {
  return request({
    url: api.activity.getRoundV4,
    method: 'post',
    data
  })
}

// 兑换记录
export function exchangeLogV4(data) {
  return request({
    url: api.activity.exchangeLogV4,
    method: 'post',
    data
  })
}

/*******最强周星**********/

// 获取礼物
export function getGiftList(data) {
  return request({
    url: api.activity.getGiftList,
    method: 'post',
    data
  })
}

// 获取轮次
export function getRoundList(data) {
  return request({
    url: api.activity.getRoundList,
    method: 'post',
    data
  })
}

