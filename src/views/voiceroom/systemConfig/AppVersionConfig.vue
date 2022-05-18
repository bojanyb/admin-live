<template>
	<section>

		<el-form :inline="true"  @keyup.enter.native="handleQuery()">
			<el-form-item>
				<el-button type="success" v-on:click="handleAdd">新增</el-button>
			</el-form-item>
			<el-form-item class="ml20 c-black66">
				按版本编号查询：<el-input v-model="page.versionCode" type="number" placeholder="请输入" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item class="ml20 c-black66">
				按版本号查询：<el-input v-model="page.versionNo" placeholder="请输入" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item class="ml20 c-black66">
				按平台查询：<el-select v-model="page.platform">
					<el-option label="全部" value=""></el-option>
					<el-option label="苹果" value="IOS"></el-option>
					<el-option label="安卓" value="ANDROID"></el-option>
				</el-select>
			</el-form-item>
		</el-form>


		<!--列表-->
		<el-table :data="listArr" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column align="center" prop="versionCode" label="版本编号" />
			<el-table-column align="center" prop="versionNo" label="版本号" />
			<el-table-column align="center" prop="platform" label="平台" />
			<el-table-column align="center" prop="versionContent" label="更新内容" />
			<el-table-column align="center" prop="fileUri" label="文件下载链接" />
			<el-table-column align="center" prop="forceUpdate" label="是否强制更新">
				<template scope="scope">
					{{scope.row.forceUpdate?'是':'否'}}
				</template>
			</el-table-column>
			<el-table-column align="center" prop="createTime" label="创建时间" min-width="100" />
			<el-table-column align="right" label="操作" width="150">
				<template scope="scope">
					<el-button size="small" v-if="scope.row.isEdit" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page="page.current" :page-sizes="[5, 10, 20, 50, 100, 500]" :page-size="page.size" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--弹窗界面-->
		<el-dialog :title="title" :visible.sync="FormVisible" :close-on-click-modal="false">
			<el-form :model="Form" label-width="120px" :rules="FormRules" ref="Form">
				<el-form-item label="平台">
					<el-select v-model="platform" :disabled="!isAdd">
						<el-option label="苹果" value="IOS"></el-option>
						<el-option label="安卓" value="ANDROID"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="platform=='ANDROID'">
					<el-upload class="avatar-uploader" :on-progress="upLoading" :headers="headers" :action="actionApi" :show-file-list="false" :on-success="handleAvatarSuccess"
					 :before-upload="beforeAvatarUpload">
						<i class="el-icon-plus avatar-uploader-icon"></i>
						<div class="tips">上传.apk包，获取版本</div>
					</el-upload>
					<div v-if="isUping" class="c-reddd">正在上传 {{persent}}%</div>
					<div v-if="isUped" class="c-green">上传完成！</div>
					
				</el-form-item>
				<el-form-item label="版本编号" prop="versionCode">
					<el-input v-model="Form.versionCode" type="number" :disabled="!isAdd" placeholder="整数编号"></el-input>
				</el-form-item>
				<el-form-item label="版本号" prop="versionNo">
					<el-input v-model="Form.versionNo"  placeholder="如: 1.0.1"></el-input>
				</el-form-item>
				<el-form-item label="文件下载链接" prop="fileUri">
					<el-input v-model="Form.fileUri"  placeholder="输入文件链接"></el-input>
				</el-form-item>
				<el-form-item label="是否强制更新">
					<el-select v-model="forceUpdate">
						<el-option label="是" :value="1"></el-option>
						<el-option label="否" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="更新内容" prop="versionContent">
					<el-input v-model="Form.versionContent" type="textarea" rows="3" placeholder="输入更新内容"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="FormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="submitFn" :loading="addLoading">{{btnTip}}</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
	// import {
	// 	getVersionConfig,
	// 	addVersionConfig,
	// 	updateVersionConfig,
	// 	deleteVersionConfig
	// } from '../../api/sysApi.js';
	// import util from '../../common/util.js';
	export default {
		data() {
			return {
				isUping:false,
				isUped:false,
				persent:0,
				imageUrl: '',
				headers:{
					// "X-User-Token":util.getCookie(util.token)
				},
				// actionApi: this.http.baseURL + '/api/admin/product/appVersionConfig/uploadFile',
				actionApi: '',
				title: '新增',
				btnTip: '提交',
				page: {
					current: 1,
					size: 10,
					versionNo: '',
					platform: '',
					versionCode: ''
				},
				total: 0,
				listLoading: false,
				listArr: [],
				isAdd: true, //弹窗是否新增
				FormVisible: false, //新增界面是否显示
				addLoading: false,
				//界面数据
				platform: 'ANDROID', //平台 IOS/ANDROID
				forceUpdate: 0, //是否强制更新(0否 1是)
				Form: {
					versionNo: '', //版本号
					versionCode: '', //版本编号
					versionContent: '', //更新内容
					fileUri: '', //文件下载链接
				},
				FormRules: {
					versionNo: [{
						required: true,
						message: '请输入版本号',
						trigger: 'blur'
					}],
					versionCode: [{
						required: true,
						message: '请输入版本编号',
						trigger: 'blur'
					}],
					versionContent: [{
						required: true,
						message: '请输入更新内容',
						trigger: 'blur'
					}],
					fileUri: [{
						required: true,
						message: '请输入文件下载链接',
						trigger: 'blur'
					}]
				},

			}
		},
		watch:{
			FormVisible:function(){
				this.$refs.Form.clearValidate();
			},
		},
		created() {
			this.getList();
		},
		methods: {
			upLoading(event, file, fileList){
				this.isUping = true;
				this.isUped = false;
				this.persent = parseInt(event.percent);
				if (event.percent==100) {
					this.isUping = false;
					this.isUped = true;
					this.$refs.Form.clearValidate();
				}
			},
			handleAvatarSuccess(res, file) {
				
				if (res.hasOwnProperty('data')) {
					this.Form.versionCode = res.data.versionCode;
					this.Form.versionNo = res.data.versionName;
					this.Form.fileUri = res.data.fileUri;
				}
				
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				
				const isApk = file.type === 'application/vnd.android.package-archive';
				//const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isApk) {
					this.$message.error('上传文件只能是 apk 格式!');
				}
				// if (!isLt2M) {
				// 	this.$message.error('上传头像图片大小不能超过 2MB!');
				// }
				return isApk;
			},
			handleDelete(id) {
				this.$confirm('确认删除吗？', '提示').then(() => {
					// deleteVersionConfig({
					// 	id: id
					// }).then(() => {
					// 	this.getList();
					// });
				});

			},
			handleEdit(item) {
				this.Form = JSON.parse(JSON.stringify(item));
				this.isAdd = false;
				this.title = '编辑';
				this.btnTip = '修改';
				this.forceUpdate = item.forceUpdate;
				this.platform = item.platform.name;
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
			//获取数据列表
			getList: function() {
				// getVersionConfig(this.page).then(res => {
				// 	this.listArr = res.records;
				// 	this.total = res.total;
				// 	let iosEditIndex = 0;
				// 	let androidEditIndex = 0;
				// 	var temp = JSON.stringify(this.listArr);
				// 	this.listArr.map(it => {
				// 		it.isEdit = false;
				// 	})
				// 	for (let i = 0; i < this.listArr.length; i++) {
				// 		if (temp.indexOf(this.listArr[i].platform.name) != -1 && this.listArr[i].platform.name == 'ANDROID') {
				// 			androidEditIndex = i;
				// 			break;
				// 		}
				// 	}
				// 	for (let i = 0; i < this.listArr.length; i++) {
				// 		if (temp.indexOf(this.listArr[i].platform.name) != -1 && this.listArr[i].platform.name == 'IOS') {
				// 			iosEditIndex = i;
				// 			break;
				// 		}
				// 	}
				// 	this.listArr[iosEditIndex].isEdit = true;
				// 	this.listArr[androidEditIndex].isEdit = true;

				// });
			},
			//显示新增界面
			handleAdd: function() {
				this.title = '新增';
				this.btnTip = '提交';
				this.Form = {
					versionNo: '',
					versionCode: '',
					versionContent: '',
					fileUri: ''
				};
				this.FormVisible = true;
				this.isAdd = true;
			},
			//提交按钮
			submitFn: function() {
				this.$refs.Form.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							if (this.isAdd) {
								// addVersionConfig(Object.assign(this.Form, {
								// 	platform: this.platform,
								// 	forceUpdate: this.forceUpdate
								// })).then((res) => {
								// 	this.addLoading = false;
								// 	this.Form = {
								// 		versionNo: '',
								// 		versionCode: '',
								// 		versionContent: '',
								// 		fileUri: ''
								// 	};
								// 	this.platform = 'IOS';
								// 	this.forceUpdate = 0;
								// 	this.FormVisible = false;
								// 	this.getList();
								// }).catch(() => {
								// 	this.addLoading = false
								// });
							} else {
								// updateVersionConfig(Object.assign(this.Form, {
								// 	platform: this.platform,
								// 	forceUpdate: this.forceUpdate
								// })).then(() => {
								// 	this.addLoading = false;
								// 	this.FormVisible = false;
								// 	this.getList();
								// }).catch(() => {
								// 	this.addLoading = false
								// });;
							}
						});
					}
				});
			},

		}
	};
</script>

<style scoped>
	/deep/ .el-upload--text{
		width: 178px!important;
		position: relative;
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
