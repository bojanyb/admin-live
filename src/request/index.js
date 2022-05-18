const request = {
    // 支付管理API
    pay: {
        operateHistory: `${HTTPHEADER}/Payconfig/getPayOptLog`, // 操作记录
        getConfigType: `${HTTPHEADER}/PayConfig/getConfigType`, // 获取支付渠道
        setConfigType: `${HTTPHEADER}/admin/Payconfig/setConfigType` // 设置支付渠道
    }
}

export default request