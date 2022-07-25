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
// 引入时间插件
import moment from 'moment'
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
                    isNum: true,
                    label: '用户ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            this.searchParams.user_number = v.user_number.trim()
                            this.$refs.tableList.getData();
                        }
                    }
                },
                {
                    name: 'gift_id',
                    type: 'input',
                    value: '',
                    label: '礼物ID',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            this.searchParams.gift_id = v.gift_id.trim()
                            this.$refs.tableList.getData();
                        }
                    }
                },
                {
                    name: 'relation_trade_no',
                    type: 'input',
                    value: '',
                    label: '交易流水号',
                    placeholder: '',
                    handler: {
                        enter: (v) => {
                            this.searchParams.relation_trade_no = v.relation_trade_no.trim()
                            this.$refs.tableList.getData();
                        }
                    }
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'daterange',
                    format: "yyyy-MM-dd hh:mm:ss",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => { 
                            this.searchParams.start_time = v ? v[0] / 1000 : "";
                            this.searchParams.end_time = v ? v[1] / 1000 : "";
                            this.$refs.tableList.getData();
                        },
                        selectChange: (v, key) => { }
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
                        render: (h, params) => {
                            return h('span', params.row.user_number)
                        }
                    },
                    {
                        label: '参与时间',
                        minWidth: '120px',
                        props: "create_time",
                        render: (h, params) => {
                            return h('span', params.row.create_time > 0 ? moment(params.row.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "")
                        }
                    },
                    {
                        label: '礼物ID',
                        props: "gift_id",
                        render: (h, params) => {
                            return h('span', params.row.gift_id)
                        }
                    },
                    {
                        label: '礼物名称',
                        props: "gift_name",
                        render: (h, params) => {
                            return h('span', params.row.gift_name)
                        }
                    },
                    {
                        label: '礼物数量',
                        props: "number",
                        render: (h, params) => {
                            return h('span', params.row.number)
                        }
                    },
                    {
                        label: '礼物价值',
                        props: "gift_diamond",
                        render: (h, params) => {
                            return h('span', params.row.gift_diamond)
                        }
                    },
                    {
                        label: '交易流水',
                        minWidth: '160px',
                        props: "relation_trade_no",
                        render: (h, params) => {
                            return h('span', params.row.relation_trade_no)
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
                code : "dzp",
                user_number: this.searchParams.user_number,
                gift_id: this.searchParams.gift_id,
                relation_trade_no: this.searchParams.relation_trade_no,
                start_time: this.searchParams.start_time,
                end_time: this.searchParams.end_time,
            };
        },
        onSearch(val){
            this.searchParams.user_number = val.user_number;
            this.searchParams.gift_id = val.gift_id;
            this.searchParams.relation_trade_no = val.relation_trade_no;
            this.searchParams.start_time = val.dateTimeParams ? val.dateTimeParams[0] / 1000 : "";
            this.searchParams.end_time = val.dateTimeParams ? val.dateTimeParams[1] / 1000 : "";
            this.$refs.tableList.getData();
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