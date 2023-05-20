// 提现记录
<template>
    <div class="finance-embodyHistory">
        <div class="model">
            <span>{{ totalName }}：{{ ruleForm.alreadyMoney || 0 }}元</span>
            <span>{{ rateName }}：{{ ruleForm.deductMoney || 0 }}元</span>
            <!-- <span>选择时间内的到账金额：{{ Number((ruleForm.alreadyMoney - ruleForm.deductMoney).toFixed(2)) || 0 }}元</span> -->
        </div>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="true" :showYesterday="true" :showRecentSeven="true" :showToday="true" :show-batch-rurn="true" :showBeforeYesterday="true" batchRurnName="导出EXCEL" @onSearch="onSearch" @yesterday="yesterday" @recentSeven="recentSeven" @today="today" @BatchRurn="BatchRurn" @beforeYesterday="beforeYesterday"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
    </div>
</template>

<script>
// 引入api
import { getCashHisityAll } from '@/api/finance.js'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat, exportTableData } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    filters: {
        statusName(val) {
            let params = MAPDATA.STATUSLIST.find(item => { return item.value === val })
            return params ? params.name : '无'
        }
    },
    components: {
        tableList,
        SearchPanel,
    },
    mixins: [mixins],
    computed: {
        statusComputed() {
            let array = MAPDATA.STATUSLISTCOPY
            return array
        },
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
                    name: 'channel',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '提现通道',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.CASHCHANNEL
                },
                {
                    name: 'order_id',
                    type: 'input',
                    value: '',
                    label: '交易单号',
                    isNum: true,
                    placeholder: '请输入交易单号'
                },
                {
                    name: 'outer_trade_no',
                    type: 'input',
                    value: '',
                    label: '第三方交易单号',
                    isNum: true,
                    placeholder: '请输入第三方交易单号'
                },
                {
                    name: 'status',
                    type: 'select',
                    value: 4,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '状态筛选',
                    placeholder: '请选择',
                    options: this.statusComputed
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
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
                        width: '100px',
                        prop: 'user_id'
                    },
                    {
                        label: '申请时间',
                        prop: 'addtime',
                        width: '160px',
                        render: (h, params) => {
                            return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '扣除喵粮',
                        prop: 'money',
                        render: (h, params) => {
                            return h('span', params.row.orderDetails.money)
                        }
                    },
                    {
                        label: '申请金额',
                        render: (h, params) => {
                            return h('span', params.row.orderDetails.money / 100)
                        }
                    },
                    {
                        label: '手续费',
                        prop: 'cash_rate',
                        render: (h, params) => {
                            // let money = Math.floor((params.row.money / 10000 * params.row.orderDetails.cash_rate).toFixed(5) * 100) / 100
                            // return h('span', money)
                            return h('span', params.row.rate_money)
                        }
                    },
                    // {
                    //     label: '提现卡号',
                    //     width: '180px',
                    //     render: (h, params) => {
                    //         return h('span', params.row.orderDetails.card_id ? params.row.orderDetails.card_id : '--')
                    //     }
                    // },
                    {
                        label: '处理时间',
                        prop: 'operate_time',
                        width: '160px',
                        render: (h, params) => {
                            return h('span', params.row.operate_time ? timeFormat(params.row.operate_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '处理状态',
                        render: (h, params) => {
                            let paramsData = MAPDATA.STATUSLIST.find(item => { return item.value === params.row.status })
                            return h('span', paramsData ? paramsData.name : '--')
                        }
                    },
                    {
                        label: '到账金额/退回金额',
                        width: '160px',
                        render: (h, params) => {
                            if(params.row.orderDetails.status != 3) {
                                return h('span', params.row.orderDetails.real_money / 100)
                            } else {
                                return h('span', params.row.orderDetails.money / 100)
                            }
                        }
                    },
                    {
                        label: '到账时间/原因',
                        width: '160px',
                        showOverFlow: true,
                        render: (h, params) => {
                            if(params.row.orderDetails.status != 3) {
                                return h('span', params.row.pay_time ? timeFormat(params.row.pay_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                            } else {
                                return h('span', params.row.orderDetails.remark || '无')
                            }
                        }
                    },
                    {
                        label: '本次提现账号',
                        prop: 'order_id',
                        width: '200'
                    },
                    {
                        label: '本次提现通道',
                        prop: 'channel',
                        width: '200',
                        render: (h, params) => {
                          let data = MAPDATA.CASHCHANNEL.find((item) => {
                            return item.value === params.row.channel;
                          });
                          return h("span", data ? data.name : "无");
                      },
                    },
                    {
                        label: '交易单号',
                        prop: 'order_id',
                        width: '200'
                    },
                    {
                        label: '第三方交易单号',
                        prop: 'outer_trade_no',
                        width: '200'
                    },
                    {
                        label: '操作人',
                        prop: 'admin_id'
                    }
                ]
            }
        },
        totalName() {
            if(!this.searchParams.status) {
                return '总金额'
            } else if(this.searchParams.status === 4) {
                return '到账金额'
            } else if(this.searchParams.status === 3) {
                return '退回金额'
            }
        },
        rateName() {
            if(!this.searchParams.status) {
                return '手续费'
            } else if(this.searchParams.status === 4) {
                return '手续费'
            } else if(this.searchParams.status === 3) {
                return '退回手续费'
            }
        }
    },
    data() {
        return {
            ruleForm: {
                alreadyMoney: null,
                deductMoney: null,
                dateTimeParams: ['', '']
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
            },
            searchParams: {
                status: 4
            }
        };
    },
    methods: {
        // 今日
        today() {
            this.changeIndex(0)
        },
        // 昨日
        yesterday() {
            this.changeIndex(1)
        },
        // 前天
        beforeYesterday() {
            this.changeIndex(2)
        },
        // 最近七日
        recentSeven() {
            this.changeIndex(3)
        },
        // 更改日期
        changeIndex(index) {
            console.log(index)
            let date = new Date()
            let now, now1, start, end;
            switch (index) {
                case 0:
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date, 'YYYY-MM-DD', false)
                    break;
                case 1:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    break;
                case 2:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    break;
                case 3:
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 6, 'YYYY-MM-DD', false)
                    break;
            }
            start = new Date(now + ' 00:00:00')
            if( index == 0) {
                end = new Date(timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false))
            } else {
                end = new Date(now1 + ' 23:59:59')
            }

            let time = [start.getTime(), end.getTime()]
            this.searchParams.dateTimeParams = time
            this.dateTimeParams.start_time = time[0]
            this.dateTimeParams.end_time = time[1]
            this.getList()
        },
        // 刷新列表
        getList() {
            if(this.$refs.tableList) {
                this.$refs.tableList.getData()
            }
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params ? params.page : null,
                status: s.status,
                user_number: s.user_number,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
                user_id: s.user_id,
                order_id: s.order_id,
                outer_trade_no: s.outer_trade_no,
                channel: s.channel
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
        onSearch() {
            this.getList()
        },
        // 列表返回数据
        saleAmunt(data) {
            this.ruleForm.alreadyMoney = data.totalmoney ? data.totalmoney : 0
            this.ruleForm.deductMoney = data.rate_money ? data.rate_money : 0
        },
        // 导出excel
        async BatchRurn() {
            let s = this.beforeSearch()
            delete s.page
            let res = await getCashHisityAll(s)
            let arr = JSON.parse(JSON.stringify(res.data.list))
            if(arr.length <= 0) return this.$warning('当前没有数据可以导出')
            arr = arr.map((item,index) => {
                let name = MAPDATA.STATUSLIST.find(a => { return a.value === item.status })
                let params = {
                    user_id: item.user_id,
                    addtime: timeFormat(item.addtime, 'YYYY-MM-DD HH:mm:ss', true),
                    money: item.money,
                    applyMoney: item.money / 100,
                    cash_rate: item.rate_money,
                    operate_time: item.operate_time ? timeFormat(item.operate_time, 'YYYY-MM-DD HH:mm:ss', true) : '无',
                    status: name.name,
                    toMoney: item.status != 3 ? item.real_money / 100 : item.money / 100,
                    toTime: item.status != 3 ? item.pay_time ? timeFormat(item.pay_time, 'YYYY-MM-DD HH:mm:ss', true) : '无' : item.remark,
                    order_id: item.order_id,
                    outer_trade_no: item.outer_trade_no,
                    admin_id: item.admin_id
                }
                return params
            })
            let nameList = [ '用户ID','申请时间', '扣除喵粮', '申请金额','手续费','处理时间','处理状态','到账金额/退回金额','到账时间/原因','交易单号','第三方交易单号','操作人' ]
            exportTableData(arr, nameList, '提现记录')
        }
    },
    created() {
        this.changeIndex(1)
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
