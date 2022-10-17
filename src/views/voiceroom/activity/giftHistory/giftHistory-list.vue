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
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					},
					{
						name: 'status',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '充值状态',
						placeholder: '请选择',
						options: MAPDATA.ORDERSTATUS
					},
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
							prop: 'user_number'
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
							prop: 'diamond'
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
