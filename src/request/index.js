const request = {
    // 支付管理API
    pay: {
        operateHistory: `${HTTPHEADER}/Payconfig/getPayOptLog`, // 操作记录
        getConfigType: `${HTTPHEADER}/PayConfig/getConfigType`, // 获取支付渠道
        setConfigType: `${HTTPHEADER}/Payconfig/setConfigType` // 设置支付渠道
    },

    // 平台活动  
    platformActivity : {
        Activityins: `${HTTPHEADER}/Activityins/index` // 幸运转盘设置
    },
}

export default request