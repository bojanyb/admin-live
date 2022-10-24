import request from '@/utils/request2'
import api from '@/request/index'

// 用户编辑
export function edit(data) {
  return request({
    url: api.user.edit,
    method: 'post',
    data
  })
}

// 用户封禁/启用
export function getUserSave(data) {
  return request({
    url: api.user.userSave,
    method: 'post',
    data
  })
}

// 一键换图
export function defaultFace(data) {
  return request({
    url: api.user.defaultFace,
    method: 'post',
    data
  })
}

// 用户信息
export function getUser(data) {
  return request({
    url: api.user.list,
    method: 'post',
    data
  })
}

// 用户封禁状态
export function punishStatus(data) {
  return request({
    url: api.user.punishStatus,
    method: 'post',
    data
  })
}

// 获取公会列表
export function guildList(data) {
  return request({
    url: api.guild.list,
    method: 'post',
    data
  })
}

// 添加公会成员
export function addGuildUser(data) {
  return request({
    url: api.guild.addGuildUser,
    method: 'post',
    data
  })
}

// 删除公会成员
export function removeGuildUser(data) {
  return request({
    url: api.guild.removeGuildUser,
    method: 'post',
    data
  })
}

// 绑定工会厅
export function bindRoom(data) {
  return request({
    url: api.guild.bindRoom,
    method: 'post',
    data
  })
}

// 移除大厅
export function removeGuildRoom(data) {
  return request({
    url: api.guild.removeGuildRoom,
    method: 'post',
    data
  })
}

// 解散公会
export function disbandGuild(data) {
  return request({
    url: api.guild.disbandGuild,
    method: 'post',
    data
  })
}

// 房间游戏列表
export function roomGameList(data) {
  return request({
    url: api.room.roomGameList,
    method: 'post',
    data
  })
}

// 审核用户操作记录
export function checkContentAudit(data) { // 接口勿用 - 这里会审核图片 - 现在有图片审核模块 - 会重复审核
  return request({
    url: api.audit.checkContentAudit,
    method: 'post',
    data
  })
}

// 用户列表
export function userList(data) {
  return request({
    url: api.user.list,
    method: 'post',
    data
  })
}

// 用户封禁状态
export function punishStatus(data) {
  return request({
    url: api.user.punishStatus,
    method: 'post',
    data
  })
}


// 封禁（解封）公会
export function lockGuild(data) {
  return request({
    url: api.guild.lockGuild,
    method: 'post',
    data
  })
}

// 添加24小时房间统计集合
export function addStatisticsroom(data) {
  return request({
    url: api.guild.addStatisticsroom,
    method: 'post',
    data
  })
}

// 移除24小时房间统计
export function delStatisticsroom(data) {
  return request({
    url: api.guild.delStatisticsroom,
    method: 'post',
    data
  })
}

// 审核更换实名
export function check(data) {
  return request({
    url: api.user.check,
    method: 'post',
    data
  })
}



/***********公会v2******************/ 

// 主播申请审核
export function guildUserApplyCheck(data) {
  return request({
    url: api.guild.guildUserApplyCheck,
    method: 'post',
    data
  })
}

// 删除公会成员
export function rmGuildUser(data) {
  return request({
    url: api.guild.rmGuildUser,
    method: 'post',
    data
  })
}

// 公会房间列表
export function guildRooms(data) {
  return request({
    url: api.guild.guildRooms,
    method: 'post',
    data
  })
}

// 添加公会房间
export function addGuildRoom(data) {
  return request({
    url: api.guild.addGuildRoom,
    method: 'post',
    data
  })
}

