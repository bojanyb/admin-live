// 超管列表
<template>
    <div class="superAdmin-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>

        <div class="searchParams" v-if="tabIndex !== '2'">
            <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="tabIndex === '1'" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>

        <!-- 新增 - 组件 / 超管 - 官方 -->
        <addComp ref="addComp" v-if="isDestoryComp" :tabIndex="tabIndex" @getList="getList" @destoryComp="destoryComp"></addComp>

        <!-- 超管处罚文案组件 -->
        <messageComp v-if="isDestoryComp" ref="messageComp" @getList="getList" @destoryComp="destoryComp"></messageComp>
    </div>
</template>

<script>
// 引入超管处罚文案组件
import messageComp from './add/messageComp.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入新增/修改
import addComp from './add/index.vue'
// 引入api
import { setSuperUser, del } from '@/api/super'
// 引入公共参数
import mixins from '@/utils/mixins.js'

export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        addComp,
        menuComp,
        messageComp
    },
    data() {
        return {
            status: 'add',
            isDestoryComp: false,
            list: [],
            menuList: [
                {
                    name: '超管用户'
                },
                {
                    name: '官方用户'
                },
                {
                    name: '超管处罚文案'
                }
            ],
            tabIndex: '0'
        }
    },
    computed: {
        forms() {
            let arr = [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                }
            ]
            return this.tabIndex === '1' ? [ ...arr ] : []
        },
        cfgs() {
            let arr = [
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
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.setSuperUserFunc(params.row.user_number, 2)}}},'移除'),
                        ])
                    }
                }
            ]
            let arr1 = [
                // {
                //     label: '添加时间',
                //     prop: 'user_number'
                // },
                {
                    label: '用户ID',
                    prop: 'user_number'
                },
                {
                    label: '用户昵称',
                    prop: 'nickname'
                },
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.setSuperUserFunc(params.row.user_number)}}},'移除')
                        ])
                    }
                }
            ]
            let arr2 = [
                {
                    label: '处罚类型',
                    prop: 'kv_title'
                },
                {
                    label: '文案',
                    prop: 'kv_value'
                },
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.add(params.row)}}}, '修改')
                        ])
                    }
                },
            ]
            let name, arr3 = [];
            if(this.tabIndex === '0') {
                name = 'superUserList'
                arr3 = arr
            } else if(this.tabIndex === '1') {
                name = 'officialAccount'
                arr3 = arr1
            } else if(this.tabIndex === '2') {
                name = 'superMsg'
                arr3 = arr2
            }
            return {
                vm: this,
                url: REQUEST.system.super[name],
                columns: arr3
            }
        }
    },
    methods:{
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 启用 - 关闭
        async setSuperUserFunc(user_number, status) {
            if(this.tabIndex === '0') {
                if(status === 2) {
                    this.$confirm('是否确认删除当前超管？')
                    .then(async _ => {
                        let res = await setSuperUser({ user_number, status })
                        if(res.code === 2000) {
                            this.$success('删除成功')
                        }
                        this.getList()
                    }).catch(error => {})
                } else {
                    await setSuperUser({ user_number, status })
                    this.getList()
                }
            } else { // 官方删除
                this.$confirm('是否确认删除当前官方？')
                .then(async _ => {
                    let res = await del({ user_number })
                    if(res.code === 2000) {
                        this.$success('删除成功')
                    }
                    this.getList()
                }).catch(error => {})
            }
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        add(row) {
            this.isDestoryComp = true
            setTimeout(() => {
                if(this.tabIndex !== '2') {
                    this.$refs.addComp.dialogVisible = true
                } else {
                    this.$refs.messageComp.loadParams(row)
                }
            }, 100);
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
}
</style>