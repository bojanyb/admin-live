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