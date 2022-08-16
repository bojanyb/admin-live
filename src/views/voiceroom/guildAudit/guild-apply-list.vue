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
                url: REQUEST.guild.newGuildApplyList,
                columns: [
                    {
                        label: '申请时间',
                        minWidth: '180px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '公会昵称',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.guild_name || '无')
                        }
                    },
                    {
                        label: '公会头像',
                        isimg: true,
                        prop: 'guild_icon',
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '120px'
                    },
                    {
                        label: '公会简介',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.desc || '无')
                        }
                    },
                    {
                        label: '固定团队人数/自带老板数量',
                        minWidth: '200px',
                        render: (h, params) => {
                            return h('span', params.row.question.question1 || '无')
                        }
                    },
                    {
                        label: '目前或曾经合作的业务类型',
                        minWidth: '200px',
                        render: (h, params) => {
                            return h('span', params.row.question.question2 || '无')
                        }
                    },
                    {
                        label: '在其他平台开厅的ID号',
                        minWidth: '180px',
                        render: (h, params) => {
                            return h('span', params.row.question.question3 || '无')
                        }
                    },
                    {
                        label: '外站开厅流水及数据情况',
                        isimgList: true,
                        prop: 'images',
                        type: 1,
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '180px'
                    },
                    {
                        label: '是否有线下工作室',
                        minWidth: '180px',
                        render: (h, params) => {
                            let data = MAPDATA.GUILDISSTUDIO.find(item => { return item.value === Number(params.row.has_workroom) })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '联系方式',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.contact_way || '无')
                        }
                    },
                    {
                        label: '操作',
                        minWidth: '230px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, style: {
                                    display: params.row.status === 1 ? 'unset' : 'none'
                                }, on: {click:()=>{this.clickFunc(params.row.id, 2)}}}, '通过'),
                                h('el-button', { props : { type: 'danger'}, style: {
                                    display: params.row.status === 1 ? 'unset' : 'none'
                                }, on: {click:()=>{this.clickFunc(params.row.id, 3)}}}, '驳回')
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
.guild-apply-list-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>