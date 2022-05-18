const mixins = {
    data() {
        return {
            page: 1, // 分页
            size: 20, // 页码
            searchParams: {}, // form表单参数
            dataParams: {}, // 时间参数
        };
    },
}

export default mixins
