<template>
	<div class="invite-join-us">
        <div class="searchParams">
			<el-button class="add" type="success" @click="handleAdd">新增</el-button>
            <SearchPanel v-model="searchParams" :forms="forms" :show-search-btn="true" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>

		<!--弹窗界面-->
		<el-dialog :title="title" :visible.sync="FormVisible" :close-on-click-modal="false">
			<el-form :model="Form" label-width="120px" :rules="FormRules" ref="Form">
				<el-form-item label="平台">
					<el-select v-model="platform" :disabled="!isAdd">
						<el-option label="苹果" value="1"></el-option>
						<el-option label="安卓" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="platform=='2'">
					<ossFile :type="'file'" :play_type="3" :picImg="fileUrl" :progress="progress" @getUpLoadImg="getUpLoadFile"/>
					<div v-if="isUping" class="c-reddd">正在上传 {{persent}}%</div>
					<div v-if="isUped" class="c-green">上传完成！</div>
					
				</el-form-item>
				<el-form-item label="版本号" prop="version">
					<el-input v-model="Form.version"  placeholder="如: 1.0.1"></el-input>
				</el-form-item>
				<el-form-item label="文件下载链接" prop="download_url">
					<el-input v-model="Form.download_url"  placeholder="输入文件链接"></el-input>
				</el-form-item>
				<el-form-item label="是否强制更新">
					<el-select v-model="is_mandatory">
						<el-option label="是" :value="20"></el-option>
						<el-option label="否" :value="10"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="更新内容" prop="content">
					<el-input v-model="Form.content" type="textarea" rows="3" placeholder="输入更新内容"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="FormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitFn" :loading="addLoading">{{btnTip}}</el-button>
			</div>
		</el-dialog>
    </div>
</template>


<script>
	// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入请求
import request from '@/utils/request2'
// 引入api
import REQUEST from '@/request/index.js'
import mixins from '@/utils/mixins'
// 引入时间插件
import moment from 'moment'
// 引入上传文件组件
import ossFile from './../components/ossFile.vue'
	export default {
		mixins: [mixins],
		data() {
			return {
				isUping:false,
				isUped:false,
				persent:0,
				title: '新增',
				btnTip: '提交',
				page: {
					current: 1,
					size: 10,
				},
				isAdd: true, //弹窗是否新增
				FormVisible: false, //新增界面是否显示
				addLoading: false,
				//界面数据
				platform: '2', //平台 IOS/ANDROID
				is_mandatory: 10, //是否强制更新(0否 1是)
				Form: {
					id : '', // 版本id
					version: '', //版本号
					content: '', //更新内容
					download_url: '', //文件下载链接
				},
				FormRules: {
					version: [{
						required: true,
						message: '请输入版本号',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请输入更新内容',
						trigger: 'blur'
					}],
					download_url: [{
						required: true,
						message: '请输入文件下载链接',
						trigger: 'blur'
					}]
				},
				platformArr: [{
					"label" : "苹果",
					"key" : "1",
				},
				{
					"label" : "安卓",
					"key" : "2",
				}],
				searchParams: {
					version: "",
					platform: "",
				},
				fileUrl: "",
				progress: 0,

			}
		},
		components: {
			tableList,
			SearchPanel,
			ossFile
		},
		computed: {
			forms() {
				return [
					{
						name: 'version',
						type: 'input',
						value: '',
						label: '版本号',
						placeholder: '',
						handler: {
							enter: (v) => {
								this.searchParams.version = v.version
								this.$refs.tableList.getData();
							}
						}
					},
					{
						name: 'platform',
						type: 'select',
						options: this.platformArr,
						label: '按平台查询',
						placeholder: '',
						handler: {
							enter: (v) => {
								this.searchParams.platform = v.platform
								this.$refs.tableList.getData();
							}
						}
					},
				]
			},
       		cfgs() {
            return {
					vm: this,
					url: REQUEST.system.Appversion,
					method: "post",
					columns: [
						{
							label: '版本号',
							props : 'version',
							width: '120px',
							render: (h, params) => {
								return h('span', params.row.version)
							}
						},
						{
							label: '平台',
							props : 'platform',
							width: '120px',
							render: (h, params) => {
								let platformName = ""
								switch (params.row.platform) {
									case 1:
										platformName = "苹果";
										break;
									case 2:
										platformName = "安卓";
										break;
									default:
										platformName = "其他";
										break;
								}
								return h('span', platformName)
							}
						},
						{
							label: '更新内容',
							props : 'content',
							render: (h, params) => {
								return h('span', params.row.content)
							}
						},
						{
							label: '文件下载链接',
							props : 'download_url',
							render: (h, params) => {
								return h('span', params.row.download_url)
							}
						},
						{
							label: '是否强制更新',
							props : 'download_url',
							width: '120px',
							render: (h, params) => {
								let isMandatoryText = ""
								switch (params.row.is_mandatory) {
									case 10:
										isMandatoryText = "否";
										break;
									case 20:
										isMandatoryText = "是";
										break;
								}
								return h('span', isMandatoryText)
							}
						},
						{
							label: '创建时间',
							props : 'start_time',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.start_time > 0 ? moment(params.row.start_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "")
							}
						},
						{
                        label: '操作',
                        width : '260',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.handleEdit(params.row)}}},'修改'),
                                h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.handleDelete(params.row.id)}}},'删除')])
                        }
                    },
					]
				}
			}
		},
		watch: {
			'searchParams.version': {
				handler(v) {
					this.$set(this.searchParams, 'version', v.trim())
				},
				deep: true
			},
			'Form.download_url': {
				handler(v) {
					this.$set(this.Form, 'download_url', v.trim())
				},
				deep: true
			}
		},
		methods: {
			handleDelete(id) {
				this.$confirm('确认删除吗？', '提示').then(() => {
					request({
						url: REQUEST.system.AppversionDel,
						method: "post",
						data: {id : id}
					}).then(res => {
						this.$message.success("删除成功");
						this.$refs.tableList.getData();
						this.FormVisible = false;
					}).catch(err=>{
						this.$message.error(err);
					})
				});

			},
			handleEdit(item) {
				this.Form = JSON.parse(JSON.stringify(item));
				this.isAdd = false;
				this.title = '修改';
				this.btnTip = '修改';
				this.Form.id = item.id;
				this.is_mandatory = item.is_mandatory;
				this.fileUrl = item.download_url;
				this.progress = 100;
				this.platform = JSON.stringify(item.platform);
				this.addLoading = false;
				this.FormVisible = true;

			},
			//点击改变分页条数
			handleSizeChange(val) {
				this.page.size = val;
				this.getList();
			},
			//点击当前分页
			handleCurrentChange(val) {
				this.page.current = val;
				this.getList();
			},
			//显示新增界面
			handleAdd: function() {
				this.title = '新增';
				this.btnTip = '提交';
				this.Form = {
					version: '',
					content: '',
					download_url: ''
				};
				this.platform = "2";
				this.FormVisible = true;
				this.isAdd = true;
			},
			//提交按钮
			submitFn: function() {
				this.$refs.Form.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							this.Form.platform = this.platform;
							this.Form.is_mandatory = this.is_mandatory;
							this.Form.download_url = this.Form.download_url.trim()
							request({
								url: REQUEST.system.AppversionAChange,
								method: "post",
								data: this.Form
							}).then(res => {
								this.$message.success(this.title + "成功");
								this.addLoading = false;
								this.$refs.tableList.getData();
								this.FormVisible = false;
							}).catch(err=>{
								this.addLoading = false;
								this.$message.error(err);
							})
						});
					}
				});
			},
			//传递参数
			beforeSearch(params) {
				return {
					size: params.size,
					page: params.page,
					version: this.searchParams.version,
					platform: this.searchParams.platform,
				};
			},
			// 查询
			onSearch(val){
				this.searchParams.version = val.version;
				this.searchParams.platform = val.platform;
				this.$refs.tableList.getData();
			},
			// 上传文件反馈信息
			getUpLoadFile(fileRow){
				this.Form.version = fileRow.fileName;
				this.Form.download_url = fileRow.url;
			}
		}
	};
</script>

<style scoped>
	:v-deep .el-upload--text{
		width: 178px!important;
		position: relative;
	}
	.invite-join-us{
		padding: 20px;
	}
	.share-filter-grid-box{
		float: left;
	}
	.tips{
		position: absolute;
		left: 20px;
		top: 110px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
