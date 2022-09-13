const mixins = {
    data() {
        return {
            tabIndex: '0', // 菜单下标
            page: 1, // 分页
            size: 10, // 页码
            limit: 10, // 页码
            searchParams: {}, // form表单参数
            dataParams: {}, // 时间参数
        };
    },
}

export default mixins
