import request from "@/utils/request2";
import api from "@/request/index";

// 获取支付类型
export function configDW(params) {
  return request({
    url: api.userActivity.dwActivity.configDW,
    method: "post",
    data: params,
  });
}

// 平台活动 - 首充 - 新增
export function addFirstCharge(params) {
  return request({
    url: api.platformActivity.addFirstCharge,
    method: "post",
    data: params,
  });
}

// 用户活动 - 礼物列表
export function getGiftsList(params) {
  return request({
    url: api.userActivity.pkActivity.getPKGifts,
    method: "post",
    data: params,
  });
}

// 用户活动 - 新增PK礼物
export function updatePKGift(params) {
  return request({
    url: api.userActivity.pkActivity.updatePKGift,
    method: "post",
    data: params,
  });
}

// 用户活动 - 编辑PK礼物
export function addPKGift(params) {
  return request({
    url: api.userActivity.pkActivity.addPKGift,
    method: "post",
    data: params,
  });
}
