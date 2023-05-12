<template>
	<div class="guildApplication-list-box">
		<SearchPanel v-model="searchParams" :forms="forms"  :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
	// 引入api
	import { guildRoomApplyCheck } from '@/api/videoRoom'
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
						label: '房间ID',
						isNum: true,
						placeholder: '请输入房间ID'
					},
					{
						name: 'status',
						type: 'select',
						value: '待审核',
						keyName: 'value',
						optionLabel: 'name',
						label: '申请状态',
						placeholder: '请选择',
						options: MAPDATA.GUILDSTATUSLIST
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.guildRoomApply,
					columns: [
						{
							label: '申请时间',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '房间ID',
							prop: 'room_number'
						},
						{
							label: '房间标题',
							prop: 'room_title'
						},
						{
							label: '所属公会ID',
							prop: 'guild_number'
						},
						{
							label: '所属公会昵称',
							prop: 'guild_nickname'
						},
						{
							label: '现有类型',
							prop: 'old_genre_name'
						},
						{
							label: '申请类型',
							prop: 'new_genre_name'
						},
						{
							label: '审核状态',
							render: (h, params) => {
								let data = MAPDATA.GUILDSTATUSLIST.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, style: {
										display: params.row.status === 0 ? 'unset' : 'none'
									}, on: {click:()=>{this.func(params.row.id, 1)}}},'通过'),
									h('el-button', { props: { type: 'danger'}, style: {
										display: params.row.status === 0 ? 'unset' : 'none'
									}, on: {click:()=>{this.func(params.row.id, 2)}}},'拒绝')
								])
							}
						}
					]
				}
			}
		},
		data() {
			return {
				selectNavId: 1,
				navList : [
					{
						id : 1,
						name : "公会房间",
					},
					{
						id : 2,
						name : "公会房间申请列表",
					}
				],
				ruleForm : {
					guild_number : "",
					user_number : ""
				},
				rules: {
					guild_number: [
						{ required: true, message: '请输入公会ID', trigger: 'blur' ,
						validator: (rules, value, cb) => {
							if (!value) {
								return cb(new Error('公会ID不能为空!'))
							}
							return cb()
						}
					}
					],
					user_number: [
						{ required: true, message: '请输入房主ID', trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!value) {
								return cb(new Error('房主ID不能为空!'))
							}
							return cb()
						}
					 }
					],
				},
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
					status: s.status ? s.status : 0,
					type: s.type
				}
			},
			selectChange(id){
				this.selectNavId = id
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
			// 公会房间申请列表 操作 - 通过 - 拒绝
			async func(id, status) {
				let res = await guildRoomApplyCheck({ id, status })
				if(res.code === 2000) {
					this.$message.success('操作成功')
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

	.headerBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
		margin-bottom: 30px;
		.select {
			display: flex;
			align-items: center;
			>span {
				display: flex;
				align-items: center;
				justify-content: center;
				width: auto;
				height: 50px;
				margin-left: 20px;
				cursor: pointer;
				border-bottom: 2px solid rgba(0,0,0,0);
				transform: translateY(1px);
			}
			>span.high {
				border-color: blue;
			}
		}
	}
}
</style>
