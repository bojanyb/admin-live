<template>
    <div class="app-container finance-payment-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 引入新增 - 修改弹窗 -->
        <paymentComp v-if="isDestoryComp" ref="paymentComp" @destoryComp="destoryComp" @getList="getList"></paymentComp>
    </div>
</template>

<script>
// 引入api
import { payList, payChannelWaySave } from '@/api/finance'
// 引入新增 - 修改弹窗
import paymentComp from './components/paymentComp.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
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
        paymentComp,
        menuComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            menuList: MAPDATA.PAYCONFIGURATIONPLATFORMTYPELIST,
            tabIndex: '0',
            searchParams: {
                channel: 3,
                channel_way: 1
            }
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'channel',
                    type: 'select',
                    value: 3,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '支付平台',
                    placeholder: '请选择',
                    options: MAPDATA.PAYCONFIGURATIONPLATFORMLIST
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.pay.payList,
                columns: [
                    {
                        label: '支付平台',
                        render: (h, params) => {
                            let data = MAPDATA.PAYCONFIGURATIONPLATFORMLIST.find(item => { return item.value === params.row.channel })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '商户号',
                        prop: 'merchant_name'
                    },
                    {
                        label: '商户名称（主体）',
                        prop: 'name'
                    },
                    {
                        label: '商户类型',
                        render: (h, params) => {
                            return h('span', '直联')
                        }
                    },
                    {
                        label: '商户状态',
                        render: (h, params) => {
                            return h('span', params.row.remark || '无')
                        }
                    },
                    {
                        label: '使用状态',
                        prop: 'status',
                        isSwitch: true,
                        isTrueValue: 1,
                        isFalseValue: 0,
                        activeText: '启用',
                        inactiveText: '停用',
                        change: (v, row) => {
                            this.setSuperUserFunc(row.id, v)
                        },
                        render: (h, params) => {
                            return h('span', '')
                        }
                    },
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
                channel: s.channel,
                channel_way: s.channel_way
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
        // tab切换
        tabChange(v) {
            this.searchParams.channel_way = Number(v) + 1
            this.getList()
        },
        // 状态切换
        async setSuperUserFunc(id, status) {
            let params = {
                id: id,
                status: status
            }
            let res = await payChannelWaySave(params)
            if(res.code === 2000) {
                this.$success('操作成功')
                this.getList()
            }
        }
    }
}
</script>

<style lang="scss">
.finance-payment-box {

}
</style>