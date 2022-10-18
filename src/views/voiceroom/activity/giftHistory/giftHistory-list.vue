<template>
	<div class="giftHistory-list-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" add-name="增发" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 后台增发 -->
		<giveHistoryComp v-if="isDestoryComp" ref="giveHistoryComp" @destoryComp="destoryComp" @getList="getList"></giveHistoryComp>
	</div>
</template>

<script>
	// 引入增发组件
	import giveHistoryComp from '../components/giveHistoryComp.vue'
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
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	export default {
		name: 'giftHistoryList',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			giveHistoryComp
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
						name: 'currency',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '增发类型',
						placeholder: '请选择',
						options: MAPDATA.FINANCEGIVETYPELIST
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
					url: REQUEST.finance.platformTopUp,
					columns: [
						{
							label: '赠送时间',
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
							prop: 'nickname'
						},
						{
							label: '增发类型',
							render: (h, params) => {
								let data = MAPDATA.FINANCEGIVETYPELIST.find(item => { return item.value === params.row.currency })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '增发数额',
							prop: 'diamond',
							render: (h, params) => {
								return h('span', {
									style: {
										color: params.row.genre === 1 ? '#13CE66' : '#ff4949'
									}
								}, params.row.genre === 1 ? '+' + params.row.diamond : '-' + params.row.diamond)
							}
						},
						{
							label: '赠送人',
							prop: 'op_user'
						},
						{
							label: '赠送说明',
							prop: 'remark',
							showOverFlow: true
						}
					]
				}
			}
		},
		data() {
			return {
				isDestoryComp: false // 是否销毁组件
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params.page,
					pagesize: params.size,
					user_number: s.user_number,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
                	end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
					currency: s.currency
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
			// 增发
			add() {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.giveHistoryComp.loadParams()
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			}
		}
	}
</script>

<style lang="scss">
.giftHistory-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
