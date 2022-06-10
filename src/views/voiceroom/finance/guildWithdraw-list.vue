// 充值记录
<template>
    <div class="finance-guildWithdraw-list">
        <div class="model">
            <span>选择时间内用户充值金额统计：{{ ruleForm.allMoney || 0 }}元</span>
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
                // {
                //     name: 'sort',
                //     type: 'select',
                //     value: '',
                //     keyName: 'value',
                //     optionLabel: 'name',
                //     label: '排序',
                //     placeholder: '请选择',
                //     options: MAPDATA.SORTLIST
                // },
                // {
                //     name: 'user_number',
                //     type: 'input',
                //     value: '',
                //     label: '收单机构',
                //     isNum: true,
                //     placeholder: '请输入收单机构'
                // },
                {
                    name: 'channel',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '收单机构',
                    placeholder: '请选择',
                    options: MAPDATA.INSTITUTION
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'status',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '订单状态',
                    placeholder: '请选择',
                    options: MAPDATA.ORDERSTATUS
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
                url: REQUEST.diamondRecharge.list,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '充值时间',
                        prop: 'create_time',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
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
                        prop: 'trade_no'
                    },
                    {
                        label: '商户单号',
                        prop: 'out_trade_no'
                    }
                ]
            }
        }
    },
    data() {
        return {
            ruleForm: {
                allMoney: null
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
                user_number: s.user_number,
                sort: s.sort,
                channel: s.channel,
                status: s.status,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000)
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
            this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
        }
    }
}
</script>

<style lang="scss">
.finance-guildWithdraw-list {
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