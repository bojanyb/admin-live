// 转转宝箱(背包内)
<template>
    <div class="zzbxActivity-allocation">
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

export default {
    components: {
        tableList,
        addComp
    },
    data() {
        return {
            status: 'add',
            isDestoryComp: false
        }
    },
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.zzbxActivity.list,
                columns: [
                    {
                        label: '活动名称',
                        props : 'name',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        label: '活动类别',
                        render: (h, params) => {
                            return h('span', '背包')
                        }
                    },
                    {
                        label: '礼物种类数量',
                        props : 'gift_count',
                        render: (h, params) => {
                            return h('span', params.row.gift_count)
                        }
                    },
                    {
                        label: '投入',
                        props : 'in',
                        render: (h, params) => {
                            return h('span', params.row.in)
                        }
                    },
                    {
                        label: '产出',
                        props : 'out',
                        render: (h, params) => {
                            return h('span', params.row.out)
                        }
                    },
                    {
                        label: '单次消耗喵粮数',
                        props : 'cost',
                        render: (h, params) => {
                            return h('span', params.row.cost)
                        }
                    },
                    {
                        label: '活动状态',
                        props : 'status',
                        render: (h, params) => {
                            if(params.row.status === 1) {
                                return h('span',{style: {color: 'green'},}, '开始中')
                            }
                            return h('span',{style: {color: 'red'},}, '暂停')
                        }
                    },
                    {
                        label: '开始时间',
                        props : 'start_time',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '结束时间',
                        props : 'end_time',
                        render: (h, params) => {
                            return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '操作',
                        width : '260',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'修改'),
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.see(params.row)}}},'查看'),
                                h('el-button', { props : { type: params.row.status == 1 ? 'danger' : 'success'}, on: {click:()=>{this.handleChange(params.row)}}},(params.row.status == 1 ? '暂停' : '开始')),
                            ])
                        }
                    },
                ]
            }
        }
    },
    methods:{
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 新增
        handleAdd() {
            this.load('add')
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        // 查看
        see(row) {
            this.load('see', row)
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
        }
    }
}
</script>

<style lang="scss">
.zzbxActivity-allocation {
    padding: 20px;
    box-sizing: border-box;
    .el-form {
        .el-input {
            width: 300px;
        }
    }
    .tableList {
        margin-top: 22px;
    }
}
</style>