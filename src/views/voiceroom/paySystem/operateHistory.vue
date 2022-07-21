// 操作记录
<template>
    <div class="operateHistory-box">
        <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入mixins
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'


export default {
    mixins: [mixins],
    components: {
        tableList
    },
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.pay.operateHistory,
                columns: [
                    {
                        label: '生效的商户号',
                        render: (h, params) => {
                            if(params.row.mer_id === 1) {
                                return h('span', '爱意')
                            }
                            return h('span', '四方')
                        }
                    },
                    {
                        label: '名称',
                        render: (h, params) => {
                            if(params.row.title === '公众号h5') {
                                return h('span', 'H5')
                            }
                            return h('span', params.row.title)
                        }
                    },
                    {
                        label: '生效时间',
                        render: (h, params) => {
                            return h('span', params.row.addtime)
                        }
                    },
                    {
                        label: '操作人',
                        render: (h, params) => {
                            return h('span', 'admin')
                        }
                    }
                ]
            }
        }
    },
    methods: {
        //传递参数
        beforeSearch(params) {
            return {
                pagesize: params.size,
                page: params.page
            };
        },
    }
}
</script>

<style lang="scss">
.operateHistory-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>