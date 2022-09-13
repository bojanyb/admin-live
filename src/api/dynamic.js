import request from '@/utils/request2'
import api from '@/request/index'

// 动态管理

// 删除动态
export function delMoments(data) {
    return request({
        url: api.dynamic.delMoments,
        method: 'post',
        data
    })
}