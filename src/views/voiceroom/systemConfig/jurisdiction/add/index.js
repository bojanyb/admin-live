const jurisdiction = [
    {
        name: '总览',
        id: 0,
        checked: false
    },
    {
        name: '用户管理',
        id: 1,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 14,
                checked: false,
                id: 1
            },
            {
                name: '房间类型列表',
                pid: 15,
                checked: false,
                id: 1
            },
            {
                name: '房间名称管理',
                pid: 16,
                checked: false,
                id: 1
            },
            {
                name: '派对聊天记录',
                pid: 17,
                checked: false,
                id: 1
            },
            {
                name: '举报记录',
                pid: 18,
                checked: false,
                id: 1
            }
        ]
    },
    {
        name: '派对管理',
        id: 2,
        checked: false,
        children: [
            {
                name: '房间列表',
                pid: 19,
                id: 2
            },
            {
                name: '房间类型列表',
                pid: 19,
                id: 2
            },
            {
                name: '房间名称管理',
                pid: 19,
                id: 2
            }
        ]
    },
    {
        name: '公会管理',
        id: 3,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 3,
                id: 1
            }
        ]
    },
    {
        name: '支付管理',
        id: 4,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 4,
                id: 1
            }
        ]
    },
    {
        name: '交易管理',
        id: 5,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 5,
                id: 1
            }
        ]
    },
    {
        name: '平台活动',
        id: 6,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 6,
                id: 1
            }
        ]
    },
    {
        name: '用户活动',
        id: 7,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 7,
                id: 1
            }
        ]
    },
    {
        name: '举报管理',
        id: 8,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 8,
                id: 1
            }
        ]
    },
    {
        name: '注销管理',
        id: 9,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 9,
                id: 1
            }
        ]
    },
    {
        name: '审核管理',
        id: 10,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 10,
                id: 1
            }
        ]
    },
    {
        name: '推广记录',
        id: 11,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 11,
                id: 1
            }
        ]
    },
    {
        name: '商城管理',
        id: 12,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 12,
                id: 1
            }
        ]
    },
    {
        name: '系统配置',
        id: 13,
        checked: false,
        children: [
            {
                name: '用户列表',
                pid: 13,
                id: 1
            }
        ]
    }
]

export default {
    jurisdiction
}