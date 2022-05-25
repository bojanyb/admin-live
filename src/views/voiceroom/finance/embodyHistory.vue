// 提现记录
<template>
    <div class="finance-embodyHistory">
        <div class="model">
            <span>选择时间内已放款金额：{{ ruleForm.alreadyMoney || 0 }}元</span>
            <span>选择时间内平台扣除金额：{{ ruleForm.deductMoney || 0 }}元</span>
        </div>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
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
    components: {
        tableList,
        SearchPanel
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'user_id',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'sort',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '排序',
                    placeholder: '请选择',
                    options: MAPDATA.EMBODYSORT
                },
                {
                    name: 'order_id',
                    type: 'input',
                    value: '',
                    label: '交易流水ID',
                    isNum: true,
                    placeholder: '请输入交易流水ID'
                },
                {
                    name: 'status',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '状态筛选',
                    placeholder: '请选择',
                    options: MAPDATA.STATUSLIST
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'daterange',
                    format: "yyyy-MM-dd",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            this.emptyDateTime()
                            this.setDateTime(v)
                            this.getList()
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                            this.getList()
                        }
                    }
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.CashHisity.list,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_id'
                    },
                    {
                        label: '申请提现时间',
                        prop: 'addtime',
                        render: (h, params) => {
                            return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '喵粮',
                        prop: 'money',
                        render: (h, params) => {
                            return h('span', params.row.money * 100)
                        }
                    },
                    {
                        label: '手续费',
                        prop: 'cash_rate',
                        render: (h, params) => {
                            return h('span', params.row.orderDetails.cash_rate ? params.row.money / 100 * params.row.orderDetails.cash_rate : '--')
                        }
                    },
                    {
                        label: '提现金额',
                        render: (h, params) => {
                            return h('span', params.row.money)
                        }
                    },
                    {
                        label: '提现卡号',
                        render: (h, params) => {
                            return h('span', params.row.orderDetails.card_id ? params.row.orderDetails.card_id : '--')
                        }
                    },
                    {
                        label: '状态',
                        render: (h, params) => {
                            let paramsData = MAPDATA.STATUSLIST.find(item => { return item.value === params.row.status })
                            return h('span', paramsData ? paramsData.name : '--')
                        }
                    },
                    {
                        label: '到账时间',
                        render: (h, params) => {
                            return h('span', params.row.pay_time ? timeFormat(params.row.pay_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '交易流水号',
                        prop: 'order_id',
                        width: '200'
                    },
                    {
                        label: '操作人',
                        prop: 'admin_id'
                    }
                ]
            }
        }
    },
    data() {
        return {
            ruleForm: {
                alreadyMoney: null,
                deductMoney: null
            }
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params.page,
                status: s.status,
                user_number: s.user_number,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
                user_id: s.user_id,
                order_id: s.order_id,
                sort: s.sort
            }
        },
        // 设置时间段
        setDateTime(arr) {
            const date = arr ? {
                start_time: arr[0],
                end_time: arr[1]
            } : {}
            this.$set(this, 'dateTimeParams', date)
        },
        // 清空日期选择
        emptyDateTime() {
            this.dateTimeParams = {}
        },
        // 查询
        reset() {
            this.searchParams = {}
            this.dateTimeParams = {
                activity_type_id: 1
            }
            this.getList()
        },
        // 重置
        onSearch() {
            this.getList()
        },
        // 列表返回数据
        saleAmunt(data) {
            // this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
        }
    }
}
</script>

<style lang="scss">
.finance-embodyHistory {
    padding: 20px;
    box-sizing: border-box;
    .model {
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        padding: 0px 30px;
        box-sizing: border-box;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
        margin-bottom: 20px;
        >span {
            font-size: 15px;
            color: #fff;
            margin-right: 100px;
        }
    }
}
</style>