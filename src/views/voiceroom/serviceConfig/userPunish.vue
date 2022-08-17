<template>
    <div class="app-container serviceConfig-userPunish-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <userComp v-if="isDestoryComp" ref="userComp" @destoryComp="destoryComp" @getList="getList"></userComp>
    </div>
</template>

<script>
// 引入api
import { removeUser } from '@/api/risk'
// 引入新增组件
import userComp from './components/userComp.vue'
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
        userComp
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
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'type',
                    type: 'select',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '处罚类型',
                    placeholder: '请选择',
                    options: MAPDATA.USERPUNISHTYPELIST
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
                url: REQUEST.risk.UserPunish,
                columns: [
                    {
                        label: '时间',
                        prop: 'create_time',
                        minWidth: '100px'
                    },
                    {
                        label: '用户',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.nickname),
                                h('div', params.row.user_number)
                            ])
                        }
                    },
                    {
                        label: '处罚类型',
                        render: (h, params) => {
                            let data = MAPDATA.USERPUNISHTYPELIST.find(item => { return item.value === params.row.type })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '处罚状态',
                        render: (h, params) => {
                            let data = MAPDATA.USERPUNISHSTATUSLIST.find(item => { return item.value === params.row.status })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '解除时间',
                        prop: 'ban_duration',
                        minWidth: '100px'
                    },
                    {
                        label: '备注',
                        render: (h, params) => {
                            return h('span', params.row.remark || '无')
                        }
                    },
                    {
                        label: '操作人',
                        render: (h, params) => {
                            return h('span', params.row.admin_name || '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('el-button', { props : { type: 'danger'}, style: {
                                display: params.row.status === 1 ? 'unset' : 'none'
                            }, on: {click:()=>{this.deleteParams(params.row.id)}}}, '解除')
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
                page_size: params.size,
                user_number: s.user_number,
                type: s.type,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time
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
            this.searchParams = {}
            this.dateTimeParams = {}
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
        // 解除
        async deleteParams(id) {
            let res = await removeUser({ id })
            if(res.code === 2000) {
                this.$message.success('解除成功')
                this.getList()
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