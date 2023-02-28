<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
		<el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
			<div class="box-card-inner">
				<div>抽奖人数：{{sumSource.user_count || 0}}人</div>
				<div>抽奖次数：{{sumSource.lottery_count || 0}}次</div>
				<div>消费金额：{{sumSource.lottery_cost_count || 0}}钻石</div>
				<div>产出金额：{{sumSource.lottery_output_count || 0}}钻石</div>
				<div>利润率：{{sumSource.profit_margin || 0}}%</div>
			</div>
		</el-card>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
	// 引入api
	import { getPoolNameV2,getRoundV2 } from '@/api/activity'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'

	export default {
		mixins: [mixins],
		components: {
			tableList,
			SearchPanel,
		},
		data() {
			return {
				activeList: [
					{
						id: 1,
						name:"萌喵抓娃娃"
					}
				], // 活动
				lotteryList: [], // 奖池
				poolList: [], // 轮次
				sumSource: {},
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
						placeholder: '请输入用户ID'
					},
					{
						name: 'gift_id',
						type: 'input',
						value: '',
						label: '奖品ID',
						isNum: true,
						placeholder: '请输入奖品ID'
					},
					{
						name: 'user_rank',
						type: 'select',
						value: 1,
						keyName: 'id',
						optionLabel: 'name',
						label: '活动',
						placeholder: '请选择',
						options: this.activeList,
					},
					{
						name: 'type',
						type: 'select',
						value: '',
						keyName: 'key',
						optionLabel: 'value',
						label: '奖池',
						placeholder: '请选择',
						clearable: true,
            linkage: true,
						options: this.lotteryList,
						handler: {
							change: v => {
								this.getRoundSource(v)
							},
						}
					},
					{
						name: 'round',
						type: 'select',
						value: '',
						keyName: 'round_number',
						optionLabel: 'title',
						label: '轮次',
						placeholder: '请选择',
						clearable: true,
            linkage: true,
						options: this.poolList
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
					url: REQUEST.activity.poolDetailV2,
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
							label: '奖品类型',
							render: (h, params) => {
								return h('span', params.row.type_desc ? params.row.type_desc : '无')
							}
						},
						{
							label: '奖品ID',
							prop: 'gift_id',
							showOverFlow: true,
							render: (h, params) => {
								return h('span', params.row.gift_id > 0 ? params.row.gift_id : '--')
							}
						},
						{
							label: '奖品名称',
							prop: 'remark',
							showOverFlow: true
						},
						{
							label: '奖品单价',
							render: (h, params) => {
								return h('span', params.row.gift_diamond)
							}
						},
						{
							label: '抽奖花费',
							render: (h, params) => {
								return h('span', params.row.lottery_cost)
							}
						},
						{
							label: '利润值',
							render: (h, params) => {
								return h('span', params.row.profit)
							}
						},
					]
				}
			}
		},
		mounted(){
			this.getPoolNameSource()
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params.page,
					pagesize: params.size,
					type: (s.type == -1 || s.type == "全部") ? "" : s.type,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                	end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
					round: (s.round == -1 || s.round == "全部") ? "" : s.round,
					user_number: s.user_number,
					gift_id: s.gift_id,
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
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
			saleAmunt(row){
				this.sumSource = row.data
			},
			// 获取奖池名
			async getPoolNameSource() {
				let res = await getPoolNameV2();
				if(res.code == 2000){
					this.lotteryList = res.data.pool
					let all = {key: -1, value: "全部"}
					this.lotteryList.unshift(all)
				}
			},
			// 获取轮数
			async getRoundSource(type) {
				let roundType = type == -1 ? "" : type
				// 初始化轮数
				this.searchParams.round = ""
				let res = await getRoundV2({type:roundType});
				if(res.code == 2000){
          // 全部默认选择第一个
          if(roundType == ""){
            this.searchParams.round = res.data.round[0].round_number
          }
					this.poolList = res.data.round
				}
			}
		}
	}
</script>
<style lang="scss">
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
		.el-card__body{
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
</style>



