<template>
	<div class="nobility-privilege-box">
		<div class="searchParams">
			<el-button type="success" @click="add">新增</el-button>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 修改 - 查看 -->
		<privilegeAdd ref="privilegeAdd" @destoryComp="destoryComp"></privilegeAdd>
	</div>
</template>

<script>
	import { roomHide, getRoomSave, roomTop } from '@/api/videoRoom'
	import { liveEnd } from '@/api/callApp.js'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入新增 - 修改 - 查看组件
	import privilegeAdd from './components/privilegeAdd.vue'
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
			tableList,
			privilegeAdd
		},
		data() {
			return {
				isDestoryComp: false, // 是否销毁组件
			}
		},
		computed: {
			cfgs() {
				return {
					vm: this,
					url: REQUEST.room.roomList,
					columns: [
						{
							label: '贵族',
							prop: 'room_number'
						},
						{
							label: '拥有特权',
							prop: 'room_number'
						},
						{
							label: '成长值（喵粮）',
							prop: 'room_name'
						},
						{
							label: '保级值（喵粮）',
							prop: 'room_genre_name'
						},
						{
							label: '保级天数（天）',
							prop: 'live_user_number'
						},
						{
							label: '未保级衰减值（喵粮）',
							render: (h, params) => {
								return h('span', params.row.guild_number || '无')
							}
						},
						{
							label: '修改时间',
							render: (h, params) => {
								return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.liveEditFunc(params.row)}}},'修改'),
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.dissolveFunc(params.row)}}},'查看')
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
			// 新增
			add() {
				this.load('add')
			},
			// 修改
			update(row) {
				this.load('update', row)
			},
			// 查看
			see(row) {
				this.load('see', row)
			},
			load(status, row) {
				this.$refs.privilegeAdd.loadParams(status, row)
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
			}
		}
	}
</script>
<style lang="scss">
.nobility-privilege-box {
	padding: 20px;
	box-sizing: border-box;
	.searchParams {
		margin-bottom: 20px;
	}
}
</style>
