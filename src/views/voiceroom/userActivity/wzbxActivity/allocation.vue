// 转转宝箱(背包内) 活动配置
<template>
    <div class="zzbxActivity-allocation">
        <el-button class="add" v-if="list.length < 3" type="success" @click="handleAdd">新增</el-button>
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
                        label: '活动名称',
                        minWidth: '100px',
                        props: 'name',
                        render: (h, params) => {
                            return h('span', params.row.name)
                        }
                    },
                    {
                        label: '活动类别',
                        render: (h, params) => {
                            return h('span', params.row.type === 1 ? '背包' : '派对')
                        }
                    },
                    {
                        label: '礼物种类数量',
                        minWidth: '120px',
                        props: 'gift_count',
                        render: (h, params) => {
                            return h('span', params.row.gift_count)
                        }
                    },
                    {
                        label: '投入',
                        minWidth: '100px',
                        props: 'in',
                        render: (h, params) => {
                            return h('span', params.row.in)
                        }
                    },
                    {
                        label: '产出',
                        minWidth: '100px',
                        props: 'out',
                        render: (h, params) => {
                            return h('span', params.row.out)
                        }
                    },
                    {
                        label: '单次消耗喵粮数',
                        minWidth: '120px',
                        props: 'cost',
                        render: (h, params) => {
                            return h('span', params.row.cost)
                        }
                    },
                    {
                        label: '活动状态',
                        props: 'status',
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
                        label: '开始时间',
                        props: 'start_time',
                        minWidth: '160px',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '结束时间',
                        props: 'end_time',
                        minWidth: '160px',
                        render: (h, params) => {
                            return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '操作',
                        minWidth: '300px',
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
                type: 2
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
                getActivetyHasGiftList({ activity_id: row.id }).then(data => {
                    row.gifts = data.data.list
                    getActivetyGiftSave(row).then(res => {
                        this.$message.success('冻结成功!')
                        this.getList()
                    }).catch(err => {
                        this.$message.error('冻结失败!')
                    })
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