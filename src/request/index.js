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
    },

    // 平台活动  
    platformActivity: {
        Activityins: `${HTTPHEADER}/Activityins/index`, // 幸运转盘设置
        configMMLY: `${HTTPHEADER}/activityins/configMMLY`, // 配置喵喵乐园
        configXYZP: `${HTTPHEADER}/activityins/configXYZP`, // 配置大转盘
        getHasAddGift: `${HTTPHEADER}/Activityins/getHasAddGift`, // 获取已配置礼物
        drawFlow: `${HTTPHEADER}/activityins/drawFlow`, // 乐园记录
        drawRecord: `${HTTPHEADER}/activityins/drawRecord`, // 统计
        stop: `${HTTPHEADER}/Activityins/stop`, // 停止和开启
    },

    // 系统设置
    system: {
        Appversion: `${HTTPHEADER}/Appversion`, // 版本列表
        AppversionAChange: `${HTTPHEADER}/appversion/add`, // 新增或者修改
        AppversionDel: `${HTTPHEADER}/appversion/del`, // 删除
        getMenuPermissions: `${HTTPHEADER}/admin/getMenuPermissions`, // 菜单列表
        getAllPermission: `${HTTPHEADER}/admin/getAllPermission`, // 获取所有节点
        adminMenu: `${HTTPHEADER}/admin/index`, // 管理员列表
        addUser: `${HTTPHEADER}/admin/addUser`, // 增加管理员
        editAdmin: `${HTTPHEADER}/admin/editIndex`, // 管理员权限编辑页
        edit: `${HTTPHEADER}/admin/edit`, // 管理员信息修改
        view: `${HTTPHEADER}/admin/view`, // 查看管理员信息
        deleteAdmin: `${HTTPHEADER}/admin/delete`, // 删除用户
        adminStatus: `${HTTPHEADER}/admin/adminStatus`, // 开关用户
        super: {
            punishHistory: `${HTTPHEADER}/Room/punishHistory`, // 处理处罚历史
            handlePunish: `${HTTPHEADER}/Room/handlePunish`, // 处理处罚
            punishLog: `${HTTPHEADER}/Room/punishLog`, // 待处理处罚
            superUserList: `${HTTPHEADER}/User/superUserList`, // 超管列表
            setSuperUser: `${HTTPHEADER}/User/setSuperUser`, // 设置超管
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
        list: `${HTTPHEADER}/Statistical/userInvite`
    },

    // 充值记录
    diamondRecharge: {
        list: `${HTTPHEADER}/Recharge/diamondRecharge`,
    },

    // 体现记录
    CashHisity: {
        list: `${HTTPHEADER}/cash/getcashHisity`,
        apply: `${HTTPHEADER}/cash/getCash`,
        doCash: `${HTTPHEADER}/cash/doCash`,
        diamondRecharge: `${HTTPHEADER}/Recharge/diamondRecharge`,
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
    },

    // 用户管理
    user: {
        list: `${HTTPHEADER}/User`,
        defaultFace: `${HTTPHEADER}/user/defaultFace`,
        autonymlist: `${HTTPHEADER}/Verify`,
    },
    
    // 审核管理
    audit: {
        list: `${HTTPHEADER}/user/getUserBgi`
    },

    // 交易管理
    deal: {
        userFlow2: `${HTTPHEADER}/Statistical/userFlow2`
    }
}

export default request