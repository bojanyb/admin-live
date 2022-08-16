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