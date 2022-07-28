<template>
	<div class="nobility-privilege-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
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
	// 引入公共方法
	import { formatTime } from '@/utils/common.js'

	export default {
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		data() {
			return {

			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.nobility.nobleUser,
					columns: [
						{
							label: '用户昵称',
							prop: 'nickname'
						},
						{
							label: '用户ID',
							prop: 'user_number'
						},
						{
							label: '已累计成长值',
							prop: 'heap_value'
						},
						{
							label: '开通时间',
							render: (h, params) => {
								return h('span', params.row.create_time || '无')
							}
						},
						{
							label: '到期时间',
							render: (h, params) => {
								return h('span', params.row.end_time || '无')
							}
						},
						{
							label: '当前成长值',
							prop: 'growth_value'
						},
						{
							label: '当前贵族等级',
							prop: 'noble_level'
						},
						// {
						// 	label: '剩余保级天数',
						// 	prop: 'hold_day'
						// }
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
					user_number: s.user_number
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
			},

			// 房间隐藏
			async roomHideFunc(id, status) {
				let params = {
					id: id,
					is_hide: status
				}
				await roomHide(params)
				this.getList()
			}
		}
	}
</script>
<style lang="scss">
.nobility-privilege-box {
	padding: 20px;
	box-sizing: border-box;
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
}
</style>
