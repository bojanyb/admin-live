<template>
	<div class="app-container">
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
		name: 'user-old-logOut-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		computed: {
			forms() {
				return [
					{
						name: 'user_id',
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
						label: '状态',
						placeholder: '请选择',
						options: MAPDATA.PROCESSEDSTATUSLIST
					},
					
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.logout.hasDeal,
					columns: [
						{
							label: '用户昵称',
							prop: 'nickname'
						},
						{
							label: '用户ID',
							prop: 'user_id'
						},
						{
							label: '手机号',
							prop: 'phone'
						},
						{
							label: '申请注销时间',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '状态',
							render: (h, params) => {
								let data = MAPDATA.PROCESSEDSTATUSLIST.find(item => { return params.row.status === item.value })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '处理人',
							prop: 'deal_user_name'
						},
						{
							label: '处理时间',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
					]
				}
			}
		},
		data() {
			return {
				searchParams: {
					status: 2,
					user_id: ''
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
					status: s.status,
					sort: 0,
					user_id: s.user_id
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {
					sort: 0,
					status: 2,
					user_id: ''
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

<style>
</style>
