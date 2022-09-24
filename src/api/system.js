import request from '@/utils/request2'
import request1 from '@/utils/request3'
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

// 生成账号
export function getBanner(data) {
    return request1({
        url: api.system.account.getBanner,
        method: 'post',
        data
    })
}

// 配置周返点
export function configRebate(data) {
    return request({
        url: api.system.guild.configRebate,
        method: 'post',
        data
    })
}

// 删除周返点配置
export function delConfigRebate(data) {
    return request({
        url: api.system.guild.delConfigRebate,
        method: 'post',
        data
    })
}

// 批量结算
export function guildRoomWeekOnline(data) {
    return request({
        url: api.system.guild.guildRoomWeekOnline,
        method: 'post',
        data
    })
}