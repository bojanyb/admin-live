<template>
    <div class="serviceConfig-message-history-box">
        <!-- <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp> -->
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="true" :showYesterday="true" :showBeforeYesterday="true" :showToday="true" @onSearch="onSearch" @yesterday="yesterday" @beforeYesterday="beforeYesterday" @today="today"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 详情组件 -->
        <historyComp v-if="isDestoryComp" ref="historyComp" @destoryComp="destoryComp" @getList="getList"></historyComp>
    </div>
</template>

<script>
// 引入api
import { softDelete } from '@/api/risk.js'
// 引入新增组件
import historyComp from './components/historyComp.vue'
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
        menuComp,
        historyComp
    },
    data() {
        return {
            menuList: [
                {
                    name: '私聊会话消息'
                },
                {
                    name: '房间会话消息'
                },
                {
                    name: '敏感词库'
                }
            ],
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0',
            searchParams: {
                dateTimeParams: [],
                sen_status: 0
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
            }
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'inputSelect',
                    value: '',
                    selectName: 'iSelect',
                    type: 'inputSelect',
                    placeholder: '请输入',
                    selectPlaceholder: '请选择',
                    selctValue: 'user_id',
                    selectWidth: '130px',
                    label: '',
                    handler: {
                        change: (v) => {}
                    },
                    options: [
                        { key: 'user_id', label: '用户ID' },
                        { key: 'room_id', label: '房间ID' }
                    ]
                },
                {
                    name: 'sen_status',
                    type: 'select',
                    value: 0,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '图片类型',
                    placeholder: '请选择',
                    options: MAPDATA.RISKMANAGEMENTIMGTYPELIST
                },
                {
                    name: 'sen_status',
                    type: 'select',
                    value: 0,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '审核状态',
                    placeholder: '请选择',
                    options: MAPDATA.RISKMANAGEMENTIMGSTATUSLIST
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
                url: REQUEST.risk.chatList,
                columns: [
                    {
                        label: '时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time || '无')
                        }
                    },
                    {
                        label: '用户ID',
                        render: (h, params) => {
                            return h('div', params.row.from_user_number || '无')
                        }
                    },
                    {
                        label: '用户昵称',
                        render: (h, params) => {
                            return h('div', params.row.from_user_nickname || '无')
                        }
                    },
                    {
                        label: '图片类型',
                        render: (h, params) => {
                            return h('div', params.row.to_user_number || '无')
                        }
                    },
                    {
                        label: '图片',
                        isimg: true,
                        prop: 'face',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '审核状态',
                        render: (h, params) => {
                            return h('div', params.row.to_user_number || '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '通过'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.punishFunc(params.row)}}}, '拒绝')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 今日
        today() {
            this.changeIndex(0)
            this.getList()
        },
        // 昨日
        yesterday() {
            this.changeIndex(1)
            this.getList()
        },
        // 最近七日
        beforeYesterday() {
            this.changeIndex(2)
            this.getList()
        },
        // 更改日期
        changeIndex(index) {
            let date = new Date()
            let now, now1, start, end;
            switch (index) {
                case 0:
                    now1 = timeFormat(date, 'YYYY-MM-DD', false)
                    now = timeFormat(date, 'YYYY-MM-DD', false)
                    break;
                case 1:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
                    break;
                case 2:
                    now1 = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    now = timeFormat(date - 3600 * 1000 * 24 * 2, 'YYYY-MM-DD', false)
                    break;
            }
            start = new Date(now + ' 00:00:00')
            end = new Date(now1 + ' 23:59:59')

            let time = [start.getTime(), end.getTime()]
            this.searchParams.dateTimeParams = time
            this.dateTimeParams.start_time = time[0]
            this.dateTimeParams.end_time = time[1]
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            let data = {
                page: params.page,
                pagesize: params.size,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
                sen_status: s.sen_status
            }
            if(s.iSelect === 'user_id') {
                data.from_user_number = s.inputSelect
            } else if(s.iSelect === 'receive_user_id') {
                data.to_user_number = s.inputSelect
            } else if(s.iSelect === 'text') {
                data.content = s.inputSelect
            } else if(s.iSelect === 'room_id') {
                data.room_number = s.inputSelect
            }
            if(this.tabIndex === '2') {
                data = {
                    page: params.page,
                    pagesize: params.size,
                    keyword: s.keyword
                }
            }
            return data
        },
        // 刷新列表
        getList() {
            if(this.$refs.tableList) {
                this.$refs.tableList.getData()
            }
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
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 移除
        deleteParams(id) {
            this.$confirm('确认移除当前敏感词吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await softDelete({ id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        }
    },
    created() {
        this.changeIndex(0)
    }
}
</script>

<style lang="scss">
.serviceConfig-message-history-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>