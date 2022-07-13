<template>
	<div class="nobility-privilege-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" :show-add="true"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 直播编辑组件 -->
		<!-- <liveEdit ref="liveEdit" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></liveEdit> -->
	</div>
</template>

<script>
	import { roomHide, getRoomSave, roomTop } from '@/api/videoRoom'
	import { liveEnd } from '@/api/callApp.js'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入房间直播编辑组件
	// import liveEdit from './components/liveEdit.vue'
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
			tableList,
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
				},
				isDestoryComp: false // 是否销毁组件
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
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会',
						isNum: true,
						placeholder: '请输入公会ID'
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
							label: '直播场次ID',
							prop: 'room_number'
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
							prop: 'live_user_number'
						},
						{
							label: '所属公会',
							render: (h, params) => {
								return h('span', params.row.guild_number || '无')
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
							label: '开播时长',
							render: (h, params) => {
								let data = formatTime(params.row.live_time)
								return h('span', data ? data : '无')
							}
						},
						{
							label: '在线人数',
							prop: 'people'
						},
						{
							label: '操作',
							width : '230px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.liveEditFunc(params.row)}}},'编辑'),
									h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.dissolveFunc(params.row)}}},'解散')
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
					is_live: 1,
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
				this.dateTimeParams = {}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},

			// 解散房间
			async dissolveFunc(row) {
				this.$confirm('是否确认解散?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let params = {
						room_number: row.room_number,
						uid: row.live_user_id
					}
					let res = await liveEnd(params)
					if(res.code === 2000) {
						this.$message({
							type: 'success',
							message: '解散成功'
						});
					}
					
				}).catch(() => {});
			},

			// 编辑房间
			liveEditFunc(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.liveEdit.loadParams(row)
				}, 50);
			},

			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},

			// 房间隐藏
			async roomHideFunc(id, status) {
				let params = {
					id: id,
					is_hide: status
				}
				await roomHide(params)
				this.getList()
			}
		}
	}
</script>
<style lang="scss">
.nobility-privilege-box {
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
