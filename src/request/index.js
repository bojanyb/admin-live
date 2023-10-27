const request = {
    // 支付管理API
    pay: {
        operateHistory: `${HTTPHEADER}/payconfig/getPayOptLog`, // 操作记录
        getConfigType: `${HTTPHEADER}/payconfig/getConfigType`, // 获取支付渠道
        getChannelTypeList: `${HTTPHEADER}/Payconfig/getChannelTypeList`, // 获取支付配置
        setConfigType: `${HTTPHEADER}/payconfig/setConfigType`, // 设置支付渠道
        editChannelType: `${HTTPHEADER}/Payconfig/editChannelType`, // 设置支付渠道
        getAdaPayConfig: `${HTTPHEADER}/payconfig/getAdaPayConfig`, // 获取支付渠道
        setAdaPayConfig: `${HTTPHEADER}/payconfig/setAdaPayConfig`, // 设置支付渠道
        getWxPay: `${HTTPHEADER}/payconfig/getWxPay`, // 设置支付渠道
        setWxpay: `${HTTPHEADER}/payconfig/setWxpay`, // 设置支付渠道

        payList: `${HTTPHEADER}/pay_manage/payList`, // 获取支付渠道
        payChannelWaySave: `${HTTPHEADER}/pay_manage/usePayChannel`, // 启用支付渠道
        index: `${HTTPHEADER}/PayManage/index`, // 获取商户和提现列表
        create: `${HTTPHEADER}/PayManage/create`, // 添加提现商户
        uploadFile: `${HTTPHEADER}/PayManage/uploadFile`, // 上传支付宝证书
        useCash: `${HTTPHEADER}/PayManage/useCash`, // 使用提现
    },

    // 平台活动
    platformActivity: {
        Activityins: `${HTTPHEADER}/Activityins/index`, // 幸运转盘设置
        configMMLY: `${HTTPHEADER}/activityins/configMMLY`, // 配置喵喵乐园
        configXYZP: `${HTTPHEADER}/activityins/configXYZP`, // 配置大转盘
        getHasAddGift: `${HTTPHEADER}/Activityins/getHasAddGift`, // 获取已配置礼物
        oldGetHasAddGift: `${HTTPHEADER}/Activity/getHasAddGift`, // 新版获取已配置礼物
        drawFlow: `${HTTPHEADER}/activityins/drawFlow`, // 乐园记录
        drawRecord: `${HTTPHEADER}/activityins/drawRecord`, // 统计
        stop: `${HTTPHEADER}/Activityins/stop`, // 停止和开启
        addFirstCharge: `${HTTPHEADER}/activityins/addFirstCharge`, // 配置首充活动
        chargeLog: `${HTTPHEADER}/activityins/chargeLog`, // 首充用户列表
    },

    // 系统设置
    system: {
        Appversion: `${HTTPHEADER}/Appversion`, // 版本列表
        AppversionAChange: `${HTTPHEADER}/appversion/add`, // 新增或者修改
        AppversionDel: `${HTTPHEADER}/appversion/del`, // 删除
        changeStatus: `${HTTPHEADER}/Appversion/changeStatus`, // 启用或者停止
        getMenuPermissions: `${HTTPHEADER}/admin/getMenuPermissions`, // 菜单列表
        getAllPermission: `${HTTPHEADER}/admin/getAllPermission`, // 获取所有节点
        adminMenu: `${HTTPHEADER}/admin/index`, // 管理员列表
        addUser: `${HTTPHEADER}/admin/addUser`, // 增加管理员
        editAdmin: `${HTTPHEADER}/admin/editIndex`, // 管理员权限编辑页
        edit: `${HTTPHEADER}/admin/edit`, // 管理员信息修改
        view: `${HTTPHEADER}/admin/view`, // 查看管理员信息
        deleteAdmin: `${HTTPHEADER}/admin/delete`, // 删除用户
        adminStatus: `${HTTPHEADER}/admin/adminStatus`, // 开关用户
        sysList: `${HTTPHEADER}/NoticeLog/sysList`, // 系统消息 列表
        addSysNotice: `${HTTPHEADER}/NoticeLog/addSysNotice`, // 系统消息 新增
        officialList: `${HTTPHEADER}/NoticeLog/officialList`, // 官方消息 列表
        addOfficialNotice: `${HTTPHEADER}/NoticeLog/addOfficialNotice`, // 官方消息 新增
        Apprule: `${HTTPHEADER}/Apprule/index`, // 版本审核开关列表
        AppruleDel: `${HTTPHEADER}/apprule/delete`, // 版本审核删除
        AppruleAdd: `${HTTPHEADER}/apprule/add`, // 版本审核添加
        AppruleUpdate: `${HTTPHEADER}/apprule/update`, // 版本审核修改
        getChannels : `${HTTPHEADER}/index/getChannels`, // 获取渠道
        getSwitchValue : `${HTTPHEADER}/Apprule/getSwitchValue`, // 功能开关列表
        super: {
            punishHistory: `${HTTPHEADER}/Room/punishHistory`, // 处理处罚历史
            handlePunish: `${HTTPHEADER}/Room/handlePunish`, // 处理处罚
            punishLog: `${HTTPHEADER}/Room/punishLog`, // 待处理处罚
            superUserList: `${HTTPHEADER}/User/superUserList`, // 超管列表
            setSuperUser: `${HTTPHEADER}/User/setSuperUser`, // 设置超管
            officialAccount: `${HTTPHEADER}/OfficialAccount`, // 官方用户-列表
            add: `${HTTPHEADER}/OfficialAccount/add`, // 官方用户-新增
            del: `${HTTPHEADER}/OfficialAccount/del`, // 官方用户-删除
            superMsg: `${HTTPHEADER}/SuperMsg`, // 提示语-列表
            addSuperMsg: `${HTTPHEADER}/SuperMsg/add`, // 提示语-新增
            updateSuperMsg: `${HTTPHEADER}/SuperMsg/update`, // 提示语-修改
            delSuperMsg: `${HTTPHEADER}/SuperMsg/del`, // 提示语-删除
        },
        menu: {
            addRule: `${HTTPHEADER}/admin/addRule`, // 添加菜单
            editRule: `${HTTPHEADER}/admin/editRule`, // 编辑菜单
        },
        gift: {
            giftList: `${HTTPHEADER}/Gift`, // 礼物列表
        },
        dummy: {
            virtualPhoneList: `${HTTPHEADER}/VirtualPhone/virtualPhoneList`, // 号段列表
            deleteVirtualPhone: `${HTTPHEADER}/VirtualPhone/deleteVirtualPhone`, // 删除号码段
            addVirtualPhoneField: `${HTTPHEADER}/VirtualPhone/addVirtualPhoneField`, // 添加号码段
            addPhoneRoll: `${HTTPHEADER}/VirtualPhone/addPhoneRoll`, // 添加黑/白名单
            phoneList: `${HTTPHEADER}/VirtualPhone/phoneList`, // 黑/白名单列表
            deletePhone: `${HTTPHEADER}/VirtualPhone/deletePhone`, // 删除黑/白名单列表
        },
        riches: {
            userRank: `${HTTPHEADER}/User/userRank`, // 用户等级
        },
        gits: {
            liveRank: `${HTTPHEADER}/User/liveRank`, // 直播头衔列表
        },
        message: {
            index: `${HTTPHEADER}/designate/index`, // 待发消息
        },
        banner: {
            getBanner: `${HTTPHEADER}/moments/getBanner`, // 获取banner列表
        },
        account: {
            getBanner: `${HTTPHEADER}/User/createAccount`, // 生成账号
        },
        guild: {
            rebateConfig: `${HTTPHEADER}/guild/rebateConfig`, // 获取周返点
            configRebate: `${HTTPHEADER}/guild/configRebate`, // 配置周返点
            delConfigRebate: `${HTTPHEADER}/guild/delConfigRebate`, // 删除周返点配置
            getRoomOnlineRewardLog: `${HTTPHEADER}/guild/getRoomOnlineRewardLog`, // 未结算
            getNowRoomOnlineReward: `${HTTPHEADER}/guild/getNowRoomOnlineReward`, // 未到结算时间
            guildRoomWeekOnline: `${HTTPHEADER}/guild/guildRoomWeekOnline`, // 批量结算


            statisticsroomS: `${HTTPHEADER}/guild/statisticsroomS`, // 统计24小时房间列表
        },
        operate: {
            getManagerList: `${HTTPHEADER}/Guild/getManagerList`, // 公会运营列表
            getManager: `${HTTPHEADER}/Guild/getManager`, // 公会运营人员选项
            saveManager: `${HTTPHEADER}/Guild/saveManager`, // 保存公会运营人员配置
        },
        tabbar: {
            getConfigList: `${HTTPHEADER}/App`, // 获取tabbar图标配置列表
            updateStatus: `${HTTPHEADER}/App/update`, // 更新tabbar配置状态
            updateConfig: `${HTTPHEADER}/App/updateData`, // 更新tabbar图标配置数据
        }
    },

    // 用户活动
    userActivity: {
        zzbxActivity: { // 转转宝箱
            list: `${HTTPHEADER}/Activity/aclist`,
            history: `${HTTPHEADER}/Activity/drawLog`,
            detail: `${HTTPHEADER}Statistical/drawLog`
        },
        dwActivity: {
            list: `${HTTPHEADER}/Activity/aclist`,
            configDW: `${HTTPHEADER}/Activityins/configDW`,
            dragonBoatFestival: `${HTTPHEADER}/Statistical/dragonBoatFestival`,
        }
    },

    // 用户拉新记录
    userHistory: {
        history: `${HTTPHEADER}/Statistical/userInvite`, // 拉新记录
        recommender: `${HTTPHEADER}/Statistical/recommender`, // 用户邀请统计2
        recommendDetail: `${HTTPHEADER}/Statistical/recommendDetail`, // 邀请用户充值详情胡总和用户收到猫粮
        index: `${HTTPHEADER}/Promoter/index`, // 推广商列表
        save: `${HTTPHEADER}/Promoter/save`, // 新增和修改推广商
        delete: `${HTTPHEADER}/Promoter/delete`, // 删除
        getPromoterSub: `${HTTPHEADER}/Promoter/getPromoterSub`, // 供应商获取下级
        replenishment: `${HTTPHEADER}/Promoter/replenishment`, // 补单列表
        regPeplenishment: `${HTTPHEADER}/Promoter/regReplenishment`, // 推广补单
        replenishmentDel: `${HTTPHEADER}/Promoter/replenishmentDel`, // 删除补单
        NewUserStat: `${HTTPHEADER}/NewUserStat/list`, // 新人广场
        setBindStatus: `${HTTPHEADER}/Promoter/setBindStatus`, // 解绑/绑定
        unbindStatistical: `${HTTPHEADER}/Statistical/unbinding`, // 推广记录解绑
    },

    // 充值记录
    diamondRecharge: {
        list: `${HTTPHEADER}/Recharge/diamondRecharge`, // 充值记录
        diamondRechargeTotal: `${HTTPHEADER}/Recharge/diamondRechargeTotal`, // 充值记录顶部
        fetchMerchantList: `${HTTPHEADER}/Recharge/getAllMerchantList`, // 获取全部商户配置
        exportTask: `${HTTPHEADER}/Recharge/getExportTask`, // 文件查询
        getQueryPayTask: `${HTTPHEADER}/Recharge/getQueryPayTask`, // 文件查询
        getQueryPayDetails: `${HTTPHEADER}/Recharge/getQueryPayDetails`, // 文件查询
    },

    // 体现记录
    CashHisity: {
        list: `${HTTPHEADER}/cash/getcashHisity`,
        apply: `${HTTPHEADER}/cash/getCash`,
        doCash: `${HTTPHEADER}/cash/doCash2`,
        diamondRecharge: `${HTTPHEADER}/Recharge/diamondRecharge`,
        cashChannel: `${HTTPHEADER}/cash/getCashChannel`, // 获取提现通道
        cashAccount: `${HTTPHEADER}/cash/getCashAccount`,  // 获取提现账户
        updateCashChannel: `${HTTPHEADER}/cash/updateCashChannel`,  // 更新提现账户
        batchCash: `${HTTPHEADER}/cash/batchCash`,  // 批量提现
    },

    // 商城管理
    shopping: {
        list: `${HTTPHEADER}/goods`,
        add: `${HTTPHEADER}/goods/save`,
        down: `${HTTPHEADER}/goods/down`,
        send: `${HTTPHEADER}/goods/send`,
        sendlog: `${HTTPHEADER}/goods/sendlog`,
    },

    // 派对管理
    room: {
        report: `${HTTPHEADER}/Room/feedback`,
        roomList: `${HTTPHEADER}/Room/room`,
        liveList: `${HTTPHEADER}/RoomV2/liveList`, // 直播房间-列表
        liveHistoryList: `${HTTPHEADER}/RoomV2/liveHistoryList`, // 直播房间-历史列表
        roomBg: `${HTTPHEADER}/room/roomBg`,
        liveRoomHistory: `${HTTPHEADER}/Room/liveRoomHistory`,
        roomGameList: `${HTTPHEADER}/Room/roomGameList`, // 房间游戏列表
        // liveEnd: `${HTTPHEADER}/Room/liveEnd`, // 关闭房间
        liveEnd: `${HTTPHEADER}/v2/room/closeRoom`, // 关闭房间
        genre: `${HTTPHEADER}/Room/genre`, // 房间类型列表
        broadcastList: `${HTTPHEADER}/broadcast/index`, // 房间广播列表
        sendBroadcast: `${HTTPHEADER}/Broadcast/send`, // 发送广播
        setBroadcastPrice: `${HTTPHEADER}/System/setKV`, // 设置广播价格
        getBroadcastPrice: `${HTTPHEADER}/System/getKV`, // 获取广播价格
        getAutoJoinConfig: `${HTTPHEADER}/AutoJoinConfig`, // 渠道进房列表
        addAutoJoinConfig: `${HTTPHEADER}/AutoJoinConfig/add`, // 新增渠道进房
        delAutoJoinConfig: `${HTTPHEADER}/AutoJoinConfig/del`, // 新增渠道进房
        getAutoJoinRule: `${HTTPHEADER}/AutoJoinRule`, // 渠道进房规则列表
        checkAutoJoinRule: `${HTTPHEADER}/AutoJoinRule/checkRoom`, // 根据房间号获取房间ID
        addAutoJoinRule: `${HTTPHEADER}/AutoJoinRule/addRule`, // 添加渠道进房规则
        updateAutoJoinRule: `${HTTPHEADER}/AutoJoinRule/updateRule`, // 修改渠道进房规则
        delAutoJoinRule: `${HTTPHEADER}/AutoJoinRule/delRule`, // 删除渠道进房规则
        getHasConfigRoom: `${HTTPHEADER}/AutoJoinRule/getHasConfigRoom`, // 获取已经配置的房间
        getChannels: `${HTTPHEADER}/AutoJoinRule/getChannels`, // 渠道设置列表
        insertChannels: `${HTTPHEADER}/AutoJoinRule/insertChannels`, // 新增渠道
        updateChannels: `${HTTPHEADER}/AutoJoinRule/updateChannels`, // 修改渠道
        delChannels: `${HTTPHEADER}/AutoJoinRule/delChannels`, // 删除渠道
    },

    // 用户管理
    user: {
        list: `${HTTPHEADER}/User/getUserInfo`,
        defaultFace: `${HTTPHEADER}/user/defaultFace`,
        autonymlist: `${HTTPHEADER}/Verify/list`,
        getVerifyOptions: `${HTTPHEADER}/Verify/options`, // 获取实名列表筛选项
        riskList: `${HTTPHEADER}/Verify/rbiList`, // 风险列表
        edit: `${HTTPHEADER}/User/userEdit`, // 编辑用户
        userSave: `${HTTPHEADER}/User/userSave`, // 用户封禁/启用
        musicList: `${HTTPHEADER}/music/index`, // 音乐列表
        check: `${HTTPHEADER}/Verify/check`, // 审核更换实名
        punishStatus: `${HTTPHEADER}/userPunish/punishStatus`, // 用户状态
        updateLoginPwd: `${HTTPHEADER}/User/updateLoginPwd`, // 更改登录密码
        addRichUser: `${HTTPHEADER}/User/addRichUser`, // 添加财富用户
        supperUList: `${HTTPHEADER}/user/supperU`, // 添加财富用户
        userGiftBag: `${HTTPHEADER}/user/userGiftBag`, // 用户礼物
        userGoods: `${HTTPHEADER}/user/userGoods`, // 用户特效
        loginLog: `${HTTPHEADER}/user/loginLog`, // 用户登录日志
        newList: `${HTTPHEADER}/user/registerUser`, // 新进用户数据
        registerUserExport: `${HTTPHEADER}/user/registerUserExport`, // 用户导出
        getExportTask: `${HTTPHEADER}/Recharge/getExportTask`, // 用户导出列表
    },

    // 审核管理
    audit: {
        list: `${HTTPHEADER}/user/getUserBgi`,
        toAuditList: `${HTTPHEADER}/User/toAuditList`, // 待审核列表
        auditedList: `${HTTPHEADER}/User/auditedList`, // 已审核记录
        checkContentAudit: `${HTTPHEADER}/User/checkContentAudit`, // 审核用户操作记录 // 接口勿用 - 这里会审核图片 - 现在有图片审核模块 - 会重复审核
    },

    // 交易管理
    deal: {
        userFlow2: `${HTTPHEADER}/Statistical/userFlow2`, // 用户流水记录2
        userFlow1: `${HTTPHEADER}/Statistical/userFlow1`, // 用户流水记录1
        diamondLog: `${HTTPHEADER}/Statistical/diamondLog`, // 余额明细
        userFlowAll: `${HTTPHEADER}/Statistical/userFlowAll`, // 导出
        userFlow1Count: `${HTTPHEADER}/Statistical/userCount`, // 流水记录 汇总
    },

    // 公会管理
    guild: {
        getGuildUserList: `${HTTPHEADER}/guild/getGuildUserList`, // 成员明细
        addGuildUser: `${HTTPHEADER}/guild/addGuildUser`, // 添加公会成员
        getGuildRoomList: `${HTTPHEADER}/guild/getGuildRoomList`, // 绑定厅列表
        removeGuildUser: `${HTTPHEADER}/guild/removeGuildUser`, // 删除公会成员
        removeGuildRoom: `${HTTPHEADER}/guild/removeGuildRoom`, // 移除大厅
        disbandGuild: `${HTTPHEADER}/guild/disbandGuild`, // 解散公会
        joinApply: `${HTTPHEADER}/Guild/joinApply`, // 公会厅申请信息处理
        guildUserReport: `${HTTPHEADER}/guild/guildUserReport`, // 公会举报处理
        getUserComplainList: `${HTTPHEADER}/UserComplaint/index`, // 公会投诉列表（风险客服）
        handleUserComplain: `${HTTPHEADER}/UserComplaint/handle`, // 公会投诉处理（风险客服）
        settlementLog: `${HTTPHEADER}/Guild/settlementLog`, // 返点操作日志
        newGuildApplyList: `${HTTPHEADER}/guild/newGuildApplyList`, // 创建工会申请列表
        newGuildApplyCheck: `${HTTPHEADER}/guild/newGuildApplyCheck`, // 创建工会审核已联系或者驳回
        bindRoom: `${HTTPHEADER}/guild/bindRoom`, // 绑定工会厅
        lockGuild: `${HTTPHEADER}/Guild/lockGuild`, // 封禁（解封）公会,
        addStatisticsroom: `${HTTPHEADER}/guild/addStatisticsroom`, // 添加24小时房间统计集合
        statisticsroomS: `${HTTPHEADER}/guild/statisticsroomS`, // 统计24小时房间列表
        roomS: `${HTTPHEADER}/guild/roomS`, // 查询房间流水列表
        delStatisticsroom: `${HTTPHEADER}/guild/delStatisticsroom`, // 移除24小时房间统计
        roomFlow: `${HTTPHEADER}/RoomFlow/index`, // 移除24小时房间统计


        // v2
        list: `${HTTPHEADER}/Guild/guildListV2`, // 公会列表
        getGuildUsers: `${HTTPHEADER}/guild/guildUsers`, // 成员列表
        changePrivateChat: `${HTTPHEADER}/guild/changePrivateChat`, // 成员列表
        rmGuildUser: `${HTTPHEADER}/guild/rmGuildUser`, // 删除公会成员
        guildUserApply: `${HTTPHEADER}/guild/guildUserApply`, // 主播申请列表
        guildUserApplyCheck: `${HTTPHEADER}/guild/guildUserApplyCheck`, // 主播申请审核
        guildRooms: `${HTTPHEADER}/guild/guildRooms`, // 公会房间列表
        guildRoomApply: `${HTTPHEADER}/guild/guildRoomUpdateApply`, // 公会房间申请列表
        addGuildRoom: `${HTTPHEADER}/guild/addGuildRoom`, // 添加公会房间
        rmGuildRoom: `${HTTPHEADER}/guild/rmGuildRoom`, // 移除公会房间
        guildRoomApplyCheck: `${HTTPHEADER}/guild/guildRoomTypeUpdateCheck`, // 审核公会申请
        rebateConfig: `${HTTPHEADER}/guild/rebateConfig`, // 获取周返点
        delConfigRebate: `${HTTPHEADER}/guild/delConfigRebate`, // 获取周返点
        configRebate: `${HTTPHEADER}/guild/configRebate`, // 获取周返点
        guildWeekList: `${HTTPHEADER}/guild/guildWeekList`, // 公会结算 公会评级（周）（月）未结算
        settlementConfig: `${HTTPHEADER}/guild/settlementConfig`, // 获取周返点
        getGuildRebateList: `${HTTPHEADER}/guild/getGuildRebateList`, // 获取实时返点配置
        updateGuildRebate: `${HTTPHEADER}/guild/updateGuildRebate`, // 修改实时返点配置
        addGuildRebate: `${HTTPHEADER}/guild/addGuildRebate`, // 新增实时返点配置
        delGuildRebate: `${HTTPHEADER}/guild/delGuildRebate`, // 删除实时返点配置
        saveSettlementConfig: `${HTTPHEADER}/guild/saveSettlementConfig`, // 配置周返点
        delSettlementConfig: `${HTTPHEADER}/guild/delSettlementConfig`, // 删除周返点配置
        doSettlement: `${HTTPHEADER}/guild/doSettlement`, // 公会批量结算
        getNowRoomOnlineReward: `${HTTPHEADER}/guild/getNowRoomOnlineReward`, // 待结算 24小时房间奖励
        guildType: `${HTTPHEADER}/guild/guildType`, // 获取公会类型
        guildRoomType: `${HTTPHEADER}/guild/roomType`, // 获取公会类型
        greetConfig: `${HTTPHEADER}/GreetConfig`, // 获取萌新配置项
        greetConfigSave: `${HTTPHEADER}/GreetConfig/save`, // 设置萌新配置项
        guildWeekListV2: `${HTTPHEADER}/guild/guildWeekListV2`, // 公会结算 公会评级（周）（月）未结算
        confList: `${HTTPHEADER}/GuildEffReward/confList`, // 获取有效直播周奖励 - 列表
        effectSave: `${HTTPHEADER}/GuildEffReward/save`, // 获取有效直播周奖励 - 保存
        effectDelete: `${HTTPHEADER}/GuildEffReward/delete`, // 获取有效直播周奖励 - 删除
        couplingList: `${HTTPHEADER}/CouplingReward/list`, // 公会拍一拍周奖励 - 列表
        couplingSave: `${HTTPHEADER}/CouplingReward/save`, // 公会拍一拍周奖励 - 保存
        couplingDelete: `${HTTPHEADER}/CouplingReward/delete`, // 公会拍一拍周奖励 - 删除
        cpSettleLog: `${HTTPHEADER}/guild/cpSettleLog`, // 公会拍一拍次数 - 列表
        cpWeekList: `${HTTPHEADER}/guild/cpWeekList`, // 公会拍一拍次数 - 未结算
        adminUserList: `${HTTPHEADER}/Guild/adminUserList`, // 获取公会运营人员
        cpWeekRewardList: `${HTTPHEADER}/Guild/cpWeekRewardList`, // 公会拍一拍周奖励 - 未结算
    },

    // 封禁记录
    blocked: {
        bannedUserLog: `${HTTPHEADER}/User/bannedUserLog`, // 封禁用户记录
        bannedRoomLog: `${HTTPHEADER}/Room/bannedRoomLog`, // 封禁房间记录
    },

    // 贵族配置
    nobility: {
        nobilitylist: `${HTTPHEADER}/nobleGrade/index`, // 贵族特权设置列表
        save: `${HTTPHEADER}/nobleGrade/save`, // 贵族特权设置修改/新增
        detail: `${HTTPHEADER}/nobleGrade/detail`, // 贵族特权设置详情
        noblePrice: `${HTTPHEADER}/noblePrice/index`, // 贵族价格管理
        priceSave: `${HTTPHEADER}/noblePrice/save`, // 贵族价格新增/修改
        nobleUser: `${HTTPHEADER}/nobleUser/index`, // 贵族用户列表

        getUserNobleLog: `${HTTPHEADER}/nobleUser/getUserNobleLog`, // 用户贵族状态清单
        getUserGrowthValueLog: `${HTTPHEADER}/nobleUser/getUserGrowthValueLog`, // 成长值变化记录
    },

    // 财务管理
    finance: {
        platformTopUp: `${HTTPHEADER}/wallet/platformTopUp`, // 充值记录
        getCashHisityAll: `${HTTPHEADER}/cash/getCashHisityAll`, // 提现导出excel
        diamondRechargeAll: `${HTTPHEADER}/Recharge/diamondRechargeAll`, // 充值记录导出
        regReplenishmentByCsv: `${HTTPHEADER}/Promoter/regReplenishmentByCsv`, // 推广补单通过csv格式
        changePayStatus: `${HTTPHEADER}/PayManage/changePayStatus`, // 修改支付使用状态
        getMerchantList: `${HTTPHEADER}/Recharge/getMerchantList`, // 获取appid
        getWXMerchantList: `${HTTPHEADER}/Recharge/getWXMerchantList`, // 获取商户号
        queryPayStatus: `${HTTPHEADER}/Recharge/queryPayStatus`, // 查询充值订单支付状态
        addTask: `${HTTPHEADER}/Recharge/addTask`, // 按时间批量查单
        getTaskList: `${HTTPHEADER}/Recharge/getTaskList`, // 按时间批量查单-获取结果
        getTaskDetail: `${HTTPHEADER}/Recharge/getTaskDetail`, // 按时间批量查单-获取明细
        getTaskDetailLog: `${HTTPHEADER}/Recharge/getTaskDetailLog`, // 按时间批量查单-获取补单明细
    },

    // 消息管理
    message: {
        messageAdd: `${HTTPHEADER}/ActivityPush/add`, // 充值记录
        list: `${HTTPHEADER}/ActivityPush/list`, // 活动通知列表
        delete: `${HTTPHEADER}/ActivityPush/delete`, // 活动通知列表
        pushLogList: `${HTTPHEADER}/PushLog`, // 活动通知列表
        addPushLog: `${HTTPHEADER}/pushLog/add`, // 活动通知列表
    },

    // 举报管理
    report: {
        userHistory: `${HTTPHEADER}/Report/index`, // 举报用户记录
    },

    // 注销管理
    logout: {
        list: `${HTTPHEADER}/Cancellation/index`, // 注销列表
        listV2: `${HTTPHEADER}/Cancellation/indexV2`, // 注销列表V2
        hasDeal: `${HTTPHEADER}/Cancellation/hasDeal`, // 已处理列表
        indexV2Export: `${HTTPHEADER}/Cancellation/indexV2Export`, // 注销列表V2
    },

    // 房间列表
    house: {
        liveList: `${HTTPHEADER}/party/liveList`, // 直播间列表
        // partyList: `${HTTPHEADER}/party/partyList`, // 派对间列表
        // partyList: `${HTTPHEADER}/RoomV2/list`, // 派对间列表
        partyListV2: `${HTTPHEADER}/RoomV2/listV2`, // 派对间列表
        // updateParty: `${HTTPHEADER}/party/updateParty`, // 修改派对
        updateParty: `${HTTPHEADER}/RoomV2/update`, // 修改派对
        delGenre: `${HTTPHEADER}/party/delGenre`, // 删除类别
        saveGenre: `${HTTPHEADER}/party/saveGenre`, // 添加类别
        genreList: `${HTTPHEADER}/Party/genreList`, // 类型列表
        partyRoomTypes: `${HTTPHEADER}/PartyRoom/roomTypes`, // 相守类型列表
        roomHotSetting: `${HTTPHEADER}/Room/roomHotSetting`, // 房间热度设置
        addRoomHot: `${HTTPHEADER}/Room/addRoomHot`, // 增加房间热度
        roomHotList: `${HTTPHEADER}/Room/roomHotList`, // 增加房间热度列表
        deleteRoomHot: `${HTTPHEADER}/Room/deleteRoomHot`, // 删除热度
        roomTypes: `${HTTPHEADER}/party/roomTypes`, // 查看房间已经绑定的分类
        roomBindType: `${HTTPHEADER}/party/roomBindType`, // 为房间绑定分类
        delBind: `${HTTPHEADER}/party/delBind`, // 房间移除绑定分类
        // 20230516 17:32 直播房间列表 接口名称变更
        liveTypes: `${HTTPHEADER}/party/liveTypes`, // 查看房间已经绑定的分类
        liveBindType: `${HTTPHEADER}/party/liveBindType`, // 为房间绑定分类
        delLiveBind: `${HTTPHEADER}/party/delLiveBind`, // 房间移除绑定分类

        endLive: `${HTTPHEADER}/party/endLive`, // 关闭直播
        joinRoomLog: `${HTTPHEADER}/Room/joinRoomLog`, // 进入房间记录
        statJoin: `${HTTPHEADER}/room/statJoin`, // 进房记录汇总
        RoomHotConfList: `${HTTPHEADER}/RoomHotConf/list`, // 首页房间类型推荐-列表
        createRoomHotConf: `${HTTPHEADER}/RoomHotConf/create`, // 首页房间类型推荐-新增
        updateRoomHotConf: `${HTTPHEADER}/RoomHotConf/update`, // 首页房间类型推荐-修改
        deleteRoomHotConf: `${HTTPHEADER}/RoomHotConf/delete`, // 首页房间类型推荐-删除

        RoomHonourList: `${HTTPHEADER}/RoomHonour/list`, // 房间角标-列表
        createRoomHonour: `${HTTPHEADER}/RoomHonour/create`, // 房间角标-新增
        updateRoomHonour: `${HTTPHEADER}/RoomHonour/update`, // 房间角标-修改
        deleteRoomHonour: `${HTTPHEADER}/RoomHonour/delete`, // 房间角标-删除

        RoomPushFlowList: `${HTTPHEADER}/RoomPushFlow/list`, // 首页房间推荐-列表
        createRoomPushFlow: `${HTTPHEADER}/RoomPushFlow/create`, // 首页房间推荐-新增
        updateRoomPushFlow: `${HTTPHEADER}/RoomPushFlow/update`, // 首页房间推荐-修改
        deleteRoomPushFlow: `${HTTPHEADER}/RoomPushFlow/delete`, // 首页房间推荐-删除

        partyRoomList: `${HTTPHEADER}/PartyRoom/list`, // 全部房间-列表
        changePartyRoom: `${HTTPHEADER}/PartyRoom/change`, // 全部房间-修改房间类别
        canChangeType: `${HTTPHEADER}/PartyRoom/canChangeType`, // 全部房间-获取房间类别

        charmTopByLive: `${HTTPHEADER}/RoomV2/charmTopByLive`, // 每场直播的魅力榜单
    },

    // 直播管理
    live: {
      anchorRoomList: `${HTTPHEADER}/RoomV2/anchorRoomList`, // 房间列表
      anchorLiveList: `${HTTPHEADER}/RoomV2/anchorLiveList`, // 直播列表
      anchorLiveHistoryList: `${HTTPHEADER}/RoomV2/anchorLiveHistoryList`, // 历史列表
      anchorData: `${HTTPHEADER}/roomV2/anchorData`, // 直播数据
      effective: `${HTTPHEADER}/RoomV2/effective`, // 有效直播时长
      saveEff: `${HTTPHEADER}/RoomV2/saveEff`, // 有效直播时长 -- 保存
      liveHistoryTotal: `${HTTPHEADER}/RoomV2/liveHistoryTotal`, // 历史列表统计
    },

    // 相守管理
    accompany: {
      roomShouList: `${HTTPHEADER}/partyRoom/roomShouList`, // 房间列表
      shouRooms: `${HTTPHEADER}/guild/shouRooms`, // 房间数据
    },

    // 风控检测
    risk: {
        audioStreamDefyList: `${HTTPHEADER}/Room/audioStreamDefyList`, // 音频违规日志
        audioStreamDefyListExport: `${HTTPHEADER}/Room/audioStreamDefyListExport`, // 音频违规日志导出
        checkAudioStreamDefyList: `${HTTPHEADER}/Room/checkAudioStreamDefyList`, // 复审操作
        getCheckOperator: `${HTTPHEADER}/Room/getCheckOperator`, // 审核人员
        roomCoverCheckList: `${HTTPHEADER}/Room/roomCoverCheckList`, // 封面审核列表
        coverCheck: `${HTTPHEADER}/Room/coverCheck`, // 封面审核
        UserPunish: `${HTTPHEADER}/UserPunish`, // 用户处罚列表
        save: `${HTTPHEADER}/UserPunish/save`, // 添加处罚用户
        remove: `${HTTPHEADER}/UserPunish/remove`, // 解除处罚用户
        chatList: `${HTTPHEADER}/MsgLog/chatList`, // 私聊会话消息-列表
        roomList: `${HTTPHEADER}/MsgLog/roomList`, // 房间会话消息-列表
        roomTalkList: `${HTTPHEADER}/MsgLog/roomTalkList`, // 房间会话记录-列表
        chatTalkList: `${HTTPHEADER}/MsgLog/chatTalkList`, // 私聊会话记录-列表
        index: `${HTTPHEADER}/Sensitive/index`, // 敏感词列表
        softDelete: `${HTTPHEADER}/Sensitive/softDelete`, // 敏感词-软删除
        add: `${HTTPHEADER}/Sensitive/add`, // 敏感词-添加
        screenImgLog: `${HTTPHEADER}/ScreenImgLog/index`, // 图片审核-列表
        review: `${HTTPHEADER}/ScreenImgLog/review`, // 图片审核-操作
        getPunishTypeList: `${HTTPHEADER}/UserPunishLog/getPunishTypeList`, // 处罚举报-处罚类型
        getTencentLabel: `${HTTPHEADER}/Room/tencent_label`, // 处罚举报-风险类型
        customerServiceList: `${HTTPHEADER}/ScreenImgLog/customerServiceList`, // 处罚举报-客服列表
        getReviewer: `${HTTPHEADER}/moments/init`, // 处罚举报-获取审核人


        // 用户处罚 - 用户举报二合一
        UserPunishLog: `${HTTPHEADER}/UserPunishLog`, // 处罚-列表
        addUserPunish: `${HTTPHEADER}/UserPunishLog/add`, // 处罚 -新增
        addBatchUserPunish: `${HTTPHEADER}/UserPunishLog/addBatch`, // 处罚 -批量新增
        saveUserPunish: `${HTTPHEADER}/UserPunishLog/save`, // 处罚-封禁
        removeUserPunish: `${HTTPHEADER}/UserPunishLog/remove`, // 处罚-解除
        passUserPunish: `${HTTPHEADER}/UserPunishLog/pass`, // 处罚-忽略
        punishStatus: `${HTTPHEADER}/UserPunishLog/punishStatus`, // 用户状态
        updateSource: `${HTTPHEADER}/UserPunishLog/updateSource`, // 处罚-修改证据

        punishOperateLog: `${HTTPHEADER}/UserPunishLog/punishOperateLog`, // 处罚举报-操作日志
        acceptPunish: `${HTTPHEADER}/UserPunishLog/acceptPunish`, // 处罚举报-审核受理

        punishWordsList: `${HTTPHEADER}/Punish`, // 获取风控文案库列表
        updatePunishWords: `${HTTPHEADER}/Punish/update`, // 修改风控文案
    },

    // 心动速配
    move: {
        Heartbeat: `${HTTPHEADER}/Heartbeat`, // 心动卡片配置
        save: `${HTTPHEADER}/Heartbeat/save`, // 添加/修改音色卡片
        delete: `${HTTPHEADER}/Heartbeat/delete`, // 删除音色卡片
        getCardConfig: `${HTTPHEADER}/Heartbeat/getCardConfig`, // 心动价格配置
        saveCardConfig: `${HTTPHEADER}/Heartbeat/saveCardConfig`, // 设置心动卡片配置
        heartAnchor: `${HTTPHEADER}/Heartbeat/heartAnchor`, // 心动主播
        addHeartAnchor: `${HTTPHEADER}/Heartbeat/addHeartAnchor`, // 添加心动主播
        editHeartAnchor: `${HTTPHEADER}/Heartbeat/editHeartAnchor`, // 编辑心动主播
        rmHeartAnchor: `${HTTPHEADER}/Heartbeat/rmHeartAnchor`, // 移除心动主播
        heartOrder: `${HTTPHEADER}/Heartbeat/heartOrder`, // 心动记录
        serachTag: `${HTTPHEADER}/Heartbeat/serachTag`, // 获取音色分类
    },

    // 动态管理
    dynamic: {
        getMoments: `${HTTPHEADER}/moments/getMoments`, // 获取动态
        delMoments: `${HTTPHEADER}/moments/delMoments`, // 删除动态
        msgList: `${HTTPHEADER}/moments/msgList`, // 评论列表
        deleteMsg: `${HTTPHEADER}/moments/deleteMsg`, // 删除评论
        msgListAll: `${HTTPHEADER}/moments/msgListAll`, // 评论列表
        multiDeleteMsg: `${HTTPHEADER}/moments/multiDeleteMsg`, // 批量删评论文案
        checkList: `${HTTPHEADER}/moments/checkMomentIndex`, // 获取动态审核列表
        check: `${HTTPHEADER}/moments/checkMomentUpdate`, // 动态审核操作
        topMomentList: `${HTTPHEADER}/moments/pushMomentList`, // 置顶动态列表
        setTopMoment: `${HTTPHEADER}/moments/setPushMoment`, // 置顶动态
        delTopList: `${HTTPHEADER}/moments/delPushMoment`, // 删除置顶动态
    },

    // 活动管理
    activity : {
        resourceList: `${HTTPHEADER}/activity/resourceList`, // 资源列表
        addResourceConfig: `${HTTPHEADER}/activity/addResourceConfig`, // 添加资源位配置
        editResource: `${HTTPHEADER}/activity/editResource`, // 修改资源位配置
        delResource: `${HTTPHEADER}/activity/delResource`, // 删除资源
        posList: `${HTTPHEADER}/activity/posList`, // 资源位列表
        // 2022/12/6 21：44
        getPoolName: `${HTTPHEADER}/TwelveLog/getPoolName`, // 获取奖池名
        getRound: `${HTTPHEADER}/TwelveLog/getRound`, // 获取轮数
        poolDetail: `${HTTPHEADER}/TwelveLog/poolDetail`, // 奖池详情

        // 2023/2/28  娃娃机2.0
        getPoolNameV2: `${HTTPHEADER}/TwelveLog/getPoolNameV2`, // 获取奖池名
        getRoundV2: `${HTTPHEADER}/TwelveLog/getRoundV2`, // 获取轮数
        poolDetailV2: `${HTTPHEADER}/TwelveLog/poolDetailV2`, // 奖池详情

        // 2023/03/13 农场物语
        getPoolNameV3: `${HTTPHEADER}/TwelveLog/getPoolNameV3`, // 获取奖池名
        getRoundV3: `${HTTPHEADER}/TwelveLog/getRoundV3`, // 获取轮数
        poolDetailV3: `${HTTPHEADER}/TwelveLog/poolDetailV3`, // 获取喂养列表

        // 新年活动
        fuList: `${HTTPHEADER}/SpringLog/fuList`, // 祈福抽奖记录
        exchangeLog: `${HTTPHEADER}/SpringLog/exchangeLog`, // 祈福兑换记录
        puzzleDrawLog: `${HTTPHEADER}/SpringLog/puzzleDrawLog`, // 拼图抽奖记录
        sourceType: `${HTTPHEADER}/SpringLog/sourceType`, // 碎片来源类型
        getPuzzleLog: `${HTTPHEADER}/SpringLog/getPuzzleLog`, // 碎片获得记录

        // 环球之旅
        getTraveList: `${HTTPHEADER}/HdTravelLog/getTraveList`, // 景点数据
        getDrawList: `${HTTPHEADER}/HdTravelLog/getDrawList`, // 抽奖数据
        getTraveListDetail: `${HTTPHEADER}/HdTravelLog/getTraveListDetail`, // 景点详情

        // 2023/03/13 星际穿越
        getPoolNameV4: `${HTTPHEADER}/hdExploreLog/getPoolName`, // 获取奖池名
        getRoundV4: `${HTTPHEADER}/hdExploreLog/getRound`, // 获取轮数
        poolDetailV4: `${HTTPHEADER}/hdExploreLog/poolDetail`, // 获取探索列表
        exchangeLogV4: `${HTTPHEADER}/hdExploreLog/exchangeLog`, // 获取兑换数据

        // 最强周星活动
        giftLogList: `${HTTPHEADER}/hdWeekstarLog/giftLog`, // 周星活动数据
        getGiftList: `${HTTPHEADER}/hdWeekstarLog/getGift`, // 获取礼物
        getRoundList: `${HTTPHEADER}/hdWeekstarLog/getRound`, // 获取轮次
        getRankingList: `${HTTPHEADER}/hdWeekstarLog/getRanking`, // 周星活动榜单排名

        // 五一劳模
        getLabourGiftList: `${HTTPHEADER}/hdMaydayLog/getGift`, // 五一劳模获取礼物
        getLabourGiftLog: `${HTTPHEADER}/hdMaydayLog/giftLog`, // 五一劳模榜单排名
        getLabourRankingList: `${HTTPHEADER}/hdMaydayLog/getRanking`, // 五一劳模榜单排名

        // 奇妙跳跳屋
        getPoolNameV5: `${HTTPHEADER}/hdWonderfulLog/getPoolName`, // 获取奖池列表
        poolDetailV5: `${HTTPHEADER}/hdWonderfulLog/poolDetail`, // 获取抽奖数据
        getRoundV5: `${HTTPHEADER}/hdWonderfulLog/getRound`, // 获取轮次
        luckyListV5: `${HTTPHEADER}/hdWonderfulLog/luckyList`, // 榜单排名表
        luckyConfigV5: `${HTTPHEADER}/hdWonderfulLog/luckyConfig`, // 榜单配置

        // 520活动 浪漫520
        getPoolNameV520: `${HTTPHEADER}/hdRomanticLog/getPoolName`, // 奖池列表
        poolDetailV520: `${HTTPHEADER}/hdRomanticLog/poolDetail`, // 获取抽奖数据
        getRoundV520: `${HTTPHEADER}/hdRomanticLog/getRound`, // 获取轮次
        getGiftV520: `${HTTPHEADER}/hdRomanticLog/getGift`, // 获取礼物
        giftLogV520: `${HTTPHEADER}/hdRomanticLog/giftLog`, // 礼物数据
        getCpRankingV520: `${HTTPHEADER}/hdRomanticLog/cpRanking`, // cp榜排名
        getCpLogV520: `${HTTPHEADER}/hdRomanticLog/cpLog`, // 绑定cp记录
        getBindCpV520: `${HTTPHEADER}/hdRomanticLog/bindCp`, // 手动绑定cp

        // 披萨
        getPizzaGift: `${HTTPHEADER}/hdPizzaLog/getGift`, // 获取礼物
        getPizzaGiftLog: `${HTTPHEADER}/hdPizzaLog/giftLog`, // 礼物数据
        getPizzaGiftProduceLog: `${HTTPHEADER}/hdPizzaLog/getProduceLog`, // 制作披萨数据
        getPizzaExchangeLog: `${HTTPHEADER}/hdPizzaLog/exchangeLog`, // 获取兑换数据

        // 欢乐钓鱼季
        getPoolNameV6: `${HTTPHEADER}/hdAnglerLog/getPoolName`, // 获取奖池列表
        poolDetailV6: `${HTTPHEADER}/hdAnglerLog/poolDetail`, // 获取抽奖数据
        getRoundV6: `${HTTPHEADER}/hdAnglerLog/getRound`, // 获取轮次
        luckyListV6: `${HTTPHEADER}/hdAnglerLog/luckyList`, // 榜单排名表
        luckyConfigV6: `${HTTPHEADER}/hdAnglerLog/luckyConfig`, // 榜单配置
    },

    // 靓号管理
    prettyNumber : {
        prettyNumber: `${HTTPHEADER}/PrettyNumber`, // 靓号列表
        delPrettyNumber: `${HTTPHEADER}/PrettyNumber/del`, // 删除靓号
        addPrettyNumber: `${HTTPHEADER}/PrettyNumber/add`, // 新增靓号
        updatePrettyNumber: `${HTTPHEADER}/PrettyNumber/update`, // 修改靓号
        getTypeOption: `${HTTPHEADER}/PrettyNumber/typeOption`, // 靓号类型
        prettyNumberType: `${HTTPHEADER}/PrettyNumber/typeList`, // 靓号分类
        delTypePrettyNumber: `${HTTPHEADER}/PrettyNumber/typeDel`, // 删除靓号
        addTypePrettyNumber: `${HTTPHEADER}/PrettyNumber/typeAdd`, // 新增靓号
        updateTypePrettyNumber: `${HTTPHEADER}/PrettyNumber/typeUpdate`, // 修改靓号
        PrettyNumberLog: `${HTTPHEADER}/PrettyNumber/log`, // 售卖记录
        usingLog: `${HTTPHEADER}/PrettyNumber/usingLog`, // 售卖记录
        givePrettyNumber: `${HTTPHEADER}/v2/PrettyNumber/givePrettyNumber`, // 赠送靓号
        searchPrettyNumber: `${HTTPHEADER}/PrettyNumber/searchNumber`, // 检测靓号
        recycle: `${HTTPHEADER}/PrettyNumber/recycle`, // 靓号回收
        recycleLog: `${HTTPHEADER}/PrettyNumber/recycleLog`, // 回收记录
        refund: `${HTTPHEADER}/PrettyNumber/refund`, // 退款
    },

    //  浓情端午
    dragonBoat: {
        getGift: `${HTTPHEADER}/hdDuanwuLog/getGift`, // 获取礼物
        giftLog: `${HTTPHEADER}/hdDuanwuLog/giftLog`, // 礼物数据
        exchangeLog: `${HTTPHEADER}/hdDuanwuLog/exchangeLog`, // 获取兑换数据
        getRanking: `${HTTPHEADER}/hdDuanwuLog/getRanking`, // 榜单排名
    },

    // 月星榜
    monthStar: {
        getRound: `${HTTPHEADER}/hdMonthstarLog/getRound`, // 后台-获取轮次
        getGift: `${HTTPHEADER}/hdMonthstarLog/getGift`, // 后台-获取礼物
        giftLog: `${HTTPHEADER}/hdMonthstarLog/giftLog`, // 后台-月度之星活动数据
        getRoomRanking: `${HTTPHEADER}/hdMonthstarLog/getRoomRanking`, // 后台-房间榜单排名
        getUserRanking: `${HTTPHEADER}/hdMonthstarLog/getUserRanking`, // 后台-用户榜单排名
    },
    // 夏日音乐节
    summerSign: {
        getSummerUserList: `${HTTPHEADER}/hdMusicfestLog/userList`, // 后台-初选用户列表
        getSummerAddUser: `${HTTPHEADER}/hdMusicfestLog/addUser`, // 后台-添加初选用户
        getAuditList: `${HTTPHEADER}/hdMusicfestLog/auditList`, // 后台-添加初选用户
        getAuditPass: `${HTTPHEADER}/hdMusicfestLog/auditPass`, // 后台-歌曲审核通过
        getAuditNoPass: `${HTTPHEADER}/hdMusicfestLog/auditNoPass`, // 后台-歌曲审核不通过
        likeLog: `${HTTPHEADER}/hdMusicfestLog/likeLog`, // 后台-点赞数据列表
        getPowerRanking: `${HTTPHEADER}/hdMusicfestLog/getPowerRanking`, // 后台-总决赛实力榜列表
        editPowerRanking: `${HTTPHEADER}/hdMusicfestLog/editPowerRanking`, // 后台-总决赛实力榜修改
        getRanking: `${HTTPHEADER}/hdMusicfestLog/getRanking`, // 后台-排名数据
        getGift: `${HTTPHEADER}/hdMusicfestLog/getGift`, // 后台-礼物列表
        giftLog: `${HTTPHEADER}/hdMusicfestLog/giftLog`, // 后台-收送礼数据
    },

    // 市场数据
    market: {
      onlineUserData: `${HTTPHEADER}/NewUserData/onlineUserData`, // 在线用户列表
      configChain: `${HTTPHEADER}/NewUserData/configChain`, // 配置监测链接
      delChain: `${HTTPHEADER}/NewUserData/delChain`, // 删除监测链接
      chain: `${HTTPHEADER}/NewUserData/chain`, // 获取监测链接
      monitorChainData: `${HTTPHEADER}/NewUserData/monitorChainData`, // 监测链接数据
      exportOnlineUserData: `${HTTPHEADER}/NewUserData/exportOnlineUserData`, // 导出监测链接数据
      adConfList: `${HTTPHEADER}/AdClickConf/index`, // 市场监测配置管理 - 列表
      addAdConf: `${HTTPHEADER}/AdClickConf/addData`, // 市场监测配置管理 - 添加
      handleAdConf: `${HTTPHEADER}/AdClickConf/handle`, // 市场监测配置管理 - 启用/停用
      getAdSelect: `${HTTPHEADER}/AdClickConf/getSelect`, // 市场监测配置管理 - 媒体下拉框列表
  }
}

export default request
