<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
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
					<el-image style="width: 50px; " :lazy="true" :src="scope.row.icon ? scope.row.icon : ''"
						@click="showImg(scope.row)" />
				</template>
			</el-table-column>
			<el-table-column label="活动名称" prop="name" align="center" show-overflow-tooltip />
			<el-table-column label="单次消耗钻石数" prop="cost" align="center" />
			<el-table-column label="活动状态" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.status == 1" class="colorNormal">开启</div>
					<div v-if="scope.row.status == 0" class="colorDel">关闭</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<el-button v-if="scope.row.status == '1'" type="primary"
						@click="handleEdit(scope.row,scope.$index)">修改
					</el-button>
					<el-button v-if="scope.row.status == '1'" type="danger" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="editTitle" :visible.sync="editPop" @close="handleCancel">
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="活动图标" prop="icon" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-upload class="avatar-uploader" action="#" :show-file-list="false" :on-change="imgPreview"
							:auto-upload="false">
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon" />
						</el-upload>
					</el-col>
				</el-form-item>
				<el-form-item label="活动名称" prop="name" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.name" style="width: 335px;" placeholder="请输入活动名称" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="单次抽奖钻石" prop="cost" :label-width="formLabelWidth">
					<el-input v-model="popForm.cost" v-input-limit="0" style="width: 335px;"
						placeholder="请输入单次抽奖钻石(0~9999999)" clearable autocomplete="off" />
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
		<el-dialog class="popDel" title="删除" :visible.sync="delVisible" width="30%">
			<span>确定删除该活动吗</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleDelSubmit">确 定</el-button>
			</span>
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
	export default {
		name: 'GiftList',
		components: {
			Pagination,
			svgaplayer
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				page: {
					page: 1
				},
				showImgUrl: '',
				editTitle: '',
				editPop: false,
				loading: false,
				formLabelWidth: '120px',
				imageUrl: '',
				popForm: {
					'name': '',
					'icon': '',
					'cost': '',
					'status': 1,
					'id': '',
					'type': 'Add'
				},
				popFormRules: {
					name: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.name) {
								return cb(new Error('活动名称不能为空!'))
							}
							return cb()
						}
					}],
					icon: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.icon) {
								return cb(new Error('活动图标不能为空!'))
							}
							return cb()
						}
					}],
					cost: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.cost) {
								return cb(new Error('单次抽奖钻石不能为空!'))
							}
							if (this.popForm.cost < 1) {
								this.popForm.cost = 1
								return cb(new Error('单次抽奖钻石范围1 ~ 9999999'))
							}
							if (this.popForm.cost > 9999999) {
								return cb(new Error('单次抽奖钻石范围1 ~ 9999999'))
							}
							return cb()
						}
					}],
					sort: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.gift_rate) {
								return cb(new Error('排序不能为空!'))
							}
							return cb()
						}
					}],
					status: [{
						required: true,
						trigger: 'change',
						validator: (rules, value, cb) => {
							if (!this.popForm.name) {
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
				imageFile: '',
				diamondNum: 0,
				delSource: {},
				delVisible: false,
				editIndex: "",
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
					'cost': '',
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
					'cost': row.cost,
					'status': row.status,
					'id': row.id,
					'type': 'Edit'
				}
				this.imageUrl = row.icon
				this.editTitle = '修改'
				if (this.$refs['popForm']) {
				  this.$refs['popForm'].resetFields()
				}
				this.editPop = true
			},
			handleChange() {
				this.popForm.icon = this.imageUrl
				delete this.popForm.statusText
				if (this.popForm.type == 'Edit') {
					delete this.popForm.type
					this.activityEdit()
				} else if (this.popForm.type == 'Add') {
					delete this.popForm.type
					delete this.popForm.id
					this.popForm.status = 1;
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
				formData.append('cost', this.popForm.cost)
				formData.append('status', this.popForm.status)
				if (this.imageFile !== '') {
					formData.append('icon', this.imageFile.raw)
				} else {
					formData.append('icon', '')
				}
				this.loading = true
				getActivetyAdd(formData).then(res => {
					this.loading = false
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
				if (this.imageFile !== '') {
					formData.append('icon', this.imageFile.raw)
				} else {
					// formData.append('icon', '')
				}
				formData.append('cost', this.popForm.cost)
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
					this.$message.error("删除失败")
					this.delVisible = false
				})
			},
			imgPreview(file, fileList) {
				const fileName = file.name
				this.imageFile = file
				console.log(this.imageFile)
				const regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
				if (regex.test(fileName.toLowerCase())) {
					this.imageUrl = file.url
					this.imageUrl = URL.createObjectURL(file.raw)
				} else {
					this.$message.error('请选择图片文件')
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
		height: 178px;
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
