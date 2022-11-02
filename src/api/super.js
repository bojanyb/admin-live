import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'

// 处理处罚
export function handlePunish(data) {
    return request({
        url: REQUEST.system.super.handlePunish,
        method: 'post',
        data
    })
}

// 设置超管
export function setSuperUser(data) {
    return request({
        url: REQUEST.system.super.setSuperUser,
        method: 'post',
        data
    })
}

// 官方用户-新增
export function add(data) {
    return request({
        url: REQUEST.system.super.add,
        method: 'post',
        data
    })
}

// 官方用户-删除
export function del(data) {
    return request({
        url: REQUEST.system.super.del,
        method: 'post',
        data
    })
}

// 提示语-修改
export function update(data) {
    return request({
        url: REQUEST.system.super.update,
        method: 'post',
        data
    })
}

