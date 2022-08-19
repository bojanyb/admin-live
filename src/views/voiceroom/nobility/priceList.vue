<template>
	<div class="nobility-priceList-box">
		<!-- <div class="addBox">
			<el-button type="success" @click="add">新增</el-button>
		</div> -->

		<tableList :cfgs="cfgs" ref="tableList" @rowClick="rowClick"></tableList>

		<!-- 新增 - 修改组件 -->
		<priceAdd v-if="isDestoryComp" ref="priceAdd" @destoryComp="destoryComp" @getList="getList"></priceAdd>
	</div>
</template>

<script>
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 新增修改组件
	import priceAdd from './components/priceAdd.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'

	export default {
		mixins: [mixins],
		components: {
			tableList,
			priceAdd
		},
		data() {
			return {
				isDestoryComp: false // 是否销毁组件
			}
		},
		computed: {
			cfgs() {
				return {
					vm: this,
					url: REQUEST.nobility.noblePrice,
					columns: [
						{
							label: '套餐标题',
							prop: 'title'
						},
						{
							label: '（原）价格（喵粮）',
							prop: 'original_price'
						},
						{
							label: '折扣价格（喵粮）',
							prop: 'discount_price'
						},
						{
							label: '活动',
							render: (h, params) => {
								return h('span', params.row.activity_name || '无')
							}
						},
						{
							label: '说明',
							render: (h, params) => {
								return h('span', params.row.activity_detail || '无')
							}
						},
						{
							label: '是否自动续订',
							render: (h, params) => {
								let name = params.row.auto_renewal ? '是' : '否'
								return h('span', {
									style: {
										color: params.row.auto_renewal ? '#13CE66' : '#FF5454'
									}
								}, name || '无')
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}},'修改')
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
			rowClick(row) {
				this.load('see', row)
			},
			load(status, row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.priceAdd.loadParams(status, row)
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
.nobility-priceList-box {
	padding: 20px;
	box-sizing: border-box;
    .addBox {
		margin-bottom: 20px;
	}
}
</style>
