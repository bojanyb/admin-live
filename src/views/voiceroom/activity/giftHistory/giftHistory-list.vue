<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" @keyup.enter.native="activetyList()">
				<el-form-item label="被赠送用户ID">
					<el-input v-model="filters.user_number" v-input-limit="0" placeholder="被赠送用户ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="activetyList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="被赠送用户ID" prop="user_number" align="center" />
			<el-table-column label="赠送类型" prop="currencyText" align="center" />
			<el-table-column label="赠送数量" prop="diamond" align="center" />
			<el-table-column label="赠送时间" prop="create_timeText" align="center" />
			<el-table-column label="赠送原因" prop="remark" align="center" show-overflow-tooltip/>
			<el-table-column label="操作人" prop="op_user" align="center" />
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="activetyList" />
	</div>
</template>

<script>
	import {getUserPlatformTopUp} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'giftHistoryList',
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
					"user_number": ""
				},
			}
		},
		created() {},
		mounted() {
			this.activetyList();
		},
		methods: {
			activetyList(){
				var params = {
					page : this.page.page,
					user_number: this.filters.user_number
				}
				this.listLoading = true;
				getUserPlatformTopUp(params).then(res=>{
					this.total = res.data.count;
					res.data.list.map(re=>{
						re.currencyText = re.currency == 1 ? "钻石" : "喵粮";
						re.create_timeText = moment(re.create_time * 1000).format(
							'YYYY-MM-DD HH:mm:ss') 
					})
					this.list = res.data.list;
					this.listLoading = false;
				}).catch(err=>{
					this.$message.error(err);
					this.listLoading = false;
				})
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
</style>
