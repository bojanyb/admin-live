<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<bindStuck ref="bindStuck"></bindStuck>

		<!-- 详情组件 -->
		<userEdit ref="userEdit" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></userEdit>

		<!-- 处罚组件 -->
		<punishComp v-if="isDestoryComp" ref="punishComp" @destoryComp="destoryComp" @getList="getList"></punishComp>

		<!-- 修改密码组件 -->
		<upatePassComp v-if="isDestoryComp" ref="upatePassComp" @destoryComp="destoryComp" @getList="getList"></upatePassComp>
	</div>
</template>

<script>
	import { getUserStatisticalShow } from '@/api/videoRoom'
	// 引入api
	import { addRichUser } from '@/api/user.js'
	// 卡列表组件
	import bindStuck from './components/bindStuck.vue'
	// 引入更改密码组件
	import upatePassComp from './components/upatePassComp.vue'
	// 引入处罚组件
	import punishComp from './components/punishComp.vue'
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
		name: 'user-list',
		mixins: [mixins],
		components: {
			bindStuck,
			tableList,
			SearchPanel,
			userEdit,
			punishComp,
			upatePassComp
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
					{
						name: 'nickname',
						type: 'input',
						value: '',
						label: '昵称',
						placeholder: '请输入昵称'
					},
					{
						name: 'real_name',
						type: 'input',
						value: '',
						label: '真实姓名',
						placeholder: '请输入真实姓名'
					},
					{
						name: 'ip',
						type: 'input',
						value: '',
						label: 'IP',
						placeholder: '请输入IP'
					},
					{
						name: 'reg_device_id',
						type: 'input',
						value: '',
						label: '注册设备',
						placeholder: '请输入注册设备'
					},
					{
						name: 'user_rank',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '用户等级',
						placeholder: '请选择',
						options: MAPDATA.USERRANKLIST
					},
					// {
					// 	name: 'live_rank',
					// 	type: 'select',
					// 	value: '',
					// 	keyName: 'value',
					// 	optionLabel: 'name',
					// 	label: '魅力等级',
					// 	placeholder: '请选择',
					// 	options: MAPDATA.USERCHARMLIST
					// },
					{
						name: 'register_type',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '注册类型',
						placeholder: '请选择',
						options: MAPDATA.USERREGISTERTYPELIST
					},
					{
						name: 'dateTimeParams',
						type: 'datePicker',
						dateType: 'datetimerange',
						format: "yyyy-MM-dd HH:mm:ss",
						label: '时间选择',
						value: '',
						handler: {
							change: v => {
								this.emptyDateTime()
								this.setDateTime(v)
							},
							selectChange: (v, key) => {
								this.emptyDateTime()
							}
						}
					}
				]
			},
			cfgs() {
        const arr = [
						{
							label: '用户ID',
							width: '95px',
							prop: 'user_number'
						},
						{
							label: '昵称',
							width: '110px',
							prop: 'nickname',
							showOverFlow: true
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
							label: '等级',
							width: '125px',
							render: (h, params) => {
								return h('div', [
									h('div', '用户等级：' + params.row.user_rank || '无'),
									h('div', '魅力等级：' + params.row.live_rank || '无')
								])
							}
						},
						// {
						// 	label: '个性签名',
						// 	width: '110px',
						// 	render: (h, params) => {
						// 		return h('span', params.row.autograph || '无')
						// 	}
						// },
						{
							label: '真实姓名',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.real_name || '无')
							}
						},
						{
							label: 'IP',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.ip || '无')
							}
						},
						{
							label: '所属派对公会',
							width: "160px",
							render: (h, params) => {
								return h('div', [
									h('div', params.row.party_name || '无'),
									h('div', params.row.party_number)
								])
							}
						},
						{
							label: '所属直播公会',
							width: "160px",
							render: (h, params) => {
								return h('div', [
									h('div', params.row.live_name || '无'),
									h('div', params.row.live_number)
								])
							}
						},
						{
							label: '是否为派对公会长',
							width: '135px',
							render: (h, params) => {
								return h('span', params.row.is_party_admin)
							}
						},
						{
							label: '是否为直播公会长',
							width: '135px',
							render: (h, params) => {
								return h('span', params.row.is_live_admin)
							}
						},
						{
							label: '是否为房主',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.is_guild_room === 0 ? '否' : '是')
							}
						},
						{
							label: '注册渠道',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.register_type || '无')
							}
						},
						{
							label: '安全手机/邮箱',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.safe_number || '无')
							}
						},
						{
							label: '已联系',
							width: '110px',
							render: (h, params) => {
								if(!params.row.maintain_admin) {
									return h('el-checkbox', { on: {change:(v)=>{this.relationFunc(params.row.id)}} }, '是否联系' )
								} else {
									return h('span', params.row.maintain_admin)
								}
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
								let name = ''
								if(params.row.kill_time === -1) {
									name = '永久'
								} else {
									name = params.row.kill_time ? timeFormat(params.row.kill_time, 'YYYY-MM-DD HH:mm:ss', true)	: '无'
								}
								return h('span', name)
							}
						},
						{
							label: '封禁备注',
							width: '200px',
							render: (h, params) => {
								return h('span', params.row.status == 2 ? params.row.remark : '无')
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
							width : '230px',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
                  h('el-button', {
                    props: { type: 'primary' },
                    style: { display: (this.permissionArr.includes('User@userEdit')) ? 'unset' : 'none' },
                    on: { click: () => { this.editFunc(params.row) } }
                  }, '修改'),
                  h('el-button', {
                    props: { type: '' },
                    style: { display: (this.permissionArr.includes('User@updateLoginPwd')) ? 'unset' : 'none' },
                    on: { click: () => { this.updatePass(params.row) } }
                  }, '更改密码')
								])
							}
						}
					]
				return {
					vm: this,
					url: REQUEST.user.list,
					columns: this.permissionArr.includes('User@index') ? arr : []
				}
			}
		},
		methods: {
			// 设置维护人
			async relationFunc(user_id) {
				let res = await addRichUser({ user_id })
				if(res.code === 2000) {
					this.$success('设置成功')
					this.getList()
				}
			},
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params.page,
					pagesize: params.size,
					user_number: s.user_number,
          nickname: s.nickname,
          real_name: s.real_name,
          ip: s.ip,
					phone: s.phone,
					reg_device_id: s.reg_device_id,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                	end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
					user_rank: s.user_rank,
					live_rank: s.live_rank,
					register_type: s.register_type
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 设置时间段
			setDateTime(arr) {
				const date = arr ? {
					start_time: arr[0],
					end_time: arr[1]
				} : {}
				this.$set(this, 'dateTimeParams', date)
			},
			// 清空日期选择
			emptyDateTime() {
				this.dateTimeParams = {}
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
			// 编辑
			editFunc(row) {
				this.load('update', row)
			},
			load(status, row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.userEdit.loadParams(status, row)
				}, 50);
			},
			// 修改密码
			updatePass(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.upatePassComp.loadParams(row)
				}, 50);
			},
			// 处罚
			punishFunc(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.punishComp.loadParams(row)
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
