<template>
	<div class="app-container">
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
	import roomEdit from './components/roomEdit.vue'
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
					// {
					// 	name: 'is_live',
					// 	type: 'select',
					// 	value: '',
					// 	keyName: 'value',
					// 	optionLabel: 'name',
					// 	label: '直播状态',
					// 	placeholder: '请选择',
					// 	options: MAPDATA.ROOMSTATUSLIST
					// },
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
							label: '直播状态',
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
							label: '操作',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '编辑')
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
					this.$refs.roomEdit.dialogVisible = true
				}, 50);
			},

			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
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
