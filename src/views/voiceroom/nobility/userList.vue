<template>
	<div class="nobility-privilege-box">
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
	// 引入公共参数
	import mixins from '@/utils/mixins.js'

	export default {
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
						name: 'user_number',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.nobility.nobleUser,
					columns: [
						{
							label: '用户昵称',
							prop: 'nickname'
						},
						{
							label: '用户ID',
							prop: 'user_number'
						},
						{
							label: '已累计成长值',
							prop: 'heap_value'
						},
						{
							label: '开通时间',
							render: (h, params) => {
								return h('span', params.row.create_time || '无')
							}
						},
						{
							label: '到期时间',
							render: (h, params) => {
								return h('span', params.row.end_time || '无')
							}
						},
						{
							label: '当前成长值',
							prop: 'growth_value'
						},
						{
							label: '当前贵族等级',
							prop: 'noble_level'
						},
						// {
						// 	label: '剩余保级天数',
						// 	prop: 'hold_day'
						// }
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
				this.dateTimeParams = {}
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
.nobility-privilege-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
