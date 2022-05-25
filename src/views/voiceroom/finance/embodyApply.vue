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
                    label: '排序',
                    placeholder: '请选择',
                    options: this.activityList
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                // url: REQUEST.zzbxActivity.detail,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '申请提现时间',
                        prop: 'nickname'
                    },
                    {
                        label: '喵粮',
                        prop: 'activity_name'
                    },
                    {
                        label: '手续费',
                        prop: 'activity_name'
                    },
                    {
                        label: '提现金额',
                        prop: 'activity_name'
                    },
                    {
                        label: '提现卡号',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '状态',
                        render: (h, params) => {
                            return h('span', '背包')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('span', '通过'),
                                h('span', '驳回')
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
            },
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