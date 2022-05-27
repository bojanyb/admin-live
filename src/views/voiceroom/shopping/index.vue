// 商品列表
<template>
    <div class="shopping-box">
        <div class="model">
            <el-button type="success" @click="add">新增</el-button>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>

        <add ref="add" v-if="isDestoryComp" @onSearch="onSearch" @destoryComp="destoryComp"></add>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入api
import { down } from '@/api/shopping.js'
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
                url: REQUEST.shopping.list,
                columns: [
                    {
                        label: '商品类型',
                        render: (h, params) => {
                            let data = MAPDATA.SHOPPING.find(item => { return item.value === params.row.goods_type })
                            return h('span', data ? data.name : '--')
                        }
                    },
                    {
                        label: '商品ID',
                        prop: 'id'
                    },
                    {
                        label: '商品名称',
                        prop: 'goods_name'
                    },
                    {
                        label: '商品收入',
                        prop: 'in'
                    },
                    {
                        label: '上架时间',
                        render: (h, params) => {
                            return h('span', params.row.up_time ? timeFormat(params.row.up_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '上架人',
                        render: (h, params) => {
                            return h('span', params.row.up_user ? params.row.up_user : '--')
                        }
                    },
                    {
                        label: '修改人',
                        render: (h, params) => {
                            return h('span', params.row.update_user ? params.row.update_user : '--')
                        }
                    },
                    {
                        label: '修改时间',
                        render: (h, params) => {
                            return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'修改'),
                                h('el-button', { props : { type: 'danger'}, style: {
                                    display: params.row.status === 1 ? 'none' : 'unset'
                                }, on: {click:()=>{this.down(params.row, 1)}}},'上架'),
                                h('el-button', { props : { type: 'danger'}, style: {
                                    display: params.row.status === 2 ? 'none' : 'unset'
                                }, on: {click:()=>{this.down(params.row, 2)}}},'下架')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            ruleForm: {
                alreadyMoney: null,
                deductMoney: null
            },
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
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params.page,
                status: s.status,
                user_number: s.user_number,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
                user_id: s.user_id,
                order_id: s.order_id,
                sort: s.sort
            }
        },
        // 设置时间段
        setDateTime(arr) {
            const date = arr ? {
                start_time: arr[0],
                end_time: arr[1]
            } : {}
            this.$set(this, 'dateTimeParams', date)
        },
        // 清空日期选择
        emptyDateTime() {
            this.dateTimeParams = {}
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
        // 列表返回数据
        saleAmunt(data) {
            // this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
        },
        // 新增
        add() {
            this.load('add')
        },
        update(row) {
            this.load('update', row)
        },
        down(row, status) {
            let params = {
                id: row.id,
                status: status
            }
            down(params).then(res => {
                if(res.code === 2000) {
                    this.onSearch()
                }
            })
        },
        load(status,row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.add.dialogVisible = true
                this.$refs.add.load(status, row)
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
.shopping-box {
    padding: 20px;
    box-sizing: border-box;
    .model {
        margin-bottom: 20px;
    }
}
</style>