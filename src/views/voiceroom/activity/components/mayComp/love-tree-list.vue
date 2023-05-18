<template>
	<div class="page-container">
		<div class="searchParams">
			<SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset"
				@onSearch="onSearch"></SearchPanel>
		</div>
        <el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
			<div class="box-card-inner">
				<div>抽奖人数：{{sumSource.user_count || 0}}人</div>
                <div>抽奖次数：{{sumSource.lottery_count || 0}}次</div>
				<div>消费金额：{{sumSource.lottery_cost_count || 0}}钻石</div>
                <div>产出金额：{{sumSource.lottery_output_count || 0}}钻石</div>
                <div>利润值：{{sumSource.profit_value || 0}}钻石</div>
				<div>产出比：{{sumSource.profit_margin || 0}}%</div>
			</div>
		</el-card>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
// 引入api
import { getGiftV520,getRoundV520,getPoolNameV520 } from '@/api/activity'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'

export default {
	mixins: [mixins],
	components: {
		tableList,
		SearchPanel
	},
	data() {
		return {
			tabIndex: '0',
			giftNameList: [], // 礼物名称
            dateTimeParams: {},
            sumSource: {},
            roundList: [], // 轮次列表
            poolList: [] // 奖池列表
		}
	},
	computed: {
		forms() {
			return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    linkage: true,
                    placeholder: '请输入用户ID'
                },
                {
                    name: 'remark',
                    type: 'input',
                    value: '',
                    label: '奖品名称',
                    linkage: true,
                    placeholder: '请输入奖品名称'
                },
                {
                    name: 'type',
                    type: 'select',
                    value: "",
                    keyName: 'key',
                    optionLabel: 'value',
                    label: '奖池类型',
                    placeholder: '请选择',
                    clearable: true,
            		linkage: true,
                    options: this.poolList,
                    handler: {
						change: v => {
							this.getRoundSource(v)
						},
					}
                },
                {
                    name: 'round',
                    type: 'select',
                    value: "全部",
                    keyName: 'round_number',
                    optionLabel: 'title',
                    label: '奖池轮次',
                    placeholder: '请选择',
                    options: this.roundList,
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
				url: REQUEST.activity.poolDetailV520,
				columns: [
					{
						label: '时间',
						width: '180px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
					},
					{
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                        prop: 'nickname',
                    },
                    {
                        label: '奖品ID',
                        prop: 'gift_id'
                    },
                    {
                        label: '奖品名称',
                        prop: 'remark',
                    },
                    {
                        label: '抽奖消耗',
                        prop: 'lottery_cost',
                    },
                    {
                        label: '奖品价值',
                        prop: 'gift_diamond',
                    },
                    {
                        label: '利润值',
                        prop: 'profit',
                    }
				]
			}
		}
	},
	mounted() {
        this.getPoolNameSource();
        this.getRoundSource();
        this.getPoolSource();
    },
	methods: {
		// 配置参数
		beforeSearch(params) {
			let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
                user_number: s.user_number,
                remark: s.remark,
                round: (s.round == -1 || s.round == "全部") ? "" : s.round,
                type: (s.type == -1 || s.type == "全部") ? "" : s.type,
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
		// 刷新列表
		getList() {
			this.$refs.tableList.getData()
		},
		// 重置
		reset() {
			this.searchParams = {}
            this.dateTimeParams = {}
			this.getList()
		},
		// 查询
		onSearch() {
			this.getList()
		},
		// table 返回数据
		saleAmunt(row) {
			this.sumSource = row.data
		},
        // 获取礼物名称
        async getPoolNameSource() {
            let res = await getGiftV520();
            if(res.code == 2000){
                this.giftNameList = res.data.list;
                let all = {gift_id: 0, gift_name: "全部"}
                this.giftNameList.unshift(all)
            }
        },
        // 获取轮次
        async getRoundSource(type) {
            let roundType = type == -1 ? "" : type
            // 初始化轮数
			this.searchParams.round = ""
            let res = await getRoundV520({ type: roundType });
            if(res.code == 2000){
                // 全部默认选择第一个
				if(roundType == ""){
					this.searchParams.round = res.data.round[0].round_number
				}
				this.roundList = res.data.round
            }
        },
        // 奖池类型
        async getPoolSource() {
            let res = await getPoolNameV520();
            if(res.code == 2000){
                this.poolList = res.data.pool;
                let all = {key: 0, value: "全部"}
                this.poolList.unshift(all)
            }
        },
	}
}
</script>
<style lang="scss" scoped>
.el-icon-circle-close {
	color: #FFFFFF;
}

.box-card {
	width: 100%;
	height: 40px;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	padding: 0px 30px;
	box-sizing: border-box;
	margin-bottom: 20px;

	.el-card__body {
		width: 100%;
		padding: 0;

		.box-card-inner {
			display: flex;
			justify-content: space-around;

			div {
				font-size: 15px;
				color: #ffffff;
			}
		}
	}
}
::v-deep .share-table-list-box .el-table__body-wrapper {
    height: 29.5rem !important;
}
</style>



