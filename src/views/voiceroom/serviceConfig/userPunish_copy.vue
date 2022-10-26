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
import { removeUser, removeUserPunish, passUserPunish } from '@/api/risk'
// 引入新增组件
import userComp from './components/userComp.vue'
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
        userComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            searchParams: {
                status: 4
            }
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
                // {
                //     name: 'type',
                //     type: 'select',
                //     value: '',
                //     keyName: 'value',
                //     optionLabel: 'name',
                //     label: '处罚类型',
                //     placeholder: '请选择',
                //     options: MAPDATA.USERPUNISHTYPELISTCOPY
                // },
                {
                    name: 'status',
                    type: 'select',
                    value: 4,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '处罚状态',
                    placeholder: '请选择',
                    options: MAPDATA.USERPUNISHSTATUSLISTCOPY
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
                url: REQUEST.risk.UserPunishLog,
                columns: [
                    {
                        label: '时间',
                        prop: 'create_time',
                        minWidth: '150px'
                    },
                    {
                        label: '来源',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.from || '- -')
                        }
                    },
                    {
                        label: '用户',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.punished_user_nickname),
                                h('div', params.row.punished_user_number || '- -')
                            ])
                        }
                    },
                    {
                        label: '举报类型',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.genre || '- -')
                        }
                    },
                    {
                        label: '举报说明',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.content || '- -')
                        },
                        showOverFlow: true
                    },
                    {
						label: '举报证据',
						isimgList: true,
						prop: 'img_path',
						propCopy: 'video_path',
						imgWidth: '70px',
						imgHeight: '70px',
						width: '280px'
					},
                    {
                        label: '举报用户',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.report_user_nickname),
                                h('div', params.row.report_user_number || '- -')
                            ])
                        }
                    },
                    {
                        label: '处理状态',
                        minWidth: '100px',
                        render: (h, params) => {
                            let data = MAPDATA.USERPUNISHSTATUSLISTCOPY.find(item => { return item.value === params.row.status })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '处罚结果',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.res || '- -')
                        }
                    },
                    {
                        label: '解除时间',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.remove_time || '- -')
                        }
                    },
                    {
                        label: '操作人',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.operator || '- -')
                        }
                    },
                    {
                        label: '备注说明',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.remark || '- -')
                        }
                    },
                    {
                        label: '操作',
                        minWidth: '180px',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'success'}, style: {
                                    display: params.row.status === 1 ? 'unset' : 'none'
                                }, on: {click:()=>{this.relieve(params.row.id)}}}, '解除'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 0 ? 'unset' : 'none'
                                }, on: {click:()=>{this.blocked(params.row)}}}, '封禁'),
                                h('el-button', { props: { type: 'primary'}, style: {
                                    display: params.row.status === 0 ? 'unset' : 'none'
                                }, on: {click:()=>{this.neglect(params.row.id)}}}, '忽略')
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
                page_size: params.size,
                user_number: s.user_number,
                status: s.status,
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
            this.searchParams = {
                status: 4
            }
            this.dateTimeParams = {}
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
        // 封禁
        blocked(row) {
            this.load('blocked', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.userComp.loadParams(status, row)
            }, 50);
        },
        // 解除
        async relieve(id) {
            this.$confirm('是否确认解除当前封禁用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await removeUserPunish({ id })
                if(res.code === 2000) {
                    this.$success('解除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 忽略
        async neglect(id) {
            let res = await passUserPunish({ id })
            if(res.code === 2000) {
                this.$success('操作成功')
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