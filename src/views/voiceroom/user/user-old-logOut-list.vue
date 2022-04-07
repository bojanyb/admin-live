<template>
	<div class="app-container">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="userCancellationList()">

				<el-form-item label="状态">
					<el-select v-model="filters.status" placeholder="请选择" @change="userCancellationList">
						<el-option v-for="item in statusList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="用户ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="userCancellationList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="用户昵称" prop="nickname" align="center" />
			<el-table-column label="用户ID" prop="user_id" align="center" />
			<el-table-column label="手机号" prop="phone" align="center" />
			<el-table-column label="申请注销时间" prop="create_timeText" align="center" />
			<el-table-column label="状态" prop="statusText" align="center" />
			<el-table-column label="处理人" prop="deal_user_name" align="center" />
			<el-table-column label="处理时间" prop="update_timeText" align="center" />
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="userCancellationList" />
	</div>
</template>

<script>
	import {
		getUserCancellationHasDeal,
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'user-old-logOut-list',
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
					user_id: "",
					status: 2
				},
				statusList: [{
					value: 1,
					label: "已注销"
				}, {
					value: 2,
					label: "未注销"
				}, ],
				popForm: {
					user_id: "",
					sort: 0, // 排序规则: 0 时间正序 1 时间倒叙
					status: 2, // 1 已经注销 2 未注销
				},
				userImglist: []
			}
		},
		created() {
			this.userCancellationList();
		},
		methods: {
			userCancellationList() {
				this.listLoading = true;
				var params = {
					"status": this.filters.status,
					"sort": this.popForm.sort,
					"user_id": this.filters.user_id
				}
				getUserCancellationHasDeal(params).then(res => {
					this.total = res.data.count;
					res.data.list.map(re => {
						re.create_timeText = moment(re.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						re.update_timeText = moment(re.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						switch (re.status) {
							case 1:
								re.statusText = "已注销";
								break;
							case 2:
								re.statusText = "未注销";
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
		},
	}
</script>

<style>
</style>
