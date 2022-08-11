<template>
    <div class="activity-message-box">
        <div class="btnBox">
            <el-button type="success" @click="add">新增</el-button>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <messageComp v-if="isDestoryComp" ref="messageComp" @destoryComp="destoryComp" @getList="getList"></messageComp>
    </div>
</template>

<script>
// 引入api
import { messageDelete } from '@/api/videoRoom'
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
                url: REQUEST.message.list,
                columns: [
                    {
                        label: '活动标题',
                        render: (h, params) => {
                            return h('span', params.row.title || '无')
                        }
                    },
                    {
                        label: '活动描述',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.describe || '无')
                        },
                        showOverFlow: true
                    },
                    {
                        label: '活动配图',
                        isimg: true,
                        prop: 'image_url',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '活动链接',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.nav_to.uri || '无')
                        }
                    },
                    {
                        label: '推送时间',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '创建时间',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '创建人',
                        render: (h, params) => {
                            return h('span', params.row.nickname || '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.messageDelete(params.row.id)}}}, '删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: false // 是否销毁组件
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
        // 新增
        add() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.messageComp.dialogVisible = true
            }, 50);
        },
        // 删除
        async messageDelete(id) {
            let res = await messageDelete({ id })
            if(res.code === 2000) {
                this.$message.success('删除成功')
            }
            this.getList()
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