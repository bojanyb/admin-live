<template>
    <div class="app-container moveDating-history-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @rowClick="rowClick"></tableList>

        <!-- 详情组件 -->
        <historyComp ref="historyComp"></historyComp>
    </div>
</template>

<script>
// 引入详情组件
import historyComp from './components/historyComp.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        historyComp
    },
    data() {
        return {

        }
    },
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
                    name: 'live_user_number',
                    type: 'input',
                    value: '',
                    label: '主播ID',
                    isNum: true,
                    placeholder: '请输入主播ID'
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
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                        }
                    }
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.move.heartOrder,
                columns: [
                    {
                        label: '时间',
                        prop: 'create_time'
                    },
                    {
                        label: '用户',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.nickname),
                                h('div', params.row.user_number)
                            ])
                        }
                    },
                    {
                        label: '主播',
                        prop: 'live_user_number',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.live_nickname),
                                h('div', params.row.live_user_number)
                            ])
                        }
                    },
                    {
                        label: '通话时长',
                        prop: 'duration'
                    },
                    {
                        label: '收益金额',
                        prop: 'order_dot'
                    }
                ]
            }
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                page_size: params.size,
                user_number: s.user_number,
                live_user_number: s.live_user_number,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
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
            this.searchParams = {}
            this.dateTimeParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 查看
        rowClick(row) {
            this.$refs.historyComp.loadParams(row)
        }
    }
}
</script>

<style lang="scss">
.moveDating-history-box {

}
</style>