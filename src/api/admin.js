import request from '@/utils/request2'
import api from '@/request/index'

// 菜单列表
export function getMenuPermissions(data) {
    return request({
        url: api.system.getMenuPermissions,
        method: 'post',
        data
    })
}

// 增加管理员
export function addUser(data) {
    return request({
        url: api.system.addUser,
        method: 'post',
        data
    })
}

// 获取所有权限
export function getAllPermission(data) {
    return request({
        url: api.system.getAllPermission,
        method: 'post',
        data
    })
}

// 管理员权限编辑页
export function editAdmin(data) {
    return request({
        url: api.system.editAdmin,
        method: 'post',
        data
    })
}

// 管理员信息修改
export function edit(data) {
    return request({
        url: api.system.edit,
        method: 'post',
        data
    })
}

// 查看管理员信息
export function view(data) {
    return request({
        url: api.system.view,
        method: 'post',
        data
    })
}

// 删除用户
export function deleteAdmin(data) {
    return request({
        url: api.system.deleteAdmin,
        method: 'post',
        data
    })
}

// 开关用户
export function adminStatus(data) {
    return request({
        url: api.system.adminStatus,
        method: 'post',
        data
    })
}
