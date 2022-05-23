const request = {
    // 支付管理API
    pay: {
        operateHistory: `${HTTPHEADER}/payconfig/getPayOptLog`, // 操作记录
        getConfigType: `${HTTPHEADER}/payconfig/getConfigType`, // 获取支付渠道
        setConfigType: `${HTTPHEADER}/payconfig/setConfigType` // 设置支付渠道
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

    // 转转宝箱
    zzbxActivity: {
        list: `${HTTPHEADER}/Activity/aclist`,
        history: `${HTTPHEADER}/Activity/drawLog`,
        detail: `${HTTPHEADER}Statistical/drawLog`
    },

    // 用户拉新记录
    userHistory: {
        list: `${HTTPHEADER}/Statistical/userInvite`
    }
}

export default request