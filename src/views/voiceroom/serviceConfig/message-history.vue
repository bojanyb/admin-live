<template>
    <div class="serviceConfig-message-history-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="true" :show-reset="true" :showYesterday="tabIndex !== '2'" :showBeforeYesterday="tabIndex !== '2'" :showToday="tabIndex !== '2'" :show-add="tabIndex === '2'" @onReset="reset" @onSearch="onSearch" @yesterday="yesterday" @beforeYesterday="beforeYesterday" @today="today" @add="add"></SearchPanel>
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
                sen_status: 1
            },
            dateTimeParams: {
                start_time: null,
                end_time: null
            }
        };
    },
    computed: {
        forms() {
            let arr = [
                {
                    name: 'from_user_number',
                    type: 'input',
                    value: '',
                    label: '发送用户ID',
                    isNum: true,
                    placeholder: '请输入发送用户ID'
                },
                {
                    name: 'to_user_number',
                    type: 'input',
                    value: '',
                    label: '接收用户ID',
                    isNum: true,
                    placeholder: '请输入接收用户ID'
                },
                {
                    name: 'content',
                    type: 'input',
                    value: '',
                    label: '消息内容',
                    placeholder: '请输入消息内容'
                }
            ]
            let arr1 = [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '发送用户ID',
                    isNum: true,
                    placeholder: '请输入发送用户ID'
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
                    name: 'content',
                    type: 'input',
                    value: '',
                    label: '消息内容',
                    placeholder: '请输入消息内容'
                }
            ]
            let arr2 = [
                {
                    name: 'sen_status',
                    type: 'select',
                    value: 1,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '敏感词',
                    placeholder: '请选择',
                    options: MAPDATA.RISKMANAGEMENTMESSAGEHISTORYLIST
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
            let arr3 = [
                {
                    name: 'keyword',
                    type: 'input',
                    value: '',
                    label: '敏感词',
                    placeholder: '请输入敏感词'
                },
            ]
            let arr4 = []
            if(this.tabIndex === '0') {
                arr4 = [ ...arr, ...arr2 ]
            } else if(this.tabIndex === '1') {
                arr4 = [ ...arr1, ...arr2 ]
            } else if(this.tabIndex === '2') {
                arr4 = [ ...arr3 ]
            }
            return arr4
        },
        cfgs() {
            let arr = [
                {
                    label: '时间',
                    render: (h, params) => {
                        return h('span', params.row.create_time || '无')
                    }
                },
                {
                    label: '用户ID',
                    render: (h, params) => {
                        return h('div', this.tabIndex === '0' ? params.row.from_user_number : params.row.user_number)
                    }
                },
                {
                    label: '用户昵称',
                    render: (h, params) => {
                        return h('div', this.tabIndex === '0' ? params.row.from_user_nickname : params.row.user_nickname)
                    }
                },
            ]
            let arr1 = [
                {
                    label: '接收用户ID',
                    render: (h, params) => {
                        return h('div', params.row.to_user_number || '无')
                    }
                },
                {
                    label: '接收用户昵称',
                    render: (h, params) => {
                        return h('div', params.row.to_user_nickname || '无')
                    }
                },
                {
                    label: '消息类型',
                    prop: 'msg_type_str'
                },
            ]
            let arr2 = [
                {
                    label: '房间ID',
                    render: (h, params) => {
                        return h('div', params.row.room_number || '无')
                    }
                },
                {
                    label: '房间标题',
                    render: (h, params) => {
                        return h('div', params.row.title || '无')
                    }
                },
            ]
            let arr3 = [
                {
                    label: '消息内容',
                    showOverFlow: true,
                    render: (h, params) => {
                        return h('div', params.row.content || '无')
                    }
                },
                {
                    label: '敏感状态',
                    render: (h, params) => {
                        let data = MAPDATA.RISKMANAGEMENTMESSAGEHISTORYLIST.find(item => { return item.value === params.row.sen_status })
                        return h('span', { style: {
                            color: params.row.sen_status === 1 ? '#FF4949' : ''
                        } }, data ? data.name : '无')
                    }
                },
                {
                    label: '敏感内容',
                    showOverFlow: true,
                    render: (h, params) => {
                        return h('div', { style: {
                            color: params.row.sen_str ? '#FF4949' : ''
                        } }, params.row.sen_str || '无')
                    }
                }
            ]
            let arr4 = [
                {
                    label: '添加时间',
                    render: (h, params) => {
                        return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    }
                },
                {
                    label: '敏感词',
                    render: (h, params) => {
                        return h('span', params.row.val || '无')
                    }
                },
                {
                    label: '添加人',
                    render: (h, params) => {
                        return h('span', params.row.nickname || '无')
                    }
                },
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '移除')
                        ])
                    }
                }
            ]
            let arr5 = [], name;
            if(this.tabIndex === '0') {
                arr5 = [ ...arr, ...arr1, ...arr3 ]
                name = 'chatList'
            } else if(this.tabIndex === '1') {
                arr5 = [ ...arr, ...arr2, ...arr3 ]
                name = 'roomList'
            } else if(this.tabIndex === '2') {
                arr5 = [ ...arr4 ]
                name = 'index'
            }
            return {
                vm: this,
                url: REQUEST.risk[name],
                columns: arr5
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
                sen_status: s.sen_status,
                from_user_number: s.from_user_number,
                to_user_number: s.to_user_number,
                content: s.content,
                user_number: s.user_number,
                room_number: s.room_number
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
            this.searchParams = {
                sen_status: 1
            }
            this.dateTimeParams = {}
            this.changeIndex(0)
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
                this.$refs.historyComp.loadParams()
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 菜单切换
        tabChange() {
            setTimeout(() => {
                this.today(0)
            }, 0);
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
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
    line-height: 40px;
}
</style>
