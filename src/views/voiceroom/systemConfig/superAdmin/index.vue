// 转转宝箱(背包内) 活动配置
<template>
    <div class="superAdmin-box">
        <el-button class="add" type="success" @click="handleAdd">新增</el-button>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>

        <addComp ref="addComp" :list="list" v-if="isDestoryComp" @getList="getList" @destoryComp="destoryComp"></addComp>
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

import { getActivetyGiftADelete, getActivetyGiftSave, getActivetyHasGiftList } from '@/api/videoRoom'

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
                url: REQUEST.userActivity.zzbxActivity.list,
                columns: [
                    {
                        label: '超管ID',
                        props : 'name',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        label: '处罚次数',
                        render: (h, params) => {
                            return h('span', params.row.type === 1 ? '背包' : '派对')
                        }
                    },
                    {
                        label: '最后一次登录时间',
                        props : 'start_time',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '状态',
                        // props : 'status',
                        isSwitch: true
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.deleteFunc(params.row)}}},'删除'),
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
            this.load('add')
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addComp.loadParams(status, row)
            }, 100);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 删除
        deleteFunc(row) {
            this.$confirm('是否确认删除？')
            .then(_ => {
                getActivetyGiftADelete({id: row.id}).then(res => {
                    this.$message.success('删除成功!')
                    this.getList()
                }).catch(err => {
                    this.$message.error('删除失败!')
                })
            })
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