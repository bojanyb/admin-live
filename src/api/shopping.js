import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'

// 添加商品
export function add(data) {
    return request({
        url: REQUEST.shopping.add,
        method: 'post',
        data
    })
}

// 下架
export function down(data) {
    return request({
        url: REQUEST.shopping.down,
        method: 'post',
        data
    })
}

// 商品库
export function goodsList(data) {
    return request({
        url: REQUEST.shopping.list,
        method: 'post',
        data
    })
}

// 商品库
export function goodsSend(data) {
    return request({
        url: REQUEST.shopping.send,
        method: 'post',
        data
    })
}
