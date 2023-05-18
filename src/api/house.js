import request from '@/utils/request2'
import api from '@/request/index'

// 修改派对
export function updateParty(data) {
    return request({
        url: api.house.updateParty,
        method: 'post',
        data
    })
}

// 删除品类名
export function delGenre(data) {
    return request({
        url: api.house.delGenre,
        method: 'post',
        data
    })
}

// 新增品类名
export function saveGenre(data) {
    return request({
        url: api.house.saveGenre,
        method: 'post',
        data
    })
}

// 类型列表
export function genreList(data) {
    return request({
        url: api.house.genreList,
        method: 'post',
        data
    })
}

// 相守类型列表
export function partyRoomTypes(data) {
  return request({
    url: api.house.partyRoomTypes,
    method: 'post',
    data
  })
}

// 增加房间热度
export function addRoomHot(data) {
    return request({
        url: api.house.addRoomHot,
        method: 'post',
        data
    })
}

// 房间热度设置
export function roomHotSetting(data) {
    return request({
        url: api.house.roomHotSetting,
        method: 'post',
        data
    })
}

// 删除热度
export function deleteRoomHot(data) {
    return request({
        url: api.house.deleteRoomHot,
        method: 'post',
        data
    })
}

// 查看房间已经绑定的分类
export function roomTypes(data) {
    return request({
        url: api.house.roomTypes,
        method: 'post',
        data
    })
}

// 为房间绑定分类
export function roomBindType(data) {
    return request({
        url: api.house.roomBindType,
        method: 'post',
        data
    })
}

// 房间移除绑定分类
export function delBind(data) {
    return request({
        url: api.house.delBind,
        method: 'post',
        data
    })
}

// 查看房间已经绑定的分类
export function liveTypes(data) {
  return request({
      url: api.house.liveTypes,
      method: 'post',
      data
  })
}

// 为房间绑定分类
export function liveBindType(data) {
  return request({
      url: api.house.liveBindType,
      method: 'post',
      data
  })
}

// 房间移除绑定分类
export function delLiveBind(data) {
  return request({
      url: api.house.delLiveBind,
      method: 'post',
      data
  })
}

// 关闭直播
export function endLive(data) {
    return request({
        url: api.house.endLive,
        method: 'post',
        data
    })
}

// 首页房间类型推荐-新增
export function createRoomHotConf(data) {
  return request({
    url: api.house.createRoomHotConf,
    method: 'post',
    data
  })
}

// 首页房间类型推荐-修改
export function updateRoomHotConf(data) {
  return request({
    url: api.house.updateRoomHotConf,
    method: 'post',
    data
  })
}

// 首页房间类型推荐-删除
export function deleteRoomHonour(data) {
  return request({
    url: api.house.deleteRoomHonour,
    method: 'post',
    data
  })
}

// 房间角标配置-新增
export function createRoomHonour(data) {
  return request({
    url: api.house.createRoomHonour,
    method: 'post',
    data
  })
}

// 房间角标配置-修改
export function updateRoomHonour(data) {
  return request({
    url: api.house.updateRoomHonour,
    method: 'post',
    data
  })
}

// 房间角标配置-删除
export function deleteRoomHotConf(data) {
  return request({
    url: api.house.deleteRoomHotConf,
    method: 'post',
    data
  })
}

// 首页房间类型推荐-新增
export function createRoomPushFlow(data) {
  return request({
    url: api.house.createRoomPushFlow,
    method: 'post',
    data
  })
}

// 首页房间类型推荐-修改
export function updateRoomPushFlow(data) {
  return request({
    url: api.house.updateRoomPushFlow,
    method: 'post',
    data
  })
}

// 首页房间类型推荐-删除
export function deleteRoomPushFlow(data) {
  return request({
    url: api.house.deleteRoomPushFlow,
    method: 'post',
    data
  })
}

// 全部房间-修改房间类别
export function changePartyRoom(data) {
  return request({
    url: api.house.changePartyRoom,
    method: 'post',
    data
  })
}

// 全部房间-获取房间类别
export function canChangeType(data) {
  return request({
    url: api.house.canChangeType,
    method: 'post',
    data
  })
}
