<template>
    <div class="dynamic-list-discussComp-box">
        <el-dialog
        title="评论详情"
        :visible.sync="dialogVisible"
        width="900px"
        :before-close="handleClose">
            <div class="mainBox">
                <div class="searchParams">
                    <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
                </div>

                <tableList :cfgs="cfgs" ref="tableList"></tableList>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
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
        tableList
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
                        type: 1,
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '180px'
                    },
                    {
                        label: '操作',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '评论详情'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
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
            this.dateTimeParams = {}
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
        }
    }
}
</script>

<style lang="scss">
.dynamic-list-discussComp-box {

}
</style>