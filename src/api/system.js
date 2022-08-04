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

// 删除号码段
export function addVirtualPhoneField(data) {
    return request({
        url: api.system.dummy.addVirtualPhoneField,
        method: 'post',
        data
    })
}