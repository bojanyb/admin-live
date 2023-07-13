<template>
	<div class="app-container">
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
		<div class="searchParams">
        <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" :show-add=" tabIndex == '0' ? true : false"  @add="addUser"></SearchPanel>
    </div>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>

		<!-- 添加初选用户 -->
		<el-dialog
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose"
		title="添加用户"
        :show-close="false">
            <el-form :model="ruleForm" ref="ruleForm" label-width="95px" class="demo-ruleForm">
                <el-form-item label="用户ID" prop="password">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.user_number" placeholder="请输入用户ID，输入多个房间ID请用英文逗号隔开" @input="roomInput(1)"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
	// 引入api
	import { getSummerAddUser } from '@/api/activity'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入tab菜单组件
	import menuComp from '@/components/menuComp/index.vue'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	export default {
		mixins: [mixins],
		components: {
			tableList,
			SearchPanel,
      		menuComp
		},
		data() {
			return {
				menuList: [
					{
						name: '初选名单添加'
					},
					// {
					// 	name: '初选赛歌曲审核'
					// },
					// {
					// 	name: '晋级赛歌曲审核'
					// },
					// {
					// 	name: '半决赛歌曲审核'
					// }
				],
				tabIndex: '0',
				searchParams: {
					status : 0,
				},
				auditStatuslList: [
					{
						id: 0,
						title: "全部"
					},
					{
						id: 1,
						title: "未审核"
					},
					{
						id: 2,
						title: "审核通过"
					},
					{
						id: 3,
						title: "不通过"
					},
				],
				dialogVisible: false,
				ruleForm: {
					user_number: ""
				}
			}
		},
		computed: {
			forms() {
				let arr1 = [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
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
								this.getList();
							},
							selectChange: (v, key) => {
								this.emptyDateTime()
								this.getList();
							}
						}
					}
				];
				let arr2 = [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '房间ID',
						isNum: true,
						placeholder: '请输入房间ID'
					},
					{
						name: 'status',
						type: 'select',
						value: '',
						keyName: 'id',
						optionLabel: 'title',
						label: '审核结果',
						placeholder: '请选择',
						clearable: true,
            			linkage: true,
						options: this.auditStatuslList
					},
					{
						name: 'dateTimeParams',
						type: 'datePicker',
						dateType: 'datetimerange',
						format: "yyyy-MM-dd HH:mm:ss",
						label: '上传时间',
						value: '',
						handler: {
							change: v => {
								this.emptyDateTime()
								this.setDateTime(v)
								this.getList();
							},
							selectChange: (v, key) => {
								this.emptyDateTime()
								this.getList();
							}
						}
					}
				]
				return (this.tabIndex == '0' ? arr1 : arr2)
			},
			cfgs() {
				let columnsList = [];
				let arr1 = [
					{
						label: '添加时间',
						render: (h, params) => {
							return h('span', params.row.create_time)
						}
					},
					{
						label: '用户昵称',
						prop: 'nickname',
					},
					{
						label: '用户ID',
						prop: 'user_number'
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
						label: '所属派对公会',
						width: "160px",
						render: (h, params) => {
							return h('div', [
								h('div', params.row.party_name || '无'),
								h('div', params.row.party_number)
							])
						}
					}
				];
				let arr2 = [
					{
						label: '上传时间',
						minWidth: '180px',
						render: (h, params) => {
							return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
						}
					},
					{
						label: '用户昵称',
						minWidth: '120px',
						prop: 'nickname'
					},
					{
						label: '用户ID',
						minWidth: '120px',
						prop: 'user_number'
					},
					{
						label: '审核结果',
						minWidth: '120px',
						prop: 'user_number'
					},
					{
						label: '音乐',
						isimg: true,
						prop: 'url',
						nameProp: 'name',
						subNameProp: 'singer',
						tagProp: 'tags',
						width: '300px'
					},
					{
						label: '审核时间',
						minWidth: '180px',
						render: (h, params) => {
							return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
						}
					},
					{
						label: '操作',
						minWidth: '200px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { style: {
									display: params.row.status === 1 ? 'none' : 'unset'
								}, on: {click:()=>{this.up(params.row)}}}, '通过'),
								h('el-button', { props: { type: 'danger'}, style: {
									display: params.row.status === 2 ? 'none' : 'unset'
								}, on: {click:()=>{this.down(params.row)}}}, '拒绝')
							])
						}
				}
				]
				let portName = "";
				if(Number(this.tabIndex) !== 0){
					columnsList = arr2;
					portName = "getRoomRanking";
				}else{
					columnsList = arr1;
					portName = "getSummerUserList";
				}
				return {
					vm: this,
					url: REQUEST.summerSign[portName],
					columns: columnsList
				}
			}
		},
		mounted(){},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				let params_new = {
					page: params.page,
					pagesize: params.size,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
					end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
					user_number: s.user_number,
				}
				if(this.tabIndex < 2){
					params_new.room_category = this.tabIndex == 0 ? 2 :1;
				}
				return params_new
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
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// table 返回数据
			saleAmunt(row){
				// this.sumSource = row.data
			},
			// 菜单切换
			tabChange() {
				this.$nextTick(res=>{
					this.searchParams.round = 1;
					if(this.$refs.tableList && this.tabIndex < 2) {
						this.$refs.tableList.getData()
					}
				})
      		},
			// 添加初选用户
			addUser(){
				this.ruleForm.user_number = "";
				this.dialogVisible = true;
			},
			// 限制用户id输入
			roomInput(type) {
				let changeNum = type == 1 ? this.ruleForm.user_number : this.ruleForm.user_number;
				changeNum = changeNum.replace(
					/[\u4E00-\u9FA5A-Za-z_^%&'\-\*\ /;.，。、‘；、】【=?$\[\]!@#()\\~]/g,
					""
				);
				this.ruleForm.user_number = changeNum;
			},
			handleClose(){
				this.dialogVisible = false;
			},
			// 提交
			async submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let res = await getSummerAddUser({ user_number: this.ruleForm.user_number })
						if(res.code === 2000) {
							this.$success('添加成功')
							this.dialogVisible = false
							this.getList();
						}
					} else {
						return false;
					}
				});
			},
		}
	}
</script>
<style lang="scss">
	.el-icon-circle-close {
		color: #FFFFFF;
	}
	.box-card {
		width: 100%;
		height: 40px;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		padding: 0px 30px;
		box-sizing: border-box;
		margin-bottom: 20px;
		.el-card__body{
			width: 100%;
			padding: 0;
			.box-card-inner {
				display: flex;
				justify-content: space-around;
				div {
					font-size: 15px;
					color: #ffffff;
				}
			}
		}
	}
</style>



