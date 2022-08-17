// 超管列表
<template>
    <div class="superAdmin-box">
        <el-button class="add" type="success" @click="handleAdd">新增</el-button>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>

        <addComp ref="addComp" v-if="isDestoryComp" @getList="getList" @destoryComp="destoryComp"></addComp>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入新增/修改
import addComp from './add/index.vue'
// 引入api
import { setSuperUser } from '@/api/super'

export default {
    components: {
        tableList,
        addComp
    },
    data() {
        return {
            status: 'add',
            isDestoryComp: false,
            list: []
        }
    },
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.system.super.superUserList,
                columns: [
                    {
                        label: '超管ID',
                        prop: 'user_number'
                    },
                    {
                        label: '处罚次数',
                        prop: 'punish_count'
                    },
                    {
                        label: '最后一次登录时间',
                        render: (h, params) => {
                            return h('span', params.row.last_login ? timeFormat(params.row.last_login, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        isSwitch: true,
                        isTrueValue: 1,
                        isFalseValue: 0,
                        change: (v, row) => {
                            this.setSuperUserFunc(row.user_number, v)
                        },
                        render: (h, params) => {
                            return h('span', '')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.setSuperUserFunc(params.row.user_number, 2)}}},'删除'),
                            ])
                        }
                    },
                ]
            }
        }
    },
    methods:{
        // 配置参数
        beforeSearch(params) {
            return {
                page: params.page,
                pagesize: params.size
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 新增
        handleAdd() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addComp.dialogVisible = true
            }, 100);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 启用 - 关闭
        async setSuperUserFunc(user_number, status) {
            if(status === 2) {
                this.$confirm('是否确认删除？')
                .then(async _ => {
                    let res = await setSuperUser({ user_number, status })
                    if(res.code === 2000) {
                        this.$message.success('删除成功')
                    }
                    this.getList()
                })
            } else {
                await setSuperUser({ user_number, status })
                this.getList()
            }
        },
        // 删除
        deleteFunc(row) {
            
        }
    }
}
</script>

<style lang="scss">
.superAdmin-box {
    padding: 20px;
    box-sizing: border-box;
    .tableList {
        margin-top: 22px;
    }
}
</style>