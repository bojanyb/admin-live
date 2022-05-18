// 幸运转盘记录
<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <SearchPanel :search-params="searchParams" :forms="forms" :show-search-btn="true" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入api
import REQUEST from '@/request/index.js'
import mixins  from '@/utils/mixins'
export default {
    mixins: [mixins],
    data() {
		return {
        }
	},
    components: {
        tableList,
        SearchPanel,
    },
    computed: {
        forms() {
             return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.user_number = v.user_number.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '礼物ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.user_number = v.user_number.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '交易流水号',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            // this.searchParams.user_number = v.user_number.trim()
                            // this.getList()
                        }
                    }
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'daterange',
                    format: "yyyy-MM-dd",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            // this.emptyDateTime()
                            // this.setDateTime(v)
                            // this.getList()
                        },
                        selectChange: (v, key) => {
                            // this.emptyDateTime()
                            // this.getList()
                        }
                    }
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.platformActivity.drawFlow,
                method: "post",
                isShowIndex: true,
                columns: [
                    {
                        label: '用户ID',
                        props: "user_number",
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '参与时间',
                        props: "create_time",
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物ID',
                        props: "gift_id",
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物名称',
                        props: "gift_name",
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物数量',
                        props: "number",
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '礼物价值',
                        props: "gift_diamond",
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '交易流水',
                        props: "relation_trade_no",
                        render: (h, row) => {
                            return '111'
                        }
                    }
                ]
            }
        }
    },
    created(){
    },
    methods:{
        //传递参数
        beforeSearch(params) {
            return {
                size: params.size,
                page: params.page,
                code : "mmly"
            };
        },
        onSearch(){
            console.log("记录搜索");
        }
    }
}
</script>

<style lang="scss">
.invite-join-us {
    padding: 20px;
    box-sizing: border-box;
}
</style>