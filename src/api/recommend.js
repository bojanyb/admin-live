import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'

// 添加商品
export function save(data) {
    return request({
        url: REQUEST.userHistory.save,
        method: 'post',
        data
    })
}