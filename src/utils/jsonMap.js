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
    },
    {
        name: 'wzbx',
        min: 0,
        max: 100000000000000
    },
    {
        name: 'gzpz',
        min: 1,
        max: 5
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
        value: '',
        name: '全部'
    },
    {
        value: 0,
        name: '正序'
    },
    {
        value: 1,
        name: '倒序'
    }
]

// 订单状态
const ORDERSTATUS = [
    {
        value: '',
        name: '全部'
    },
    {
        value: '3,2',
        name: '未支付'
    },
    {
        value: '1',
        name: '已支付'
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

// 充值记录排序
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

// 充值页面 - 充值类型
const INSTITUTION = [
    {
        value: '',
        name: '全部'
    },
    {
        value: 8,
        name: '汇付支付'
    },
    {
        value: 1,
        name: '苹果支付'
    },
    {
        value: 2,
        name: '财付通'
    },
    {
        value: 3,
        name: '蚂蚁金服'
    },
    // {
    //     value: 4,
    //     name: '银联'
    // },
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
    },
    {
        value: 4,
        name: '贵族'
    },
    {
        value: 5,
        name: '贵族赠送'
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
        value: -1,
        name: '永久'
    }
]

// 优先推荐
const PRIORITYGIVE = [
    {
        name: '是',
        value: 1
    },
    {
        name: '否',
        value: 0
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
        value: 'live_user_id',
        name: '收到最多'
    },
    {
        value: 'user_id',
        name: '送出最多'
    }
]

// 端午活动类型
const DWACTIVITYTYPE = [
    {
        name: '原生',
        value: 1
    },
    {
        name: 'H5',
        value: 2
    }
]

/*
*公会管理 - 公会返佣列表
*/
// 公会等级
const CLASSLIST = [
    {
        name: 'A',
        value: 1
    },
    {
        name: 'AA',
        value: 2
    },
    {
        name: 'AAA',
        value: 3
    }
]

// 公会厅申请列表 - 申请目的
const GUILDAPPLYLIST = [
    {
        name: '全部',
        value: 0
    },
    {
        name: '绑定',
        value: 1
    },
    {
        name: '解绑',
        value: 2
    }
]

// 公会厅申请列表 - 状态
const GUILDSTATUSLIST = [
    {
        name: '全部',
        value: 0
    },
    {
        name: '未处理',
        value: 1
    },
    {
        name: '已通过',
        value: 2
    },
    {
        name: '已拒绝',
        value: 3
    }
]

// 银行信息
const BANKLIST = [
    {
        url: require('@/assets/img/img_01020000.png'),
        code: '01020000',
        name: '工商银行'
    },
    {
        url: require('@/assets/img/img_01030000.png'),
        code: '01030000',
        name: '农业银行'
    },
    {
        url: require('@/assets/img/img_03130011.png'),
        name: '03130011',
        name: '北京银行'
    },
    {
        url: require('@/assets/img/img_03030000.png'),
        code: '03030000',
        name: '光大银行'
    },
    {
        url: require('@/assets/img/img_03060000.png'),
        code: '03060000',
        name: '广发银行'
    },
    {
        url: require('@/assets/img/img_01050000.png'),
        code: '01050000',
        name: '建设银行'
    },
    {
        url: require('@/assets/img/img_03010000.png'),
        code: '03010000',
        name: '交通银行'
    },
    {
        url: require('@/assets/img/img_03050000.png'),
        code: '03050000',
        name: '民生银行'
    },
    {
        url: require('@/assets/img/img_03133201.png'),
        code: '03133201',
        name: '南京银行'
    },
    {
        url: require('@/assets/img/img_03134402.png'),
        code: '03134402',
        name: '平安银行'
    },
    {
        url: require('@/assets/img/img_77777781.png'),
        code: '77777781',
        name: '浦发银行'
    },
    {
        url: require('@/assets/img/img_03130031.png'),
        code: '03130031',
        name: '上海银行'
    },
    {
        url: require('@/assets/img/img_03090000.png'),
        code: '03090000',
        name: '兴业银行'
    },
    {
        url: require('@/assets/img/img_03080000.png'),
        code: '03080000',
        name: '招商银行'
    },
    {
        url: require('@/assets/img/img_01040000.png'),
        code: '01040000',
        name: '中国银行'
    },
    {
        url: require('@/assets/img/img_03020000.png'),
        code: '03020000',
        name: '中信银行'
    },
    {
        url: require('@/assets/img/img_03040000.png'),
        code: '03040000',
        name: '华夏银行'
    },
    {
        url: require('@/assets/img/img_03180000.png'),
        code: '03180000',
        name: '渤海银行'
    },
    {
        url: require('@/assets/img/img_05818200.png'),
        code: '05818200',
        name: '甘肃银行'
    },
    {
        url: require('@/assets/img/img_03133301.png'),
        code: '03133301',
        name: '杭州银行'
    },
    {
        url: require('@/assets/img/img_03160000.png'),
        code: '03160000',
        name: '浙商银行'
    },
    {
        url: require('@/assets/img/img_04478210.png'),
        code: '04478210',
        name: '兰州银行'
    },
    {
        url: require('@/assets/img/img_05847000.png'),
        code: '05847000',
        name: '贵州银行'
    },
    {
        url: require('@/assets/img/img_04030000.png'),
        code: '04030000',
        name: '中国邮政储蓄银行'
    },
    {
        url: require('@/assets/img/img_03150000.png'),
        code: '03150000',
        name: '恒丰银行'
    }
]

// 公会申请列表 - 状态
const GUILDAPPLYSTATUSLIST = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '已联系',
        value: 1
    },
    {
        name: '已拒绝',
        value: 2
    }
]

// 公会申请 - 是否有线下工作室
const GUILDISSTUDIO = [
    {
        name: '是',
        value: 1
    },
    {
        name: '否',
        value: 0
    }
]

/*
*派对管理 - 举报房间
*/
const REPORTSTATUS = [
    {
        name: '未核实',
        value: 1
    },
    {
        name: '核实通过',
        value: 2
    },
    {
        name: '核实不通过',
        value: 3
    }
]

// 直播状态
const ROOMSTATUSLIST = [
    {
        name: '全部',
        value: ''
    },
    // {
    //     name: '未开始',
    //     value: 0
    // },
    {
        name: '直播中',
        value: 1
    },
    {
        name: '已结束',
        value: 2
    }
]

// 状态
const ROOMCARDSTATUSLIST = [
    {
        name: '正常绑定',
        value: 1
    },
    {
        name: '待绑定',
        value: 2
    },
    {
        name: '冻结',
        value: 3
    },
    {
        name: '过期',
        value: 4
    }
]

// 房间类型
const ROOMTYPELIST = [
    {
        value: 0,
        name: '不配置'
    },
    {
        value: 1,
        name: '游戏'
    },
    {
        value: 2,
        name: '点唱'
    },
    {
        value: 3,
        name: '情感'
    }
]

// 封禁 - 状态
const USERSTATUSLISTTWO = [
    {
        name: '正常',
        value: 1
    },
    {
        name: '封禁',
        value: 2
    }
]

// 直播历史记录 - 解散方式
const DISSOLUTIONTYPELIST = [
    {
        value: 0,
        name: '正常解散'
    },
    {
        value: 1,
        name: '强制解散'
    },
    {
        value: 2,
        name: '强制解散'
    }
]

// 游戏配置 - 游戏列表
const PARTYGAMELIST = [
    {
        index: 1,
        nickname: 'bumper',
        name: '碰碰我最强',
        value: '1461227817776713818',
        feature: '多人实时同步对战，3D碰碰车真实物理碰撞表现，击败对方获得体型增幅奖励，个性皮肤表现',
        url: require('@/assets/game/bumper.png')
    },
    {
        index: 2,
        name: '飞行棋',
        nickname: 'ludo',
        value: '1468180338417074177',
        feature: 'LUDO，带快速+经典模式，支持2/4个棋子，选玩3个特色道具（超级骰子、吸铁石、炸弹），带常规的对抗',
        url: require('@/assets/game/ludo.png')
    },
    {
        index: 3,
        name: '扫雷',
        nickname: 'mine',
        value: '1468434401847222273',
        feature: '经典扫雷，多人实时观测',
        url: require('@/assets/game/mine.png')
    },
    {
        index: 4,
        name: '你画我猜',
        nickname: 'drawandguess',
        value: '1461228410184400899',
        feature: '多种色彩、多种粗细、多种橡皮自由发挥，可文字或语音抢答，支持语音击中，可喝彩倒彩互动',
        url: require('@/assets/game/drawandguess.png')
    },
    {
        index: 5,
        name: '五子棋',
        nickname: 'gobang',
        value: '1461297734886621238',
        feature: '经典玩法，双重操作防误操作',
        url: require('@/assets/game/gobang.png')
    }
]

/*
*用户管理 - 用户列表
*/
// 性别
const SEXLIST = [
    {
        name: '男',
        value: 1
    },
    {
        name: '女',
        value: 2
    },
    {
        name: '未知',
        value: 3
    }
]

// 状态
const USERSTATUSLIST = [
    {
        name: '正常',
        value: 1
    },
    {
        name: '封禁',
        value: 3
    }
]

// 用户音乐上传列表 - 筛选查看
const USERMUSICUPLIST = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '未处理',
        value: 1
    },
    {
        name: '已下架',
        value: 2
    }
]

// 用户音乐上传列表 - 语种
const USERLANGUAGELIST = [
    {
        name: '华语'
    },
    {
        name: '粤语'
    },
    {
        name: '方言'
    },
    {
        name: '英语'
    },
    {
        name: '日语'
    },
    {
        name: '韩语'
    },
    {
        name: '俄语'
    },
    {
        name: '法语'
    }
]

// 用户音乐上传列表 - 曲风
const USERMUSICSTYLELIST = [
    {
        name: '流行'
    },
    {
        name: '抖音热门'
    },
    {
        name: '古风'
    },
    {
        name: '摇滚'
    },
    {
        name: 'DJ'
    },
    {
        name: '合唱'
    },
    {
        name: '民谣'
    },
    {
        name: '儿歌'
    },
    {
        name: '纯音乐'
    },
    {
        name: '说唱'
    },
    {
        name: 'R&B'
    },
    {
        name: '动漫/游戏'
    },
    {
        name: '影视'
    }
]

// 用户音乐上传列表 - 年代
const USERMUSICAGELIST = [
    {
        name: '经典老歌'
    },
    {
        name: '欧美经典'
    },
    {
        name: '儿歌'
    }
]

// 用户音乐上传列表 - 铃声
const USERMUSICBELLSLIST = [
    {
        name: 'DJ铃声'
    },
    {
        name: '网络铃声'
    },
    {
        name: '搞笑铃声'
    },
    {
        name: '个性铃声'
    },
    {
        name: '动漫铃声'
    },
    {
        name: '游戏铃声'
    },
    {
        name: '可爱铃声'
    },
    {
        name: '影视广告铃声'
    }
]

/*
*审核管理 - 用户图片资料审核列表
*/
// 状态
const AUDITSTATUSLIST = [
    {
        name: '已通过',
        value: 1
    },
    {
        name: '已驳回',
        value: 2
    }
]

// 状态 - 仅用于审核管理 - 房间举报记录
const AUDITSTATUSLISTTWO = [
    {
        name: '已封禁',
        value: 2
    },
    {
        name: '已驳回',
        value: 3
    }
]

/*
*系统配置 - 权限管理
*/
// 状态
const SYSTEMSTATUSLIST = [
    {
        name: '正常',
        value: 1
    },
    {
        name: '关闭',
        value: 2
    }
]

// 礼物类型
const SYSTEMGIFTLIST = [
    {
        name: '普通礼物',
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
    }
]

// 礼物分类
const SYSTEMGIFTCLASSIFYLIST = [
    {
        name: '礼物栏',
        value: 1
    },
    {
        name: '宝箱专属',
        value: 2
    },
    {
        name: '喵喵乐园专属',
        value: 4
    },
    {
        name: '幸运转盘专属',
        value: 8
    },
    {
        name: '贵族专属',
        value: 16
    }
]

// 播放类型
const SYSTEMGIFTPLAYTYPELIST = [
    {
        name: 'Lottie',
        value: 1
    },
    {
        name: 'SVGA',
        value: 2
    }
]

// 超管管理 - 状态
const SUPERSTATUSLIST = [
    {
        name: '待处理',
        value: 0
    },
    {
        name: '已处理',
        value: 1
    },
    {
        name: '已驳回',
        value: 2
    }
]

// 菜单管理 - 状态
const MENUSTATUSLIST = [
    {
        name: '正常',
        value: 1
    },
    {
        name: '停用',
        value: 0
    }
]

// 礼物库 - 礼物状态
const LIBRARYGIFTSLIST = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '正常',
        value: 1
    },
    {
        name: '废除',
        value: 2
    }
]

/*
*封禁记录 - 用户封禁记录
*/
// 状态
const USERBLOCKEDSTATUSLIST = [
    {
        value: 0,
        name: '封禁中'
    },
    {
        value: 1,
        name: '已结束'
    },
    {
        value: 2,
        name: '提前解封'
    }
]

/*
*贵族管理 - 贵族特权设置
*/
// 拥有特权
const NOBILITYPRIVILEGELIST = [
    {
        name: '贵族勋章',
        value: 1
    },
    {
        name: '入场特效',
        value: 2
    },
    {
        name: '入场横幅',
        value: 3
    },
    {
        name: '个性名片',
        value: 4
    },
    {
        name: '专属礼物',
        value: 5
    },
    {
        name: '贵族装扮',
        value: 6
    },
    {
        name: '贵族专属客服',
        value: 7
    },
    {
        name: '送礼特效',
        value: 8
    },
    {
        name: '入场座驾',
        value: 9
    },
    {
        name: '防骚扰',
        value: 10
    },
    {
        name: '状态隐身',
        value: 11
    },
    {
        name: '进房隐身',
        value: 12
    },
    {
        name: '榜单隐身',
        value: 13
    },
    {
        name: '防禁言',
        value: 14
    },
    {
        name: '防被踢',
        value: 15
    },
]

// 贵族等级
const NOBILITYCLASSLIST = [
    {
        name: '游侠',
        value: 1
    },
    {
        name: '骑士',
        value: 2
    },
    {
        name: '子爵',
        value: 3
    },
    {
        name: '伯爵',
        value: 4
    },
    {
        name: '公爵',
        value: 5
    },
    {
        name: '亲王',
        value: 6
    },
    {
        name: '国王',
        value: 7
    },
    {
        name: '皇帝',
        value: 8
    },
    {
        name: '神',
        value: 9
    }
]

/*
*财务管理
*/
// 赠送记录 - 赠送类型
const FINANCEGIVETYPELIST = [
    {
        name: '钻石',
        value: 1
    },
    {
        name: '喵粮',
        value: 2
    }
]

/*
*交易管理
*/
// 流水记录 - 来源
const DEALSOURCELIST = [
    {
        name: '派对',
        value: 0
    },
    {
        name: '私聊',
        value: 1
    }
]

/*
*推广管理
*/
// 推广列表 - 推荐类型
const PROMOTIONTYPELIST = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '主播',
        value: 1
    },
    {
        name: '用户',
        value: 2
    }
]

/*
*举报管理
*/
// 举报用户 - 被举报状态
const REPORTSTATUSLIST = [
    {
        name: '正常',
        value: 1
    },
    {
        name: '封禁',
        value: 2
    },
    {
        name: '注销',
        value: 3
    },
]

/*
*注销管理
*/
// 未处理 - 排序
const LOGOUTUNTREATEDSORTLIST = [
    {
        name: '时间正序',
        value: 0
    },
    {
        name: '时间倒序',
        value: 1
    }
]

// 未处理 - 状态
const LOGOUTUNTREATEDSTATUSLIST = [
    {
        name: '未处理',
        value: 0
    },
    {
        name: '已处理',
        value: 1
    },
    {
        name: '拒绝',
        value: 3
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
    DURATION,
    CLASSLIST,
    DWACTIVITYTYPE,
    BANKLIST,
    INSTITUTION,
    ORDERSTATUS,
    PRIORITYGIVE,
    REPORTSTATUS,
    SEXLIST,
    USERSTATUSLIST,
    AUDITSTATUSLIST,
    SYSTEMSTATUSLIST,
    ROOMSTATUSLIST,
    ROOMCARDSTATUSLIST,
    SUPERSTATUSLIST,
    ROOMTYPELIST,
    MENUSTATUSLIST,
    PARTYGAMELIST,
    DISSOLUTIONTYPELIST,
    USERBLOCKEDSTATUSLIST,
    NOBILITYPRIVILEGELIST,
    USERSTATUSLISTTWO,
    AUDITSTATUSLISTTWO,
    LIBRARYGIFTSLIST,
    SYSTEMGIFTLIST,
    SYSTEMGIFTPLAYTYPELIST,
    SYSTEMGIFTCLASSIFYLIST,
    NOBILITYCLASSLIST,
    USERMUSICUPLIST,
    USERLANGUAGELIST,
    USERMUSICSTYLELIST,
    USERMUSICAGELIST,
    USERMUSICBELLSLIST,
    GUILDAPPLYLIST,
    GUILDSTATUSLIST,
    FINANCEGIVETYPELIST,
    DEALSOURCELIST,
    GUILDAPPLYSTATUSLIST,
    PROMOTIONTYPELIST,
    GUILDISSTUDIO,
    REPORTSTATUSLIST,
    LOGOUTUNTREATEDSORTLIST,
    LOGOUTUNTREATEDSTATUSLIST
}
