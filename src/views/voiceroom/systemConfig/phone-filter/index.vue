<template>
    <div class="app-container systemConfig-phone-filter-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <add v-if="isDestoryComp" ref="add" @destoryComp="destoryComp" @getList="getList"></add>
    </div>
</template>

<script>
// 引入新增组件
import add from './components/add.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        tableList,
        menuComp,
        add
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            menuList: [
                {
                    name: '白名单'
                },
                {
                    name: '黑名单'
                }
            ]
        }
    },
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.user.list,
                columns: [
                    {
                        label: '虚拟字段',
                        prop: 'user_number'
                    },
                    {
                        label: '创建时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '创建人',
                        prop: 'nickname'
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.editFunc(params.row)}}}, '移除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number,
                nickname: s.nickname,
                phone: s.phone
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
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
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
    }
}
</script>

<style lang="scss">
.systemConfig-phone-filter-box {

}
</style>