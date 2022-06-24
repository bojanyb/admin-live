// 商品列表
<template>
    <div class="jurisdiction-box">
        <div class="model">
            <el-button type="success" @click="add">新增</el-button>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>

        <add ref="add" v-if="isDestoryComp" @getList="getList" @destoryComp="destoryComp"></add>
    </div>
</template>

<script>
// 引入api
import { getAllPermission, deleteAdmin, editAdmin, adminStatus } from '@/api/admin.js'
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
// 引入新增组件
import add from './add/index.vue'

export default {
    components: {
        tableList,
        add
    },
    mixins: [mixins],
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.system.adminMenu,
                columns: [
                    {
                        label: '操作员ID',
                        prop: 'id'
                    },
                    {
                        label: '账号',
                        prop: 'username'
                    },
                    {
                        label: '操作员名称',
                        prop: 'nickname'
                    },
                    {
                        label: '操作员部门',
                        prop: 'department',
                        render: (h, params) => {
                            return h('span', params.row.department || '无')
                        }
                    },
                    {
                        label: '最后登录时间',
                        render: (h, params) => {
                            return h('span', params.row.last_login_time ? timeFormat(params.row.last_login_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        isSwitch: true,
                        isTrueValue: 1,
                        isFalseValue: 2,
                        disabledStatus: true,
                        disabledIndex: 0,
                        change: (v, row) => {
                            this.adminStatusFunc(row.id, v)
                        },
                        render: (h, params) => {
                            return h('span', '')
                        }
                    },
                    {
                        label: '操作',
                        width: '300px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'编辑'),
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.see(params.row)}}},'详情'),
                                h('el-button', { props : { type: 'danger'}, style: {
                                    display: params.row.username === 'admin' ? 'none' : 'unset'
                                }, on: {click:()=>{this.deleteData(params.row)}}},'删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: false // 销毁组件
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            return {
                page: params.page
            }
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
        },
        // 开启关闭
        async adminStatusFunc(admin_id, status) {
            await adminStatus({ admin_id, status })
            this.getList()
        },
        // 删除
        async deleteData(row) {
            let res = await deleteAdmin({ admin_id: row.id })
            if(res.code === 2000) {
                this.$message.success('删除成功')
            } else {
                this.$message.error('删除失败')
            }
            this.getList()
        },
        // 新增
        add() {
            this.load('add', 1)
        },
        // 修改
        update(row) {
            this.load('update', row.id)
        },
        // 查看
        see(row) {
            this.load('see', row.id)
        },
        async load(status, id) {
            let res;
            if(status === 'add') {
                res = await getAllPermission()
            } else {
                res = await editAdmin({admin_id: id})
            }
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.add.dialogVisible = true
                this.$refs.add.load(status, res.data)
            }, 100);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss">
.jurisdiction-box {
    padding: 20px;
    box-sizing: border-box;
    .model {
        margin-bottom: 20px;
    }
    .bounce_fa {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .bounce {
            position: absolute;
            left: 0;
            font-size: 17px;
            color: #ff4949;
            font-weight: 600;
            transform: translateY(5px);
            animation: bounce 1s infinite;
        }

        @keyframes bounce {
            0% {
                transform: translateY(5px);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(5px);
            }
        }
    }
}
</style>