<template>
	<div class="room-blocked-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 用户封禁详情组件 -->
		<roomComp ref="roomComp"></roomComp>
	</div>
</template>

<script>
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入用户封禁详情组件
	import roomComp from './components/roomComp.vue'
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
			roomComp
		},
		data() {
			return {

			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'room_number',
						type: 'input',
						value: '',
						label: '房间ID',
						isNum: true,
						placeholder: '请输入房间ID'
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.blocked.bannedRoomLog,
					columns: [
						{
							label: '房间ID',
							prop: 'room_number'
						},
                        {
							label: '房主ID',
							prop: 'user_number'
						},
						{
							label: '房主名称',
							minWidth: '120px',
							prop: 'nickname'
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
							render: (h, params) => {
								return h('span', params.row.duration || '无')
							}
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
					room_number: s.room_number
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

<style lang="scss" scoped="scoped">
.room-blocked-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>
