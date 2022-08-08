<template>
    <div class="bind-user-list-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="800px"
        :close-on-click-modal="false"
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
        },
        pid: { // pid
            type: String,
            default: ''
        },
        setting_flg: {
            type: Number,
            default: null
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
                    prop: 'nickname'
                },
                {
                    label: '用户ID',
                    prop: 'user_number'
                },
                {
                    label: '用户创建时间',
                    minWidth: '140px',
                    render: (h, params) => {
                        return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                    }
                },
                {
                    label: '用户充值金额',
                    minWidth: '120px',
                    prop: 'today_in'
                }
            ]
            const arr2 = [
                {
                    label: '今日获得收益',
                    minWidth: '120px',
                    prop: 'today_gain'
                },
                {
                    label: '总收益',
                    prop: 'total_gain'
                }
            ]
            const arr3 = [
                {
                    label: '主播昵称',
                    prop: 'nickname'
                },
                {
                    label: '主播ID',
                    prop: 'user_number'
                },
                {
                    label: '主播创建时间',
                    minWidth: '140px',
                    render: (h, params) => {
                        return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                    }
                },
                {
                    label: '主播收到礼物价值',
                    prop: 'today_in',
                    minWidth: '120px'
                }
            ]
            return {
                vm: this,
                url: REQUEST.userHistory.recommendDetail,
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
            return {
                page: params.page,
                pagesize: params.size,
                pid: this.pid,
                setting_flg: this.setting_flg
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