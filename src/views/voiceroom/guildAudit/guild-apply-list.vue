<template>
    <div class="guild-apply-list-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
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
        SearchPanel
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'channel',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '状态',
                    placeholder: '请选择',
                    options: MAPDATA.GUILDAPPLYSTATUSLIST
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.diamondRecharge.list,
                columns: [
                    {
                        label: '申请时间',
                        minWidth: '150px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '公会昵称',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '公会头像',
                        isimg: true,
                        prop: 'face',
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '120px'
                    },
                    {
                        label: '公会简介',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '固定团队人数/自带老板数量',
                        minWidth: '200px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '目前或曾经合作的业务类型',
                        minWidth: '200px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '在其他平台开厅的ID号',
                        minWidth: '180px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '外站开厅流水及数据情况',
                        minWidth: '180px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '是否有线下工作室',
                        minWidth: '180px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '联系方式',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '操作',
                        fixed: 'right',
                        minWidth: '230px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.details(params.row)}}}, '联系'),
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '拒绝')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                user_number: s.user_number,
                sort: s.sort
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
        }
    }
}
</script>

<style lang="scss">
.guild-apply-list-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>