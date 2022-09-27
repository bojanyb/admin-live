<template>
	<div class="nobility-privilege-box">
		<SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
		
		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 用户详情组件 -->
		<userComp ref="userComp"></userComp>
	</div>
</template>

<script>
	// 引入详情组件
	import userComp from './components/userComp.vue'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	export default {
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			userComp
		},
		data() {
			return {
				searchParams: {
					sort_field: 'id'
				}
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
						name: 'sort_field',
						type: 'select',
						value: 'id',
						keyName: 'value',
						optionLabel: 'name',
						label: '排序',
						placeholder: '请选择',
						options: MAPDATA.NOBILITYUSERSORTLIST
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
							label: '魅力成长值',
							render: (h, params) => {
								return h('span', params.row.gain_value ? Number(params.row.gain_value) : params.row.gain_value)
							}
						},
						{
							label: '财富成长值',
							render: (h, params) => {
								return h('span', params.row.recharge_value ? Number(params.row.recharge_value) : params.row.recharge_value)
							}
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
							prop: 'growth_value',
							render: (h, params) => {
								return h('span', params.row.growth_value ? Number(params.row.growth_value) : params.row.growth_value)
							}
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
					user_number: s.user_number,
					sort_field: s.sort_field
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {
					sort_field: 'id'
				}
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
