// 幸运转盘统计
<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <SearchPanel :search-params="searchParams" :forms="forms" :show-search-btn="true" @onSearch="onSearch"></SearchPanel>
        </div>
        
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-card class="sumBox">
				<div class="sumBoxItem fl">活动参与人数：{{activity.count}}</div>
				<div class="sumBoxItem fl">活动投入：{{activity.baoxiang_in}}</div>
				<div class="sumBoxItem fl">活动产出：{{activity.baoxiang_out}}</div>
				<div class="sumBoxItem fl">活动投入产出比：{{activity.output_proportion}}</div>
			</el-card>
		</el-col>

        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
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
import mixins from '@/utils/mixins'
export default {
    mixins: [mixins],
   data() {
		return {
            activity: {
                count: 0,
                baoxiang_in: 0,
                baoxiang_out: 0,
                output_proportion:0
            }
        }
	},
    components: {
        tableList,
        SearchPanel
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
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'daterange',
                    format: "yyyy-MM-dd",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            this.searchParams.start_time = v ? v[0] / 1000 : "";
                            this.searchParams.end_time = v ? v[1] / 1000 : "";
                            this.$refs.tableList.getData();
                        },
                        selectChange: (v, key) => {}
                    }
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.platformActivity.drawRecord,
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
                        label: '参与次数',
                        props: "user_open_count",
                        render: (h, params) => {
                            return h('span', params.row.user_open_count)
                        }
                    },
                    {
                        label: '投入',
                        props: "user_out",
                        render: (h, params) => {
                            return h('span', params.row.user_out)
                        }
                    },
                    {
                        label: '产出',
                        props: "user_in",
                        render: (h, params) => {
                            return h('span', params.row.user_in)
                        }
                    },
                ]
            }
        }
    },
    methods:{
        //传递参数
        beforeSearch(params) {
            return {
                size: params.size,
                page: params.page,
                code : "dzp",
                user_number: this.searchParams.user_number,
                start_time: this.searchParams.start_time,
                end_time: this.searchParams.end_time,
            };
        },
        onSearch(val){
            this.searchParams.user_number = val.user_number;
            this.searchParams.start_time = val.dateTimeParams ? val.dateTimeParams[0] / 1000 : "";
            this.searchParams.end_time = val.dateTimeParams ? val.dateTimeParams[1] / 1000 : "";
            this.$refs.tableList.getData();
        },
        saleAmunt(row){
            row.activity.count = row.count;
            this.activity = row.activity;
        }
    }
}
</script>

<style lang="scss">
.invite-join-us {
    padding: 20px;
    box-sizing: border-box;
}
.sumBox {
    display: flex;
    width: 80%;
    margin-bottom: 20px;
    .el-card__body {
        width: 100%;

        .sumBoxItem {
            width: 25%;
            white-space: nowrap;
            text-align: center;
            border-right: solid 1px #DCDCDC;
        }

        .sumBoxItem:last-child {
            border-right: none;
        }
    }
}
</style>