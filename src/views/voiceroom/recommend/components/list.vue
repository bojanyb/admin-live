<template>
    <div class="bind-user-list-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </el-dialog>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
export default {
    props: {
        title: { // 标题
            type: String,
            default: ''
        }
    },
    components: {
        tableList
    },
    mixins: [mixins],
    computed: {
        cfgs() {
            let arr = [
                {
                    label: '用户昵称',
                    prop: ''
                },
                {
                    label: '用户ID',
                    prop: ''
                },
                {
                    label: '用户创建时间',
                    prop: ''
                },
                {
                    label: '用户充值金额',
                    prop: ''
                }
            ]
            const arr2 = [
                {
                    label: '今日获得收益',
                    prop: ''
                },
                {
                    label: '总收益',
                    prop: ''
                }
            ]
            const arr3 = [
                {
                    label: '主播昵称',
                    prop: ''
                },
                {
                    label: '主播ID',
                    prop: ''
                },
                {
                    label: '主播创建时间',
                    prop: ''
                },
                {
                    label: '主播收到礼物价值',
                    prop: '',
                    minWidth: '120px'
                }
            ]
            return {
                vm: this,
                url: REQUEST.message.list,
                columns: this.title.indexOf('用户') !== -1 ? [...arr, ...arr2] : [...arr3, ...arr2]
            }
        }
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                user_number: s.user_number
            }
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        add() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.messageComp.dialogVisible = true
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss">
.bind-user-list-box {
    padding: 20px;
    box-sizing: border-box;
    .el-dialog__body {
        padding-top: 10px;
    }
}
</style>