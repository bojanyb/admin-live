<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getDynamic()">
				<el-form-item label="用户ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getDynamic">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="发布用户昵称" prop="nickname" align="center" width="200"/>
			<el-table-column label="发布用户ID" prop="user_id" align="center" width="95"/>
			<el-table-column label="发布时间" prop="create_timeText" align="center" />
			<el-table-column label="内容" prop="content" align="center" width="280" show-overflow-tooltip />
			<el-table-column label="图片/视频" prop="pic" align="center" width="95">
				<template slot-scope="scope">
					<el-image v-if="scope.row.pic" style="width: 30px; height: 30px" :lazy="true" :src="scope.row.pic ? scope.row.pic : ''"
						:preview-src-list="userImglist"/>
				</template>
			</el-table-column>
			<el-table-column label="状态" prop="statusText" align="center" width="95" />
			<el-table-column label="处理人" prop="make_userid" align="center" />
			<el-table-column label="处理时间" prop="update_timeText" align="center" />
			<el-table-column label="操作" prop="gift_str" align="center" width="230">
				<template slot-scope="scope">
					<el-button type="danger" v-if="scope.row.status == 1" @click="handleDown(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getDynamic" />
	</div>
</template>

<script>
	import {
		getMoments,
		getMomentsDown
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'dynamic-list',
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
				},
				userImglist: []
			}
		},
		created() {
			this.getDynamic()
		},
		methods: {
			getDynamic() {
				var params = {
					page: this.page.page,
					pagesize: this.page.limit,
					user_id: this.filters.user_id,
					status: this.filters.status,
					sort: this.filters.sort
				}
				getMoments(params).then(res=>{
					res.data.row.map(re=>{
						switch (re.status){
							case 0:
							re.statusText = "删除";
								break;
							case 1:
							re.statusText = "通过";
								break;
						}
						re.make_userid = re.make_userid > 0 ? re.make_userid : "";
						re.create_timeText = re.create_time > 0 ? moment(re.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
						re.update_timeText = re.update_time > 0 ? moment(re.update_time * 1000).format('YYYY-MM-DD HH:mm:ss') : "";
						if(re.media_list !== "" && re.media_list.indexOf(",") > -1){
							re.picList = re.media_list.split(",");
							re.pic = re.picList[0];
							re.picList.map(r=>{
								this.userImglist.push(r);
							})
						}
					})
					this.total = res.data.count;
					this.list = res.data.row;
				}).catch(err=>{
					
				})
			},
			handleDown(row) {
				var params = {
					id : row.id,
					make_userid: row.make_userid,
					status: 0 // 状态 0未上架 1 上架
				}
				getMomentsDown(params).then(res=>{
					this.$message.success("处理成功");
					this.getDynamic();
				}).catch(err=>{
					this.$message.error(err);
				})
				
			},
		}
	}
</script>
<style>
	.el-icon-circle-close {
		color: #FFFFFF;
	}
</style>
