<template>
    <div class="app-container serviceConfig-coverAudit-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 审核组件 -->
        <coverComp v-if="isDestoryComp" ref="coverComp" @destoryComp="destoryComp" @getList="getList"></coverComp>

        <!-- 详情组件 -->
        <coverDetails ref="coverDetails"></coverDetails>
    </div>
</template>

<script>
// 引入api
import { coverCheck } from '@/api/risk'
// 引入审核组件
import coverComp from './components/coverComp.vue'
// 引入详情组件
import coverDetails from './components/coverDetails.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        coverComp,
        coverDetails
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            searchParams: {
                status: 1
            }
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                },
                {
                    name: 'status',
                    type: 'select',
                    value: 1,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '状态',
                    placeholder: '请选择',
                    options: MAPDATA.SERVICEAUDITSTATUSLIST
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            this.emptyDateTime()
                            this.setDateTime(v)
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                        }
                    }
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.risk.roomCoverCheckList,
                columns: [
                    {
                        label: '时间',
                        prop: 'create_time',
                        minWidth: '100px'
                    },
                    {
                        label: '用户',
                        prop: 'user_number',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.nickname),
                                h('div', params.row.user_number)
                            ])
                        }
                    },
                    {
                        label: '房间ID',
                        prop: 'room_number'
                    },
                    {
                        label: '封面图',
                        isimg: true,
                        prop: 'cover_url',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '封面类型',
                        render: (h, params) => {
                            let data = MAPDATA.SERVICEAUDITTYPELIST.find(item => { return item.value === params.row.type })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '审核状态',
                        render: (h, params) => {
                            let data = MAPDATA.SERVICEAUDITSTATUSLIST.find(item => { return item.value === params.row.status })
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
                        label: '备注',
                        render: (h, params) => {
                            return h('span', params.row.remark || '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, style: {
                                    display: params.row.status === 0 ? 'unset' : 'none'
                                }, on: {click:()=>{this.audit(params.row.id, 1)}}}, '通过'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 0 ? 'unset' : 'none'
                                }, on: {click:()=>{this.audit(params.row.id, 2)}}}, '拒绝')
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
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
                status: s.status,
                room_number: s.room_number
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
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
        // 重置
        reset() {
            this.searchParams = {
                status: 1
            }
            this.dateTimeParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 审核
        async audit(id, status) {
            if(status === 1) {
                let res = await coverCheck({ id, status })
                if(res.code === 2000) {
                    this.$success('审核通过')
                    this.getList()
                }
            } else {
                this.isDestoryComp = true
                setTimeout(() => {
                this.$refs.coverComp.loadParams(id, status)
                }, 50); 
            }
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