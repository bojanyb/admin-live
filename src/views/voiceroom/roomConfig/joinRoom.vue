<template>
    <div class="app-container roomConfig-joinRoom-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

        <div class="model">
            <span>查询期间：</span>
            <span>进房人数：<span>{{ ruleForm.join_room_count || 0 }}</span> 个</span>
            <span>房间数：<span>{{ ruleForm.room_count || 0 }}</span> 个</span>
            <span>首次进房人数：<span>{{ ruleForm.first_join_room_count || 0 }}</span> 人</span>
            <span>跟随进房人数：<span>{{ ruleForm.follow_join_room_count || 0 }}</span> 人</span>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
    </div>
</template>

<script>
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            searchParams: {
                join_type: 2,
                is_first: 1
            },
            ruleForm: {
                join_room_count: 0,
                room_count: 0,
                first_join_room_count: 0,
                follow_join_room_count: 0
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
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                },
                {
                    name: 'join_type',
                    type: 'select',
                    value: 2,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '进房类型',
                    placeholder: '请选择',
                    options: MAPDATA.JOINHOUSETYPELIST
                },
                {
                    name: 'is_first',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '是否首次进房',
                    placeholder: '请选择',
                    options: MAPDATA.ISFIRSTJOINHOUSELIST
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
                url: REQUEST.house.joinRoomLog,
                columns: [
                    {
                        label: '进房时间',
                        minWidth: '100px',
                        render: (h, params) => {
                            return h('span', params.row.in_time ? timeFormat(params.row.in_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '进房类型',
                        render: (h, params) => {
                            let data = MAPDATA.JOINHOUSETYPELIST.find(item => {
                                return item.value === params.row.join_type
                            })
                            return h('span', data ? data.name : '')
                        }
                    },
                    {
                        label: '是否首次进房',
                        render: (h, params) => {
                            let data = MAPDATA.ISFIRSTJOINHOUSELIST.find(item => {
                                return item.value === params.row.is_first
                            })
                            return h('span', data ? data.name : '')
                        }
                    },
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                        prop: 'user_nickname'
                    },
                    {
                        label: '房间ID',
                        prop: 'room_number'
                    },
                    {
                        label: '房间标题',
                        prop: 'room_name'
                    },
                    {
                        label: '跟随用户ID',
                        render: (h, params) => {
                            return h('span', params.row.follow_user_number || '无')
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
                join_type: s.join_type,
                user_number: s.user_number,
                is_first: s.is_first,
                room_number: s.room_number,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : ''
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
                join_type: 2,
                is_first: 1
            }
            this.dateTimeParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        saleAmunt(row) {
            this.ruleForm = { ...row }
        }
    }
}
</script>

<style lang="scss" scoped>
.model {
    width: 100%;
    height: 40px;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    padding: 0px 30px;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    >span {
        font-size: 15px;
        color: #fff;
        margin-right: 100px;
        >span {
            color: #FF4949;
            font-weight: 600;
            font-size: 22px;
        }
    }
    >span:first-child {
        margin-right: 50px;
        transform: translateY(1px);
    }
}
</style>