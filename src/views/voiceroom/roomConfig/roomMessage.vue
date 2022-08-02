<template>
    <div class="app-container roomConfig-category-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
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
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        menuComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            menuList: [
                {
                    name: '派对间'
                },
                {
                    name: '直播间'
                }
            ]
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                },
                {
                    name: 'status',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '房间类型',
                    placeholder: '请选择',
                    options: MAPDATA.HOUSEMESSAGETYPELIST
                },
                {
                    name: 'status',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '房间状态',
                    placeholder: '请选择',
                    options: MAPDATA.HOUSEMESSAGESTATUSLIST
                }
            ]
        },
        cfgs() {
            let arr = [
                {
                    label: '房间ID',
                    prop: 'user_number'
                },
                {
                    label: '房间标题',
                    prop: 'user_number'
                }
            ]
            let arr2 = [
                {
                    label: '房主',
                    prop: 'user_number'
                }
            ]
            let arr3 = [
                {
                    label: '主播',
                    prop: 'user_number'
                }
            ]
            let arr4 = [
                {
                    label: '房间封面',
                    isimg: true,
                    prop: 'face',
                    imgWidth: '50px',
                    imgHeight: '50px'
                },
                {
                    label: '房间分类',
                    prop: 'user_number'
                },
                {
                    label: '所属公会',
                    prop: 'user_number'
                },
                {
                    label: '房间状态',
                    prop: 'user_number'
                }
            ]
            let arr5 = [
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '修改')
                        ])
                    }
                }
            ]
            let arr6 = [
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '修改'),
                            h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.editFunc(params.row)}}}, '关播')
                        ])
                    }
                }
            ]
            let name = this.tabIndex === '0' ? 'list' : 'musicList'
            return {
                vm: this,
                url: REQUEST.user[name],
                columns: this.tabIndex === '0' ? [...arr, ...arr2, ...arr4, ...arr5] : [...arr, ...arr3, ...arr4, ...arr6]
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
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.userComp.dialogVisible = true
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