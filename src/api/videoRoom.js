import request from '@/utils/request2'

// 登录
export function getRoomLogin(data) {
  return request({
    url: '/Login/login',
    method: 'post',
    data
  })
}

// 退出登录
export function getRoomLogout(data) {
  return request({
    url: '/Wallet/logout',
    method: 'post',
    data
  })
}

// 主页
export function getRoomWallet(data) {
  return request({
    url: '/Wallet',
    method: 'post',
    data
  })
}

// 房间类型列表
export function getRoomGenre(data) {
  return request({
    url: '/Room/genre',
    method: 'post',
    data
  })
}

// 房间类型修改
export function getRoomGenreSave(data) {
  return request({
    url: '/Room/genreSave',
    method: 'post',
    data
  })
}

// 房间列表
export function getRoomList(data) {
  return request({
    url: '/Room/room',
    method: 'post',
    data
  })
}

// 房间冻结/解冻
export function getRoomSave(data) {
  return request({
    url: 'Room/roomSave',
    method: 'post',
    data
  })
}

// 举报列表
export function getFeedBackList(data) {
  return request({
    url: '/Room/feedback',
    method: 'post',
    data
  })
}

// 举报列表核查
export function getFeedBackSave(data) {
  return request({
    url: '/Room/feedbackSave',
    method: 'post',
    data
  })
}

// 用户列表
export function getUserList(data) {
  return request({
    url: 'User',
    method: 'post',
    data
  })
}

// 用户封禁/启用
export function getUserSave(data) {
  return request({
    url: 'User/userSave',
    method: 'post',
    data
  })
}

// 用户信息列表
export function getUserInfoList(data) {
  return request({
    url: 'User/info',
    method: 'post',
    data
  })
}

// 实名认证列表
export function getVerifyList(data) {
  return request({
    url: 'Verify',
    method: 'post',
    data
  })
}

// 用户账户列表
export function getWalletList(data) {
  return request({
    url: 'User/wallet',
    method: 'post',
    data
  })
}

// 用户账户封禁/启用
export function getWalletSave(data) {
  return request({
    url: 'User/walletSave',
    method: 'post',
    data
  })
}

// 礼物赠送记录
export function getGiftRecordList(data) {
  return request({
    url: 'Gift/history',
    method: 'post',
    data
  })
}


// 礼物列表
export function getGiftList(data) {
  return request({
    url: 'Gift',
    method: 'post',
    data
  })
}

// 礼物新增
export function getGiftAdd(data) {
  return request({
    url: 'Gift/addGift',
    method: 'post',
    data
  })
}

// 礼物修改
export function getGiftEdit(data) {
  return request({
    url: 'Gift/saveGift',
    method: 'post',
    data
  })
}

// 直播头衔列表
export function getLiveRanklist(data) {
  return request({
    url: 'User/liveRank',
    method: 'post',
    data
  })
}

// 直播头衔配置
export function getLiveRankConfig(data) {
  return request({
    url: 'User/liveRankConfig',
    method: 'post',
    data
  })
}

// 用户消费等级列表
export function getUserRankList(data) {
  return request({
    url: 'User/userRank',
    method: 'post',
    data
  })
}

// 用户消费等级配置
export function getUserRankConfig(data) {
  return request({
    url: 'User/userRankConfig',
    method: 'post',
    data
  })
}

// 公会列表
export function getGuildList(data) {
  return request({
    url: 'Guild/guildList',
    method: 'post',
    data
  })
}

// 公会待审核列表
export function getGuildCheckList(data) {
  return request({
    url: 'Guild/checkList',
    method: 'post',
    data
  })
}

// 公会审核/驳回
export function getGuildCheck(data) {
  return request({
    url: 'Guild/check',
    method: 'post',
    data
  })
}

// 公会待审核列表
export function getGuildWithdrawList(data) {
  return request({
    url: 'Wallet/withdrawList',
    method: 'post',
    data
  })
}
// 公会提现审核
export function getGuildWalletCheck(data) {
  return request({
    url: '/Wallet/check',
    method: 'post',
    data
  })
}

