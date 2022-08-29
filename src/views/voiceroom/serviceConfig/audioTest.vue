<template>
    <div class="serviceConfig-audioTest-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 详情组件 -->
        <audioComp v-if="isDestoryComp" ref="audioComp" @destoryComp="destoryComp" :tabIndex="tabIndex"></audioComp>
    </div>
</template>

<script>
// 引入详情组件
import audioComp from './components/audioComp.vue'
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
        audioComp
    },
    data() {
        return {
            menuList: [
                {
                    name: '派对间'
                },
                {
                    name: '直播间'
                }
            ],
            isDestoryComp: false, // 是否销毁组件
            tabIndex: '0'
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
                    name: 'risk_type',
                    type: 'select',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '风险类型',
                    placeholder: '请选择',
                    options: MAPDATA.RISKSYSTEMTYPELIST
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
                url: REQUEST.risk.audioStreamDefyList,
                columns: [
                    {
                        label: '时间',
                        minWidth: '120px',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '用户',
                        minWidth: '90px',
                        render: (h, params) => {
                            return h('div', [
                                h('div', params.row.nickname),
                                h('div', params.row.user_number)
                            ])
                        }
                    },
                    {
                        label: '用户角色',
                        render: (h, params) => {
                            let data = MAPDATA.RISKSYSTEMROLELIST.find(item => { return item.value === params.row.user_role })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '房间ID',
                        prop: 'room_number'
                    },
                    {
                        label: '违规行为',
                        prop: 'risk_type_desc'
                    },
                    {
                        label: '音频',
                        isimg: true,
                        prop: 'url',
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '220px'
                    },
                    {
                        label: '音转文',
                        prop: 'content',
                        showOverFlow: true,
                        minWidth: '120px'
                    }
                ]
            }
        }
    },
    watch: {
        tabIndex: {
            handler(n) {
                if(n) {
                    this.getList()
                }
            },
            deep: true
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                type: this.tabIndex === '0' ? 2 : 1,
                risk_type: s.risk_type,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
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
            this.searchParams = {}
            this.dateTimeParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss">
.serviceConfig-audioTest-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
}
</style>