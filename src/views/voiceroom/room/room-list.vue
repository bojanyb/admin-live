<template>
	<div class="room-list-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 编辑组件 -->
		<roomEdit ref="roomEdit" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></roomEdit>
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
	// 引入编辑组件
	import roomEdit from './components/roomEdit.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
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
			roomEdit
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
						name: 'room_number',
						type: 'input',
						value: '',
						label: '房间ID',
						isNum: true,
						placeholder: '请输入房间ID'
					},
					{
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会ID',
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
							label: '房间ID',
							prop: 'room_number'
						},
						{
							label: '房间名称',
							prop: 'room_name'
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
							label: '状态',
							render: (h, params) => {
								let data = MAPDATA.USERSTATUSLIST.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, style: {
										display: params.row.status == 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.editFunc(params.row)}}},'编辑'),
									h('el-button', { props: { type: 'danger'}, style: {
										display: params.row.status == 3 ? 'unset' : 'none'
									}, on: {click:()=>{this.deblocking(params.row)}}},'解封'),
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
			},

			// 编辑
			editFunc(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.roomEdit.loadParams(row)
				}, 50);
			},

			// 解封
			async deblocking(row) {
				let params = {
					room_number: row.room_number,
					status: 1
				}
				await getRoomSave(params)
				this.getList()
			},

			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			}
		}
	}
</script>
<style lang="scss">
.room-list-box {
	padding: 20px;
	box-sizing: border-box;
	.el-table {
		.el-button {
			margin-left: 0px;
		}
	}
}
</style>
