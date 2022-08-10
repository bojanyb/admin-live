<template>
	<div class="app-container greet-list-box">
		<div class="btnBox">
			<el-button type="success" @click="add">新增</el-button>
		</div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 修改组件 -->
		<greetComp v-if="isDestoryComp" ref="greetComp" @destoryComp="destoryComp" @getList="getList"></greetComp>
	</div>
</template>

<script>
	// 引入api
	import { getDesignateDelete } from '@/api/videoRoom'
	// 引入新增 - 修改组件
	import greetComp from './greetComp/index.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入api
	import REQUEST from '@/request/index.js'
	export default {
		name: 'greet-list',
		mixins: [mixins],
		components: {
			greetComp,
			tableList
		},
		computed: {
			cfgs() {
				return {
					vm: this,
					url: REQUEST.system.message.index,
					columns: [
						{
							label: '打招呼常用语',
							prop: 'message'
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
									h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除')
								])
							}
						}
					]
				}
			}
		},
		data() {
			return {
				isDestoryComp: false, // 是否销毁组件
			}
		},
		methods: {
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 配置参数
			beforeSearch(params) {
				return {
					page: params.page,
					pagesize: params.size
				}
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
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
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
					this.$refs.greetComp.loadParams(status, row)
				}, 50);
			},
			async deleteParams(id) {
				this.$confirm('确定删除当前打招呼常用语吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await getDesignateDelete({ ids: [id] })
					if(res.code === 2000) {
						this.$message.success('删除成功')
						this.getList()
					}
				}).catch(() => {});
			}
		}
	}
</script>

<style lang="scss">
.greet-list-box {
	.btnBox {
		margin-bottom: 20px;
	}
}
</style>