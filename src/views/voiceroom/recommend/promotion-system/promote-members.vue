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
import { getPromoterSub, deleteParams } from '@/api/recommend'
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
                    name: 'user_number',
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
                children: 'children',
                columns: [
                    {
                        label: '创建时间',
                        minWidth: '110px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '用户昵称',
                        prop: 'nickname'
                    },
                    {
                        label: '头像',
                        isimg: true,
                        prop: 'face',
                        imgWidth: '50px',
                        imgHeight: '50px',
                    },
                    {
                        label: '推广ID',
                        minWidth: '90px',
                        render: (h, params) => {
                            let arr = ['推广商', '推广组', '推广成员']
                            let data = arr.find((a,b) => { return (b + 1) === params.row.level })
                            return h('span', data + 'ID' + ' - ' + params.row.user_number || '无')
                        }
                    },
                    {
                        label: '推广单价',
                        prop: 'price'
                    },
                    {
                        label: '操作',
                        minWidth: '130px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row, params.row.level)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '删除'),
                                h('el-button', { props: { type: 'success'}, style: {
                                    display: params.row.level === 3 ? 'none' : 'unset'
                                }, on: {click:()=>{this.add(params.row.level + 1, params.row)}}}, '新增')
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
            form: {},
            loadData: new Map() // 创建一个map对象
        };
    },
    methods: {
        // 懒加载
        async loadLazy(tree, treeNode, resolve, callback) { // 当前废弃 - 以后需要做懒加载时使用
            let res = await getPromoterSub({ pid: tree.id })
            this.loadData.set(tree.id, { tree, treeNode, resolve }) // 储存当前节点
            callback(res.data.list || [])
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 刷新节点
        refresh() { // 当前废弃 - 以后需要做懒加载时使用
            let id = this.form.id
            const { tree, treeNode, resolve } = this.loadData.get(id); // 根据id取出对应节点的数据
            this.$set(this.$refs.tableList.$refs.table.store.states.lazyTreeNodeMap, id, []); // 更新节点的值
            this.loadLazy(tree, treeNode, resolve, (res) => {
                resolve(res || [])
            })
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
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
        async deleteParams(row) {
            this.form = row
            this.$confirm('确认删除当前推广商吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await deleteParams({ id: row.id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
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