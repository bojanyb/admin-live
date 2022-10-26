<template>
	<div>
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 编辑组件 -->
		<editComp ref="editComp" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></editComp>
	</div>
</template>

<script>
	// 引入冻结组件
	import blocked from './blocked.vue'
	// 引入api
	import { getGuildUpdateV2 } from '@/api/videoRoom'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入详情组件
	import editComp from './editComp.vue'
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
			blocked
		},
		data() {
			return {
				isDestoryComp: false,
				guildParams: {},
				status: null,
				ruleForm: {}
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
						name: 'guild_type',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '公会类型',
						placeholder: '请选择',
						options: MAPDATA.GUILDCONFIGTYPELIST
					},
					{
						name: 'status',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '公会状态',
						placeholder: '请选择',
						options: MAPDATA.GUILDSTATUS
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.list,
					columns: [
						{
							label: '创建时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '公会类型',
							render: (h, params) => {
								let data = MAPDATA.GUILDCONFIGTYPELIST.find(item => { return item.value === params.row.guild_type })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '公会ID',
							prop: 'guild_number'
						},
						{
							label: '公会名称',
							width: '150px',
							prop: 'name'
						},
						{
							label: '主播数量',
							render: (h, params) => {
								return h('div', [
									h('span', params.row.user_count + '人'),
								])
							}
						},
						{
							label: '房间数量',
							render: (h, params) => {
								return h('div', [
									h('span', params.row.room_count + '个'),
								])
							}
						},
						{
							label: '今日流水',
							render: (h, params) => {
								return h('div', [
									h('span', params.row.today_flow + '喵粮'),
								])
							}
						},
						{
							label: '昨日流水',
							render: (h, params) => {
								return h('div', [
									h('span', (params.row.yestoday_flow  ? params.row.yestoday_flow : 0) + '喵粮'),
								])
							}
						},
						{
							label: '本周流水',
							render: (h, params) => {
								return h('div', [
									h('span', params.row.today_flow + '喵粮'),
								])
							}
						},
						{
							label: '本月流水',
							render: (h, params) => {
								return h('div', [
									h('span', params.row.today_flow + '喵粮'),
								])
							}
						},
						{
							label: '公会状态',
							render: (h, params) => {
								return h('div', [
									h('span',{style: {display :  params.row.status == 1 ? 'unset' : 'none',color: params.row.status == 1 ? '#67C23A' : ''}}, params.row.status == 1 ? '正常' : ''),
									h('span',{style: {display :  params.row.status == 2 ? 'unset' : 'none',color: params.row.status == 2 ?  '#E6A23C' : ''}}, params.row.status == 1 ? '' : '已冻结'),
									h('span',{style: {display :  params.row.status == 3 ? 'unset' : 'none',color: params.row.status == 3 ?  '#F56C6C' : ''}}, params.row.status == 1 ? '' : '已解散'),
								])
							}
						},
						{
							label: '操作',
							minWidth: '260px',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'},style:{display: params.row.status !== 3 ? 'unset' : 'none'}, on: {click:()=>{this.change(params.row)}}}, '更换会长'),
									h('el-button', { props: { type: 'primary'},style:{display: params.row.status !== 3 ? 'unset' : 'none'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
									h('el-button', { props: { type: 'danger'}, style: {
										display: (params.row.status === 1 && params.row.status !== 3)  ? 'unset' : 'none'
									}, on: {click:()=>{this.freezeFunc(2, params.row)}}}, '冻结'),
									h('el-button', { props: { type: 'success'}, style: {
										display: (params.row.status === 2 && params.row.status !== 3) ? 'unset' : 'none'
									}, on: {click:()=>{this.freezeFunc(1, params.row)}}}, '解冻'),
									h('el-button', { props: { type: 'danger'},style:{display: params.row.status !== 3 ? 'unset' : 'none'}, on: {click:()=>{this.deleteParams(params.row)}}}, '解散'),
									h('el-button', { props: { type: 'danger'},style:{display: params.row.status == 3 ? 'unset' : 'none'}}, '已解散'),
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
					status: s.status
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
			// 更换会长
			change(row){
				this.$prompt('会长ID', '更换会长', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				// inputPattern: /^d+$/,
				inputErrorMessage: '会长ID格式不正确'
				}).then(({ value }) => {
					let params = {
						id: row.id,
						guild_number: value,
						name: row.name,
						guild_type: row.guild_type,
						status: row.status,
						rebate: row.rebate,
					}
					this.getGuildUpdateSource(params,"更换会长")
				}).catch(() => {});
			},
			// 解散公会
			async deleteParams(row) {
				let title = "确认解散 [ " + row.name + " ] 吗？"
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: row.id,
						guild_number: row.guild_number,
						name: row.name,
						guild_type: row.guild_type,
						status: 3,
						rebate: row.rebate,
					}
					this.getGuildUpdateSource(params,"解散公会")

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			// 冻结 - 解除冻结操作
			async freezeFunc(status, row) {
				this.status = status
				this.ruleForm = row
				if(status === 2) { // 冻结
					let title = "确认冻结 [ " + row.name + " ] 吗？"
					this.$confirm(title, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let params = {
							id: row.id,
							guild_number: row.guild_number,
							name: row.name,
							guild_type: row.guild_type,
							status: status,
							rebate: row.rebate,
						}
						this.getGuildUpdateSource(params,"冻结公会")
					}).catch(() => {});
				} else { // 解冻
					let params = {
						id: row.id,
						guild_number: row.guild_number,
						name: row.name,
						guild_type: row.guild_type,
						status: status,
						rebate: row.rebate,
					}
					this.getGuildUpdateSource(params,"解冻公会")
				}
			},
			// 更换公会长 冻结 解冻 解散公会
			async getGuildUpdateSource(params,text){
				let res = await getGuildUpdateV2(params)
				if(res.code === 2000) {
					this.$success( text + '成功')
					this.getList()
				}
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">

</style>
