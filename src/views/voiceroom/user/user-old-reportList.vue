<template>
	<div class="app-container">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="userOldReportList()">
				<el-form-item label="被举报用户ID">
					<el-input v-model="filters.feedback_user_id" v-input-limit="0" placeholder="请输入被举报用户ID" clearable />
				</el-form-item>
				<el-form-item label="举报用户ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入举报用户ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="userOldReportList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="举报时间" prop="create_timeText" align="center"/>
			<el-table-column label="被举报用户ID" prop="feedback_user_id" align="center" />
			<el-table-column label="举报用户ID" prop="user_id" align="center" />
			<el-table-column label="举报原因" prop="talk_genre" align="center" />
			<el-table-column label="举报证据" prop="talk_content" align="center" />
			<el-table-column label="处理人" prop="deal_user_name" align="center" />
			<el-table-column label="处理结果" prop="ban_durationText" align="center" />
			<el-table-column label="处理说明" prop="reply" align="center" show-overflow-tooltip/>
			<el-table-column label="处理时间" prop="update_timeText" align="center" />
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="userOldReportList" />
	</div>
</template>

<script>
	import {
		getUserReportList,
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'user-old-reportList',
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
					feedback_user_id: "",
					user_id: "",
					status: 2  // 处理状态 1未处理 2已处理 3忽略
				},
				popForm: {},
			}
		},
		created() {
			this.userOldReportList();
		},
		methods: {
			userOldReportList() {
				this.listLoading = true;
				var params = {
					'feedback_user_id' : this.filters.feedback_user_id,
					'user_id' : this.filters.user_id,
					'status' : this.filters.status,
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserReportList(params).then(res=>{
					this.total = res.data.count;
					res.data.list.map(re => {
						re.create_timeText = moment(re.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						re.update_timeText = moment(re.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						re.ban_durationText = re.ban_duration == -1 ? '永久封禁' : parseInt(re.ban_duration / (24 * 3600)) + '天'
						switch (re.feedback_user_status) {
							case 1:
								re.feedback_user_statusText = "正常";
								break;
							case 2:
								re.feedback_user_statusText = "封禁";
								break;
							case 3:
								re.feedback_user_statusText = "注销";
								break;
						}
					})
					this.list = res.data.list;
					this.listLoading = false;
				}).catch(err=>{
					this.$message.error(err);
					this.listLoading = false;
				})
			}
		},
	}
</script>

<style>
</style>
