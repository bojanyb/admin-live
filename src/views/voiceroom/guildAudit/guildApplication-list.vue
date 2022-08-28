<template>
	<div class="guildApplication-list-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
	// 引入api
	import { getGuildCheck } from '@/api/videoRoom'
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
	export default {
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
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
						name: 'status',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '状态',
						placeholder: '请选择',
						options: MAPDATA.GUILDSTATUSLIST
					},
					{
						name: 'type',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '申请目的',
						placeholder: '请选择',
						options: MAPDATA.GUILDAPPLYLIST
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.joinApply,
					columns: [
						{
							label: '公会昵称',
							prop: 'guild_nickname'
						},
						{
							label: '公会ID',
							prop: 'guild_number'
						},
						{
							label: '公会等级',
							render: (h, params) => {
								let data = MAPDATA.CLASSLIST.find(item => { return item.value === params.row.rank })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '公会长昵称（ID）',
							minWidth: '150px',
							render: (h, params) => {
								return h('div', [
									h('div', params.row.guild_owner.nickname),
									h('div', params.row.guild_owner.user_number || '无')
								])
							}
						},
						{
							label: '公会人数',
							prop: 'user_count'
						},
						{
							label: '公会已绑定厅数量',
							minWidth: '180px',
							prop: 'room_count'
						},
						{
							label: '房间编号',
							prop: 'room_number'
						},
						{
							label: '房间标题',
							prop: 'room_title'
						},
						{
							label: '申请人（ID）',
							minWidth: '120px',
							render: (h, params) => {
								return h('div', [
									h('div', params.row.apply_user.nickname),
									h('div', params.row.apply_user.user_number || '无')
								])
							}
						},
						{
							label: '申请时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '申请目的',
							render: (h, params) => {
								let data = MAPDATA.GUILDAPPLYLIST.find(item => { return item.value === params.row.type })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '状态',
							render: (h, params) => {
								let data = MAPDATA.GUILDSTATUSLIST.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '操作',
							minWidth : '230px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.func(params.row.id, 2)}}},'同意'),
									h('el-button', { props: { type: 'danger'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.func(params.row.id, 3)}}},'拒绝')
								])
							}
						}
					]
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number,
					status: s.status,
					type: s.type
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
			// 操作 - 通过 - 拒绝
			async func(id, status) {
				let res = await getGuildCheck({ id, status })
				if(res.code === 2000) {
					if(status === 2) {
						this.$message.success('通过成功')
					} else {
						this.$message.success('拒绝成功')
					}
				}
				this.getList()
			},
		}
	}
</script>
<style lang="scss">
.guildApplication-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
