import request from '@/utils/request2'
import api from '@/request/index'

// 封面审核
export function coverCheck(data) {
    return request({
        url: api.risk.coverCheck,
        method: 'post',
        data
    })
}