<!-- 靓号仓库 -->
<template>
    <div class="depot-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
        <add ref="add" v-if="isDestoryComp" @onSearch="onSearch" @destoryComp="destoryComp"></add>
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
// 引入api
import { down } from '@/api/shopping.js'
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
                    name: 'number',
                    type: 'input',
                    value: '',
                    label: '靓号ID',
                    isNum: true,
                    placeholder: '请输入靓号ID'
                },
                {
                    name: 'type',
                    type: 'select',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '靓号类型',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.GOODNUMTYPE
                },
                {
                    name: 'status',
                    type: 'select',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '状态',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.GOODNUMSTATUS
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
                url: REQUEST.shopping.list,
                columns: [
                    {
                        label: '创建时间',
                        render: (h, params) => {
                            return h('span', params.row.up_time ? timeFormat(params.row.up_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '靓号ID',
                        prop: 'id'
                    },
                    {
                        label: '靓号类型',
                        render: (h, params) => {
                            let data = MAPDATA.SHOPPING.find(item => { return item.value === params.row.goods_type })
                            return h('div', { class: { 'bounce_fa': true } }, [
                                h('span', data ? data.name : '--')
                            ])
                        }
                    },
                    {
                        label: '靓号状态',
                        render: (h, params) => {
                            let data = MAPDATA.SHOPPING.find(item => { return item.value === params.row.goods_type })
                            return h('div', { class: { 'bounce_fa': true } }, [
                                h('span', data ? data.name : '--')
                            ])
                        }
                    },
                    {
                        label: '备注说明',
                        render: (h, params) => {
                            return h('span', params.row.update_user ? params.row.update_user : '--')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 2 ? 'none' : 'unset'
                                }, on: {click:()=>{this.down(params.row, 2)}}},'删除')
                            ])
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
                status: s.status,
                user_number: s.user_number,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
                user_id: s.user_id,
                order_id: s.order_id,
                sort: s.sort,
                goods_type: s.goods_type
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
        down(row, status) {
            let params = {
                id: row.id,
                status: status
            }
            down(params).then(res => {
                if(res.code === 2000) {
                    this.onSearch()
                }
            })
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
.depot-box {
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