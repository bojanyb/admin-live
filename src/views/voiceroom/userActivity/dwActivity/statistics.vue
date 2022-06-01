// 端午活动统计
<template>
    <div class="dwActivity-index-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
    </div>
</template>

<script>
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

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
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'gift_name',
                    type: 'select',
                    value: '粽子',
                    keyName: 'name',
                    optionLabel: 'name',
                    label: '礼物类型',
                    placeholder: '请选择',
                    options: MAPDATA.GIFTLIST
                },
                {
                    name: 'relation_trade_no',
                    type: 'input',
                    value: '',
                    label: '统计',
                    placeholder: '',
                    disabled: true
                },
                {
                    name: 'order',
                    type: 'select',
                    value: 'live_user_id',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '查看',
                    placeholder: '请选择',
                    options: MAPDATA.GIFTSTATISTICS
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.userActivity.dwActivity.dragonBoatFestival,
                isShowIndex: true,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                        prop: 'nickname'
                    },
                    {
                        label: '收到（喵粮）',
                        prop: 'receive_amount'
                    },
                    {
                        label: '送出（喵粮）',
                        prop: 'send_amout'
                    },
                ]
            }
        }
    },
    data() {
        return {
            allStatistics: null
        };
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = this.searchParams
            return {
                page: params.page,
                gift_name: s.gift_name ? s.gift_name : '粽子',
                order: s.order ? s.order : 'live_user_id',
                user_number: s.user_number
            }
        },
        saleAmunt() {},
        onSearch() {
            this.$refs.tableList.getData()
        },
        reset() {
            this.searchParams = {}
            this.onSearch()
        }
    }
}
</script>

<style lang="scss">
.dwActivity-index-box {
    padding: 20px;
    box-sizing: border-box;
    .tableList {
        margin-top: 22px;
    }
}
</style>