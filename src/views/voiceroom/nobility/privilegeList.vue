<template>
	<div class="nobility-privilege-box">
		<!-- <div class="searchParams">
			<el-button type="success" @click="add">新增</el-button>
        </div> -->

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 修改 - 查看 -->
		<privilegeAdd v-if="isDestoryComp" ref="privilegeAdd" @destoryComp="destoryComp" @getList="getList"></privilegeAdd>
	</div>
</template>

<script>
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入新增 - 修改 - 查看组件
	import privilegeAdd from './components/privilegeAdd.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'

	export default {
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
					url: REQUEST.nobility.nobilitylist,
					columns: [
						{
							label: '贵族',
							prop: 'noble_name'
						},
						{
							label: '拥有特权',
							prop: 'privilege_titles',
							width: '550px'
						},
						{
							label: '成长值（喵粮）',
							prop: 'growth_value',
							minWidth: '120px'
						},
						{
							label: '保级值（喵粮）',
							prop: 'hold_value',
							minWidth: '120px'
						},
						{
							label: '保级天数（天）',
							prop: 'hold_day',
							minWidth: '120px'
						},
						{
							label: '未保级衰减值（喵粮）',
							prop: 'reduce_value',
							minWidth: '180px'
						},
						{
							label: '修改时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.update_time || '无')
							}
						},
						{
							label: '操作',
							minWidth: '200px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'修改'),
									h('el-button', { on: {click:()=>{this.see(params.row)}}},'查看')
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
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.privilegeAdd.loadParams(status, row)
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
