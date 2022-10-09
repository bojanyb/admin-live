<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

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
			tableList,
			notReport
		},
		computed: {
			forms() {
				return [
					// {
					// 	name: 'feedback_user_id',
					// 	type: 'input',
					// 	value: '',
					// 	label: '被举报用户ID',
					// 	isNum: true,
					// 	placeholder: '请输入被举报用户ID'
					// },
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
						value: 1,
						keyName: 'value',
						optionLabel: 'name',
						label: '处罚状态',
						placeholder: '请选择',
						options: MAPDATA.REPORTUSERPUNISHSTATUSLIST
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
							label: '用户ID',
							prop: 'user_id'
						},
						{
							label: '用户昵称',
							prop: 'user_nickname'
						},
						{
							label: '被举报用户ID',
							minWidth: '100px',
							prop: 'feedback_user_id'
						},
						{
							label: '被举报用户昵称',
							minWidth: '100px',
							prop: 'feedback_user_nickname'
						},
						{
							label: '举报类型',
							minWidth: '100px',
							prop: 'genre'
						},
						{
							label: '举报说明',
							minWidth: '150px',
							prop: 'content',
							showOverFlow: true
						},
						{
							label: '举报证据',
							isimgList: true,
							prop: 'img_path',
							propCopy: 'video_path',
							imgWidth: '70px',
							imgHeight: '70px',
							width: '200px'
						},
						{
							label: '操作',
							minWidth: '120px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.funcClick(params.row.id)}}}, '忽略'),
									h('el-button', { props: { type: 'danger'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.manageClick(params.row.id)}}}, '处理'),
									h('el-button', { props: { type: 'success'}, style: {
										display: params.row.status === 2 ? 'unset' : 'none'
									}, on: {click:()=>{}}}, '已处理'),
									h('el-button', { props: { type: 'success'}, style: {
										display: params.row.status === 3 ? 'unset' : 'none'
									}, on: {click:()=>{}}}, '已忽略'),
								])
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
					user_id: '',
					status: 1
				},
				isDestoryComp: false // 是否销毁组件
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
					user_id: '',
					status: 1
				}
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
					this.$success('忽略成功')
				}
				this.getList()
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			}
		}
	}
</script>

<style>

</style>
