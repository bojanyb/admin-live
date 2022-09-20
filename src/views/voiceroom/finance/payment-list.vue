<template>
    <div class="app-container finance-payment-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        tableList,
        SearchPanel
    },
    data() {
        return {
            
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'channel',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '支付平台',
                    placeholder: '请选择',
                    options: MAPDATA.INSTITUTION
                },
                {
                    name: 'channel',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '支付方式',
                    placeholder: '请选择',
                    options: MAPDATA.INSTITUTION
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.diamondRecharge.list,
                columns: [
                    {
                        label: '用户ID',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '充值时间',
                        minWidth: '150px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '充值金额',
                        prop: 'amount',
                        render: (h, params) => {
                            return h('span', params.row.amount / 100)
                        }
                    },
                    {
                        label: '收单机构',
                        prop: 'receive'
                    },
                    {
                        label: '充值方式',
                        render: (h, params) => {
                            return h('span', params.row.channel)
                        }
                    },
                    {
                        label: '订单状态',
                        render: (h, params) => {
                            let data = MAPDATA.ORDERSTATUS.find(item => { return item.value.indexOf(params.row.status) !== -1 })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '交易单号',
                        minWidth: '150px',
                        prop: 'trade_no'
                    },
                    {
                        label: '商户单号',
                        minWidth: '150px',
                        render: (h, params) => {
                            return h('span', params.row.out_trade_no || '无')
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                user_number: s.user_number,
                sort: s.sort,
                channel: s.channel,
                status: s.status,
                amount: s.amount ? Number(s.amount) * 100 : s.amount,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
                trade_no: s.trade_no
            }
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        add() {
            
        }
    }
}
</script>

<style lang="scss">
.finance-payment-box {

}
</style>