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

/*******五一劳模**********/
// 获取礼物
export function getLabourGiftList(data) {
  return request({
    url: api.activity.getLabourGiftList,
    method: 'post',
    data
  })
}

/*******跳跳屋**********/
// 获取奖池列表
export function getPoolNameV5(data) {
  return request({
    url: api.activity.getPoolNameV5,
    method: 'post',
    data
  })
}
// 获取抽奖数据
export function poolDetailV5(data) {
  return request({
    url: api.activity.poolDetailV5,
    method: 'post',
    data
  })
}
// 获取轮次
export function getRoundV5(data) {
  return request({
    url: api.activity.getRoundV5,
    method: 'post',
    data
  })
}
// 榜单排名表
export function luckyListV5(data) {
  return request({
    url: api.activity.luckyListV5,
    method: 'post',
    data
  })
}
// 榜单配置
export function luckyConfigV5(data) {
  return request({
    url: api.activity.luckyConfigV5,
    method: 'post',
    data
  })
}
/*******520活动**********/
// 奖池列表
export function getPoolNameV520(data){
  return request({
    url: api.activity.getPoolNameV520,
    method: 'post',
    data
  })
}
// 获取轮次
export function getRoundV520(data){
  return request({
    url : api.activity.getRoundV520,
    method: 'post',
    data
  })
}
// 获取礼物
export function getGiftV520(data) {
  return request({
    url: api.activity.getGiftV520,
    method: 'post',
    data
  })
}
// 获取礼物数据
export function giftLogV520(data) {
  return request({
    url: api.activity.giftLogV520,
    method: 'post',
    data
  })
}
// 手动绑定CP
export function getBindCpV520(data) {
  return request({
    url: api.activity.getBindCpV520,
    method: 'post',
    data
  })
}

// 获取礼物
export function getDragonBoatGift(data) {
  return request({
    url: api.dragonBoat.getGift,
    method: 'post',
    data
  })
}

/*******披萨屋**********/
// 获取礼物
export function getPizzaGift(data) {
  return request({
    url: api.activity.getPizzaGift,
    method: 'post',
    data
  })
}

// 礼物数据
export function getDragonBoatGiftLog(data) {
  return request({
    url: api.dragonBoat.giftLog,
    method: 'post',
    data
  })
}
// 礼物数据
export function getPizzaGiftLog(data) {
  return request({
    url: api.activity.getPizzaGiftLog,
    method: 'post',
    data
  })
}

// 获取兑换数据
export function getDragonBoatExchangeLog(data) {
  return request({
    url: api.dragonBoat.exchangeLog,
    method: 'post',
    data
  })
}
// 获取兑换数据
export function getPizzaExchangeLog(data) {
  return request({
    url: api.activity.getPizzaExchangeLog,
    method: 'post',
    data
  })
}
// 榜单排名
export function getDragonBoatRanking(data) {
  return request({
    url: api.dragonBoat.getRanking,
    method: 'post',
    data
  })
}

/*******月星榜**********/
// 后台-获取轮次
export function getMonthStarRound(data) {
  return request({
    url: api.monthStar.getRound,
    method: 'post',
    data
  })
}
// 后台-获取礼物
export function getMonthStarGift(data) {
  return request({
    url: api.monthStar.getGift,
    method: 'post',
    data
  })
}
// 后台-月度之星活动数据
export function giftMonthStarLog(data) {
  return request({
    url: api.monthStar.giftLog,
    method: 'post',
    data
  })
}
// 后台-房间榜单排名
export function getMonthStarRoomRanking(data) {
  return request({
    url: api.monthStar.getRoomRanking,
    method: 'post',
    data
  })
}
 // 后台-用户榜单排名
export function getMonthStarUserRanking(data) {
  return request({
    url: api.monthStar.getUserRanking,
    method: 'post',
    data
  })
}

/*******夏日音乐节**********/
// 初选用户列表
export function getSummerUserList(data) {
  return request({
    url: api.summerSign.summerUserList,
    method: 'post',
    data
  })
}
// 添加初选用户
export function getSummerAddUser(data) {
  return request({
    url: api.summerSign.getSummerAddUser,
    method: 'post',
    data
  })
}
