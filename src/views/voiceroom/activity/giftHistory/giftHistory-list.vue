<template>
	<div class="giftHistory-list-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
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
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	export default {
		name: 'giftHistoryList',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		computed: {
			forms() {
				return [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '被赠送用户ID',
						isNum: true,
						placeholder: '请输入被赠送用户ID'
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.finance.platformTopUp,
					columns: [
						{
							label: '被赠送用户ID',
							prop: 'user_number'
						},
						{
							label: '赠送类型',
							render: (h, params) => {
								let data = MAPDATA.FINANCEGIVETYPELIST.find(item => { return item.value === params.row.currency })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '赠送数量',
							prop: 'diamond'
						},
						{
							label: '赠送时间',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '赠送原因',
							prop: 'remark',
							showOverFlow: true
						},
						{
							label: '操作人',
							prop: 'op_user'
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
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					user_number: s.user_number
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
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
