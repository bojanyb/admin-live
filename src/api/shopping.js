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

