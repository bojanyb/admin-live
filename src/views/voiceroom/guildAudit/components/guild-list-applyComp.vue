<template>
    <div class="guild-apply-list-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </div>
</template>

<script>
// 引入api
import { newGuildApplyCheck } from '@/api/videoRoom'
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
                    name: 'status',
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
                url: REQUEST.guild.newGuildApplyList,
                columns: [
                    {
                        label: '申请时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '喵喵ID',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '公会昵称',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.guild_name || '无')
                        }
                    },
                    {
                        label: '主播数量',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.question.question1 || '无')
                        }
                    },
                    {
                        label: '曾经的合作平台',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.question.question2 || '无')
                        }
                    },
                    {
                        label: '联系方式',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.contact_way || '无')
                        }
                    },
                    {
                        label: '操作',
                        fixed: 'right',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, style: {
                                    display: params.row.status === 1 ? 'unset' : 'none'
                                }, on: {click:()=>{this.clickFunc(params.row.id, 2)}}}, '通过'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 1 ? 'unset' : 'none'
                                }, on: {click:()=>{this.clickFunc(params.row.id, 3)}}}, '驳回'),
                                h('el-button', { props: { type: 'success'}, style: {
                                    display: params.row.status === 2 ? 'unset' : 'none'
                                }, on: {click:()=>{}}}, '已通过'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 3 ? 'unset' : 'none'
                                }, on: {click:()=>{}}}, '已拒绝')
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
                pagesize: params.size,
                status: s.status
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
        // 联系 - 驳回
        async clickFunc(id, status) {
            if(status === 2) {
                let res = await newGuildApplyCheck({ id, status })
                if(res.code === 2000) {
                    this.$message.success('审核通过')
                    this.getList()
                }
            } else {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await newGuildApplyCheck({ id, status })
                    if(res.code === 2000) {
                        this.$message.success('驳回成功')
                        this.getList()
                    }
                }).catch(() => {});
            }
        }
    }
}
</script>

<style lang="scss">
// .guild-apply-list-box {
//     padding: 20px;
//     box-sizing: border-box;
// }
</style>
