<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
	import {
		roomHide,
		getRoomSave,
		roomTop
	} from '@/api/videoRoom'
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
	// 引入公共方法
	import { formatTime } from '@/utils/common.js'

	export default {
		name: 'RoomList',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				multipleSelection: [],
				filters: {
					'room_number': '',
					'is_live': '',
					guild_number: null
				},
				page: {
					page: 1,
					limit: 10
				}
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'room_number',
						type: 'input',
						value: '',
						label: '房间号码',
						isNum: true,
						placeholder: '请输入房间号码'
					},
					{
						name: 'is_live',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '直播状态',
						placeholder: '请选择',
						options: MAPDATA.ROOMSTATUSLIST
					},
					{
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '工会',
						isNum: true,
						placeholder: '请输入工会ID'
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.room.roomList,
					isShowIndex: true,
					columns: [
						{
							label: '房间号码',
							width: '100px',
							prop: 'room_number'
						},
						{
							label: '房间名称',
							width: '180px',
							prop: 'room_name'
						},
						{
							label: '房主ID',
							width: '100px',
							prop: 'live_user_number'
						},
						{
							label: '房间类型',
							width: '100px',
							prop: 'room_genre_name'
						},
						{
							label: '在线时长',
							width: '120px',
							render: (h, params) => {
								let data = formatTime(params.row.live_time)
								return h('span', data ? data : '无')
							}
						},
						{
							label: '开播时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '结束时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '所属公会',
							render: (h, params) => {
								return h('span', params.row.guild_number || '无')
							}
						},
						{
							label: '在线人数',
							width: '95px',
							prop: 'people'
						},
						{
							label: '被举报次数',
							width: '95px',
							prop: 'report'
						},
						{
							label: '直播状态',
							width: '95px',
							render: (h, params) => {
								let data = MAPDATA.ROOMSTATUSLIST.find(item => { return item.value === params.row.is_live })
								return h('span', {
									style: {
										color: params.row.is_live === 1 ? '#85CE61' : '#ff6d6d'
									}
								}, data ? data.name : '无')
							}
						},
						{
							label: '状态',
							width: '95px',
							render: (h, params) => {
								let data = MAPDATA.ROOMCARDSTATUSLIST.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '总流水',
							prop: 'total_flow'
						},
						{
							label: '当日流水',
							prop: 'today_flow'
						},
						{
							label: '本周流水',
							prop: 'now_week_flow'
						},
						{
							label: '上一周流水',
							width: '100px',
							prop: 'last_week_flow'
						},
						{
							label: '操作',
							width : '230px',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'danger'}, style: {
										display: params.row.status == 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.handleRoom(params.row)}}},'冻结'),
									h('el-button', { props : { type: 'danger'}, style: {
										display: params.row.status == 3 ? 'unset' : 'none'
									}, on: {click:()=>{this.handleRoom(params.row)}}},'解冻'),
									h('el-button', { props : { type: 'primary'}, style: {
										display: params.row.is_hide == 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.roomHideFunc(params.row.id, 2)}}}, '房间隐藏'),
									h('el-button', { props : { type: 'primary'}, style: {
										display: params.row.is_hide == 2 ? 'unset' : 'none'
									}, on: {click:()=>{this.roomHideFunc(params.row.id, 1)}}}, '取消隐藏')
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
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					room_number: s.room_number,
					is_live: s.is_live,
					guild_number: s.guild_number
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {}
				this.dateTimeParams = {
					activity_type_id: 1
				}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},

			// 冻结/解冻
			handleRoom(source) {
				var tipsText = source.status == 1 ? '确定冻结当前房间吗?' : '确定解冻当前房间吗?'
				this.$alert(tipsText, '提示', {
					confirmButtonText: '确定',
					callback: action => {
						if (action == 'confirm') {
							var params = {
								'room_number': JSON.stringify(source.room_number),
								'status': source.status == 1 ? '3' : '1'
							}
							getRoomSave(params).then(res => {
								this.$message.success("操作成功")
								this.getList()
							}).catch(err => {
								this.$message.error("操作失败")
							})
						} else if (action == 'cancel') {}
					}
				})
			},

			// 房间隐藏
			async roomHideFunc(id, status) {
				let params = {
					id: id,
					is_hide: status
				}
				await roomHide(params)
				this.getList()
			},

			// 置顶 - 取消置顶
			async roomTopFunc(id, top) {
				let params = {
					id,
					top
				}
				await roomTop(params)
				this.getList()
			}
		}
	}
</script>
<style lang="scss" scoped="scoped">
	.el-form-item {
		// margin-bottom: initial;
	}

	.pagination-container {
		margin-top: initial;
	}

	.colorNormal {
		color: #67C23A;
	}

	.colorDel {
		color: #F56C6C;
	}
</style>
