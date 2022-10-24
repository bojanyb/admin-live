<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 引入处理组件 -->
		<!-- <notReport v-if="isDestoryComp" ref="notReport" @destoryComp="destoryComp" @getList="getList"></notReport> -->

		<!-- 新增组件 -->
        <userComp v-if="isDestoryComp" ref="userComp" @destoryComp="destoryComp" @getList="getList"></userComp>
	</div>
</template>

<script>
	// 引入api
	import { getUserReportPass } from '@/api/videoRoom'
	// 引入处理组件
	// import notReport from './components/notReport.vue'
	import userComp from '../serviceConfig/components/userComp.vue'
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
			userComp
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
				let arr = [
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
						prop: 'feedback_user_id',
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
						label: '举报用户',
						prop: 'user_id',
						render: (h, params) => {
							return h('span', params.row.user_id +' ('+ params.row.user_nickname +')' )
						}
					},
					{
						label: '处理状态',
						minWidth: '100px',
						render: (h, params) => {
							let data = MAPDATA.REPORTUSERPUNISHSTATUSLIST.find(item => { return item.value === params.row.status })
							return h('span', data ? data.name : '无')
						}
					}
				]
				let arr1 = [
					{
						label: '处理说明',
						minWidth: '150px',
						prop: 'reply',
						showOverFlow: true
					}
				]
				let arr2 = [
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
								}, on: {click:()=>{this.manageClick(params.row)}}}, '处理'),
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
				return {
					vm: this,
					url: REQUEST.report.userHistory,
					columns: this.searchParams.status === 2 ? [ ...arr, ...arr1, ...arr2 ] : [ ...arr, ...arr2 ]
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
				let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params.page,
					pagesize: params.size,
					status: s.status,
					feedback_user_id: s.feedback_user_id,
					user_id: s.user_id,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                	end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time
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
				this.searchParams = {
					feedback_user_id: '',
					user_id: '',
					status: 1
				}
				this.dateTimeParams = {}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// 处理
			manageClick(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.userComp.loadParams('add', row)
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
