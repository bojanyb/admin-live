<template>
	<div class="user-blocked-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @rowClick="rowClick"></tableList>

		<!-- 用户详情组件 -->
		<userComp ref="userComp"></userComp>
	</div>
</template>

<script>
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入用户详情组件
	import userComp from './components/userComp.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'

	export default {
		name: 'RoomList',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			userComp
		},
		data() {
			return {
				isDestoryComp: false // 是否销毁组件
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
					url: REQUEST.blocked.bannedUserLog,
					columns: [
						{
							label: '用户ID',
							prop: 'user_number'
						},
						{
							label: '昵称',
							minWidth: '120px',
							prop: 'nickname'
						},
						{
							label: '头像',
							isimg: true,
							prop: 'face',
							imgWidth: '50px',
							imgHeight: '50px',
						},
                        {
							label: '封禁时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
                        {
							label: '封禁时长',
							prop: 'duration',
						},
                        {
							label: '封禁原因',
							render: (h, params) => {
								return h('span', params.row.remark || '无')
							}
						},
						{
							label: '状态',
							render: (h, params) => {
								let data = MAPDATA.USERBLOCKEDSTATUSLIST.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
                        {
							label: '创建时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
                        {
							label: '操作人',
							render: (h, params) => {
								return h('span', params.row.admin_nickname || '无')
							}
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
			},
			// 查看用户详情
			rowClick(row, column) {
				if(column.property !== 'face') {
					this.$refs.userComp.loadParams(row)
				}
			}
		}
	}
</script>

<style lang="scss">
.user-blocked-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>
