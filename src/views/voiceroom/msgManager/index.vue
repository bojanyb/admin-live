<!-- 系统通知 -->
<template>
    <div class="sysnotice-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
        <!-- 新增/修改 -->
        <add ref="add" v-if="isDestoryComp" :type="'sysnotice'" @onSearch="onSearch" @destoryComp="destoryComp"></add>
    </div>
</template>

<script>
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
// 引入新增组件
import add from './components/addComp.vue'

export default {
    components: {
        tableList,
        SearchPanel,
        add
    },
    mixins: [mixins],
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
                url: REQUEST.system.sysList,
                columns: [
                    {
                        label: '发送时间',
                        minWidth: '50px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '用户',
                        minWidth: '50px',
                        prop: 'target_val'
                    },
                    {
                        label: '消息标题',
                        minWidth: '50px',
                        render: (h, params) => {
                            return h('span', params.row.title ? params.row.title : '--')
                        }
                    },
                    {
                        label: '消息内容',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.content ? params.row.content : '--')
                        }
                    },
                    {
                        label: '跳转类型',
                        minWidth: '50px',
                        render: (h, params) => {
                            let data = MAPDATA.PATHTYPE2.find(item => { return item.value === params.row.push_type })
                            return h('span', data ? data.name : '--')
                        }
                    },
                    {
                        label: '跳转链接/房间ID',
                        minWidth: '50px',
                        showOverFlow: true,
                        render: (h, params) => {
                            return h('span', params.row.push_val ? params.row.push_val : '--')
                        }
                    }
                ]
            }
        },
    },
    data() {
        return {
            ruleForm: {
                alreadyMoney: null,
                deductMoney: null
            },
            isDestoryComp: false // 销毁组件
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params.page,
                user_number: s.user_number,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000)
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
        // 查询
        reset() {
            this.searchParams = {}
            this.dateTimeParams = {
                activity_type_id: 1
            }
            this.getList()
        },
        // 重置
        onSearch() {
            this.getList()
        },
        // 列表返回数据
        saleAmunt(data) {
            // this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
        },
        // 新增
        add() {
            this.load('add')
        },
        update(row) {
            this.load('update', row)
        },
        load(status,row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.add.dialogVisible = true
                this.$refs.add.load(status, row)
            }, 100);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss">
.sysnotice-box {
    padding: 20px;
    box-sizing: border-box;
    .model {
        margin-bottom: 20px;
    }
    .bounce_fa {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .bounce {
            position: absolute;
            left: 0;
            font-size: 17px;
            color: #ff4949;
            font-weight: 600;
            transform: translateY(5px);
            animation: bounce 1s infinite;
        }

        @keyframes bounce {
            0% {
                transform: translateY(5px);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(5px);
            }
        }
    }
}
</style>