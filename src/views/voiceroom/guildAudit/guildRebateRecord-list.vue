<template>
	<div class="guildRebateRecord-list-box">
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
		name: 'guildRebateRecord-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		data() {
			return {

			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会ID',
						isNum: true,
						placeholder: '请输入公会ID'
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.settlementLog,
					columns: [
						{
							label: '时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '')
							}
						},
						{
							label: '公会ID',
							prop: 'guild_number'
						},
						{
							label: '公会等级',
							render: (h, params) => {
								let data = MAPDATA.CLASSLIST.find(item => { return item.value === params.row.rank })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '公会长ID',
							minWidth: '120px',
							prop: 'user_number'
						},
						{
							label: '流水',
							minWidth: '120px',
							prop: 'flow'
						},
						{
							label: '返佣比例',
							prop: 'rebate'
						},
						{
							label: '已结算',
							minWidth: '120px',
							prop: 'settlement'
						},
						{
							label: '时间区间',
							minWidth: '300px',
							render: (h, params) => {
								return h('div', [
									h('span', params.row.op_time ? timeFormat(params.row.op_time, 'YYYY-MM-DD HH:mm:ss', true) : ''),
									h('span', '-'),
									h('span', params.row.op_end_time ? timeFormat(params.row.op_end_time, 'YYYY-MM-DD HH:mm:ss', true) : '')
								])
							}
						},
						{
							label: '操作人',
							prop: 'op_user'
						}
					]
				}
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number
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
.guildRebateRecord-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
