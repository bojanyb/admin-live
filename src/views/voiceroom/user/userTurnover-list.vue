<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
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
	export default {
		name: 'userTurnover-list',
		components: {
			tableList,
			SearchPanel
		},
		mixins: [mixins],
		computed: {
			forms() {
				return [
					{
						name: 'room_number',
						type: 'input',
						value: '',
						label: '派对ID',
						isNum: true,
						placeholder: '请输入派对ID'
					},
					{
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会ID',
						isNum: true,
						placeholder: '请输入公会ID'
					},
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '收礼人ID',
						isNum: true,
						placeholder: '请输入收礼人ID'
					},
					{
						name: 'dateTimeParams',
						type: 'datePicker',
						dateType: 'datetimerange',
						format: "yyyy-MM-dd HH:mm:ss",
						label: '时间选择',
						value: '',
						handler: {
							change: v => {
								this.emptyDateTime()
								this.setDateTime(v)
								this.getList()
							},
							selectChange: (v, key) => {
								this.emptyDateTime()
								this.getList()
							}
						}
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.deal.userFlow1,
					columns: [
						{
							label: '收礼ID',
							prop: 'live_user_number'
						},
						{
							label: '来源',
							render: (h, params) => {
								let name = params.row.room_number ? '派对' : '私聊'
								return h('span', name)
							}
						},
						{
							label: '时间',
							minWidth: '130px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '派对ID',
							render: (h, params) => {
								return h('span', params.row.room_number || '无')
							}
						},
						{
							label: '公会ID',
							render: (h, params) => {
								return h('span', params.row.guild_number || '无')
							}
						},
						{
							label: '金额',
							prop: 'amount'
						},
						{
							label: '交易流水号',
							minWidth: '150px',
							prop: 'relation_trade_no'
						}
					]
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number,
					room_number: s.room_number,
					user_number: s.user_number,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
					end_time: s.end_time ? Math.floor(s.end_time / 1000) : ''
				}
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
			}
		}
	}
</script>
