<template>
	<div class="app-container banner-list-box">
		<div class="btnBox">
			<el-button type="success" @click="add">新增</el-button>
		</div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 修改组件 -->
		<bannerComp v-if="isDestoryComp" ref="bannerComp" @destoryComp="destoryComp" @getList="getList"></bannerComp>
	</div>
</template>

<script>
	// 引入api
	import { getBannerChange } from '@/api/videoRoom'
	// 引入新增 - 修改组件
	import bannerComp from './bannerComp/index.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	export default {
		name: 'banner-list',
		mixins: [mixins],
		components: {
			bannerComp,
			tableList
		},
		data() {
			return {
				isDestoryComp: false, // 是否销毁组件
			}
		},
		computed: {
			StartPicker() {
				return {
					disabledDate: (time) => {
						return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
					}
				}
			},
			EndPicker() {
				return {
					disabledDate: (time) => {
						return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
					}
				}
			},
			startTime() {
				let start = this.popForm.start_time
				let now = new Date().getTime()
				let params = {}
				params = {
					required: true,
					validator: (rules, val, cb) => {
						if(start < now && this.type === 'Add') {
							cb(new Error('开始时间不可小于当前时间'))
						} else {
							cb()
						}
					}
				}
				return params
			},
			endTime() {
				let start = this.popForm.start_time
				let now = new Date().getTime()
				let params = {}
				params = {
					required: true,
					validator: (rules, val, cb) => {
						if(start < now && this.type === 'Add') {
							cb(new Error('结束时间不可小于当前时间'))
						} else {
							cb()
						}
					}
				}
				return params
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.system.banner.getBanner,
					columns: [
						{
							label: '序号',
							prop: 'sort'
						},
						{
							label: 'banner标题',
							prop: 'title'
						},
						{
							label: '轮播顺序',
							prop: 'sort'
						},
						{
							label: 'banner图片',
							isimg: true,
							prop: 'pic',
							imgHeight: '50px'
						},
						{
							label: 'banner类型',
							render: (h, params) => {
								let data = MAPDATA.BANNERSYSTEMTYPELIST.find(item => { return item.value === params.row.type })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '更新时间',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '启用/禁用',
							isSwitch: true,
							prop: 'status',
							isTrueValue: 1,
							isFalseValue: 2,
							change: (v, row) => {
								this.changeSwitch(row.id, v)
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改')
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
					this.$refs.bannerComp.loadParams(status, row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			// 更改
			async changeSwitch(id, status) {
				let params = {
					id,
					status: status === 1 ? true : false
				}
				let res = await getBannerChange(params)
				if(res.code === 2000) {
					if(status === 1) {
						this.$message.success('启用成功')
					} else {
						this.$message.success('禁用成功')
					}
					this.getList()
				}
			}
		}
	}
</script>

<style lang="scss">
.banner-list-box {
	.btnBox {
		margin-bottom: 20px;
	}
}
</style>
