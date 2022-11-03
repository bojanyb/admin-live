<template>
    <div class="app-container finance-deposit-list-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增 - 修改组件 -->
        <commercialComp v-if="isDestoryComp" ref="commercialComp" @destoryComp="destoryComp" @getList="getList" type="deposit"></commercialComp>
    </div>
</template>

<script>
// 引入api
import { useCash } from '@/api/finance'
// 引入新增 - 修改组件
import commercialComp from './components/commercialComp.vue'
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
export default {
    mixins: [mixins],
    components: {
        tableList,
        SearchPanel,
        commercialComp
    },
    data() {
        return {
            searchParams: {
                channel: 3,
                channel_way: 1
            },
            isDestoryComp: false // 是否销毁组件
        };
    },
    computed: {
        channelList() {
            let arr = JSON.parse(JSON.stringify(MAPDATA.PAYCONFIGURATIONPLATFORMLIST))
            return arr.filter(item => { return item.value === 3 })
        },
        forms() {
            return [
                {
                    name: 'channel',
                    type: 'select',
                    value: 3,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '商户平台',
                    placeholder: '请选择',
                    options: this.channelList
                },
                // {
                //     name: 'channel_way',
                //     type: 'select',
                //     value: 1,
                //     keyName: 'value',
                //     optionLabel: 'name',
                //     label: '提现类型',
                //     placeholder: '请选择',
                //     options: MAPDATA.PAYCONFIGURATIONPLATFORMTYPELIST
                // }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.pay.index,
                columns: [
                    {
                        label: '商户平台',
                        render: (h, params) => {
                            let data = MAPDATA.PAYCONFIGURATIONPLATFORMLIST.find(item => { return item.value === params.row.channel })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    // {
                    //     label: '提现类型',
                    //     render: (h, params) => {
                    //         let data = MAPDATA.PAYCONFIGURATIONPLATFORMTYPELIST.find(a => { return params.row.channel_way === a.value })
                    //         return h('span', data ? data.name : '无')
                    //     }
                    // },
                    
                    {
                        label: '主体名称',
                        prop: 'name'
                    },
                    {
                        label: '商户名称',
                        prop: 'merchant_name'
                    },
                    {
                        label: '提现税率',
                        render: (h, params) => {
                            return h('span', params.row.cash_rate + '%')
                        }
                    },
                    // {
                    //     label: '商户号',
                    //     minWidth: '100px',
                    //     render: (h, params) => {
                    //         return h('span', params.row.appid || '无')
                    //     }
                    // },
                    // {
                    //     label: '商户状态',
                    //     minWidth: '100px',
                    //     render: (h, params) => {
                    //         return h('span', params.row.remark || '无')
                    //     }
                    // },
                    {
                        minWidth: '100px',
                        label: '使用状态',
                        prop: 'cash_status',
                        isSwitch: true,
                        isTrueValue: 1,
                        isFalseValue: 0,
                        activeText: '启用',
                        inactiveText: '停用',
                        change: (v, row) => {
                            this.payChannelWaySaveFunc(row.id, v)
                        },
                        render: (h, params) => {
                            return h('span', '')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                channel: s.channel,
                channel_way: s.channel_way,
                purpose: 2
            }
        },
        // 重置
        reset() {
            this.searchParams = {
                channel: 3,
                channel_way: 1
            }
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
        // 修改
        update(row) {
            this.load('update', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.commercialComp.loadParams(status, row)
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 菜单切换
        tabChange(v) {
            this.searchParams.channel_way = Number(v) + 1
        },
        // 切换状态
        async payChannelWaySaveFunc(id, status) {
            let params = {
                id: id,
                cash_status: status
            }
            let res = await useCash(params)
            if(res.code === 2000) {
                this.$success('操作成功')
                this.getList()
            }
        }
    }
}
</script>

<style lang="scss">
.finance-deposit-list-box {

}
</style>