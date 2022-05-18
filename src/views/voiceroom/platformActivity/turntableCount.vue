// 幸運轉盤統計
<template>
    <div class="invite-join-us">
        <div class="searchParams">
            <SearchPanel :search-params="searchParams" :forms="forms" :show-search-btn="true" @onSearch="onSearch"></SearchPanel>
        </div>
        
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-card class="sumBox">
				<div class="sumBoxItem fl">活动参与人数：{{baoxiang.baoxiang_open_count}}</div>
				<div class="sumBoxItem fl">活动投入：{{baoxiang.baoxiang_in}}</div>
				<div class="sumBoxItem fl">活动产出：{{baoxiang.baoxiang_out}}</div>
				<div class="sumBoxItem fl">活动投入产出比：{{baoxiang.output_proportion}}</div>
			</el-card>
		</el-col>

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
import mixins from '@/utils/mixins'
export default {
    mixins: [mixins],
   data() {
		return {
            baoxiang: {
                baoxiang_open_count: 0,
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
                isShowIndex: true,
                columns: [
                    {
                        label: '用户ID',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '参与次数',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '投入',
                        render: (h, row) => {
                            return '111'
                        }
                    },
                    {
                        label: '产出',
                        render: (h, row) => {
                            return '111'
                        }
                    }
                ]
            }
        }
    },
    methods:{
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
.sumBox {
    display: flex;
    width: 80%;
    margin-bottom: 20px;
    .el-card__body {
        width: 100%;

        .sumBoxItem {
            width: 25%;
            text-align: center;
            border-right: solid 1px #DCDCDC;
        }

        .sumBoxItem:last-child {
            border-right: none;
        }
    }
}
</style>