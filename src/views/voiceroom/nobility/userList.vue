<template>
	<div class="nobility-privilege-box">
		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
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
			tableList
		},
		data() {
			return {

			}
		},
		computed: {
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
							label: '开通时间',
							render: (h, params) => {
								return h('span', params.row.create_time || '无')
							}
						},
						{
							label: '当前贵族等级',
							prop: 'noble_grade_id'
						},
						{
							label: '当前成长值',
							prop: 'growth_value'
						},
						{
							label: '剩余保级天数',
							prop: 'hold_day'
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
