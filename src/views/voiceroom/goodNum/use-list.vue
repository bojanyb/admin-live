<!-- 使用记录 -->
<template>
    <div class="shop-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
        <recycleComp ref="recycleComp" :recycleSource="recycleSource" @getList="getList"/>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入菜单组件
import recycleComp from './components/recycleComp.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    components: {
        tableList,
        SearchPanel,
        recycleComp
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
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'number',
                    type: 'input',
                    value: '',
                    label: '靓号ID',
                    placeholder: '请输入靓号ID'
                },
                {
                    name: 'use_status',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '使用状态',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.USESTATUS
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    label: '时间选择',
                    value: '',
                    linkage: true,
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
                url: REQUEST.prettyNumber.usingLog,
                columns: [
                    {
                        label: '使用时间',
                        prop: 'user_time',
                        render: (h, params) => {
                            let user_time = params.row.user_time !== "" ? params.row.user_time : "--"
                            return  h('span', user_time ? user_time : '--')
                        }
                    },
                    {
                        label: '用户/房间ID',
                        prop: 'user_number'
                    },
                    {
                        label: '商品类型',
                        prop: 'cate'
                    },
                    {
                        label: '靓号ID',
                        prop: 'number'
                    },
                    {
                        label: '使用状态',
                        render: (h, params) => {
                            let data = MAPDATA.USESTATUS.find(item => { return item.value === params.row.use_status })
                            return h('div', { class: { 'bounce_fa': true } }, [
                                h('span', data ? data.name : '--')
                            ])
                        }
                    },
                    {
                        label: '靓号时长',
                        prop: 'day',
                        render: (h, params) => {
                            let day = params.row.day !== "" ? params.row.day + "天" : "--"
                            return  h('span', day ? day : '--')
                        }
                    },
                    {
                        label: '剩余时长',
                        prop: 'last_day',
                        render: (h, params) => {
                            let last_day = params.row.last_day !== "" ? params.row.last_day + "天" : "--"
                            return  h('span', last_day ? last_day : '--')
                        }
                    },
                    {
                      label: '操作',
                      render: (h, params) => {
                          return h('div', [
                          h('el-button', { props: { type: 'danger'}, style: { display: params.row.use_status !== 1 ? 'none' : 'unset'
                              }, on: {click:()=>{this.recycle(params.row)}}},'回收')
                          ])
                      }
                    }
                ]
            }
        },
    },
    data() {
        return {
            searchParams: {
                user_number: "",
                number: "",
                use_status: ""
            },
            recycleSource : {}
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
                pagesize: params.size,
                user_number: s.user_number,
                number: s.number,
                use_status: s.use_status,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
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
            this.searchParams = {
              category: 0,
              name: ''
            }
            this.dateTimeParams = {
                activity_type_id: 1
            }
            this.getList()
        },
        // 重置
        onSearch() {
            this.getList()
        },
        // 回收
        recycle(row){
          this.recycleSource = row;
          this.$refs["recycleComp"].ruleForm.reason = "";
          this.$refs["recycleComp"].dialogVisible = true
        }
    }
}
</script>

<style lang="scss">
.shop-box {
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