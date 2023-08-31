import request from '@/utils/request2'
import request1 from '@/utils/request3'
import api from '@/request/index'

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

// 修改密码
export function refresh(data) {
  return request({
    url: '/Login/refresh',
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

// 总览数据
export function overview(data) {
  return request({
    url: '/Statistical/overview',
    method: 'post',
    data
  })
}

// 日终数据
export function overviewDayData(data) {
  return request({
    url: '/Statistical/overviewDayData',
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

// 房间隐藏
export function roomHide(data) {
  return request({
    url: '/room/hide',
    method: 'post',
    data
  })
}

// 房间置顶
export function roomTop(data) {
  return request({
    url: '/room/top',
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

// 新版获取已配置礼物
export function getActivetyHasGiftList(data) {
  return request({
    url: api.platformActivity.getHasAddGift,
    method: 'post',
    data
  })
}

// 老版获取已配置礼物
export function oldGetHasAddGift(data) {
  return request({
    url: api.platformActivity.oldGetHasAddGift,
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

// 处罚举报 - 风险类型
export function getTencentLabel(data) {
  return request({
    url: api.risk.getTencentLabel,
    method: 'post',
    data
  })
}

// 处罚举报 - 复审操作
export function checkAudioStreamDefyList(data) {
  return request({
    url: api.risk.checkAudioStreamDefyList,
    method: 'post',
    data
  })
}

// 处罚举报 - 审核人员
export function getCheckOperator(data) {
  return request({
    url: api.risk.getCheckOperator,
    method: 'post',
    data
  })
}

// 处罚举报 - 处罚类型
export function getPunishTypeList(data) {
  return request({
    url: api.risk.getPunishTypeList,
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

// 注销管理 导出
export function indexV2Export(data) {
  return request({
    url: '/Cancellation/indexV2Export',
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

// 音乐列表  上架
export function putaway(data) {
  return request({
    url: '/music/putaway',
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

// 公会投诉处理（客服）
export function handleUserComplain(data) {
  return request({
    url: '/UserComplaint/handle',
    method: 'post',
    data
  })
}

// 公会投诉类型筛选项（风险客服）
export function getUserComplainOptions(data) {
  return request({
    url: '/UserComplaint/init',
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

// 导出
export function getUserFlowAll(data) {
  return request({
    url: '/Statistical/userFlowAll',
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

// 公会返点列表
export function getGuildWeekList(data) {
  return request({
    url: '/Guild/guildWeekList',
    method: 'post',
    data
  })
}

// 手动周返点
export function getWeekRebate(data) {
  return request({
    url: '/guild/weekRebate',
    method: 'post',
    data
  })
}


// 返点操作日志
export function getSettlementLog(data) {
  return request({
    url: '/Guild/settlementLog',
    method: 'post',
    data
  })
}

// 创建工会审核已联系或者驳回
export function newGuildApplyCheck(data) {
  return request({
    url: api.guild.newGuildApplyCheck,
    method: 'post',
    data
  })
}

// 获取交易类型
export function getRelationType(data) {
  return request({
    url: '/Statistical/getRelationType',
    method: 'post',
    data
  })
}

// 获取交易类型
export function getAdminRelationType(data) {
  return request({
    url: '/Statistical/getAdminRelationType',
    method: 'post',
    data
  })
}

// 获取交易类型
export function getStuck(data) {
  return request({
    url: '/user/getUserCardList',
    method: 'post',
    data
  })
}

// 消息管理 - 活动通知
export function messageAdd(data) {
  return request({
    url: api.message.messageAdd,
    method: 'post',
    data
  })
}

// 消息管理 - 活动通知 - 删除
export function messageDelete(data) {
  return request({
    url: api.message.delete,
    method: 'post',
    data
  })
}

// 消息管理 - push推送 - 增加
export function addPushLog(data) {
  return request({
    url: api.message.addPushLog,
    method: 'post',
    data
  })
}

// 靓号管理 - 靓号仓库 - 删除
export function delPrettyNumber(data) {
  return request({
    url: api.prettyNumber.delPrettyNumber,
    method: 'post',
    data
  })
}

// 靓号管理 - 靓号仓库 - 新增
export function addPrettyNumber(data) {
  return request({
    url: api.prettyNumber.addPrettyNumber,
    method: 'post',
    data
  })
}

// 靓号管理 - 靓号仓库 - 修改
export function updatePrettyNumber(data) {
  return request({
    url: api.prettyNumber.updatePrettyNumber,
    method: 'post',
    data
  })
}

// 靓号管理 - 靓号仓库 - 靓号类型
export function getTypeOption(data) {
  return request({
    url: api.prettyNumber.getTypeOption,
    method: 'post',
    data
  })
}

// 靓号管理 - 商品分类 - 列表
export function prettyNumberType(data) {
  return request({
    url: api.prettyNumber.prettyNumberType,
    method: 'post',
    data
  })
}

// 靓号管理 - 商品分类 - 删除
export function delTypePrettyNumber(data) {
  return request({
    url: api.prettyNumber.delTypePrettyNumber,
    method: 'post',
    data
  })
}

// 靓号管理 - 商品分类 - 新增
export function addTypePrettyNumber(data) {
  return request({
    url: api.prettyNumber.addTypePrettyNumber,
    method: 'post',
    data
  })
}

// 靓号管理 - 商品分类 - 修改
export function updateTypePrettyNumber(data) {
  return request({
    url: api.prettyNumber.updateTypePrettyNumber,
    method: 'post',
    data
  })
}

// 靓号管理 售卖记录 - 赠送
export function givePrettyNumber(data) {
  return request1({
      url: api.prettyNumber.givePrettyNumber,
      method: 'post',
      data
  })
}

// 靓号管理 售卖记录 - 赠送
export function searchPrettyNumber(data) {
  return request({
      url: api.prettyNumber.searchPrettyNumber,
      method: 'post',
      data
  })
}

// 靓号管理 使用记录 - 回收
export function recycle(data) {
  return request({
      url: api.prettyNumber.recycle,
      method: 'post',
      data
  })
}

// 靓号管理 回收记录
export function recycleLog(data) {
  return request({
      url: api.prettyNumber.recycleLog,
      method: 'post',
      data
  })
}

// 靓号管理 退款
export function refund(data) {
  return request({
    url: api.prettyNumber.refund,
    method: 'post',
    data
  })
}


// 靓号管理 使用记录
export function usingLog(data) {
  return request({
      url: api.prettyNumber.usingLog,
      method: 'post',
      data
  })
}
/***********公会v2******************/
// 新增公会
export function getGuildCreateV2(data) {
  return request({
    url: 'guild/createV2',
    method: 'post',
    data
  })
}

// 派对修改公会
export function updatePartyInfo(data) {
  return request({
    url: '/guild/updatePartyInfo',
    method: 'post',
    data
  })
}
// 直播修改公会
export function updateLiveInfo(data) {
  return request({
    url: '/guild/updateLiveInfo',
    method: 'post',
    data
  })
}

// 派对更换会长
export function updatePartyReplace(data) {
  return request({
    url: '/guild/updatePartyReplace',
    method: 'post',
    data
  })
}

// 派对冻结
export function updatePartyFreeze(data) {
  return request({
    url: '/guild/updatePartyFreeze',
    method: 'post',
    data
  })
}

// 派对解散
export function updatePartyDisband(data) {
  return request({
    url: '/guild/updatePartyDisband',
    method: 'post',
    data
  })
}


// 直播更换会长
export function updateLiveReplace(data) {
  return request({
    url: '/guild/updateLiveReplace',
    method: 'post',
    data
  })
}

// 直播冻结
export function updateLiveFreeze(data) {
  return request({
    url: '/guild/updateLiveFreeze',
    method: 'post',
    data
  })
}

// 直播解散
export function updateLiveDisband(data) {
  return request({
    url: '/guild/updateLiveDisband',
    method: 'post',
    data
  })
}

// 审核公会申请
export function guildRoomApplyCheck(data) {
  return request({
    url: api.guild.guildRoomApplyCheck,
    method: 'post',
    data
  })
}

// 配置周返点
export function saveSettlementConfig(data) {
  return request({
    url: api.guild.saveSettlementConfig,
    method: 'post',
    data
  })
}

// 删除周返点配置
export function delSettlementConfig(data) {
  return request({
    url: api.guild.delSettlementConfig,
    method: 'post',
    data
  })
}

// 修改实时返点配置
export function updateGuildRebate(data) {
  return request({
    url: api.guild.updateGuildRebate,
    method: 'post',
    data
  })
}

// 新增实时返点配置
export function addGuildRebate(data) {
  return request({
    url: api.guild.addGuildRebate,
    method: 'post',
    data
  })
}

// 删除实时返点配置
export function delGuildRebate(data) {
  return request({
    url: api.guild.delGuildRebate,
    method: 'post',
    data
  })
}

// 私聊权限
export function changePrivateChat(data) {
  return request({
    url: api.guild.changePrivateChat,
    method: 'post',
    data
  })
}

// 公会批量结算
export function doSettlement(data) {
  return request({
    url: api.guild.doSettlement,
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

// 移除公会房间
export function rmGuildRoom(data) {
  return request({
    url: api.guild.rmGuildRoom,
    method: 'post',
    data
  })
}

// 获取公会类型
export function getGuildType(data) {
  return request({
    url: api.guild.guildType,
    method: 'post',
    data
  })
}

// 房间流水明细
export function roomFlow(data) {
  return request({
    url: api.guild.roomFlow,
    method: 'post',
    data
  })
}

// 保存有效直播奖励
export function effectSave(data) {
  return request({
    url: api.guild.effectSave,
    method: 'post',
    data
  })
}

// 删除有效直播奖励
export function effectDelete(data) {
  return request({
    url: api.guild.effectDelete,
    method: 'post',
    data
  })
}

// 保存有效直播奖励
export function couplingSave(data) {
  return request({
    url: api.guild.couplingSave,
    method: 'post',
    data
  })
}

// 删除有效直播奖励
export function couplingDelete(data) {
  return request({
    url: api.guild.couplingDelete,
    method: 'post',
    data
  })
}

// 公会批量结算
export function settlementLog(data) {
  return request({
    url: api.guild.settlementLog,
    method: 'post',
    data
  })
}

// 公会批量结算
export function guildWeekListV2(data) {
  return request({
    url: api.guild.guildWeekListV2,
    method: 'post',
    data
  })
}

export function getNowRoomOnlineReward(data) {
  return request({
    url: api.guild.getNowRoomOnlineReward,
    method: 'post',
    data
  })
}

// 拍一拍房间次数结算
export function cpSettleLog(data) {
  return request({
    url: api.guild.cpSettleLog,
    method: 'post',
    data
  })
}

export function cpWeekList(data) {
  return request({
    url: api.guild.cpWeekList,
    method: 'post',
    data
  })
}

export function cpWeekRewardList(data) {
  return request({
    url: '/Guild/cpWeekRewardList',
    method: 'post',
    data
  })
}

// 获取公会运营人员选项
export function getGuildManager(data) {
  return request({
    url: api.system.operate.getManager,
    method: 'post',
    data
  })
}

// 保存公会运营人员配置
export function saveGuildManager(data) {
  return request({
    url: api.system.operate.saveManager,
    method: 'post',
    data
  })
}

/***********广播******************/

// 发送广播消息
export function sendBroadcast(data) {
  return request({
    url: api.room.sendBroadcast,
    method: 'post',
    data
  })
}

// 设置广播价格
export function setBroadcastPrice(data) {
  return request({
    url: api.room.setBroadcastPrice,
    method: 'post',
    data
  })
}

// 获取广播价格
export function getBroadcastPrice(data) {
  return request({
    url: api.room.getBroadcastPrice,
    method: 'post',
    data
  })
}

// 新增渠道进房
export function addAutoJoinConfig(data) {
  return request({
    url: api.room.addAutoJoinConfig,
    method: 'post',
    data
  })
}


// 删除渠道进房
export function delAutoJoinConfig(data) {
  return request({
    url: api.room.delAutoJoinConfig,
    method: 'post',
    data
  })
}

// 获取萌新设置参数
export function greetConfig(data) {
  return request({
    url: api.guild.greetConfig,
    method: 'post',
    data
  })
}

// 设置萌新参数
export function greetConfigSave(data) {
  return request({
    url: api.guild.greetConfigSave,
    method: 'post',
    data
  })
}

// 根据房间号获取房间ID
export function checkAutoJoinRule(data) {
  return request({
    url: api.room.checkAutoJoinRule,
    method: 'post',
    data
  })
}

// 添加渠道进房规则
export function addAutoJoinRule(data) {
  return request({
    url: api.room.addAutoJoinRule,
    method: 'post',
    data
  })
}

// 修改渠道进房规则
export function updateAutoJoinRule(data) {
  return request({
    url: api.room.updateAutoJoinRule,
    method: 'post',
    data
  })
}

// 删除渠道进房规则
export function delAutoJoinRule(data) {
  return request({
    url: api.room.delAutoJoinRule,
    method: 'post',
    data
  })
}

// 获取已经配置的房间
export function getHasConfigRoom(data) {
  return request({
    url: api.room.getHasConfigRoom,
    method: 'post',
    data
  })
}

// 新增渠道
export function insertChannels(data) {
  return request({
    url: api.room.insertChannels,
    method: 'post',
    data
  })
}

// 修改渠道
export function updateChannels(data) {
  return request({
    url: api.room.updateChannels,
    method: 'post',
    data
  })
}

// 删除渠道
export function delChannels(data) {
  return request({
    url: api.room.delChannels,
    method: 'post',
    data
  })
}

// 获取渠道
export function getChannels(data) {
  return request({
    url: api.room.getChannels,
    method: 'post',
    data
  })
}

// 更新提现账户
export function updateCashChannel(data) {
  return request({
    url: api.CashHisity.updateCashChannel,
    method: 'post',
    data
  })
}

// 提现账户列表
export function cashChannel(data) {
  return request({
    url: api.CashHisity.cashChannel,
    method: 'post',
    data
  })
}

// 房间类型列表
export function guildRoomType(data) {
  return request({
    url: api.guild.guildRoomType,
    method: 'post',
    data
  })
}

// 有效直播时长
export function effective(data) {
  return request({
    url: api.live.effective,
    method: 'post',
    data
  })
}

// 有效直播时长 -- 保存
export function saveEff(data) {
  return request({
    url: api.live.saveEff,
    method: 'post',
    data
  })
}

// 直播管理 -- 主播数据
export function anchorData(data) {
  return request({
    url: api.live.anchorData,
    method: 'post',
    data
  })
}

// 直播管理 -- 主播数据
export function adminUserList(data) {
  return request({
    url: api.guild.adminUserList,
    method: 'post',
    data
  })
}

// 获取交易管理 -- 流水记录
export function userFlow1Count(data) {
  return request({
    url: api.deal.userFlow1Count,
    method: 'post',
    data
  })
}

// 修改二维码
export function saveWechatCode(data) {
  return request({
    url: api.guild.saveWechatCode,
    method: 'post',
    data
  })
}
