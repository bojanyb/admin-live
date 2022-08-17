<template>
	<div class="app-container livetitle-box">
		<div class="btnBox">
			<el-button type="success" @click="add">新增</el-button>
		</div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 修改组件 -->
		<livetitleComp v-if="isDestoryComp" ref="livetitleComp" @destoryComp="destoryComp" @getList="getList"></livetitleComp>
	</div>
</template>

<script>
	// 引入新增 - 修改组件
	import livetitleComp from './livetitleComp/index.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	export default {
		name: 'LivetitleList',
		mixins: [mixins],
		components: {
			livetitleComp,
			tableList
		},
		computed: {
			cfgs() {
				return {
					vm: this,
					url: REQUEST.system.gits.liveRank,
					columns: [
						{
							label: '等级',
							prop: 'live_rank'
						},
						{
							label: '总魅力',
							prop: 'income'
						},
						{
							label: '修改时间',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改')
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
					this.$refs.livetitleComp.loadParams(status, row)
				}, 50);
			}
		}
	}
</script>

<style lang="scss">
.livetitle-box {
	.btnBox {
		margin-bottom: 20px;
	}
}
</style>