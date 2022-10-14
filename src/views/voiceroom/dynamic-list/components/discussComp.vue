<template>
    <div class="dynamic-list-discussComp-box">
        <el-dialog
        title="评论详情"
        :visible.sync="dialogVisible"
        width="750px"
        :before-close="handleClose"
        @closed="closed">
            <div class="mainBox">
                <!-- <div class="searchParams">
                    <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
                </div> -->

                <tableList :cfgs="cfgs" ref="tableList"></tableList>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { deleteMsg } from '@/api/dynamic.js'
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
    props: {
        msg_id: { // 动态id
            type: Number,
            default: null
        }
    },
    components: {
        SearchPanel,
        tableList
    },
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.dynamic.msgList,
                columns: [
                    {
                        label: '评论时间',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '评论用户ID',
                        prop: 'user_number',
                    },
                    {
                        label: '评论用户昵称',
                        prop: 'nickname',
                    },
                    {
                        label: '评论内容',
                        prop: 'content',
                        showOverFlow: true,
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
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
            return {
                page: params.page,
                pagesize: params.size,
                moments_id: this.msg_id
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.dateTimeParams = {}
            this.getList()
        },
        // 删除
        async deleteParams(id) {
            this.$confirm('确认删除当前评论吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await deleteMsg({ msg_id: id })
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
        // 关闭弹窗
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.dynamic-list-discussComp-box {

}
</style>