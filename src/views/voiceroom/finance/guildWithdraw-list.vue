// 充值记录
<template>
    <div class="finance-guildWithdraw-list">
        <div class="model">
            <span>充值人数{{ ruleForm.recharge_user_count || 0 }}人</span>
            <span>已支付金额{{ Number(ruleForm.recharge_amount) / 100 || 0 }}元</span>
            <span>已退款金额{{ Number(ruleForm.refund_amount) / 100 || 0 }}元</span>
            <span>未支付金额{{ Number(ruleForm.no_recharge_amount) / 100 || 0 }}元</span>
        </div>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :showYesterday="true" :showBigBeforeYesterday="true"
            :showCurrentWeek = "true" :showToday="true" :show-batch-rurn="true" :showBeforeYesterday="true"  batchRurnName="导出EXCEL" @onReset="reset" @onSearch="onSearch" @yesterday="yesterday" @bigBeforeYesterday = "bigBeforeYesterday"
            @currentWeek="currentWeek" @today="today" @BatchRurn="BatchRurn" @beforeYesterday="beforeYesterday"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
    </div>
</template>

<script>
// 引入api
import { diamondRechargeAll } from '@/api/finance.js'
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
import moment from 'moment'

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
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'amount',
                    type: 'input',
                    value: '',
                    label: '充值金额',
                    placeholder: '请输入充值金额'
                },
                {
                    name: 'channel',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '充值平台',
                    placeholder: '请选择',
                    options: MAPDATA.INSTITUTION
                },
                {
                    name: 'status',
                    type: 'select',
                    value: '1',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '充值状态',
                    placeholder: '请选择',
                    options: MAPDATA.ORDERSTATUS
                },
                {
                    name: 'purpose',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '充值类型',
                    placeholder: '请选择',
                    options: MAPDATA.RECHARGEHISTORYTYPELIST
                },
                
                {
                    name: 'trade_no',
                    type: 'input',
                    value: '',
                    label: '交易单号',
                    placeholder: '请输入交易单号'
                },
                // {
                //     name: 'time',
                //     type: 'dateControl',
                //     label: '时间选择',
                // },
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
                url: REQUEST.diamondRecharge.list,
                columns: [
                    {
                        label: '充值时间',
                        minWidth: '150px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '用户ID',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '用户昵称',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.nickname || '无')
                        }
                    },
                    {
                        label: '充值金额（元）',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.amount / 100)
                        }
                    },
                    {
                        label: '充值类型',
                        minWidth: '100px',
                        render: (h, params) => {
                            let data = MAPDATA.RECHARGEHISTORYTYPELIST.find(item => { return item.value === params.row.purpose })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '充值说明',
                        prop: 'remark',
                        render: (h, params) => {
                            return h('span', params.row.remark || '无')
                        }
                    },
                    {
                        label: '充值平台',
                        render: (h, params) => {
                            return h('span', params.row.channel)
                        }
                    },
                    {
                        label: '充值状态',
                        render: (h, params) => {
                            let data = MAPDATA.ORDERSTATUS.find(item => { return item.value.indexOf(params.row.status) !== -1 })
                            let text = MAPDATA.ORDERREFUNDSTATUSLIST.find(item => { return item.value === params.row.refund_status })
                            let name;
                            if(params.row.status === 1) {
                                name = data ? data.name + '（' + text.name + '）' : '无'
                            } else {
                                name = data ? data.name : '无'
                            }
                            return h('span', name)
                        }
                    },
                    // {
                    //     label: '到账时间',
                    //     minWidth: '150px',
                    //     render: (h, params) => {
                    //         return h('span', params.row.pay_time ? timeFormat(params.row.pay_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    //     }
                    // },
                    {
                        label: '交易单号',
                        minWidth: '150px',
                        prop: 'trade_no'
                    },
                    // {
                    //     label: '商户单号',
                    //     minWidth: '150px',
                    //     render: (h, params) => {
                    //         return h('span', params.row.out_trade_no || '无')
                    //     }
                    // }
                ]
            }
        }
    },
    data() {
        return {
            ruleForm: {
                allMoney: null
            },
            searchParams: {
                dateTimeParams: ['', '']
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
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
        // 大前天
        bigBeforeYesterday(){
            this.changeIndex(3)
        },
        // 本周
        currentWeek(){
            this.changeIndex(4)
        },
        // 更改日期
        changeIndex(index) {
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
                    now = timeFormat(date - 3600 * 1000 * 24 * 3, 'YYYY-MM-DD', false)
                    break;
                case 4:
                    let week =  this.getCurrWeekDays()
                    now1 = week.endtime
                    now = week.starttime
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
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params ? params.page : null,
                user_number: s.user_number,
                channel: s.channel,
                status: s.status,
                amount: s.amount ? Number(s.amount) * 100 : s.amount,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
                trade_no: s.trade_no,
                purpose: s.purpose
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
        // 重置
        reset() {
            this.searchParams = {
                status: '1'
            }
            this.dateTimeParams = {}
            this.changeIndex(0)
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 列表返回数据
        saleAmunt(data) {
            this.ruleForm = { ...data }
        },
        // 导出excel
        async BatchRurn() {
            let s = this.beforeSearch()
            delete s.page
            let res = await diamondRechargeAll(s)
            let arr = JSON.parse(JSON.stringify(res.data.list))
            if(arr.length <= 0) return this.$warning('当前没有数据可以导出')
            arr = arr.map((item,index) => {
                let name = MAPDATA.RECHARGEHISTORYTYPELIST.find(a => { return a.value === item.purpose })
                let text = MAPDATA.ORDERREFUNDSTATUSLIST.find(a => { return a.value === item.refund_status })
                let status = MAPDATA.ORDERSTATUS.find(a => { return a.value.indexOf(item.status) !== -1 })
                let params = {
                    create_time: timeFormat(item.create_time, 'YYYY-MM-DD HH:mm:ss', true),
                    user_number: item.user_number,
                    nickname: item.nickname,
                    amount: item.amount / 100,
                    type: name.name,
                    remark: item.remark,
                    channel: item.channel,
                    status: item.status === 1 ? status.name + '（' + text.name + '）' : status.name,
                    trade_no: item.trade_no
                }
                return params
            })
            let nameList = [ '充值时间', '用户ID', '用户昵称', '充值金额（元）', '充值类型', '充值说明', '充值平台', '充值状态', '交易单号' ]
            exportTableData(arr, nameList, '充值记录')
        },
         // 获取当前周的开始结束时间
        getCurrWeekDays() {
            let obj = {
                starttime: '',
                endtime: ''
            }
            obj.starttime = moment(moment().week(moment().week()).startOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD')
            obj.endtime = moment(moment().week(moment().week()).endOf('week').add(1, 'days').valueOf()).format('YYYY-MM-DD');
            return obj
        },
    },
    created() {
        let time = new Date()
        let date = timeFormat(time, 'YYYY-MM-DD', false)
        let start = new Date(date + ' 00:00:00').getTime()
        let end = new Date(timeFormat(time, 'YYYY-MM-DD HH:mm:ss', false))
        this.searchParams.dateTimeParams = [start, end]
        this.dateTimeParams = {
            start_time: start,
            end_time: end
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
