<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getGuildReportList()">
				<el-form-item label="公会ID">
					<el-input v-model="filters.guild_number" v-input-limit="0" placeholder="请输入公会ID" clearable />
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="filters.status" placeholder="请选择" @change="getGuildReportList">
						<el-option v-for="item in statusList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getGuildReportList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="举报公会名称(ID)" align="center">
				<template slot-scope="scope">
					<div>{{scope.row.guild_owner.nickname}}</div>
					<div>({{scope.row.guild_owner.user_number}})</div>
				</template>
			</el-table-column>
			<el-table-column label="公会等级" prop="rankText" align="center" />
			<el-table-column label="公会长昵称(ID)" align="center">
				<template slot-scope="scope">
					<div>{{scope.row.guild_owner.nickname}}</div>
					<div>({{scope.row.guild_owner.user_number}})</div>
				</template>
			</el-table-column>
			<el-table-column label="被举报成员昵称(ID)" align="center">
				<template slot-scope="scope">
					<div>{{scope.row.guild_owner.nickname}}</div>
					<div>({{scope.row.guild_owner.user_number}})</div>
				</template>
			</el-table-column>
			<el-table-column label="近72小时非本公会厅收入" prop="user_count" align="center" class="colorNormal">
			<template slot-scope="scope">
				 <el-popover
				    placement="top-start"
				    title="非本公会厅收入"
				    width="200"
				    trigger="hover"
				    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
				    <div slot="reference">{{scope.row.user_count}}</div>
				  </el-popover>
			</template>
			</el-table-column>
			<el-table-column label="状态" prop="statusText" align="center" />
			<el-table-column label="举报时间" prop="create_timeText" align="center" />
			<el-table-column label="处理人" prop="user_count" align="center" />
			<el-table-column label="处理时间" prop="create_timeText" align="center" />
			<el-table-column label="操作" align="center" width="230">
				<template slot-scope="scope">
					<el-button type="primary" v-if="scope.row.status == 1" @click="handleChange(scope.row,2)">通过
					</el-button>
					<el-button type="danger" v-if="scope.row.status == 1" @click="handleChange(scope.row,3)">拒绝
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getGuildReportList" />

	</div>
</template>

<script>
	import {
		getGuildJoinApply,
		getGuildCheck
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'guildReport-list',
		components: {
			Pagination
		},
		data() {
			return {
				total: 0,
				listLoading: false,
				list: [],
				statusList: [{
						"value": 0,
						"label": "全部",
					},
					{
						"value": 1,
						"label": "未处理",
					},
					{
						"value": 2,
						"label": "已通过",
					},
					{
						"value": 3,
						"label": "已拒绝",
					}
				],
				page: {
					page: 1,
					limit: 10
				},
				filters: {
					guild_number: "",
					status: ""
				}
			}
		},
		mounted() {
			this.getGuildReportList();
		},
		methods: {
			getGuildReportList() {
				var params = {
					guild_number: this.filters.guild_number,
					status: this.filters.status,
					type: this.filters.type,
					page: this.page.page,
					pagesize: this.page.limit,
				}
				this.listLoading = true;
				getGuildJoinApply(params).then(res => {
					this.total = res.data.count;
					res.data.list.map(re => {
						switch (re.status) {
							case 1:
								re.statusText = "未处理";
								break;
							case 2:
								re.statusText = "已通过";
								break;
							case 3:
								re.statusText = "已拒绝";
								break;
						}
						switch (re.rank){
							case 1:
							re.rankText = "A";
								break;
							case 2:
							re.rankText = "AA";
								break;
							case 3:
							re.rankText = "AAA";
								break;
						}
						re.typeText = re.type == 1 ? "绑定" : "解绑";
						re.create_timeText = re.create_time.length == 10 ? moment(re.create_time * 1000)
							.format('YYYY-MM-DD HH:mm:ss') : ""
					})
					this.list = res.data.list;
					this.listLoading = false;
				}).catch(err => {
					this.$message.error(err);
					this.listLoading = false;
				})
			},
			handleChange(row, type) {
				var params = {
					id: row.id,
					status: type
				}
				getGuildCheck(params).then(res => {
					this.$message.success("处理成功")
					this.getGuildReportList();
				}).catch(err => {
					this.$message.error(err);
				})
			},
		}
	}
</script>
<style lang="scss" scoped="scoped">
	.el-form-item {
		// margin-bottom: initial;
	}

	.pagination-container {
		margin-top: initial;
	}
	.colorNormal{
		color: #67C23A;
		cursor: pointer;
	}
</style>
