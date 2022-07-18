import request from '@/utils/request2'
import api from '@/request/index'

// 贵族配置 - 保存
export function save(data) {
    return request({
        url: api.nobility.save,
        method: 'post',
        data
    })
}

// 贵族配置 - 详情
export function detail(data) {
    return request({
        url: api.nobility.detail,
        method: 'post',
        data
    })
}

// 贵族价格新增/修改
export function priceSave(data) {
    return request({
        url: api.nobility.priceSave,
        method: 'post',
        data
    })
}
