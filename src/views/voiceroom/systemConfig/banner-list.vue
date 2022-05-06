<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getBannerList()">
				<el-form-item class="toolbarBtns">
					<el-button type="success" @click="handleGiftAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="序号" prop="sort" align="center" />
			<el-table-column label="banner标题" prop="title" align="center" show-overflow-tooltip />
			<el-table-column label="轮播顺序" prop="sort" align="center" />
			<el-table-column label="banner图片" prop="gift_genre" align="center">
				<template slot-scope="scope">
					<el-image style="width: 50px;max-height: 50px;border-radius: 5px;" :lazy="true"
						:src="scope.row.pic ? scope.row.pic : ''" :preview-src-list="bannerImglist"/>
				</template>
			</el-table-column>
			<el-table-column label="banner类型" prop="typeText" align="center" />
			<el-table-column label="更新时间" prop="update_timeText" align="center" />
			<el-table-column label="启用/禁用" prop="status" align="center">
				<template slot-scope="scope">
					<el-switch v-model="scope.row.statusText" @change="handleEnable(scope.row)" />
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="120">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleEdit(scope.row)">修改
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getBannerList" />

		<el-dialog :title="editTitle" :visible.sync="editPop" @close="handleCancel">
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="banner标题" prop="title" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.title" style="width: 335px;" placeholder="请输入banner标题" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="banner图片" prop="pic" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
				<el-form-item label="轮播顺序" prop="sort" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.sort" style="width: 335px;" placeholder="请输入轮播顺序" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="banner外部链接" prop="url" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.url" style="width: 335px;" placeholder="请输入banner外部链接" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getBanner,
		getBannerChange,
		getBannerDel
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import ossFile from '../components/ossFile.vue'
	import moment from 'moment'
	export default {
		name: 'banner-list',
		components: {
			Pagination,
			ossFile
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				filters: {
					'status': ''
				},
				page: {
					page: 1,
					limit: 10
				},
				showImgUrl: '',
				editTitle: '',
				editPop: false,
				loading: false,
				formLabelWidth: '130px',
				imageUrl: '',
				popForm: {
					'id': '',
					'title': '',
					'pic': '',
					'type': '',
					'status': '',
					'ps': '',
					'sort': '',
					'url': '',
					'type': 'Add'
				},
				popFormRules: {
					title: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.title) {
								return cb(new Error('banner标题不能为空!'))
							}
							return cb()
						}
					}],
					pic: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.pic) {
								return cb(new Error('banner图片不能为空!'))
							}
							return cb()
						}
					}],
					sort: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.sort) {
								return cb(new Error('排序不能为空!'))
							}
							return cb()
						}
					}],
				},
				imageFile: '',
				bannerImglist: [],
			}
		},
		created() {
			this.getBannerList()
		},
		methods: {
			getBannerList() {
				this.listLoading = true
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getBanner(params).then(response => {
					this.total = response.data.count
					this.list = response.data.row
					this.list.map(res => {
						switch (res.type) {
							case 1:
								res.typeText = "朋友圈轮播图";
								break;
						}
						if(res.pic !== ""){
							this.bannerImglist.push(res.pic)
						}
						res.statusText = res.status == 1 ? true : false;
						res.update_timeText = res.update_time > 0 ? moment(res.update_time * 1000).format(
							'YYYY-MM-DD HH:mm:ss') : "";
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleClose() {
				this.showImgUrl = ''
			},
			handleGiftAdd() {
				this.editTitle = '新增'
				this.imageUrl = ''
				this.popForm = {
					'title': '',
					'pic': '',
					'status': '',
					'ps': '',
					'sort': '',
					'url': '',
					'type': 'Add'
				}
				this.imageFile = "";
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleEdit(row) {
				this.popForm = {
					'title': row.title,
					'pic': row.pic,
					'type': row.type,
					'status': row.status,
					'ps': row.ps,
					'sort': row.sort,
					'url': row.url,
					'id': row.id,
					'type': 'Edit'
				}
				this.imageUrl = row.pic
				this.editTitle = '修改'
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleChange() {
				if (this.popForm.type == 'Edit') {
					this.giftEdit()
				} else if (this.popForm.type == 'Add') {
					this.giftAdd()
				}
			},
			handleCancel() {
				this.editPop = false
			},
			giftAdd() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('title', this.popForm.title)
						// formData.append('type', this.popForm.type)
						formData.append('status', this.popForm.status)
						formData.append('ps', this.popForm.ps)
						formData.append('sort', this.popForm.sort)
						formData.append('url', this.popForm.url)
						formData.append('pic', this.popForm.pic)
						this.loading = true
						getBannerChange(formData).then(res => {
							this.$message.success("添加成功")
							this.imageFile = "";
							this.loading = false
							this.handleEditClose()
							this.getBannerList()
						}).catch(err => {
							this.$message.error(err)
							this.handleEditClose()
							this.loading = false
						})
					}
				})
			},
			giftEdit() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						const formData = new FormData()
						formData.append('id', this.popForm.id)
						formData.append('title', this.popForm.title)
						// formData.append('type', this.popForm.type)
						formData.append('status', this.popForm.status)
						formData.append('ps', this.popForm.ps)
						formData.append('sort', this.popForm.sort)
						formData.append('url', this.popForm.url)
						formData.append('pic', this.popForm.pic)
						this.loading = true
						getBannerChange(formData).then(res => {
							this.imageFile = "";
							this.loading = false
							this.$message.success("修改成功")
							this.handleEditClose()
							this.getBannerList()
						}).catch(err => {
							this.loading = false
							this.$message.error(err)
							this.handleEditClose()
						})
					}
				}).catch(() => {
					this.loading = false
				});
			},
			handleEditClose() {
				this.editPop = false
			},
			numberChange(val, maxNum, name) {
				// 转换数字类型
				this.popForm[name] = Number(val)
				// 重新渲染
				this.$nextTick(() => {
					// 比较输入的值和最大值，返回小的
					const num = Math.min(Number(val), maxNum)
					// 输入负值的情况下， = 0（可根据实际需求更该）
					var minNum = name == 'sort' ? 1 : 0
					if (num < minNum) {
						this.popForm[name] = minNum
					} else {
						// 反之
						this.popForm[name] = num
					}
				})
			},
			handleEnable(row) {
				var params = {
					id : row.id,
					status : !row.status
				}
				getBannerChange(params).then(res=>{
					this.getBannerList()
				}).catch(err=>{
					this.$message.error(err);
				})
			},
			getUpLoadImg(source){
				console.log("上传成功后返回的图片地址",source);
				this.popForm.pic = source.url;
			},
		}
	}
</script>
<style scoped="scoped" lang="scss">
	::v-deep.popDel {
		.el-dialog__body {
			height: auto !important;
		}
	}

	::v-deep .el-dialog__body {
		/* display: flex;
		align-items: center;
		justify-content: center; */
	}

	::v-deep.avatar-uploader {
		width: 178px;
		height: 178px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed #eeeeee;

		.el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				width: 100%;
				max-height: 178px;
			}
		}
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
		max-height: 178px;
	}

	::v-deep .el-dialog {
		margin-top: 0 !important;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: max-content;
		max-height: 90%;
		margin: auto !important;
	}

	::v-deep .showImgDialog .el-dialog {
		.el-dialog__body {
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
		}
	}

	.colorNormal {
		color: #67C23A;
	}

	.colorDel {
		color: #F56C6C;
	}

	::v-deep.toolbarBtns {
		width: 80%;
		position: relative;

		.el-form-item__content {
			width: 100%;

			.refreshBtn {
				opacity: 0.2;
				padding: 0px;
				font-size: 12px;
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
	}
</style>
