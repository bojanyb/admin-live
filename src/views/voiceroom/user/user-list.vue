<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<bindStuck ref="bindStuck" @rowClick="rowClick"></bindStuck>

		<!-- 详情组件 -->
		<userEdit ref="userEdit" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></userEdit>
	</div>
</template>

<script>
	import { getUserStatisticalShow } from '@/api/videoRoom'
	// 卡列表组件
	import bindStuck from './components/bindStuck.vue'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入编辑组件
	import userEdit from './components/userEdit.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'

	export default {
		name: 'UserList',
		mixins: [mixins],
		components: {
			bindStuck,
			tableList,
			SearchPanel,
			userEdit
		},
		data() {
			return {
				isDestoryComp: false // 是否销毁组件
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
					},
					{
						name: 'phone',
						type: 'input',
						value: '',
						label: '手机号',
						isNum: true,
						placeholder: '请输入手机号'
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.user.list,
					columns: [
						{
							label: '用户ID',
							width: '95px',
							prop: 'user_number'
						},
						{
							label: '昵称',
							width: '110px',
							prop: 'nickname'
						},
						{
							label: '头像',
							isimg: true,
							prop: 'face',
							imgWidth: '50px',
							imgHeight: '50px'
						},
						{
							label: '性别',
							width: '95px',
							prop: 'sex',
							render: (h, params) => {
								let data = MAPDATA.SEXLIST.find(item => { return item.value === params.row.sex })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '个性签名',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.autograph || '无')
							}
						},
						{
							label: '所属公会',
							render: (h, params) => {
								return h('div', [
									h('div', params.row.guild_name || '无'),
									h('div', params.row.guild_number)
								])
							}
						},
						{
							label: '是否为厅主',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.is_guild_room === 0 ? '否' : '是')
							}
						},
						{
							label: '手机号',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.phone || '无')
							}
						},
						{
							label: '状态',
							width: '95px',
							render: (h, params) => {
								let data = MAPDATA.USERSTATUSLISTTWO.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '是否已绑卡',
							width: '95px',
							prop: 'is_bindcard',
							render: (h, params) => {
								return h('div', { style: { 
									color: params.row.is_bindcard ? '#ff4949' : '#666666',
									cursor: params.row.is_bindcard ? 'pointer' : ''
								 }, on: { click:()=>{this.bindcardFunc(params.row)} } }, params.row.is_bindcard ? '是' : '否')
							}
						},
						{
							label: '创建时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '封禁时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '封禁备注',
							width: '200px',
							render: (h, params) => {
								return h('span', params.row.remark || '无')
							}
						},
						{
							label: '注册设备',
							width: '200px',
							prop: 'reg_device_id'
						},
						{
							label: '最后一次登录设备',
							width: '200px',
							prop: 'last_login_device_id'
						},
						{
							label: '操作',
							width : '130px',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '编辑')
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
					nickname: s.nickname,
					phone: s.phone
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
			// 编辑
			editFunc(row) {
				this.load('update', row)
			},
			// 查看
			rowClick(row, column) {
				if(column.property !== 'face') {
					this.load('see', row)
				}
			},
			load(status, row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.userEdit.loadParams(status, row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			handleStatistics(row) {
				let tipsText = row.statistical_show == 1 ? "确认关闭该用户房间统计页面？" : "确认为该用户开启房间统计页面？";
				let tipsSuccessText = row.statistical_show == 1 ? "成功关闭该用户房间统计页面" : "成功开启该用户房间统计页面";
				this.$alert(tipsText, '提示', {
					confirmButtonText: '确定',
					callback: action => {
						if (action == 'confirm') {
							var params = {
								"id": row.id,
								"statistical_show": row.statistical_show == 1 ? 0 : 1
							}
							getUserStatisticalShow(params).then(res => {
								console.log(res)
								this.getUser();
								this.$message.success(tipsSuccessText);
							}).catch(err => {
								this.$message.error(err);
							})
						}
					}
				})
			},
			bindcardFunc(row) {
				if(row.is_bindcard) {
					this.$refs.bindStuck.dialogVisible = true
					this.$refs.bindStuck.getList(row.id)
				}
			}
		}
	}
</script>
<style>
	.el-icon-circle-close {
		color: #FFFFFF;
	}
</style>
