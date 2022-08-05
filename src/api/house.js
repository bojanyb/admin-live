import request from '@/utils/request2'
import api from '@/request/index'

// 修改派对
export function updateParty(data) {
    return request({
        url: api.house.updateParty,
        method: 'post',
        data
    })
}