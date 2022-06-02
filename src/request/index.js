const request = {
    // 支付管理API
    pay: {
        operateHistory: `${HTTPHEADER}/payconfig/getPayOptLog`, // 操作记录
        getConfigType: `${HTTPHEADER}/payconfig/getConfigType`, // 获取支付渠道
        setConfigType: `${HTTPHEADER}/payconfig/setConfigType`, // 设置支付渠道
        getAdaPayConfig: `${HTTPHEADER}/payconfig/getAdaPayConfig`, // 获取支付渠道
        setAdaPayConfig: `${HTTPHEADER}/payconfig/setAdaPayConfig`, // 设置支付渠道
        getWxPay: `${HTTPHEADER}/payconfig/getWxPay`, // 设置支付渠道
        setWxpay: `${HTTPHEADER}/payconfig/setWxpay`, // 设置支付渠道
    },

    // 平台活动  
    platformActivity : {
        Activityins: `${HTTPHEADER}/Activityins/index`, // 幸运转盘设置
        configMMLY: `${HTTPHEADER}/activityins/configMMLY`, // 配置喵喵乐园
        configXYZP: `${HTTPHEADER}/activityins/configXYZP`, // 配置大转盘
        getHasAddGift: `${HTTPHEADER}/Activityins/getHasAddGift`, // 获取已配置礼物
        drawFlow: `${HTTPHEADER}/activityins/drawFlow`, // 乐园记录
        drawRecord: `${HTTPHEADER}/activityins/drawRecord`, // 统计
        stop: `${HTTPHEADER}/Activityins/stop`, // 停止和开启
    },
    system : {
        Appversion : `${HTTPHEADER}/Appversion`, // 版本列表
        AppversionAChange : `${HTTPHEADER}/appversion/add`, // 新增或者修改
        AppversionDel : `${HTTPHEADER}/appversion/del`, // 删除
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
        doCash: `${HTTPHEADER}/cash/doCash`
    },

    // 商城管理
    shopping: {
        list: `${HTTPHEADER}/goods`,
        add: `${HTTPHEADER}/goods/save`,
        down: `${HTTPHEADER}/goods/down`,
        send: `${HTTPHEADER}/goods/send`,
        sendlog: `${HTTPHEADER}/goods/sendlog`,
    }
    
}

export default request