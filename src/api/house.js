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

// 删除品类名
export function delGenre(data) {
    return request({
        url: api.house.delGenre,
        method: 'post',
        data
    })
}

// 新增品类名
export function saveGenre(data) {
    return request({
        url: api.house.saveGenre,
        method: 'post',
        data
    })
}

// 增加房间热度
export function addRoomHot(data) {
    return request({
        url: api.house.addRoomHot,
        method: 'post',
        data
    })
}

// 房间热度设置
export function roomHotSetting(data) {
    return request({
        url: api.house.roomHotSetting,
        method: 'post',
        data
    })
}

// 删除热度
export function deleteRoomHot(data) {
    return request({
        url: api.house.deleteRoomHot,
        method: 'post',
        data
    })
}