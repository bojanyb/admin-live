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

// 处罚 -新增
export function addUserPunish(data) {
    return request({
        url: api.risk.addUserPunish,
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
