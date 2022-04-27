<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getUserInfo()">
				<el-form-item label="用户ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUserInfo">查询</el-button>
					<el-button type="success" @click="getAllPs">批量通过</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="用户ID" prop="user_id" align="center" />
			<el-table-column label="昵称" prop="live_rank_name" align="center" />
			<el-table-column label="图像" prop="pic" align="center">
				<template slot-scope="scope">
					<el-image style="width: 30px; height: 30px" :lazy="true" :src="scope.row.pic ? scope.row.pic : ''"
						:preview-src-list="userImglist" />
				</template>
			</el-table-column>
			<el-table-column label="背景图" prop="bgImg" align="center">
				<template slot-scope="scope">
					<el-image style="width: 30px; height: 30px" :lazy="true"
						:src="scope.row.bgImg ? scope.row.bgImg : ''" :preview-src-list="userBglist" />
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="handlePs(scope.row)">通过</el-button>
					<el-button type="danger" @click="handleBack(scope.row)">驳回</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getUserInfo" />
	</div>
</template>

<script>
	import {
		getUserInfoList
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
					'user_id': ''
				},
				userImglist: [],
				userBglist: [],
				multipleSelection: []
			}
		},
		created() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				this.listLoading = true
				var params = {
					'user_id': this.filters.user_id,
					'order': this.filters.order,
					'sort': this.filters.sort,
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserInfoList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			getAllPs(){
				if(this.multipleSelection.length == 0 ){
					this.$message.error("至少选择一条数据");
					return
				}
				console.log("批量通过",this.multipleSelection)
			},
			handlePs() {
				console.log("通过")
			},
			handleBack() {
				console.log("驳回");
			},
			handleSelectionChange(row){
				if(row.length > 0){
					row.map(res=>{
						this.multipleSelection.push(res.id);
					})
				}else{
					this.multipleSelection = [];
				}
			}
		}
	}
</script>
