<template>
	<div class="app-container">
		<div class="btnBox">
			<el-button type="success" @click="add">新增</el-button>
		</div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<roomBgEdit ref="roomBgEdit" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></roomBgEdit>
	</div>
</template>

<script>
	import { getRoomBgDel } from '@/api/videoRoom'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入图片上传组件
	import uploadImg from '@/components/uploadImg/index.vue'
	// 编辑组件
	import roomBgEdit from './components/roomBgEdit.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'

	export default {
		name: 'room-background-list',
		components: {
			tableList,
			uploadImg,
			roomBgEdit
		},
		data() {
			return {
				isDestoryComp: false,
			}
		},
		computed: {
			cfgs() {
				return {
					vm: this,
					url: REQUEST.room.roomBg,
					isShowIndex: true,
					columns: [
						{
							label: '房间背景图',
							prop: 'url',
							isimg: true,
							imgWidth: '50px',
							imgHeight: '50px',
						},
						{
							label: '上传时间',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '上传人',
							prop: 'user_name'
						},
						{
							label: '默认配置房间',
							render: (h, params) => {
								let data = MAPDATA.ROOMTYPELIST.find(item => { return item.value === params.row.room_genre })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'修改'),
									h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.handleDel(params.row.id)}}},'删除')
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
				return {
					page: params.page,
					pagesize: params.size
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
			load(status, row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.roomBgEdit.loadParams(status, row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			// 删除
			async handleDel(id) {
				this.$confirm('是否确定删除该房间背景图?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await getRoomBgDel({ id })
					if(res.code === 2000) {
						this.$message.success('删除成功')
					}
					this.getList()
				}).catch(() => {});
			}
		},
	}
</script>

<style scoped="scoped" lang="scss">
.btnBox {
	margin-bottom: 20px;
}
</style>
