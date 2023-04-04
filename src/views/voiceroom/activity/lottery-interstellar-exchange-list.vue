<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
		<el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
			<div class="box-card-inner">
				<div>兑换人数：{{sumSource.user_count || 0}}人</div>
				<div>兑换奖品数量：{{sumSource.exchange_count || 0}}个</div>
				<div>消耗兑换道具数量：{{sumSource.debris_number_count || 0}}个</div>
				<div>兑换奖品总价值：{{sumSource.exchange_diamond_count || 0}}钻石</div>
				<div>兑换道具总价值：{{sumSource.debris_diamond_count || 0}}钻石</div>
			</div>
		</el-card>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
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
						name:"穿越星际"
					}
				], // 活动
        giftTypeList: [
          {
            id: 0,
            name: "全部"
          },
          {
            id: 1,
            name: "礼物奖品"
          },
          {
            id: 2,
            name: "装扮道具"
          }
        ],
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
						name: 'desc',
						type: 'input',
						value: '',
						label: '奖品名称',
						placeholder: '请输入奖品名称'
					},
          {
						name: 'type',
						type: 'select',
						value: '',
						keyName: 'id',
						optionLabel: 'name',
						label: '奖品类型',
						placeholder: '请选择',
						clearable: true,
            linkage: true,
						options: this.giftTypeList,
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
					url: REQUEST.activity.exchangeLogV4,
					columns: [
						{
							label: '兑换时间',
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
							label: '兑换类型',
							prop: 'type_name',
						},
            {
							label: '奖品数量',
							prop: 'number',
						},
						{
							label: '奖品ID',
							prop: 'gift_id',
							prop: 'ids',
						},
						{
							label: '奖品名称',
							prop: 'desc',
							showOverFlow: true
						},
						{
							label: '兑换道具数量',
							prop: 'debris_number',
						},
						{
							label: '兑换奖品价值',
							prop: 'exchange_diamond_count',
						},
						{
							label: '兑换道具价值',
							prop: 'debris_diamond_count',
						}
					]
				}
			}
		},
		mounted(){},
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
          desc: s.desc
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



