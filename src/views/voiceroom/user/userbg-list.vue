<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getUserBgiList()">
				<el-form-item label="用户ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item label="状态">
				  <el-select v-model="filters.status" placeholder="请选择" @change="getUserBgiList">
				    <el-option label="全部" value="" />
				    <el-option key="1" label="通过" value="1" />
					 <el-option key="2" label="待审核" value="2" />
				  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUserBgiList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="上传用户昵称" prop="nickname" align="center" />
			<el-table-column label="用户ID" prop="user_id" align="center" />
			<el-table-column label="上传时间" prop="create_timeText" align="center" />
			<el-table-column label="图片" prop="pic" align="center">
				<template slot-scope="scope">
					<el-image style="width: 30px; height: 30px" :lazy="true"
						:src="scope.row.pic ? scope.row.pic : ''" :preview-src-list="userBglist" />
				</template>
			</el-table-column>
			<el-table-column label="状态" prop="statusText" align="center" />
			<el-table-column label="处理人" prop="make_userid" align="center" />
			<el-table-column label="处理时间" prop="update_timeText" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" v-if="scope.row.status == 0" @click="handleChange(scope.row,1)">通过</el-button>
					<el-button type="danger" v-if="scope.row.status == 0" @click="handleChange(scope.row,2)">驳回</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getUserBgiList" />
	</div>
</template>

<script>
	import {
		getUserBgi,
		getUserBgiAudit
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'userbg-list',
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
				filters: {
					'user_id': '',
					'status' : ''
				},
				userImglist: [],
				userBglist: [],
				multipleSelection: []
			}
		},
		created() {
			this.getUserBgiList()
		},
		methods: {
			getUserBgiList() {
				this.listLoading = true
				var params = {
					'user_id': this.filters.user_id,
					'status' : this.filters.status,
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserBgi(params).then(response => {
					this.total = response.data.count;
					response.data.row.map(res => {
						res.create_timeText = res.create_time > 0 ?moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
						res.update_timeText = res.update_time > 0 ? moment(res.update_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
						switch (res.status){
							case 1:
							res.statusText = "通过";
								break;
							case 2:
							res.statusText = "驳回";
								break;
							case 0:
							res.statusText = "待审核";
								break;
						}
						this.userBglist.push(res.pic);
						res.nickname = res.userinfo.nickname;
					})
					this.list = response.data.row;
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleChange(row,status){
				var params = {
					id : row.id,
					status : status,
					make_userid: row.make_userid
				}
				getUserBgiAudit(params).then(res=>{
					this.$message.success("处理成功");
					this.getUserBgiList();
				}).catch(err=>{
					this.$message.error(err);
				})
			}
		}
	}
</script>
