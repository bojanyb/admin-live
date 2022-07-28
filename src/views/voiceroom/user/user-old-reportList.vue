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
		name: 'user-old-reportList',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		computed: {
			forms() {
				return [
					{
						name: 'feedback_user_id',
						type: 'input',
						value: '',
						label: '被举报用户ID',
						isNum: true,
						placeholder: '请输入被举报用户ID'
					},
					{
						name: 'user_id',
						type: 'input',
						value: '',
						label: '举报用户ID',
						isNum: true,
						placeholder: '请输入举报用户ID'
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.report.userHistory,
					columns: [
						{
							label: '举报时间',
							minWidth: '140px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '被举报用户ID',
							minWidth: '100px',
							prop: 'feedback_user_id'
						},
						{
							label: '举报用户ID',
							prop: 'user_id'
						},
						{
							label: '举报原因',
							minWidth: '100px',
							prop: 'genre'
						},
						{
							label: '举报证据',
							prop: 'content'
						},
						{
							label: '处理人',
							prop: 'deal_user_name'
						},
						{
							label: '处理结果',
							render: (h, params) => {
								let data = MAPDATA.DURATION.find(item => { return params.row.ban_duration === item.value })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '处理说明',
							minWidth: '150px',
							prop: 'reply',
							showOverFlow: true
						},
						{
							label: '处理时间',
							minWidth: '140px',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						}
					]
				}
			}
		},
		data() {
			return {
				searchParams: {
					feedback_user_id: '',
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
					status: 2,
					feedback_user_id: s.feedback_user_id,
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
					feedback_user_id: '',
					user_id: ''
				}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			}
		},
	}
</script>

<style>

</style>
