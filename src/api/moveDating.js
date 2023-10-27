import request from '@/utils/request2'
import api from '@/request/index'

// 心动价格配置
export function getCardConfig(data) {
    return request({
        url: api.move.getCardConfig,
        method: 'post',
        data
    })
}

// 设置心动卡片配置
export function saveCardConfig(data) {
    return request({
        url: api.move.saveCardConfig,
        method: 'post',
        data
    })
}

// 移除心动主播
export function rmHeartAnchor(data) {
    return request({
        url: api.move.rmHeartAnchor,
        method: 'post',
        data
    })
}

// 添加心动主播
export function addHeartAnchor(data) {
    return request({
        url: api.move.addHeartAnchor,
        method: 'post',
        data
    })
}

// 编辑心动主播
export function editHeartAnchor(data) {
    return request({
        url: api.move.editHeartAnchor,
        method: 'post',
        data
    })
}

// 添加/修改音色卡片
export function save(data) {
    return request({
        url: api.move.save,
        method: 'post',
        data
    })
}

// 删除音色卡片
export function deleteParams(data) {
    return request({
        url: api.move.delete,
        method: 'post',
        data
    })
}

// 获取音色分类
export function serachTag(data) {
    return request({
        url: api.move.serachTag,
        method: 'post',
        data
    })
}

// 获取心动分成配置
export function getChatConfig(data) {
    return request({
        url: api.move.getChatConfig,
        method: 'post',
        data
    })
}

// 设置心动分成配置
export function saveChatConfig(data) {
    return request({
        url: api.move.saveChatConfig,
        method: 'post',
        data
    })
}

// ---------------- 新版接口 ------------- //

// 移除心动主播
export function rmHeartAnchorV2(data) {
  return request({
      url: api.move.rmHeartAnchorV2,
      method: 'post',
      data
  })
}

// 添加心动主播
export function addHeartAnchorV2(data) {
  return request({
      url: api.move.addHeartAnchorV2,
      method: 'post',
      data
  })
}

// 编辑心动主播
export function editHeartAnchorV2(data) {
  return request({
      url: api.move.editHeartAnchorV2,
      method: 'post',
      data
  })
}

// 获取音色分类
export function serachTagV2(data) {
  return request({
      url: api.move.serachTagV2,
      method: 'post',
      data
  })
}
