// 超管管理
<template>
    <div class="superAdminHistory-history-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
    </div>
</template>

<script>

import { handlePunish } from '@/api/super.js'
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
                    name: 'super_username',
                    type: 'input',
                    value: '',
                    label: '处置人',
                    placeholder: '处置人名称或id'
                },
                {
                    name: 'room_username',
                    type: 'input',
                    value: '',
                    label: '被处罚厅主',
                    placeholder: '被处罚厅主名称或id'
                },
                {
                    name: 'admin_username',
                    type: 'input',
                    value: '',
                    label: '处理人',
                    placeholder: '处理人名称或id'
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.system.super.punishHistory,
                columns: [
                    {
                        label: '处罚类型',
                        prop: 'punish_category'
                    },
                    {
                        label: '处罚时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '被处罚厅主',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.room_username),
                                h('div', params.row.room_user_number || '无')
                            ])
                        }
                    },
                    {
                        label: '处置人ID',
                        prop: 'super_user_number'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        render: (h, params) => {
                            let data = MAPDATA.SUPERSTATUSLIST.find(item => { return params.row.status === item.value })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '处理人',
                        render: (h, params) => {
                            return h('span', params.row.admin_nickname || '无')
                        }
                    },
                    {
                        label: '处理时间',
                        render: (h, params) => {
                            return h('span', params.row.handle_time ? timeFormat(params.row.handle_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {

        };
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
                pagesize: params.size,
                super_username: s.super_username,
                room_username: s.room_username,
                admin_username: s.admin_username
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
        // 处理操作
        async handlePunishFunc(id, status) {
            await handlePunish({ id, status })
            this.getList()
        }
    }
}
</script>

<style lang="scss">
.superAdminHistory-history-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>