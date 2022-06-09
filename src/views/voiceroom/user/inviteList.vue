// 用户拉新记录
<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入map参数
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'

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
                    name: 'p_user_number',
                    type: 'input',
                    value: '',
                    label: '拉新人ID',
                    isNum: true,
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'reg_ip',
                    type: 'input',
                    value: '',
                    label: 'IP地址',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '新注册用户ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'inroom',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '是否进入过派对',
                    placeholder: '全部',
                    options: MAPDATA.USERINVITE,
                    handler: {
                        change: (v) => {
                            // this.searchParams.virtual = v
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'diamond_recharge',
                    type: 'input',
                    value: '',
                    label: '筛选日期内总新用户充值金额',
                    placeholder: '',
                    disabled: true,
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'count',
                    type: 'input',
                    value: '',
                    label: '筛选日期内总新用户注册人数',
                    placeholder: '',
                    disabled: true,
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'reg_device',
                    type: 'input',
                    value: '',
                    label: '设备识别码',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.parentCardName = v.parentCardName.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'platform',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '下载渠道',
                    placeholder: '全部',
                    options: MAPDATA.DOWNLOADSOURCE,
                    handler: {
                        change: (v) => {
                            // this.searchParams.virtual = v
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'daterange',
                    format: "yyyy-MM-dd",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            this.emptyDateTime()
                            this.setDateTime(v)
                            this.onSearch()
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                            this.onSearch()
                        }
                    }
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.userHistory.list,
                columns: [
                    {
                        label: '拉新人ID',
                        prop: 'p_user_number'
                    },
                    {
                        label: '新注册用户昵称',
                        prop: 'user_nickname'
                    },
                    {
                        label: '新注册用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '新用户注册时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '新用户充值',
                        prop: 'user_diamond_recharge'
                    },
                    {
                        label: '设备识别码',
                        prop: 'reg_device',
                        width: '200'
                    },
                    {
                        label: '注册IP',
                        prop: 'reg_ip'
                    },
                    {
                        label: '是否进入过派对',
                        render: (h, params) => {
                            return h('span', params.row.inroom === 1 ? '否' : '是')
                        }
                    },
                    {
                        label: '下载渠道',
                        prop: 'platform'
                    },
                    {
                        label: '最后登录时间',
                        render: (h, params) => {
                            return h('span', params.row.last_login ? timeFormat(params.row.last_login, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '最后一次登录设备',
                        prop: 'last_login_device_id'
                    },
                ]
            }
        }
    },
    data() {
        return {
            diamond_recharge: null,
            count: null
        };
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params.page,
                pagesize: params.size,
                reg_ip: s.reg_ip,
                user_number: s.user_number,
                p_user_number: s.p_user_number,
                inroom: s.inroom,
                reg_device: s.reg_device,
                platform: s.platform,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000)
            }
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.onSearch()
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
        // 刷新列表
        onSearch() {
            this.$refs.tableList.page = 1
            this.$refs.tableList.getData()
        },
        // 获取列表数据
        saleAmunt(data) {
            this.$set(this.searchParams, 'count', data.count)
            this.$set(this.searchParams, 'diamond_recharge', data.diamond_recharge / 100)
        }
    }
}
</script>

<style lang="scss">
.invite-join-us {
    padding: 20px;
    box-sizing: border-box;
}
</style>