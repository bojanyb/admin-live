// 转转宝箱记录
<template>
    <div class="zzbxActivity-history">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
    </div>
</template>

<script>
import { getActivetyList } from '@/api/videoRoom'
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
                    name: 'activity_type_id',
                    type: 'select',
                    value: 1,
                    keyName: 'id',
                    optionLabel: 'name',
                    label: '活动类型',
                    placeholder: '请选择',
                    options: this.activityList
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
                    name: 'relation_trade_no',
                    type: 'input',
                    value: '',
                    label: '交易流水ID',
                    isNum: true,
                    placeholder: '请输入交易流水ID'
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
                url: REQUEST.userActivity.zzbxActivity.detail,
                columns: [
                    {
                        label: '抽奖人ID',
                        prop: 'user_number'
                    },
                    {
                        label: '抽奖人昵称',
                        prop: 'nickname'
                    },
                    {
                        label: '宝箱类型',
                        prop: 'activity_name'
                    },
                    {
                        label: '交易时间',
                        minWidth: '140px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '交易类型',
                        render: (h, params) => {
                            return h('span', params.row.type === 1 ? '背包' : '派对')
                        }
                    },
                    {
                        label: '礼物ID',
                        prop: 'gift_id'
                    },
                    {
                        label: '礼物名称',
                        prop: 'gift_name'
                    },
                    {
                        label: '礼物数量',
                        prop: 'number'
                    },
                    {
                        label: '礼物价值',
                        prop: 'gift_diamond'
                    },
                    {
                        label: '交易流水',
                        prop: 'relation_trade_no',
                        minWidth: '160px'
                    }
                ]
            }
        }
    },
    data() {
        return {
            ruleForm: {},
            activityList: []
        };
    },
    methods: {
        // 获取活动类型
        async getActivityList() {
            let res = await getActivetyList()
            this.activityList = res.data.list
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
                user_number: s.user_number,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
                activity_type: 2,
                activity_type_id: s.activity_type_id ? s.activity_type_id : 1
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
        }
    },
    created() {
        this.getActivityList()
    }
}
</script>

<style lang="scss">
.zzbxActivity-history {
    padding: 20px;
    box-sizing: border-box;
}
</style>