import request from '@/utils/request3'
import api from '@/request/index'

// 结束直播
export function liveEnd(data) {
    return request({
        url: api.room.liveEnd,
        method: 'post',
        data
    })
}