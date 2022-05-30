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
                    name: 'activity_type_id',
                    type: 'select',
                    value: 1,
                    keyName: 'value',
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
                    name: 'activity_type_id',
                    type: 'select',
                    value: 1,
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
                // url: REQUEST.userActivity.dwActivity.list,
                isShowIndex: true,
                columns: [
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                    },
                    {
                        label: '收到（喵粮）',
                    },
                    {
                        label: '送出（喵粮）',
                    },
                ]
            }
        }
    },
    data() {
        return {
            property: 'value',
        };
    },
    methods: {
        saleAmunt() {},
        // 使用
        use(row) {
            
        },
        onSearch() {},
        reset() {}
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