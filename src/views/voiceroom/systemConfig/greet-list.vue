<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="success" @click="handleLiveRankAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="打招呼常用语" prop="message" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleLiveRankEdit(scope.row)">修改</el-button>
					<el-button type="danger" @click="handleLiveRankDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getDesignate" />

		<el-dialog :close-on-click-modal="false" :title="editTitle" :visible.sync="editPop">
			<el-form ref="popForm" :model="popForm" :rules="popFormRules">
				<el-form-item label="打招呼常用语" prop="message" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.message" style="width: 335px;" maxlength="30" type="textarea"
							show-word-limit placeholder="请输入打招呼常用语" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editPop = false">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getDesignateList,
		getDesignateAdd,
		getDesignateUpdate,
		getDesignateDelete
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	export default {
		name: 'greet-list',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				loading: false,
				listLoading: false,
				total: 0,
				formLabelWidth: '120px',
				page: {
					page: 1,
					limit: 10
				},
				editTitle: '',
				editPop: false,
				popForm: {
					'message': '',
					'id': '',
				},
				popFormRules: {
					message: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.message) {
								return cb(new Error('打招呼常用语不能为空!'))
							}
							return cb()
						}
					}],
				}
			}
		},
		created() {
			this.getDesignate()
		},
		methods: {
			getDesignate() {
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				this.listLoading = true
				getDesignateList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleLiveRankAdd() {
				this.editTitle = '添加'
				this.popForm = {
					'message': ''
				}
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.loading = false;
				this.editPop = true
			},
			handleLiveRankEdit(row) {
				this.editTitle = '修改'
				this.popForm = {
					'id': row.id,
					'message': row.message,
				}
				if (this.$refs['popForm']) {
					this.$refs['popForm'].resetFields()
				}
				this.loading = false;
				this.editPop = true
			},
			handleChange() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						if (this.editTitle == "添加") {
							this.loading = true;
							getDesignateAdd(this.popForm).then(res => {
								this.getDesignate();
								this.$message.success("添加成功");
								this.editPop = false;
								this.loading = false;
							}).catch(err => {
								this.$message.error(err)
								this.editPop = false;
								this.loading = false;
							})
						} else if (this.editTitle == "修改") {
							this.loading = true;
							getDesignateUpdate(this.popForm).then(res => {
								this.getDesignate();
								this.$message.success("修改成功");
								this.editPop = false;
								this.loading = false;
							}).catch(err => {
								this.$message.error(err)
								this.editPop = false;
								this.loading = false;
							})
						}
					}
				})
			},
			handleLiveRankDel(row) {
				let ids = [row.id];
				var params = {
					"ids": ids
				}

				this.$alert("确定删除当前打招呼常用语吗?", '提示', {
					confirmButtonText: '确定',
					callback: action => {
						if (action == 'confirm') {
							getDesignateDelete(params).then(res => {
								this.getDesignate();
								this.$message.success("删除成功");
							}).catch(err => {
								this.$message.success("删除失败");
							})
						}
					}
				})
			}
		}
	}
</script>
