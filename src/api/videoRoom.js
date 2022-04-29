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

// 用户信息
export function getUserWallet(data) {
  return request({
    url: '/Wallet/getUserWallet',
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

// 用户列表  统计页面显示和隐藏
export function getUserStatisticalShow(data) {
  return request({
    url: '/user/statisticalShow',
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


// 用户资料审核列表
export function getUserAuditList(data) {
  return request({
    url: 'User/checkList',
    method: 'post',
    data
  })
}

// 用户资料审核
export function getUserAudit(data) {
  return request({
    url: 'User/checkInfo',
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

// 礼物缓存刷新，慎用， 一般在缓存数据丢失下使用
export function getGiftRefresh(data) {
  return request({
    url: 'Gift/refresh',
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

// 魅力等级配置
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

// 财富等级配置
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

// 新增公会
export function getGuildCreate(data) {
  return request({
    url: 'guild/create',
    method: 'post',
    data
  })
}

// 修改公会
export function getGuildUpdate(data) {
  return request({
    url: '/guild/update',
    method: 'post',
    data
  })
}

// 公会厅申请信息处理	
export function getGuildJoinApply(data) {
  return request({
    url: 'Guild/joinApply',
    method: 'post',
    data
  })
}
// 公会厅申请处理
export function getGuildCheck(data) {
  return request({
    url: 'Guild/check',
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
// export function getGuildCheck(data) {
//   return request({
//     url: 'Guild/check',
//     method: 'post',
//     data
//   })
// }

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

// 聊天室、单聊记录 Im
export function getChatRecord(data) {
  return request({
    url: '/Im',
    method: 'post',
    data
  })
}

// 活动列表 
export function getActivetyList(data) {
  return request({
    url: '/Activity/index',
    method: 'post',
    data
  })
}

// 活动新增
export function getActivetyAdd(data) {
  return request({
    url: '/Activity/create',
    method: 'post',
    data
  })
}

// 活动编辑
export function getActivetyUpdate(data) {
  return request({
    url: '/Activity/update',
    method: 'post',
    data
  })
}

// 活动删除
export function getActivetyDel(data) {
  return request({
    url: '/Activity/delete',
    method: 'post',
    data
  })
}


// 活动礼物列表 
export function getActivetyGiftList(data) {
  return request({
    url: '/Activity/aclist',
    method: 'post',
    data
  })
}

// 活动礼物库列表 
export function getActivetyGiftSource(data) {
  return request({
    url: '/Activity/giftList',
    method: 'post',
    data
  })
}

// 获取已配置礼物 
export function getActivetyHasGiftList(data) {
  return request({
    url: '/Activity/getHasAddGift',
    method: 'post',
    data
  })
}

// 配置礼物
export function getActivetyGiftSave(data) {
  return request({
    url: '/Activity/saveGift',
    method: 'post',
    data
  })
}

// 活动礼物编辑
export function getActivetyGiftDetail(data) {
  return request({
    url: '/Activity/detail',
    method: 'post',
    data
  })
}

// 活动礼物删除
export function getActivetyGiftADelete(data) {
  return request({
    url: '/activity/aDelete',
    method: 'post',
    data
  })
}

// 增加库存
export function getActivetyGiftAddInventory(data) {
  return request({
    url: '/Activity/addInventory',
    method: 'post',
    data
  })
}

// 抽奖日志
export function getActivetyDrawLog(data) {
  return request({
    url: '/Activity/drawLog',
    method: 'post',
    data
  })
}

// 打招呼常用语 列表 
export function getDesignateList(data) {
  return request({
    url: '/designate/index',
    method: 'post',
    data
  })
}

// 打招呼常用语 新增 
export function getDesignateAdd(data) {
  return request({
    url: '/designate/create',
    method: 'post',
    data
  })
}

// 打招呼常用语 修改 
export function getDesignateUpdate(data) {
  return request({
    url: '/designate/update',
    method: 'post',
    data
  })
}

// 打招呼常用语 删除 
export function getDesignateDelete(data) {
  return request({
    url: '/designate/delete',
    method: 'post',
    data
  })
}

// 系统参数读取
export function getSyetermConfig(data) {
  return request({
    url: '/System/getSyetermConfig',
    method: 'post',
    data
  })
}

// 打招呼常用语 删除 
export function getSyetermConfigSave(data) {
  return request({
    url: '/system/save',
    method: 'post',
    data
  })
}


//  房间名称列表
export function getLiveRoomList(data) {
  return request({
    url: '/LiveRoom/index',
    method: 'post',
    data
  })
}

//  新增推荐房名
export function getLiveCreate(data) {
  return request({
    url: '/live_room/create',
    method: 'post',
    data
  })
}

//  修改推荐房名
export function getLiveUpdate(data) {
  return request({
    url: '/live_room/update',
    method: 'post',
    data
  })
}

// 删除房名
export function getLiveDelete(data) {
  return request({
    url: '/Live_Room/delete',
    method: 'post',
    data
  })
}


// 用户举报信息列表
export function getUserReportList(data) {
  return request({
    url: '/Report/index',
    method: 'post',
    data
  })
}

// 用户举报信息列表 处理举报
export function getUserReportDeal(data) {
  return request({
    url: '/report/deal',
    method: 'post',
    data
  })
}

// 用户举报信息列表 处理忽略
export function getUserReportPass(data) {
  return request({
    url: '/report/pass',
    method: 'post',
    data
  })
}

// 注销管理 未处理
export function getUserCancellationList(data) {
  return request({
    url: '/Cancellation/index',
    method: 'post',
    data
  })
}

// 注销管理 已处理
export function getUserCancellationHasDeal(data) {
  return request({
    url: '/Cancellation/hasDeal',
    method: 'post',
    data
  })
}

// 注销管理 处理 操作
export function getUserCancellationDeal(data) {
  return request({
    url: '/Cancellation/deal',
    method: 'post',
    data
  })
}

// 背景图列表
export function getRoomBgList(data) {
  return request({
    url: '/room/roomBg',
    method: 'post',
    data
  })
}

// 上传背景图
export function getRoomBgAdd(data) {
  return request({
    url: '/room/addRoomBg',
    method: 'post',
    data
  })
}

// 删除房间背景图
export function getRoomBgDel(data) {
  return request({
    url: '/room/deleteBg',
    method: 'post',
    data
  })
}

// 音乐列表 
export function getUserMusicList(data) {
  return request({
    url: '/music/index',
    method: 'post',
    data
  })
}

// 音乐列表 编辑
export function getUserMusicUpdate(data) {
  return request({
    url: '/music/update',
    method: 'post',
    data
  })
}

// 音乐列表  下架
export function getUserMusicBack(data) {
  return request({
    url: '/music/back',
    method: 'post',
    data
  })
}

// 赠送 （平台充值）
export function getUserAddMoney(data) {
  return request({
    url: '/Wallet/addMoney',
    method: 'post',
    data
  })
}

// 赠送列表 (充值记录)
export function getUserPlatformTopUp(data) {
  return request({
    url: '/wallet/platformTopUp',
    method: 'post',
    data
  })
}

// 获取周返点
export function getUserRebateConfig(data) {
  return request({
    url: '/guild/rebateConfig',
    method: 'post',
    data
  })
}

// 配置周返点
export function getUserConfigRebate(data) {
  return request({
    url: '/guild/configRebate',
    method: 'post',
    data
  })
}

// 公会举报处理列表
export function getGuildUserReport(data) {
  return request({
    url: '/guild/guildUserReport',
    method: 'post',
    data
  })
}

// 公会举报 处理
export function getGuildDealReport(data) {
  return request({
    url: '/guild/dealReport',
    method: 'post',
    data
  })
}

// 公会举报 72小时非公会厅收入查询
export function getNotGuildFree(data) {
  return request({
    url: '/guild/getNotGuildFree',
    method: 'post',
    data
  })
}

// 动态管理 
export function getMoments(data) {
  return request({
    url: '/moments/getMoments',
    method: 'post',
    data
  })
}

// 动态管理  下架
export function getMomentsDown(data) {
  return request({
    url: '/moments/setMoments',
    method: 'post',
    data
  })
}


// 获取banner列表 
export function getBanner(data) {
  return request({
    url: '/moments/getBanner',
    method: 'post',
    data
  })
}

// 修改或新增banner 
export function getBannerChange(data) {
  return request({
    url: '/moments/setBanner',
    method: 'post',
    data
  })
}


// 删除banner 
export function getBannerDel(data) {
  return request({
    url: '/moments/delBanner',
    method: 'post',
    data
  })
}


// 获取用户背景图审核列表
export function getUserBgi(data) {
  return request({
    url: '/user/getUserBgi',
    method: 'post',
    data
  })
}

// 处理背景图审核结果
export function getUserBgiAudit(data) {
  return request({
    url: '/user/setUserBgi',
    method: 'post',
    data
  })
}

// 用户交易记录
export function getUserStatistical(data) {
  return request({
    url: '/Statistical/userFlow2',
    method: 'post',
    data
  })
}

// 用户流水记录
export function getUserTurnover(data) {
  return request({
    url: '/Statistical/userFlow1',
    method: 'post',
    data
  })
}

// 余额日志
export function getUserDiamondLog(data) {
  return request({
    url: '/Statistical/diamondLog',
    method: 'post',
    data
  })
}

// 抽奖明细
export function getUserDrawLog(data) {
  return request({
    url: '/Statistical/drawLog',
    method: 'post',
    data
  })
}

