<template>
    <div class="app-container dynamic-list-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" :showYesterday="true" :showRecentSeven="true" :showToday="true" @yesterday="yesterday" @recentSeven="recentSeven" @today="today"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 详情组件 -->
        <discussComp v-if="isDestoryComp" ref="discussComp" :msg_id="msg_id" @destoryComp="destoryComp"></discussComp>
    </div>
</template>

<script>
// 详情组件
import discussComp from './components/discussComp.vue'
// 引入api
import { delMoments } from '@/api/dynamic'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        discussComp
    },
    data() {
        return {
            msg_id: null,
            isDestoryComp: false, // 是否销毁组件
            searchParams: {
                dateTimeParams: []
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
            }
        };
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
                url: REQUEST.dynamic.getMoments,
                columns: [
                    {
                        label: '发送时间',
                        prop: 'create_time',
                        minWidth: '100px'
                    },
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                        prop: 'user_nickname'
                    },
                    {
                        label: '动态内容',
                        minWidth: '120px',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.content || '无')
                        }
                    },
                    {
                        label: '动态图片',
                        isimgList: true,
                        prop: 'media_list',
                        type: 'media_type',
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '180px'
                    },
                    {
                        label: '评论数量',
                        prop: 'msg_number'
                    },
                    {
                        label: '操作',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.seeDetails(params.row.id)}}}, '评论详情'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 今日
        today() {
            this.changeIndex(0)
            this.getList()
        },
        // 昨日
        yesterday() {
            this.changeIndex(1)
            this.getList()
        },
        // 最近七日
        recentSeven() {
            this.changeIndex(2)
            this.getList()
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
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 6, 'YYYY-MM-DD', false)
                    break;
            }
            start = new Date(now + ' 00:00:00')
            end = new Date(now1 + ' 23:59:59')

            let time = [start.getTime(), end.getTime()]
            this.searchParams.dateTimeParams = time
            this.dateTimeParams.start_time = time[0]
            this.dateTimeParams.end_time = time[1]
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
                user_number: s.user_number
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
            // this.dateTimeParams = {}
            this.changeIndex(0)
            this.getList()
        },
        // 删除
        async deleteParams(id) {
            this.$confirm('确认删除当前动态吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await delMoments({ ids: id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 查看详情
        seeDetails(id) {
            this.msg_id = id
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.discussComp.dialogVisible = true
            }, 50);
        },
        destoryComp() {
            this.isDestoryComp = false
        }
    },
    created() {
        this.changeIndex(0)
    }
}
</script>

<style lang="scss" scoped>
    
</style>