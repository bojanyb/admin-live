<!-- 回收记录 -->
<template>
    <div class="shop-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
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
import { timeFormat } from "@/utils/common.js";
export default {
    components: {
        tableList,
        SearchPanel,
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'number',
                    type: 'input',
                    value: '',
                    label: '回收靓号ID',
                    placeholder: '请输入回收靓号ID'
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '被回收人原ID',
                    placeholder: '请输入被回收人原ID'
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    label: '回收时间',
                    value: '',
                    linkage: true,
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
                url: REQUEST.prettyNumber.recycleLog,
                columns: [
                    {
                        label: '回收靓号ID',
                        prop: 'number'
                    },
                    {
                        label: '靓号类型',
                        prop: 'category'
                    },
                    {
                        label: '被回收人原ID',
                        prop: 'old_number'
                    },
                    {
                        label: '被回收人昵称',
                        prop: 'nickname'
                    },
                    {
                        label: '回收原因',
                        prop: 'reason',
                        showOverFlow: true,
                    },
                    {
                        label: '操作人昵称',
                        prop: 'operator_nickname'
                    },
                    {
                        label: '回收时间',
                        prop: 'create_time',
                        render: (h, params) => {
                            let create_time = params.row.create_time !== "" ? timeFormat(params.row.create_time * 1000) : "--"
                            return  h('span', create_time ? create_time : '--')
                        }
                    },
                ]
            }
        },
    },
    data() {
        return {
            searchParams: {
                user_number: "",
                number: "",
            },
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
                pagesize: params.size,
                user_number: s.user_number,
                number: s.number,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
            }
        },
        // 设置时间段
        setDateTime(arr) {
            const date = arr ? { start_time: arr[0], end_time: arr[1]} : {}
            this.$set(this, 'dateTimeParams', date)
        },
        // 清空日期选择
        emptyDateTime() {
            this.dateTimeParams = {}
        },
        // 查询
        reset() {
            this.searchParams = {
              category: 0,
              name: ''
            }
            this.dateTimeParams = {
                activity_type_id: 1
            }
            this.getList()
        },
        // 重置
        onSearch() {
            this.getList()
        },
    }
}
</script>

<style lang="scss">
.shop-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>