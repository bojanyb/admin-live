<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item v-if="list.length < 3">
					<el-button type="success" @click="handleActivityAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column align="center" label="序号" width="95">
				<template slot-scope="scope">
					{{ scope.$index + 1 }}
				</template>
			</el-table-column>
			<el-table-column label="活动图标" prop="icon" align="center">
				<template slot-scope="scope">
					<el-image style="width: 50px; height: 50px;" :lazy="true" :src="scope.row.icon ? scope.row.icon : ''"
						@click="showImg(scope.row)" />
				</template>
			</el-table-column>
			<el-table-column label="活动名称" prop="name" align="center" show-overflow-tooltip />
			<el-table-column label="活动状态" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.status == 1" class="colorNormal">开启</div>
					<div v-if="scope.row.status == 0" class="colorDel">关闭</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleEdit(scope.row,scope.$index)">修改
					</el-button>
					<el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="activetyList" />

		<el-dialog :title="editTitle" :close-on-click-modal="false" :visible.sync="editPop" @close="handleCancel">
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="活动图标" prop="imageUrl" :label-width="formLabelWidth">
					<el-col :span="17">
						<ossFile :picImg="imageUrl" :type="'img'" :play_type="1" @getUpLoadImg="getUpLoadImg"/>
					</el-col>
				</el-form-item>
				<el-form-item label="活动图标特效" prop="imageSvgUrl" :label-width="formLabelWidth">
					<ossFile :picImg="imageSvgUrl" :type="'animation'" :play_type="3" @getUpLoadImg="getUpLoadImg"/>
				</el-form-item>
				<el-form-item label="活动名称" prop="name" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.name" style="width: 335px;"  maxlength="4" placeholder="请输入活动名称 (最多4位)" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="状态" prop="status" :label-width="formLabelWidth">
					<el-radio-group v-model="popForm.status">
						<el-radio :label="1">开启</el-radio>
						<el-radio :label="0">关闭</el-radio>
					</el-radio-group>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleCancel">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog class="popDel" :close-on-click-modal="false" title="删除" :visible.sync="delVisible" width="30%">
			<span>确定删除该活动吗</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleDelSubmit">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="特效图预览" :close-on-click-modal="false" class="showImgDialog" :visible.sync="dialogVisible" width="50%"
			:before-close="handleClose">
			<el-image v-if="showImgUrl.indexOf('.png') > -1" :lazy="true" :src="showImgUrl ? showImgUrl : ''" />
			<svgaplayer v-else-if="showImgUrl.indexOf('.svga') > -1" :height="667" :width="375" :show-img="showImgUrl" />
		</el-dialog>
	</div>
</template>

<script>
	import {
		getActivetyList,
		getActivetyDel,
		getActivetyAdd,
		getActivetyUpdate
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	import svgaplayer from '../components/svgaplayer.vue'
	import ossFile from '../components/ossFile.vue'
	export default {
		name: 'activityList',
		components: {
			Pagination,
			svgaplayer,
			ossFile
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				page: {
					page: 1,
					limit: 10
				},
				showImgUrl: '',
				editTitle: '',
				editPop: false,
				loading: false,
				formLabelWidth: '120px',
				popForm: {
					'name': '',
					'icon': '',
					'gif': '',
					'status': 1,
					'id': '',
					'type': 'Add'
				},
				popFormRules: {
					name: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.name || this.popForm.name == "") {
								return cb(new Error('活动名称不能为空!'))
							}
							if (this.popForm.name.length > 4) {
								return cb(new Error('活动名称必须是四个字以内!'))
							}
							return cb()
						}
					}],
					imageUrl: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.imageUrl) {
								return cb(new Error('活动图标不能为空!'))
							}
							return cb()
						}
					}],
					imageSvgUrl: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.imageSvgUrl) {
								return cb(new Error('活动图标特效不能为空!'))
							}
							return cb()
						}
					}],
					sort: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (this.popForm.gift_rate == "") {
								return cb(new Error('排序不能为空!'))
							}
							return cb()
						}
					}],
					status: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (this.popForm.status == "" && this.popForm.status !== 0) {
								return cb(new Error('活动状态不能为空!'))
							}
							return cb()
						}
					}]
				},
				pickerBeginDateBefore: {
					disabledDate(value) {
						if (new Date(value).getTime() + 3600 * 1000 * 24 < new Date().getTime()) {
							return true
						}
						return false
					}
				},
				imageUrl: '',
				imageSvgUrl: '',
				diamondNum: 0,
				delSource: {},
				delVisible: false,
				editIndex: "",
				dialogVisible: false,
			}
		},
		created() {
			this.activetyList()
		},
		methods: {
			activetyList() {
				this.listLoading = true
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getActivetyList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleActivityAdd() {
				this.editTitle = '新增'
				this.imageUrl = ''
				this.popForm = {
					'name': '',
					'icon': '',
					'status': 1,
					'id': '',
					'type': 'Add'
				}
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleEdit(row, index) {
				this.editIndex = index;
				this.popForm = {
					'name': row.name,
					'icon': row.icon,
					'gif': row.gif,
					'status': row.status,
					'id': row.id,
					'type': 'Edit'
				}
				this.imageUrl = row.icon
				this.imageSvgUrl = row.gif
				this.editTitle = '修改'
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleChange() {
				this.popForm.icon = this.imageUrl
				this.popForm.gif = this.imageSvgUrl
				delete this.popForm.statusText
				if (this.popForm.type == 'Edit') {
					delete this.popForm.type
					this.activityEdit()
				} else if (this.popForm.type == 'Add') {
					delete this.popForm.type
					delete this.popForm.id
					this.activityAdd()
				}
			},
			handleCancel() {
				this.editPop = false
				this.imageSvgUrl = ''
			},
			activityAdd() {
				const formData = new FormData()
				formData.append('name', this.popForm.name)
				formData.append('status', this.popForm.status)
				if (this.imageUrl !== '') {
					formData.append('icon', this.imageUrl)
				} else {
					// formData.append('icon', '')
				}
				if (this.imageSvgUrl !== '') {
					formData.append('gif', this.imageSvgUrl)
				} else {
					// formData.append('gif', '')
				}
				this.loading = true
				getActivetyAdd(formData).then(res => {
					this.loading = false
					this.$message.success(res.msg);
					this.handleEditClose()
					this.activetyList()
				}).catch(err => {
					this.$message.error(err);
					this.handleEditClose()
					this.loading = false
				})
			},
			activityEdit(row) {
				const formData = new FormData()
				formData.append('id', this.popForm.id)
				formData.append('name', this.popForm.name)
				formData.append('icon', this.popForm.icon)
				formData.append('gif', this.popForm.gif)
				if (this.imageUrl !== '') {
					formData.append('icon', this.imageUrl)
				} else {
					// formData.append('icon', '')
				}
				if (this.imageSvgUrl !== '') {
					formData.append('gif', this.imageSvgUrl)
				} else {
					// formData.append('gif', '')
				}
				formData.append('status', this.popForm.status)
				this.loading = true
				getActivetyUpdate(formData).then(res => {
					this.loading = false
					this.$message.success(res.msg)
					this.handleEditClose()
					this.activetyList()
					this.loading = false;
				}).catch(err => {
					this.$message.error(err);
					this.handleEditClose()
					this.loading = false;
				})
			},
			handleEditClose() {
				this.editPop = false
			},
			handleDel(row) {
				this.delSource = row
				this.delVisible = true
			},
			handleDelSubmit() {
				var params = {
					'id': JSON.stringify(this.delSource.id),
				}
				getActivetyDel(params).then(res => {
					this.$message.success("删除成功")
					this.delVisible = false
					this.activetyList()
				}).catch(err => {
					this.$message.error(err);
					this.delVisible = false
				})
			},
			getUpLoadImg(source){
				if(source.type == "img"){
					this.imageUrl = source.url;
				}else if(source.type == "animation"){
					this.imageSvgUrl = source.url;
				}
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
			showImg(e) {
				this.showImgUrl = ''
				this.$nextTick(res => {
					this.showImgUrl = e.gif
					if (this.showImgUrl.indexOf('.svga') > -1 || this.showImgUrl.indexOf('.png') == -1) {
						this.dialogVisible = true
					} else {
						this.$message.warning('暂无特效图')
					}
				})
			},
			handleClose() {
				this.showImgUrl = ''
				this.imageSvgUrl = ''
				this.dialogVisible = false
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

	.avatar-uploader {
		width: 178px;
		height: 178px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed #eeeeee;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		width: 100%;
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
		width: auto;
		max-width: 178px;
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

		.el-dialog__body {
			overflow-y: scroll;
			max-height: 700px;
			overflow-x: initial;
		}

		.el-dialog__body::-webkit-scrollbar {
			width: 0;
		}
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
</style>
