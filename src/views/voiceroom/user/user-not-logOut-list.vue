<template>
	<div class="app-container">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="userOldReportList()">
				<el-form-item label="排序查看">
					<el-select v-model="filters.sort" placeholder="请选择" @change="userCancellationList">
						<el-option v-for="item in sortType" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="userCancellationList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="用户昵称" prop="deal_user_name" align="center" />
			<el-table-column label="用户ID" prop="user_id" align="center" />
			<el-table-column label="手机号" prop="phone" align="center" />
			<el-table-column label="申请注销时间" prop="create_timeText" align="center" />
			<el-table-column label="状态" prop="statusText" align="center" />
			<el-table-column label="操作" prop="gift_str" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleProcess(scope.row.id)">处理</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="userCancellationList" />

		<el-dialog title="操作" :visible.sync="editPop">
			<el-form :model="popForm">
				<el-form-item label="状态" :label-width="formLabelWidth">
					<el-radio-group v-model="popForm.status">
						<el-radio :label="1">通过</el-radio>
						<el-radio :label="2">不通过</el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- <el-form-item v-if="popForm.status == 2" label="封禁说明" :label-width="formLabelWidth">
					<el-input v-model="popForm.remark" style="width: 335px;" type="textarea" :rows="5"
						placeholder="正常状态可不填" clearable autocomplete="off" />
				</el-form-item> -->
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
		getUserCancellationList,
		getUserCancellationDeal
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'user-not-logOut-list',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				listLoading: false,
				total: 0,
				page: {
					page: 1,
					limit: 10
				},
				filters: {
					status: 0, // 0未处理 1通过 2拒绝
					sort: 0, // 排序规则: 0时间正序1时间倒叙
				},
				sortType: [{
					value: 0,
					label: "时间正序"
				}, {
					value: 1,
					label: "时间倒序"
				}],
				formLabelWidth: '120px',
				editPop: false,
				loading: false,
				popForm: {
					id: "",
					status: 1, // 1通过 2拒绝
				},
			}
		},
		created() {
			this.userCancellationList();
		},
		methods: {
			userCancellationList() {
				this.listLoading = true;
				getUserCancellationList(this.filters).then(res => {
					this.total = res.data.count;
					res.data.list.map(re => {
						re.create_timeText = moment(re.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						switch (re.status) {
							case 0:
								re.statusText = "未处理";
								break;
							case 1:
								re.statusText = "已处理";
								break;
							case 2:
								re.statusText = "拒绝";
								break;
						}
					})
					this.list = res.data.list;
					this.listLoading = false;
				}).catch(err => {
					this.$message.error(err);
					this.listLoading = false;
				})
			},
			handleProcess(id) {
				this.popForm.id = id;
				this.editPop = true;
			},
			handleChange() {
				var params = {
					"id": this.popForm.id,
					"status": this.popForm.status
				}
				getUserCancellationDeal(params).then(res => {
					this.editPop = false;
					this.userCancellationList();
					this.$message.success(res.msg);
					this.loading = false;
				}).catch(err => {
					this.editPop = false;
					this.loading = false;
					this.$message.error(err);
				})
			}
		},
	}
</script>

<style>
</style>
