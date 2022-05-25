// 转转宝箱统计
<template>
    <div class="zzbxActivity-history">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="historyBx">
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-card class="sumBox">
                    <div class="sumBoxItem fl">活动开箱次数：{{ruleForm.baoxiang_open_count}}</div>
                    <div class="sumBoxItem fl">活动投入：{{ruleForm.baoxiang_in}}</div>
                    <div class="sumBoxItem fl">活动产出：{{ruleForm.baoxiang_out}}</div>
                    <div class="sumBoxItem fl">活动投入产出比：{{ruleForm.output_proportion}}</div>
                </el-card>
            </el-col>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
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
                url: REQUEST.zzbxActivity.history,
                isShowIndex: true,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '活动类型',
                        render: (h, params) => {
                            let name = ''
                            if(JSON.stringify(this.searchParams) === '{}') {
                                name = this.activityList[0].name
                            } else {
                                name = this.activityList.find(item => { return item.id === this.searchParams.activity_type_id }).name
                            }
                            return h('span', name)
                        }
                    },
                    {
                        label: '活动类别',
                        render: (h, params) => {
                            return h('span', params.row.type === 1 ? '背包' : '派对')
                        }
                    },
                    {
                        label: '开箱次数',
                        prop: 'user_open_count'
                    },
                    {
                        label: '幸运礼物',
                        prop: 'big_gift_count'
                    },
                    {
                        label: '投入',
                        prop: 'user_out'
                    },
                    {
                        label: '产出',
                        prop: 'user_in'
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
        // 列表返回
        saleAmunt(data) {
            this.ruleForm = data.baoxiang;
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
    .sumBox {
        display: flex;
        width: 100%;
        margin-bottom: 20px;
        .el-card__body {
            width: 100%;

            .sumBoxItem {
                width: 25%;
                text-align: center;
                border-right: solid 1px #DCDCDC;
            }

            .sumBoxItem:last-child {
                border-right: none;
            }
        }
    }
}
</style>