<template>
    <div class="activity-message-box">
        <div class="btnBox">
            <el-button type="success" @add="add">新增</el-button>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <messageComp v-if="isDestoryComp" ref="messageComp" @destoryComp="destoryComp" @getList="getList"></messageComp>
    </div>
</template>

<script>
// 引入新增组件
import messageComp from './components/messageComp.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        tableList,
        messageComp
    },
    mixins: [mixins],
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.diamondRecharge.list,
                columns: [
                    {
                        label: '活动标题',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '活动配图',
                        isimg: true,
                        prop: 'face',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '活动链接',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '推送时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '创建时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '创建人',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: false
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                user_number: s.user_number,
                sort: s.sort
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

<style lang="scss" scoped>
.activity-message-box {
    padding: 20px;
    box-sizing: border-box;
    .btnBox {
        margin-bottom: 20px;
    }
}
</style>