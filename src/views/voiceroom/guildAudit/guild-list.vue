<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 编辑组件 -->
		<editComp ref="editComp" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></editComp>

		<!-- 明细组件 -->
		<guildDetails v-if="isDestoryComp" ref="guildDetails" :guildParams="guildParams" @getList="getList" @destoryComp="destoryComp"></guildDetails>
	</div>
</template>

<script>
	// 引入api
	import { disbandGuild } from '@/api/user.js'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入详情组件
	import editComp from './components/editComp.vue'
	// 引入明细组件
	import guildDetails from './components/guildDetails.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'

	export default {
		name: 'guild-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			editComp,
			guildDetails
		},
		data() {
			return {
				isDestoryComp: false,
				guildParams: {}
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会ID',
						isNum: true,
						placeholder: '请输入公会ID'
					},
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '公会长ID',
						isNum: true,
						placeholder: '请输入公会ID'
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.list,
					columns: [
						{
							label: '公会ID',
							prop: 'guild_number'
						},
						{
							label: '公会类型',
							render: (h, params) => {
								let data = MAPDATA.GUILDCONFIGTYPELIST.find(item => { return item.value === params.row.guild_type })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '公会等级',
							render: (h, params) => {
								let data = MAPDATA.CLASSLIST.find(item => { return item.value === params.row.rank })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '公会头像',
							isimg: true,
							prop: 'face',
							imgWidth: '50px',
							imgHeight: '50px',
						},
						{
							label: '公会昵称',
							prop: 'nickname'
						},
						{
							label: '公会长ID',
							minWidth: '120px',
							prop: 'user_number'
						},
						{
							label: '创建时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '公会成员（人数）',
							minWidth: '150px',
							prop: 'user_count'
						},
						{
							label: '已绑定厅（个）',
							minWidth: '150px',
							prop: 'room_count'
						},
						{
							label: '当日流水（喵粮）',
							minWidth: '150px',
							prop: 'today_flow'
						},
						{
							label: '总流水（喵粮）',
							minWidth: '150px',
							prop: 'total_flow'
						},
						{
							label: '操作',
							minWidth: '300px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.details(params.row)}}}, '明细'),
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '编辑'),
									h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '解散公会')
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
					user_number: s.user_number,
					guild_number: s.guild_number,
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
					this.$refs.editComp.loadParams(status, row)
				}, 50);
			},
			// 明细
			details(row) {
				this.isDestoryComp = true
				this.guildParams = row
				setTimeout(() => {
					this.$refs.guildDetails.dialogVisible = true
				}, 50);
			},
			// 解散公会
			async deleteParams(row) {
				this.$confirm('是否确认解散公会?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await disbandGuild({ guild_id: row.id })
					if(res.code === 2000) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getList()
					}
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

</style>
