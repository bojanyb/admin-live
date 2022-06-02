// 端午活动配置
<template>
    <div class="zzbxActivity-allocation">
        <el-button class="add" v-if="list.length < 1" type="success" @click="handleAdd">新增</el-button>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
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

import { getActivetyGiftADelete } from '@/api/videoRoom'
import { configDW } from '@/api/userActivity'

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
                url: REQUEST.platformActivity.Activityins,
                columns: [
                    {
                        label: '活动名称',
                        prop: 'name',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        label: '活动状态',
                        render: (h, params) => {
                            let start = params.row.start_time * 1000
                            let end = params.row.end_time * 1000
                            let now = new Date().getTime()
                            if(start > now && end > now) {
                                return h('span',{style: {color: 'green'},}, '未开始')
                            } else if(start < now && end > now) {
                                return h('span',{style: {color: 'green'},}, '开始中')
                            }
                            if(end < now) {
                                return h('span',{style: {color: 'red'},}, '结束')
                            }
                        }
                    },
                    {
                        label: '活动图',
                        prop: 'icon',
                        isimg: true,
                        imgWidth: '50px'
                    },
                    {
                        label: '外部链接',
                        prop: 'url',
                        width: '200'
                    },
                    {
                        label: '开始时间',
                        prop: 'start_time',
                        width: '160',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '结束时间',
                        prop: 'end_time',
                        width: '160',
                        render: (h, params) => {
                            return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '操作',
                        width: '350',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'修改'),
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.see(params.row)}}},'查看'),
                                h('el-button', { props : { type: 'danger'}, style: {
                                    display: new Date().getTime() < params.row.end_time * 1000 ? 'unset' : 'none'
                                }, on: {click:()=>{this.freeze(params.row)}}}, '冻结'),
                                h('el-button', { props : { type: 'danger'}, style: {
                                    display: new Date().getTime() > params.row.end_time * 1000 ? 'unset' : 'none'
                                }, on: {click:()=>{this.deleteFunc(params.row)}}},'删除'),
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
                pagesize: params.size,
                code: 'dw'
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
        },
        // 冻结
        freeze(row) {
            this.$confirm('确认冻结当前活动？')
            .then(_ => {
                row.end_time = Math.floor(new Date().getTime() / 1000)
                configDW(row).then(data => {
                    row.gifts = data.data.list
                    this.$message.success('冻结成功!')
                    this.getList()
                }).catch(err => {
                    this.$message.error('冻结失败!')
                })
            })
            .catch(_ => {});
        },
        // 删除
        deleteFunc(row) {
            this.$confirm('确认删除当前活动？')
            .then(_ => {
                getActivetyGiftADelete({id: row.id}).then(res => {
                    this.$message.success('删除成功!')
                    this.getList()
                }).catch(err => {
                    this.$message.error('删除失败!')
                })
            })
        },
        // 获取列表数据
        saleAmunt(data) {
            this.list = data.list
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