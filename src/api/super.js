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
