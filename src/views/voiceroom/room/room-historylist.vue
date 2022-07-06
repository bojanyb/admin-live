<template>
	<div class="room-historylist">
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
	import { formatTimeTwo } from '@/utils/common.js'

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
						name: 'inputSelect',
						value: '',
						selectName: 'iSelect',
						type: 'inputSelect',
						placeholder: '请输入ID',
						selectPlaceholder: '请选择',
						selctValue: 'room',
						keyName: 'key',
						optionLabel: 'label',
						selectWidth: '130px',
						handler: {
							change: (v) => {
								console.log(v, 'v----')
								if(v == 'code') {
									// this.$set(this.searchParams, 'live_user_number', )
								}
							}
						},
						options: [
							{ key: 'room', label: '房间ID' },
							{ key: 'user', label: '房主ID' }
						]
					},
					{
						name: 'guild_id',
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
					url: REQUEST.room.liveRoomHistory,
					isShowIndex: true,
					columns: [
						{
							label: '直播场次ID',
							prop: 'id'
						},
						{
							label: '房间ID',
							prop: 'room_number'
						},
						{
							label: '房间名称',
							prop: 'room_name'
						},
						{
							label: '房间类型',
							prop: 'room_genre_name'
						},
						{
							label: '房主ID',
							prop: 'user_number'
						},
						{
							label: '所属公会',
							render: (h, params) => {
								return h('span', params.row.guild_name || '无')
							}
						},
						{
							label: '开播时间',
							render: (h, params) => {
								return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '结束时间',
							render: (h, params) => {
								return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '开播时长',
							render: (h, params) => {
								let time = params.row.end_time - params.row.start_time
								let data = formatTimeTwo(time)
								return h('span', data ? data : '无')
							}
						},
						// {
						// 	label: '进入房间人数',
						// 	width: '120px',
						// 	prop: 'enter_user_count'
						// },
						// {
						// 	label: '付费人数',
						// 	width: '95px',
						// 	prop: 'consume_user_count'
						// },
						// {
						// 	label: '本场流水（喵粮）',
						// 	width: '140px',
						// 	prop: 'total_gain'
						// },
						// {
						// 	label: '解散方式',
						// 	width: '95px',
						// 	prop: 'people',
						// 	render: (h, params) => {
						// 		let data = MAPDATA.DISSOLUTIONTYPELIST.find(item => { return params.row.disband_type === item.value })
						// 		return h('span', data ? data.name : '无')
						// 	}
						// },
						// {
						// 	label: '解散人',
						// 	width: '95px',
						// 	prop: 'disband_username'
						// }
					]
				}
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				s.room_number = s.inputSelect
				s.user_number = s.inputSelect
				if(s.iSelect === 'room') {
					delete s.user_number
				} else if(s.iSelect === 'user') {
					delete s.room_number
				}
				return {
					page: params.page,
					pagesize: params.size,
					room_number: s.room_number,
					user_number: s.user_number,
					guild_id: s.guild_number
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {
					iSelect: 'room',
					inputSelect: ''
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
<style lang="scss">
.room-historylist {
	padding: 20px;
	box-sizing: border-box;
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
}
</style>
