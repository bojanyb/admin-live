<template>
	<div class="room-blocked-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 编辑组件 -->
		<roomEdit ref="roomEdit" v-if="isDestoryComp" @destoryComp="destoryComp"></roomEdit>
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
	// import roomEdit from './components/roomEdit.vue'
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
					this.$refs.roomEdit.dialogVisible = true
				}, 50);
			},
			// 解封
			deblocking(row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {});
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
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
