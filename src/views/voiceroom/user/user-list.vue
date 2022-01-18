<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getUser()">
				<el-form-item label="用户ID">
					<el-input v-model="filters.id" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="filters.nickname" placeholder="请输入昵称" clearable />
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="filters.phone" v-input-limit="0" placeholder="请输入手机号" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="ID" align="center" prop="id" width="95" />
			<el-table-column label="昵称" prop="nickname" align="center" />
			<el-table-column label="头像" prop="face" align="center" width="95">
				<template slot-scope="scope">
					<el-image style="width: 30px; height: 30px" :lazy="true" :src="scope.row.face ? scope.row.face : ''"
						:preview-src-list="userImglist" />
				</template>
			</el-table-column>
			<el-table-column label="性别" prop="sexText" align="center" width="95" />
			<el-table-column label="手机号" prop="phone" align="center" />
			<el-table-column label="状态" prop="statusText" align="center" width="95" />
			<el-table-column label="创建时间" prop="create_timeText" align="center" />
			<el-table-column label="封禁时间" prop="update_timeText" align="center" />
			<el-table-column label="封禁备注" prop="remark" align="center" width="280" show-overflow-tooltip />
			<el-table-column label="操作" prop="gift_str" align="center">
				<template slot-scope="scope">
					<el-button v-if="scope.row.status == 1" type="danger" @click="handleUser(scope.row)">封禁</el-button>
					<el-button v-if="scope.row.status == 2" type="success" @click="handleUser(scope.row)">启用</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getUser" />

		<el-dialog title="操作" :visible.sync="editPop">
			<el-form :model="popForm">
				<el-form-item label="状态" :label-width="formLabelWidth">
					<el-radio-group v-model="popForm.status">
						<el-radio :label="1">正常</el-radio>
						<el-radio :label="2">封禁</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="封禁说明" :label-width="formLabelWidth">
					<el-input v-model="popForm.remark" style="width: 335px;" type="textarea" :rows="5"
						placeholder="正常状态可不填" clearable autocomplete="off" />
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
		getUserList,
		getUserSave
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'UserList',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				editPop: false,
				loading: false,
				listLoading: false,
				total: 0,
				formLabelWidth: '120px',
				page: {
					page: 1,
					limit: 10
				},
				filters: {
					'id': '',
					'nickname' : '',
					'phone': ''
				},
				popForm: {
					'id': '',
					'status': 1,
					'remark': ''
				},
				userImglist: []
			}
		},
		created() {
			this.getUser()
		},
		methods: {
			getUser() {
				this.listLoading = true
				this.userImglist = []
				var params = {
					'id': this.filters.id,
					'nickname': this.filters.nickname,
					'phone': this.filters.phone,
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:MM:SS')
						res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:MM:SS')
						var sexText = ''
						switch (res.sex) {
							case 1:
								sexText = '男'
								break
							case 2:
								sexText = '女'
								break
							case 3:
								sexText = '未知'
								break
						}
						res.sexText = sexText
						if (res.status == 1) {
							res.statusText = '正常'
						} else if (res.status == 2) {
							res.statusText = '封禁'
						}
						this.userImglist.push(res.face)
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleUser(row) {
				this.$set(this.popForm, 'status', row.status)
				this.$set(this.popForm, 'remark', row.remark)
				this.$set(this.popForm, 'id', row.id)
				this.editPop = true
			},
			handleChange() {
				if (this.popForm.status == 2 && this.popForm.remark == '') {
					this.$message.error('封禁说明不能为空')
					return
				}
				this.loading = true
				getUserSave(this.popForm).then(res => {
					this.$message.success('操作成功')
					this.getUser()
					this.editPop = false
					this.loading = false
				}).catch(err => {
					this.loading = false
				})
			}
		}
	}
</script>
<style>
	.el-icon-circle-close {
		color: #FFFFFF;
	}
</style>
