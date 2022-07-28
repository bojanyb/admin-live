<template>
	<div class="app-container">
		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 引入处理组件 -->
		<notReport v-if="isDestoryComp" ref="notReport" @destoryComp="destoryComp" @getList="getList"></notReport>
	</div>
</template>

<script>
	// 引入api
	import { getUserReportPass } from '@/api/videoRoom'
	// 引入处理组件
	import notReport from './components/notReport.vue'
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
		name: 'user-not-reportList',
		mixins: [mixins],
		components: {
			tableList,
			notReport
		},
		data() {
			return {
				isDestoryComp: false // 是否销毁组件
			}
		},
		computed: {
			cfgs() {
				return {
					vm: this,
					url: REQUEST.report.userHistory,
					columns: [
						{
							label: '举报时间',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '被举报ID',
							prop: 'feedback_user_id'
						},
						{
							label: '被举报状态',
							render: (h, params) => {
								let data = MAPDATA.REPORTSTATUSLIST.find(item => { return params.row.feedback_user_status === item.value })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '举报用户ID',
							prop: 'user_id'
						},
						{
							label: '举报原因',
							prop: 'genre'
						},
						{
							label: '举报证据',
							prop: 'content',
							showOverFlow: true
						},
						{
							label: '操作',
							minWidth: '120px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.manageClick(params.row.id)}}}, '处理'),
									h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.funcClick(params.row.id)}}}, '忽略'),
								])
							}
						}
					]
				}
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				return {
					page: params.page,
					pagesize: params.size,
					status: 1,
					feedback_user_id: '',
					user_id: ''
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
			},
			// 处理
			manageClick(id) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.notReport.loadParams(id)
				}, 50);
			},
			// 忽略
			async funcClick(id) {
				let res = await getUserReportPass({ id })
				if(res.code === 2000) {
					this.$message.success('忽略成功')
				}
				this.getList()
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			}
		},
	}
</script>

<style>
</style>
