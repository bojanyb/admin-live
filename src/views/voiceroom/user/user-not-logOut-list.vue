<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
	import { getUserCancellationDeal } from '@/api/videoRoom'
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
		name: 'user-not-logOut-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		computed: {
			forms() {
				return [
					{
						name: 'sort',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '排序查看',
						placeholder: '请选择',
						options: MAPDATA.LOGOUTUNTREATEDSORTLIST
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.logout.list,
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
								let data = MAPDATA.LOGOUTUNTREATEDSTATUSLIST.find(item => { return params.row.status === item.value })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.passFunc(params.row.id, 1)}}}, '通过'),
									h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.reject(params.row.id, 2)}}}, '拒绝')
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
					sort: 0
				}
			}
		},
		created() {
			this.userCancellationList();
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					status: 0,
					sort: s.sort
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {
					sort: 0
				}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// 通过
			async passFunc(id, status) {
				let res = await getUserCancellationDeal({ id, status })
				if(res.code === 2000) {
					this.$message.success('处理成功')
				}
				this.getList()
			},
			// 拒绝
			async reject(id, status) {
				let res = await getUserCancellationDeal({ id, status })
				if(res.code === 2000) {
					this.$message.success('驳回成功')
				}
				this.getList()
			}
		},
	}
</script>

<style>
</style>
