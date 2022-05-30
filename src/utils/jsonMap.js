// 所有的下拉框选择数据

/*
-用户拉新记录页面
*/
// 派对
const USERINVITE = [
    {
        value: 1,
        name: '是'
    },
    {
        value: 0,
        name: '否'
    }
]

// 下载渠道
const DOWNLOADSOURCE = [
    {
        value: 'ios',
        name: 'IOS'
    },
    {
        value: 'android',
        name: '安卓'
    }
]

/*
-礼物库组件 - 指定位置
*/
const LOCATIONLIST = [
    {
        value: 1
    },
    {
        value: 2
    },
    {
        value: 3
    },
    {
        value: 4
    },
    {
        value: 5
    },
    {
        value: 6
    },
    {
        value: 7
    },
    {
        value: 8
    },
    {
        value: 9
    },
    {
        value: 10
    }
]

// 活动类型
const ACTIVITYLIST = [
    {
        name: 'mmly',
        min: 9,
        max: 100000000000000
    },
    {
        name: 'dzp',
        min: 0,
        max: 10
    },
    {
        name: 'zzbx',
        min: 0,
        max: 100000000000000
    }
]

// 礼物类型
const GIFTTYPE = [
    {
        name: '基本礼物',
        value: 1
    },
    {
        name: '抽奖礼物',
        value: 2
    },
    {
        name: '抽奖包裹内礼物',
        value: 3
    },
    {
        name: '普通礼物',
        value: 4
    },
    {
        name: '免费礼物',
        value: 5
    },
    {
        name: '动效礼物',
        value: 6
    },
    {
        name: '全屏礼物',
        value: 7
    },
    {
        name: '活动礼物',
        value: 8
    }
]

/*
*用户余额明细 - 交易类型
*/
const USERBALANCETYPE = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '收入',
        value: 1
    },
    {
        name: '支出',
        value: 2
    }
]

/*
*充值记录 - 排序类型
*/
const SORTLIST = [
    {
        value: 1,
        name: '正序'
    },
    {
        value: 2,
        name: '倒序'
    }
]

/*
*体现记录 - 体现状态
*/
const STATUSLIST = [
    {
        value: 1,
        name: '申请中'
    },
    {
        value: 2,
        name: '提现中'
    },
    {
        value: 3,
        name: '驳回'
    },
    {
        value: 4,
        name: '提现完成'
    },
    {
        value: 5,
        name: '提现失败'
    }
]

const EMBODYSORT = [
    {
        value: 'asc',
        name: '正序'
    },
    {
        value: 'desc',
        name: '倒序'
    }
]

/*
*商城管理 - 商品列表
*/
// 商品类型
const SHOPPING = [
    {
        value: 1,
        name: '头像框'
    },
    {
        value: 2,
        name: '入场横幅'
    },
    {
        value: 3,
        name: '聊天气泡'
    },
    {
        value: 4,
        name: '入场座驾'
    },
    {
        value: 5,
        name: '麦上光圈'
    }
]

// 商品分类
const CLASSIFY = [
    {
        value: 1,
        name: '流行'
    },
    {
        value: 2,
        name: '趣味'
    },
    {
        value: 3,
        name: '活动'
    }
]

// 赠送时长
const DURATION = [
    {
        value: 1,
        name: '1天'
    },
    {
        value: 3,
        name: '3天'
    },
    {
        value: 7,
        name: '7天'
    },
    {
        value: 15,
        name: '15天'
    },
    {
        value: 30,
        name: '30天'
    },
    {
        value: 0,
        name: '永久'
    }
]

/*
*用户活动 - 端午活动统计
*/
// 礼物类型
const GIFTLIST = [
    {
        value: 1,
        name: '粽子'
    },
    {
        value: 2,
        name: '香囊'
    },
    {
        value: 3,
        name: '龙舟'
    }
]

// 查看 - 礼物统计
const GIFTSTATISTICS = [
    {
        value: 1,
        name: '收到最多'
    },
    {
        value: 2,
        name: '送出最多'
    }
]


export default {
    USERINVITE,
    DOWNLOADSOURCE,
    LOCATIONLIST,
    ACTIVITYLIST,
    GIFTTYPE,
    USERBALANCETYPE,
    SORTLIST,
    STATUSLIST,
    EMBODYSORT,
    SHOPPING,
    CLASSIFY,
    GIFTLIST,
    GIFTSTATISTICS,
    DURATION
}
