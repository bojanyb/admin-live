import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'

// 新增和修改推广商
export function save(data) {
    return request({
        url: REQUEST.userHistory.save,
        method: 'post',
        data
    })
}

// 供应商获取下级
export function getPromoterSub(data) {
    return request({
        url: REQUEST.userHistory.getPromoterSub,
        method: 'post',
        data
    })
}

// 删除
export function deleteParams(data) {
    return request({
        url: REQUEST.userHistory.delete,
        method: 'post',
        data
    })
}