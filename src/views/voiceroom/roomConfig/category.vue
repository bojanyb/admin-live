<template>
    <div class="app-container roomConfig-category-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <categoryComp v-if="isDestoryComp" ref="categoryComp" @destoryComp="destoryComp" @getList="getList"></categoryComp>
    </div>
</template>

<script>
// 引入新增组件
import categoryComp from './components/categoryComp.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
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
        SearchPanel,
        tableList,
        categoryComp
    },
    data() {
        return {
            isDestoryComp: false // 是否销毁组件
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'status',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '业务类型',
                    placeholder: '请选择',
                    options: MAPDATA.CATEGORYBUSINESSTYPELIST
                }
            ]
        },
        cfgs() {
            let name = this.tabIndex === '0' ? 'list' : 'musicList'
            return {
                vm: this,
                url: REQUEST.user[name],
                columns: [
                    {
                        label: '品类ID',
                        prop: 'user_number'
                    },
                    {
                        label: '品类名',
                        prop: 'user_number'
                    },
                    {
                        label: '品类图标',
                        isimg: true,
                        prop: 'face',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '权重排序',
                        prop: 'user_number'
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '修改'),
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.editFunc(params.row)}}}, '删除')
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
                this.$refs.categoryComp.loadParams(status, row)
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>