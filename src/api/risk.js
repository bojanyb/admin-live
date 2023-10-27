import request from '@/utils/request2'
import api from '@/request/index'

// 封面审核
export function coverCheck(data) {
    return request({
        url: api.risk.coverCheck,
        method: 'post',
        data
    })
}

// 解除处罚用户
export function removeUser(data) {
    return request({
        url: api.risk.remove,
        method: 'post',
        data
    })
}

// 添加处罚用户
export function save(data) {
    return request({
        url: api.risk.save,
        method: 'post',
        data
    })
}

// 敏感词-软删除
export function softDelete(data) {
    return request({
        url: api.risk.softDelete,
        method: 'post',
        data
    })
}

// 敏感词-添加
export function add(data) {
    return request({
        url: api.risk.add,
        method: 'post',
        data
    })
}

// 图片审核-操作
export function review(data) {
    return request({
        url: api.risk.review,
        method: 'post',
        data
    })
}

// 图片审核-客服列表
export function customerServiceList(data) {
  return request({
    url: api.risk.customerServiceList,
    method: 'post',
    data
  })
}

// 处罚 -列表
export function UserPunishLog(data) {
  return request({
      url: api.risk.UserPunishLog,
      method: 'post',
      data
  })
}

// 处罚 -新增
export function addUserPunish(data) {
    return request({
        url: api.risk.addUserPunish,
        method: 'post',
        data
    })
}

// 处罚 -批量新增
export function addBatchUserPunish(data) {
    return request({
        url: api.risk.addBatchUserPunish,
        method: 'post',
        data
    })
}

// 处罚-封禁
export function saveUserPunish(data) {
    return request({
        url: api.risk.saveUserPunish,
        method: 'post',
        data
    })
}

// 处罚-解除
export function removeUserPunish(data) {
    return request({
        url: api.risk.removeUserPunish,
        method: 'post',
        data
    })
}

// 处罚-忽略
export function passUserPunish(data) {
    return request({
        url: api.risk.passUserPunish,
        method: 'post',
        data
    })
}

// 用户状态
export function punishStatus(data) {
    return request({
        url: api.risk.punishStatus,
        method: 'post',
        data
    })
}

// 处罚-修改证据
export function updateSource(data) {
    return request({
        url: api.risk.updateSource,
        method: 'post',
        data
    })
}

// 处罚-操作日志
export function punishOperateLog(data) {
  return request({
    url: api.risk.punishOperateLog,
    method: 'post',
    data
  })
}

// 处罚-审核实例
export function acceptPunish(data) {
  return request({
    url: api.risk.acceptPunish,
    method: 'post',
    data
  })
}


// 会话消息-房间会话记录
export function roomTalkList(data) {
  return request({
    url: api.risk.roomTalkList,
    method: 'post',
    data
  })
}

// 会话消息-私聊会话记录
export function chatTalkList(data) {
  return request({
    url: api.risk.chatTalkList,
    method: 'post',
    data
  })
}

// 导出音频列表
export function exprotAudio(data) {
  return request({
    url: api.risk.audioStreamDefyListExport,
    method: 'post',
    data
  })
}

// 获取风控文案库列表
export function getPunishWordsList(data) {
  return request({
    url: api.risk.punishWordsList,
    method: 'post',
    data
  })
}

// 更新风控文案
export function updatePunishWords(data) {
  return request({
    url: api.risk.updatePunishWords,
    method: 'post',
    data
  })
}

// 删除风控文案
export function deletePunishWords(data) {
  return request({
    url: api.risk.deletePunishWords,
    method: 'post',
    data
  })
}

// 获取举报用户记录
export function NewUserPunishLog(data) {
  return request({
    url: api.risk.NewUserPunishLog,
    method: 'post',
    data
  })
}

// 获取举报公会记录
export function NewGuildPunishLog(data) {
  return request({
    url: api.risk.NewGuildPunishLog,
    method: 'post',
    data
  })
}

// 获取用户处罚相关详情
export function getUserPunishDetail(data) {
  return request({
    url: api.risk.getUserPunishDetail,
    method: 'post',
    data
  })
}

// 处罚-复审处罚
export function punishAgain(data) {
  return request({
    url: api.risk.punishAgain,
    method: 'post',
    data
  })
}

// 获取被举报公会信息
export function getFeedbackGuildDetail(data) {
  return request({
    url: api.risk.getFeedbackGuildDetail,
    method: 'post',
    data
  })
}

// 查找举报公会的举报人的信息
export function getReportGuildUserDetail(data) {
  return request({
    url: api.risk.getReportGuildUserDetail,
    method: 'post',
    data
  })
}

// 公会处罚-忽略
export function guildPassUserPunish(data) {
  return request({
    url: api.risk.guildPassUserPunish,
    method: 'post',
    data
  })
}

// 公会投诉更换证据
export function guildUpdateSource(data) {
  return request({
    url: api.risk.guildUpdateSource,
    method: 'post',
    data
  })
}
