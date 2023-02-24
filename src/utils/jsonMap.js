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
  },
  {
    name: 'scpz',
    min: 1,
    max: 9999999999999999999
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
  // {
  //     value: '',
  //     name: '全部'
  // },
  {
    value: '1',
    name: '已支付'
  },
  {
    value: '4',
    name: '已退款'
  },
  {
    value: '3',
    name: '未支付'
  },
  ]

  // 充值记录 - 已支付 - 退款状态
  const ORDERREFUNDSTATUSLIST = [
  {
    value: 1,
    name: '未退款'
  },
  {
    value: 2,
    name: '已退款'
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
    name: '退回'
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

  const STATUSLISTCOPY = [
  // {
  //     value: '',
  //     name: '全部'
  // },
  {
    value: 4,
    name: '提现完成'
  },
  {
    value: 3,
    name: '提现退回'
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
    name: '苹果商店'
  },
  {
    value: 2,
    name: '微信'
  },
  {
    value: 3,
    name: '支付宝'
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

  // 赠送时长 - 第二版
  const DURATIONCOPY = [
  {
    value: 900,
    name: '15分钟'
  },
  {
    value: 1800,
    name: '30分钟'
  },
  {
    value: 3600,
    name: '60分钟'
  },
  {
    value: 86400,
    name: '1天'
  },
  {
    value: 259200,
    name: '3天'
  },
  {
    value: 604800,
    name: '7天'
  },
  {
    value: 1296000,
    name: '15天'
  },
  {
    value: 2592000,
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
  },
  {
    name: 'AAAA',
    value: 4
  },
  {
    name: 'AAAAA',
    value: 5
  },
  {
    name: 'AAAAAA',
    value: 6
  }
  ]

  // 公会列表 - 公会类型
  const GUILDCONFIGTYPELIST = [
  {
    name: '直播公会',
    value: 1
  },
  {
    name: '派对公会',
    value: 2
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
    name: '待审核',
    value: 0
  },
  {
    name: '审核通过',
    value: 1
  },
  {
    name: '审核拒绝',
    value: 2
  }
  ]

  // 公会管理 - 结算状态
  const SETTLEMENTSTATUS = [
  {
    name: '未结算',
    value: 0
  },
  {
    name: '待结算',
    value: 1
  },
  {
    name: '已结算',
    value: 2
  },
  {
    name: '已忽略',
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
    name: '未审核',
    value: 1
  },
  {
    name: '已联系',
    value: 2
  },
  {
    name: '已拒绝',
    value: 3
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

  // 公会结算列表 - 结算状态
  const GUILDCLOSEANACCOUNTSTATUSLIST = [
  {
    name: '未结算',
    value: 2
  },
  {
    name: '待结算',
    value: 1
  },
  {
    name: '已结算',
    value: 3
  },
  {
    name: '已忽略',
    value: 4
  }
  ]

  // 公会结算列表 - 结算状态
  const GUILDCLOSEANACCOUNTSTATUSLISTCOPY = [
  {
    name: '未结算',
    value: 2
  },
  {
    name: '待结算',
    value: 1
  },
  {
    name: '已结算',
    value: 3
  },
  {
    name: '已忽略',
    value: 4
  }
  ]

  // 公会列表 - 公会运营
  const GUILDOPERATIONLIST = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '赵颖',
        value: 1
    },
    {
        name: '刘建民',
        value: 2
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

  // 直播历史记录 - 关闭房间方式 - 第二种
  const DISSOLUTIONTYPELISTCOPY = [
  {
    value: 1,
    name: '正常关播'
  },
  {
    value: 2,
    name: '后台关播'
  }
  ]

  // 游戏配置 - 游戏列表
  const PARTYGAMELIST = [
  {
    index: 1,
    nickname: 'billiards',
    name: '桌球',
    value: '1582551621189419010',
    feature: '经典美式桌球',
    url: require('@/assets/game/billiards.png')
  },
  {
    index: 2,
    nickname: 'magicDuel',
    name: '魔法大乐斗',
    value: '1585556944972623874',
    feature: '每一回合双方同时通过技能列表选择相应的魔法技能进行对抗',
    url: require('@/assets/game/magicDuel.png')
  },
  {
    index: 3,
    nickname: 'mahjongCrush',
    name: '麻将对对碰',
    value: '1559030313895714818',
    feature: '两人为一队找到一样的麻将时，一起对碰可消除相同麻将获得分数',
    url: require('@/assets/game/mahjongCrush.png')
  },
  {
    index: 4,
    nickname: 'crazyShopping',
    name: '疯狂购物',
    value: '1564814818015264770',
    feature: '各队伍成员对掉落的商品进行抢夺，拉回自己的大本营得分',
    url: require('@/assets/game/crazyShopping.png')
  },
  {
    index: 5,
    nickname: 'scientificCalculator',
    name: '科学计算器',
    value: '1564814666005299201',
    feature: '队伍中的成员需要根据算数的数字要求，分别站立到对应的数字方块上',
    url: require('@/assets/game/scientificCalculator.png')
  },
  {
    index: 6,
    nickname: 'crossTheLine',
    name: '连线激斗',
    value: '1572529757165293569',
    feature: '两人为一队拾取能量棒，避免碰到光线被电击',
    url: require('@/assets/game/crossTheLine.png')
  },

  {
    index: 7,
    nickname: 'bumper',
    name: '碰碰我最强',
    value: '1461227817776713818',
    feature: '多人实时同步对战，3D碰碰车真实物理碰撞表现，击败对方获得体型增幅奖励，个性皮肤表现',
    url: require('@/assets/game/bumper.png')
  },
  {
    index: 8,
    name: '飞行棋',
    nickname: 'ludo',
    value: '1468180338417074177',
    feature: 'LUDO，带快速+经典模式，支持2/4个棋子，选玩3个特色道具（超级骰子、吸铁石、炸弹），带常规的对抗',
    url: require('@/assets/game/ludo.png')
  },
  {
    index: 9,
    name: '扫雷',
    nickname: 'mine',
    value: '1468434401847222273',
    feature: '经典扫雷，多人实时观测',
    url: require('@/assets/game/mine.png')
  },
  {
    index: 10,
    name: '你画我猜',
    nickname: 'drawandguess',
    value: '1461228410184400899',
    feature: '多种色彩、多种粗细、多种橡皮自由发挥，可文字或语音抢答，支持语音击中，可喝彩倒彩互动',
    url: require('@/assets/game/drawandguess.png')
  },
  {
    index: 11,
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
    name: '女',
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

  // 用户列表 - 用户等级
  const USERRANKLIST = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '10-29',
    value: '10~29'
  },
  {
    name: '30以上',
    value: '>=30'
  }
  ]

  // 用户列表 - 魅力等级
  const USERCHARMLIST = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '10-29',
    value: '10~29'
  },
  {
    name: '30以上',
    value: '>=30'
  }
  ]

  // 用户列表 - 注册类型
  const USERREGISTERTYPELIST = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '苹果',
    value: 'apple'
  },
  {
    name: '抖音',
    value: 'dy'
  },
  {
    name: 'QQ',
    value: 'qq'
  },
  {
    name: '微博',
    value: 'weibo'
  },
  {
    name: '微信',
    value: 'wx'
  },
  {
    name: '手机号',
    value: 'phone'
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

  // 实名列表 - 状态
  const USERMANAGEMENTAUTONYMSTATUSLIST = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '待审核',
    value: 'C'
  },
  {
    name: '已通过',
    value: 'Y'
  },
  // {
  //     name: '已拒绝',
  //     value: 'R'
  // }
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
  },
  {
    name: 'MP4',
    value: 3
  }
  ]

  // 礼物列表 - 显示类型
  const GIFTSHOWTYPELIST = [
  {
    name: '显示',
    value: 1
  },
  {
    name: '隐藏',
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

  // banner管理 - banner类型
  const BANNERSYSTEMTYPELIST = [
  {
    name: '朋友圈轮播图',
    value: 1
  }
  ]

  // 公会等级配置管理 - 评级奖励类型
  const GUILDCONFIGURATIONRATETYPELIST = [
  {
    name: '喵粮',
    value: 1
  },
  {
    name: '百分比',
    value: 2
  }
  ]

  // 公会等级配置管理 - 评级奖励类型
  const RENDERGUILDCONFIG = [
  {
    name: '喵粮',
    value: 1
  },
  {
    name: '%',
    value: 2
  }
  ]

  // 公会状态
  const GUILDSTATUS = [
  {
    name: '正常',
    value: 1
  },
  {
    name: '已冻结',
    value: 2
  },
  {
    name: '已解散',
    value: 3
  }
  ]

  // 公会状态
  const GUILDAPPLYTYPE = [
  {
    name: '入会申请',
    value: 0
  },
  {
    name: '退会申请',
    value: 1
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

  // 用户列表 - 是否为贵族
  const ISNOBILITYUSERLIST = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '是',
    value: 1
  },
  {
    name: '否',
    value: 2
  }
  ]

  // 贵族用户列表 - 排序
  const NOBILITYUSERSORTLIST = [
  {
    name: '创建时间倒序',
    value: 'id'
  },
  {
    name: '等级倒序',
    value: 'level'
  }
  ]

  /*
  *财务管理
  */
  // 赠送记录 - 赠送类型
  const FINANCEGIVETYPELIST = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '钻石',
    value: 1
  },
  {
    name: '喵粮',
    value: 2
  }
  ]

  // 支付配置管理 - 支付方式
  const PAYMENTALLOCATIONMANAGEMENTLIST = [
  {
    name: '支付宝支付',
    value: 1
  },
  {
    name: '微信支付',
    value: 2
  }
  ]

  // 支付配置管理 - 支付类型
  const PAYMENTALLOCATIONMANAGEMENTTYPELIST = [
  {
    name: 'jsapi支付',
    value: 0
  },
  {
    name: 'app支付',
    value: 1
  },
  {
    name: 'h5支付',
    value: 2
  }
  ]

  // 支付配置管理 - 支付平台
  const PAYCONFIGURATIONPLATFORMLIST = [
  // {
  //     name: '苹果支付',
  //     value: 1
  // },
  {
    name: '全部',
    value: 0
  },
  {
    name: '微信支付',
    value: 2
  },
  {
    name: '支付宝支付',
    value: 3
  },
  // {
  //     name: '银联支付',
  //     value: 4
  // }
  ]

  // 支付配置管理 - 支付方式
  const PAYCONFIGURATIONPLATFORMTYPELIST = [
  {
    name: '全部',
    value: 0
  },
  {
    name: 'app支付',
    value: 1
  },
  {
    name: 'PC',
    value: 2
  },
  {
    name: 'h5支付',
    value: 3
  },
  {
    name: '公众号',
    value: 4
  },
  {
    name: '小程序',
    value: 5
  }
  ]

  // 商户配置管理 - 支付类型
  const COMMERCIALMANAGEMENTPAYTYPELIST = [
  {
    name: 'h5支付',
    value: 1
  },
  {
    name: 'app支付',
    value: 2
  }
  ]

  // 支付配置管理 - 支付平台
  const DEPOSITCONFIGURATIONPLATFORMLIST = [
  {
    name: '全部',
    value: 0
  },
  {
    name: '支付宝提现',
    value: 3
  }
  ]

  // 充值记录 - 充值类型
  const RECHARGEHISTORYTYPELIST = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '钻石充值',
    value: 1
  },
  {
    name: '贵族充值',
    value: 2
  }
  ]

  /*
  *交易管理
  */
  // 流水记录 - 来源
  const DEALSOURCELIST = [
  {
    id: 0,
    name: '全部'
  },
  {
    id: 1,
    name: '公会房间'
  },
  {
    id: 2,
    name: '个人房间'
  },
  {
    id: 3,
    name: '公会私聊'
  },
  {
    id: 4,
    name: '个人私聊'
  }
  ]

  // 流水记录 - 类型
  const DEALSOURCETYPELIST = [
    {
      name: '全部流水',
      value: 0
    },
    {
      name: '礼物流水',
      value: 2
    },
    {
      name: '宝箱流水',
      value: 3
    },
    {
      name: '背包流水',
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
    name: '待处理',
    value: 0
  },
  {
    name: '已同意',
    value: 1
  },
  {
    name: '已拒绝',
    value: 2
  },
  {
    name: '用户已同意',
    value: 3
  }
  ]

  // 已处理列表 - 状态
  const PROCESSEDSTATUSLIST = [
  {
    value: 1,
    name: '已通过'
  },
  {
    value: 2,
    name: '未通过'
  },
  {
    value: 3,
    name: '已注销'
  }
  ]

  // 举报用户 - 处罚状态
  const REPORTUSERPUNISHSTATUSLIST = [
  {
    name: '待处理',
    value: 1
  },
  {
    name: '已处理',
    value: 2
  },
  {
    name: '已忽略',
    value: 3
  }
  ]

  // 注销状态
  const LOGOUTSTATUS = [
  {
    name: '待处理',
    value: 0
  },
  {
    name: '已同意',
    value: 1
  },
  {
    name: '已拒绝',
    value: 2
  },
  {
    name: '用户已同意',
    value: 3
  }
  ]

  /*
  *房间管理
  */
  // 房间信息管理 - 房间状态
  const HOUSEMESSAGESTATUSLIST = [
  {
    name: '全部',
    value: 2
  },
  {
    name: '开播中',
    value: 1
  },
  {
    name: '已关播',
    value: 0
  }
  ]

  // 房间信息管理 - 热门推荐
  const HOUSEMESSAGEHOTRECOMMENDLIST = [
  {
    name: '全部',
    value: -1
  },
  {
    name: '是',
    value: 1
  },
  {
    name: '否',
    value: 0
  }
  ]

  // 房间信息管理 - 房间类型
  const HOUSEMESSAGETYPELIST = [
  {
    name: '公会房间',
    value: 1
  },
  {
    name: '个人房间',
    value: 0
  }
  ]

  // 房间信息管理 - 房间分类
  const HOUSEMESSAGECLASSIFYLIST = [
  {
    name: '点唱',
    value: 1
  },
  {
    name: '情感',
    value: 2
  }
  ]

  // 房间信息管理 - 房间状态 - 直播间
  const HOUSEMESSAGELIVELIST = [
  {
    name: '开播中',
    value: 1
  },
  {
    name: '已关播',
    value: 0
  }
  ]

  // 房间品类管理 - 业务类型
  const CATEGORYBUSINESSTYPELIST = [
  {
    name: '派对',
    value: 2
  },
  {
    name: '直播',
    value: 1
  }
  ]

  // 进房记录 - 进房类型
  const JOINHOUSETYPELIST = [
  {
    name: '全部',
    value: -1
  },
  {
    name: '未知类型',
    value: 0
  },
  {
    name: '分享进房',
    value: 1
  },
  {
    name: '推荐进房',
    value: 2
  },
  {
    name: '房间列表进房',
    value: 3
  },
  {
    name: '真爱榜进房',
    value: 4
  },
  {
    name: '心动专区进房',
    value: 5
  },
  {
    name: '动态进房',
    value: 6
  },
  {
    name: '动态卡片进房',
    value: 7
  },
  {
    name: '搜索跟随进房',
    value: 8
  },
  {
    name: '搜索进房',
    value: 9
  },
  {
    name: '足迹进房',
    value: 10
  },
  {
    name: '用户主页进房',
    value: 11
  },
  {
    name: '联系人进房',
    value: 12
  },
  {
    name: '首页弹窗进房',
    value: 13
  },
  {
    name: '全服跟随进房',
    value: 14
  }
  ]

  // 进房记录 - 是否首次进房
  const ISFIRSTJOINHOUSELIST = [
  {
    name: '全部',
    value: -1
  },
  {
    name: '是',
    value: 1
  },
  {
    name: '否',
    value: 0
  }
  ]

  // 房间背景图配置列表 - 背景选择
  const ROOMBACKGROUNDSELECTLIST = [
  {
    name: '全部',
    value: 2
  },
  {
    name: '通用背景',
    value: 0
  },
  {
    name: '指定背景',
    value: 1
  }
  ]

  /*
  *风控管理
  */
  // 风控管理 - 风险类型
  const RISKSYSTEMTYPELIST = [
  {
    name: '涉政',
    value: 100
  },
  {
    name: '暴恐',
    value: 110
  },
  {
    name: '国歌',
    value: 120
  },
  {
    name: '色情',
    value: 200
  },
  {
    name: '辱骂',
    value: 210
  },
  {
    name: '娇喘',
    value: 250
  },
  {
    name: '一号领导声纹',
    value: 260
  },
  {
    name: '人声属性',
    value: 270
  },
  {
    name: '违禁歌曲',
    value: 280
  },
  {
    name: '广告',
    value: 300
  }
  ]

  // 风控管理 - 角色
  const RISKSYSTEMROLELIST = [
  {
    name: '普通用户',
    value: 0
  },
  {
    name: '接待管理',
    value: 1
  },
  {
    name: '管理',
    value: 2
  },
  {
    name: '房主',
    value: 3
  }
  ]

  // 封面审核 - 状态
  const SERVICEAUDITSTATUSLIST = [
  {
    value: 1,
    name: '审核通过'
  },
  {
    value: 2,
    name: '审核拒绝'
  },
  {
    value: 0,
    name: '待审核'
  }
  ]

  // 封面审核 - 封面类型
  const SERVICEAUDITTYPELIST = [
  {
    name: '派对封面',
    value: 1
  },
  {
    name: '直播封面',
    value: 2
  }
  ]

  // 用户处罚 - 处罚类型
  const USERPUNISHTYPELIST = [
  {
    name: '封号',
    value: 1
  },
  {
    name: '封设备',
    value: 2
  },
  {
    name: '封IP',
    value: 3
  },
  {
    name: '封实名',
    value: 4
  }
  ]

  // 用户处罚 - 处罚类型 - 列表
  const USERPUNISHTYPELISTCOPY = [
  {
    name: '全部',
    value: ''
  },
  {
    name: '封号',
    value: 1
  },
  {
    name: '封设备',
    value: 2
  },
  {
    name: '封IP',
    value: 3
  },
  {
    name: '封实名',
    value: 4
  }
  ]

  // 用户处罚 - 处罚类型 - 列表
  const USERPUNISHTYPELISTCOPYTWO = [
  {
    name: '禁言',
    value: 5,
    disabled: false
  },
  {
    name: '房间冻结',
    value: 6,
    disabled: false
  },
  {
    name: '封号',
    value: 1,
    disabled: false
  },
  {
    name: '封设备',
    value: 2,
    disabled: false
  },
  {
    name: '封IP',
    value: 3,
    disabled: false
  },
  {
    name: '封实名',
    value: 4,
    disabled: false
  },
  {
    name: '重置昵称',
    value: 11,
    disabled: false
  },
  {
    name: '重置头像',
    value: 12,
    disabled: false
  },
  {
    name: '重置签名',
    value: 13,
    disabled: false
  }
  ]

  // 用户处罚 - 状态
  const USERPUNISHSTATUSLIST = [
  {
    name: '生效中',
    value: 1
  },
  {
    name: '已解除',
    value: 2
  }
  ]

  // 用户处罚 - 状态 - 列表
  const USERPUNISHSTATUSLISTCOPY = [
  {
    name: '全部',
    value: 4
  },
  {
    name: '待处理',
    value: 0
  },
  {
    name: '封禁中',
    value: 1
  },
  {
    name: '已忽略',
    value: 2
  },
  {
    name: '已解除',
    value: 3
  }
  ]

  // 用户处罚 - 处罚时间
  const TIMEPENALTYSTATUS = [
  {
    name: '封号',
    value: 1
  },
  {
    name: '封设备',
    value: 2
  },
  {
    name: '封IP',
    value: 3
  },
  {
    name: '封实名',
    value: 4
  },
  {
    name: '禁言',
    value: 5
  },
  {
    name: '房间冻结',
    value: 6
  },
  ]

  // 用户处罚 - 重置资料
  const USERPUNIRESETLISTCOPY = [
  {
    name: '重置昵称',
    value: 11
  },
  {
    name: '重置头像',
    value: 12
  },
  {
    name: '重置签名',
    value: 13
  }
  ]

  // 消息记录 - 敏感词
  const RISKMANAGEMENTMESSAGEHISTORYLIST = [
  {
    name: '全部',
    value: 2
  },
  {
    name: '命中',
    value: 1
  },
  {
    name: '通过',
    value: 0
  }
  ]

  // 消息记录 - 条数
  const RISKMANAGEMENTMESSAGENUMBERLIST = [
  {
    name: '100',
    value: 100
  },
  {
    name: '1000',
    value: 1000
  },
  {
    name: '5000',
    value: 5000
  },
  {
    name: '10000',
    value: 10000
  },
  {
    name: '50000',
    value: 50000
  },
  {
    name: '100000',
    value: 100000
  }
  ]

  // 图片审核记录 - 图片类型
  const RISKMANAGEMENTIMGTYPELIST = [
  {
    name: '全部',
    value: 4
  },
  {
    name: '用户头像',
    value: 1
  },
  {
    name: '用户相册',
    value: 2
  },
  {
    name: '房间封面',
    value: 3
  }
  ]

  // 图片审核记录 - 审核状态
  const RISKMANAGEMENTIMGSTATUSLIST = [
  {
    name: '全部',
    value: 2
  },
  {
    name: '待审核',
    value: 0
  },
  {
    name: '已通过',
    value: 1
  },
  {
    name: '已拒绝',
    value: -1
  }
  ]

  // 公会举报状态
  const GUILDREPORTSTATUS = [
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

  // 发送类型状态
  const FROMTYPESTATUS = [
  {
    name: '用户发送',
    value: 1
  },
  {
    name: '后台发送',
    value: 2
  },
  {
    name: '后台帮用户发送',
    value: 3
  }
  ]

  // 消息类型
  const MSGTYPE = [
  {
    name: '充值',
    value: 1
  },
  {
    name: '活动',
    value: 2
  },
  ]

  // 用户选择类型
  const USERSLECTTYPE = [
  {
    name: '所有用户',
    value: 1
  },
  {
    name: '指定用户',
    value: 2
  },
  ]

  // 跳转类型
  const PATHTYPE = [
  {
    name: '进房间',
    value: 1
  },
  {
    name: 'URL',
    value: 2
  },
  ]

  // 跳转类型
  const PATHTYPE2 = [
  {
    name: '无',
    value: 0
  },
  {
    name: '进房间',
    value: 2
  },
  {
    name: 'URL',
    value: 3
  },
  ]

  // 靓号类型
  const GOODNUMTYPE = [
  {
    name: '用户靓号',
    value: 0
  },
  {
    name: '房间靓号',
    value: 1
  },
  ]

  // 靓号使用状态
  const GOODNUMSTATUS = [
  {
    name: '未上架',
    value: 1
  },
  {
    name: '上架中',
    value: 2
  },
  {
    name: '已使用',
    value: 3
  },
  ]

  // 靓号商品分类
  const GOODNUMCLASS = [
  {
    name: '全部分类',
    value: 1
  },
  {
    name: '爱情号',
    value: 2
  },
  {
    name: '顺子号',
    value: 3
  },
  {
    name: '对字号',
    value: 4
  },
  {
    name: '叠字号',
    value: 5
  },
  ]

  // 靓号上架状态
  const GOODRACKSTATUS = [
  {
    name: '正常',
    value: 0
  },
  {
    name: '下架',
    value: 1
  }
  ]

  // 靓号上架状态
  const GOODSENDSTATUS = [
  {
    name: '商城购买',
    value: 25
  },
  {
    name: '后台发放',
    value: 27
  }
  ]

  // 显示状态
  const SHOWSTATUS = [
  {
    name: '显示',
    value: 0
  },
  {
    name: '隐藏',
    value: 1
  },
  ]

  // 是否默认选中
  const CHECKEDSTATUS = [
  {
    name: '是',
    value: 1
  },
  {
    name: '否',
    value: 0
  },
  ]

  // 上架状态
  const RACKSATUS = [
  {
    name: '上架中',
    value: 1
  },
  {
    name: '待上架',
    value: 2
  },
  {
    name: '已下架',
    value: 3
  },
  ]

  // 活动状态
  const ACTIVESTATUS = [
  {
    name: '生效中',
    value: 1
  },
  {
    name: '待生效',
    value: 2
  },
  {
    name: '已过期',
    value: 3
  },
  ]
  // 落地类型
  const PUSHTYPESTATUS = [
  {
    name: '打开APP',
    value: 0
  },
  {
    name: '进房间',
    value: 2
  },
  {
    name: 'Url',
    value: 3
  }
  ]

  // 目标类型
  const TARGETTYPESTATUS = [
  {
    name: '注册',
    value: 1
  },
  {
    name: '登录',
    value: 2
  },
  {
    name: '活跃',
    value: 3
  },
  {
    name: '充值',
    value: 4
  },
  {
    name: '宝箱',
    value: 5
  },
  {
    name: '召回',
    value: 6
  },
  {
    name: '自定义',
    value: 7
  }
  ]


  // 目标类型
  const BROADCASTTYPESTATUS = [
  {
    name: '小喇叭',
    value: 1
  },
  {
    name: '大喇叭',
    value: 2
  }
  ]

  // 使用状态
  const USESTATUS = [
  {
    name: '全部 ',
    value: 0
  },
  {
    name: '使用中',
    value: 1
  },
  {
    name: '未使用',
    value: 2
  },
  {
    name: '已过期',
    value: 3
  }
  ]

  // 祈福卡片
  const PRAYCARDS = [
  {
    name: '全部',
    type: ""
  },
  {
    name: '兔',
    type: "1"
  },
  {
    name: '年',
    type: "2"
  },
  {
    name: '大',
    type: "3"
  },
  {
    name: '吉',
    type: "4"
  },
  {
    name: '2023',
    type: "5"
  },
  ]

  // 碎片来源
  const DEBRISS= [
  {
    name: '页面打卡',
    type: 1
  },
  {
    name: '邀请好友',
    type: 2
  },
  {
    name: '充值金额',
    type: 3
  },
  {
    name: '赠送礼物',
    type: 4
  },
  {
    name: '派对房停留',
    type: 5
  },
  {
    name: '开启宝箱',
    type: 6
  },
  {
    name: '聚宝盆',
    type: 7
  },
  {
    name: '桃花签',
    type: 8
  },
  {
    name: '爆竹贺岁',
    type: 9
  },
  {
    name: '吉星高照',
    type: 10
  },
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
  LOGOUTUNTREATEDSTATUSLIST,
  ISNOBILITYUSERLIST,
  PROCESSEDSTATUSLIST,
  SERVICEAUDITSTATUSLIST,
  HOUSEMESSAGESTATUSLIST,
  HOUSEMESSAGETYPELIST,
  CATEGORYBUSINESSTYPELIST,
  GUILDCONFIGTYPELIST,
  HOUSEMESSAGECLASSIFYLIST,
  HOUSEMESSAGELIVELIST,
  BANNERSYSTEMTYPELIST,
  RISKSYSTEMTYPELIST,
  RISKSYSTEMROLELIST,
  SERVICEAUDITTYPELIST,
  USERPUNISHTYPELIST,
  USERPUNISHTYPELISTCOPY,
  USERPUNISHTYPELISTCOPYTWO,
  USERPUNISHSTATUSLIST,
  USERPUNISHSTATUSLISTCOPY,
  GIFTSHOWTYPELIST,
  JOINHOUSETYPELIST,
  ISFIRSTJOINHOUSELIST,
  STATUSLISTCOPY,
  PAYMENTALLOCATIONMANAGEMENTLIST,
  PAYMENTALLOCATIONMANAGEMENTTYPELIST,
  DEALSOURCETYPELIST,
  GUILDCLOSEANACCOUNTSTATUSLIST,
  GUILDCLOSEANACCOUNTSTATUSLISTCOPY,
  GUILDCONFIGURATIONRATETYPELIST,
  RENDERGUILDCONFIG,
  PAYCONFIGURATIONPLATFORMLIST,
  PAYCONFIGURATIONPLATFORMTYPELIST,
  COMMERCIALMANAGEMENTPAYTYPELIST,
  REPORTUSERPUNISHSTATUSLIST,
  NOBILITYUSERSORTLIST,
  RISKMANAGEMENTMESSAGEHISTORYLIST,
  RISKMANAGEMENTIMGTYPELIST,
  RISKMANAGEMENTIMGSTATUSLIST,
  ROOMBACKGROUNDSELECTLIST,
  GUILDOPERATIONLIST,
  RECHARGEHISTORYTYPELIST,
  USERMANAGEMENTAUTONYMSTATUSLIST,
  GUILDSTATUS,
  GUILDAPPLYTYPE,
  SETTLEMENTSTATUS,
  RISKMANAGEMENTMESSAGENUMBERLIST,
  GUILDREPORTSTATUS,
  ORDERREFUNDSTATUSLIST,
  DISSOLUTIONTYPELISTCOPY,
  USERPUNIRESETLISTCOPY,
  USERRANKLIST,
  USERCHARMLIST,
  USERREGISTERTYPELIST,
  DURATIONCOPY,
  HOUSEMESSAGEHOTRECOMMENDLIST,
  FROMTYPESTATUS,
  MSGTYPE,
  USERSLECTTYPE,
  PATHTYPE,
  GOODNUMTYPE,
  GOODNUMSTATUS,
  GOODNUMCLASS,
  GOODRACKSTATUS,
  SHOWSTATUS,
  CHECKEDSTATUS,
  RACKSATUS,
  ACTIVESTATUS,
  PATHTYPE2,
  PUSHTYPESTATUS,
  TARGETTYPESTATUS,
  DEPOSITCONFIGURATIONPLATFORMLIST,
  BROADCASTTYPESTATUS,
  GOODSENDSTATUS,
  TIMEPENALTYSTATUS,
  LOGOUTSTATUS,
  USESTATUS,
  PRAYCARDS,
  DEBRISS
  }
