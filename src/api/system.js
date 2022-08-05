import request from '@/utils/request2'
import api from '@/request/index'

// 删除号码段
export function deleteVirtualPhone(data) {
    return request({
        url: api.system.dummy.deleteVirtualPhone,
        method: 'post',
        data
    })
}

// 添加号码段
export function addVirtualPhoneField(data) {
    return request({
        url: api.system.dummy.addVirtualPhoneField,
        method: 'post',
        data
    })
}

// 添加黑/白名单
export function addPhoneRoll(data) {
    return request({
        url: api.system.dummy.addPhoneRoll,
        method: 'post',
        data
    })
}

// 删除黑/白名单列表
export function deletePhone(data) {
    return request({
        url: api.system.dummy.deletePhone,
        method: 'post',
        data
    })
}