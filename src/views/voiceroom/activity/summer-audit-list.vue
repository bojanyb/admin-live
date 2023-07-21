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

		<!-- 审核拒绝 -->
		<el-dialog
        title="拒绝"
        :visible.sync="isEditRuleForm"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false">
            <el-form :model="editRuleForm" label-suffix=":" ref="editRuleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="拒绝说明" prop="remark">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入拒绝说明"
                    maxlength="300"
                    v-model="editRuleForm.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submitEditCancel('editRuleForm')">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('editRuleForm')">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
	// 引入api
	import {
		getSummerAddUser,
		getAuditList,
		getAuditPass,
		getAuditNoPass
	} from '@/api/activity'
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
					{
						name: '初选赛歌曲审核'
					},
					{
						name: '晋级赛歌曲审核'
					},
					{
						name: '半决赛歌曲审核'
					},
					// {
					// 	name: '总决赛实力榜打分'
					// }
				],
				tabIndex: '0',
				searchParams: {
					status : 0,
				},
				auditStatuslList: [ // 0=审核中,1=通过,2=未通过
					{
						id: 0,
						title: "审核中"
					},
					{
						id: 1,
						title: "通过"
					},
					{
						id: 2,
						title: "未通过"
					},
				],
				dialogVisible: false,
				ruleForm: {
					user_number: ""
				},
				searchParams1: {},
				editRuleForm: {
					id : "",
					remark: ""
				},
				isEditRuleForm: false,
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
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					},
					{
						name: 'status',
						type: 'select',
						value: 0,
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
				let arr3 = [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					}
				]
				return (this.tabIndex == '0' ? arr1 : (this.tabIndex == '4' ? arr3 : arr2 ))
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
							return h('span', params.row.create_time || '无')
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
						prop: 'status',
						render: (h, params) => {
							let statusName =  this.auditStatuslList.find(a => { return a.id === params.row.status })
							if(statusName){
								return h('span', statusName.title)
							}
						}
					},
					{
						label: '音乐',
						isimg: true,
						prop: 'song_url',
						nameProp: 'name',
						subNameProp: 'singer',
						tagProp: 'tags',
						width: '300px'
					},
					{
						label: '审核时间',
						minWidth: '180px',
						render: (h, params) => {
							return h('span', params.row.audit_time || '无')
						}
					},
					{
						label: '备注',
						minWidth: '120px',
						prop: 'remark'
					},
					{
						label: '操作',
						minWidth: '200px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { style: {
									display: params.row.status !== 0 ? 'none' : 'unset'
								}, on: {click:()=>{this.pass(params.row)}}}, '通过'),
								h('el-button', { props: { type: 'danger'}, style: {
									display: params.row.status !== 0 ? 'none' : 'unset'
								}, on: {click:()=>{this.noass(params.row)}}}, '拒绝')
							])
						}
					}
				]
				let arr3 = [
					{
						label: '排名',
						prop: 'ranking'
					},
					{
						label: '用户昵称',
						prop: 'nickname'
					},
					{
						label: '用户ID',
						prop: 'user_number'
					},
					{
						label: '评委1',
						prop: 'judge1'
					},
					{
						label: '评委2',
						prop: 'judge2'
					},
					{
						label: '评委3',
						prop: 'judge3'
					},
					{
						label: '评委4',
						prop: 'judge4'
					},
					{
						label: '得分',
						prop: 'score'
					},
					{
						label: '操作',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.finalEdit(params.row)}}}, '修改'),
							])
						}
					}
				]
				let portName = "";
				switch (Number(this.tabIndex)) {
					case 0:
						columnsList = arr1;
						portName = "getSummerUserList";
						break;
					case 1:
					case 2:
					case 3:
						columnsList = arr2;
						portName = "getAuditList";
						break;
					case 4:
						columnsList = arr3;
						portName = "getSummerUserList";
						break;
					default:
						break;
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
					status: s.status ? s.status: 0
				}
				// if(this.tabIndex < 2){
				// 	params_new.room_category = this.tabIndex == 0 ? 2 :1;
				// }
				if(this.tabIndex > 1){
					params_new.config_id = Number(this.tabIndex) + 1;
				}else{
					params_new.config_id = 2;
				}
				this.searchParams1 = params_new;
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
					if(this.$refs.tableList) {
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
			// 审核通过
			async pass(row){
				this.$confirm('确认通过吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let params = {
						id : row.id
					}
					let res = await getAuditPass(params);
					if(res.code === 2000){
						this.$success('操作成功')
						this.$refs.tableList.getData()
					}
				}).catch(() => {});
			},
			// 审核拒绝
			async noass(row){
				this.editRuleForm.id = row.id;
				this.isEditRuleForm = true;
			},
			// 拒绝弹框关闭
			submitEditCancel(){
				this.isEditRuleForm = false;
			},
			// 审核拒绝请求
			async submitEditForm(){
				let params = {
					id : this.editRuleForm.id,
					remark: this.editRuleForm.remark
				}
				let res = await getAuditNoPass(params);
				if(res.code === 2000){
					this.$success('操作成功')
					this.$refs.tableList.getData();
					this.editRuleForm.remark = "";
					this.isEditRuleForm = false;
				}
			},
			// 总决赛实力榜打分修改
			finalEdit(){
				console.log("总决赛实力榜打分修改---");
			}
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



