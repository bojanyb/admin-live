// 推广成员管理
<template>
    <div class="recommend-promotion-system">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-add="true" :show-search-btn="true" @add="add(1)" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt" :loadLazy="loadLazy"></tableList>
        </div>

        <!-- 新增组件 -->
        <promoteAdd v-if="isDestoryComp" ref="promoteAdd" @destoryComp="destoryComp" @getList="getList"></promoteAdd>

        <!-- 推广组组件 -->
        <groupCom v-if="isDestoryComp" ref="groupCom" @destoryComp="destoryComp"></groupCom>
    </div>
</template>

<script>
// 引入api
import { getPromoterSub } from '@/api/recommend'
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
                url: REQUEST.userHistory.index,
                defaultExpandAll: false,
                children: 'child',
                hasChildren: 'child_count',
                lazy: true,
                columns: [
                    {
                        label: '创建时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '推广商ID',
                        prop: 'user_number',
                    },
                    {
                        label: '推广单价',
                        prop: 'price'
                    },
                    // {
                    //     label: '推广组管理',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('span', params.row.group_count + '个推广组'),
                    //             h('span', { style: {
                    //                 color: '#1890FF',
                    //                 marginLeft: '50px'
                    //             }, on: {click:()=>{this.update(params.row, 2)}} }, '编辑推广组')
                    //         ])
                    //     }
                    // },
                    // {
                    //     label: '推广成员管理',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('span', params.row.member_count + '个推广员'),
                    //             h('span', { style: {
                    //                 color: '#1890FF',
                    //                 marginLeft: '50px'
                    //             }, on: {click:()=>{this.update(params.row, 3)}} }, '编辑推广成员')
                    //         ])
                    //     }
                    // },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row, 1)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '删除'),
                                h('el-button', { props: { type: 'success'}, on: {click:()=>{this.add(2, params.row)}}}, '新增')
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
            form: {}
        };
    },
    methods: {
        // 懒加载
        async loadLazy(tree, treeNode, callback) {
            let res = await getPromoterSub({ pid: tree.id })
            callback(res.data.list || [])
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number
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
        add(type, row) {
            this.type = type
            this.load('add', row)
        },
        // 修改
        update(row, type) {
            this.type = type
            this.load('update', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            this.form = row
            setTimeout(() => {
                this.$refs.promoteAdd.loadParams(status, row, this.type)
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
        }
    }
}
</script>

<style lang="scss">
.recommend-promotion-system {
    padding: 20px;
    box-sizing: border-box;
}
</style>