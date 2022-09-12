// 推广成员管理
<template>
    <div class="recommend-promotion-system">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-add="true" :show-search-btn="true" @add="add" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>

        <!-- 新增组件 -->
        <promoteAdd v-if="isDestoryComp" ref="promoteAdd" @destoryComp="destoryComp"></promoteAdd>

        <!-- 推广组组件 -->
    </div>
</template>

<script>
// 进入新增推广商组件
import promoteAdd from './components/add.vue'
// 引入推广组组件
import groupCom from './components/groupCom.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
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
        SearchPanel,
        promoteAdd,
        groupCom
    },
    mixins: [mixins],
    computed: {
        statusComputed() {
            let array = MAPDATA.STATUSLIST
            return array.filter(item => { return item.value !== 1 })
        },
        forms() {
            return [
                {
                    name: 'user_id',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.CashHisity.list,
                columns: [
                    {
                        label: '创建时间',
                        prop: 'addtime',
                        width: '160px',
                        render: (h, params) => {
                            return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '推广商ID',
                        prop: 'user_id'
                    },
                    {
                        label: '推广单价',
                        prop: 'addtime',
                        render: (h, params) => {
                            return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '推广组管理',
                        prop: 'money',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.orderDetails.money),
                                h('span', { style: {
                                    color: '#1890FF',
                                    marginLeft: '50px'
                                }, on: {click:()=>{this.update(params.row)}} }, '编辑推广组')
                            ])
                        }
                    },
                    {
                        label: '推广成员管理',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.orderDetails.money),
                                h('span', { style: {
                                    color: '#1890FF',
                                    marginLeft: '50px'
                                } }, '编辑推广成员')
                            ])
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '删除')
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
            isDestoryComp: false, // 是否销毁组件
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
            this.dateTimeParams = {}
            this.getList()
        },
        // 重置
        onSearch() {
            this.getList()
        },
        // 列表返回数据
        saleAmunt(data) {
            this.ruleForm.alreadyMoney = data.totalmoney ? data.totalmoney : 0
            this.ruleForm.deductMoney = data.rate_money ? data.rate_money : 0
        },
        // 新增
        add() {
            this.load('add')
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.promoteAdd.loadParams(status, row)
            }, 50);
        },
        // 删除数据
        deleteParams(row) {
            this.$confirm('确认删除当前推广商吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
            }).catch(() => {});
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 编辑推广组
    }
}
</script>

<style lang="scss">
.recommend-promotion-system {
    padding: 20px;
    box-sizing: border-box;
}
</style>