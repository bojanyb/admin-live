// 提现申请
<template>
    <div class="finance-embodyApply">
        <div class="model">
            <span>未处理申请：{{ ruleForm.untreated || 0 }}条</span>
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
import { doCash } from '@/api/finance'
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
                    name: 'sort',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '排序',
                    placeholder: '请选择',
                    options: MAPDATA.EMBODYSORT
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.CashHisity.apply,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_id'
                    },
                    {
                        label: '申请提现时间',
                        render: (h, params) => {
                            return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '喵粮',
                        prop: 'money',
                    },
                    {
                        label: '手续费',
                        prop: 'cash_rate',
                        render: (h, params) => {
                            let money = Math.floor((params.row.money / 10000 * params.row.cash_rate).toFixed(5) * 100) / 100
                            return h('span', money)
                        }
                    },
                    {
                        label: '提现金额',
                        render: (h, params) => {
                            return h('span', params.row.money / 100)
                        }
                    },
                    {
                        label: '到账金额',
                        render: (h, params) => {
                            return h('span', params.row.orderDetails.money / 100)
                        }
                    },
                    {
                        label: '提现卡号',
                        prop: 'card_id'
                    },
                    {
                        label: '状态',
                        render: (h, params) => {
                            let paramsData = MAPDATA.STATUSLIST.find(item => { return item.value === params.row.status })
                            return h('span', paramsData ? paramsData.name : '--')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.doCashFunc(params.row, 'success')}}}, '通过'),
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.doCashFunc(params.row, 'reject')}}}, '驳回')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            ruleForm: {
                untreated: null
            }
        };
    },
    methods: {
        // 获取活动类型
        async doCashFunc(row, type) {
            let params = {
                id: row.id,
                status: type === 'success' ? 2 : 3
            }
            let res = await doCash(params)
            if(res.code === 0) {
                let message = type === 'success' ? '通过审核' : '驳回成功'
                this.$message.success(message)
            }
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
                page: params.page,
                pagesize: params.size,
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
            this.ruleForm.untreated = data.count
        }
    }
}
</script>

<style lang="scss">
.finance-embodyApply {
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