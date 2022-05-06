<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getRebateList()">
				<el-form-item label="公会ID">
					<el-input v-model="filters.guild_number" v-input-limit="0" placeholder="请输入公会ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getRebateList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit highlight-current-row>
			<el-table-column label="时间" prop="create_timeText" align="center"/>
			<el-table-column label="公会ID" prop="guild_number" align="center" width="150"/>
			<el-table-column label="公会等级" prop="rank" align="center" width="150"/>
			<el-table-column label="公会长ID" prop="user_number" align="center" width="150"/>
			<el-table-column label="流水" prop="flow" align="center" />
			<el-table-column label="返佣比例" prop="rebate" align="center" />
			<el-table-column label="已结算" prop="settlement" align="center" />
			<el-table-column label="时间区间" align="center" width="305">
				<template slot-scope="scope">
					<div class="fl">{{scope.row.op_timeText}} </div>
					<div class="fl" style="margin: 0 5px;"> --- </div>
					<div class="fl"> {{scope.row.op_end_timeText}}</div>
				</template>
			</el-table-column>
			<el-table-column label="操作人" prop="op_user" align="center" />
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getRebateList" />

	</div>
</template>

<script>
	import {
		getSettlementLog
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'guildRebateRecord-list',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				filters: {
					'guild_number': '',
				},
				page: {
					page: 1,
					limit: 10
				},
				ids: [],
			}
		},
		created() {
			this.getRebateList()
		},
		methods: {
			getRebateList() {
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit,
					'guild_number': this.filters.guild_number
				}
				this.listLoading = true
				getSettlementLog(params).then(res => {
					this.total = res.data.count;
					res.data.list.map((re,i)=> {
						re.create_timeText = re.create_time > 0 ? moment(re.create_time * 1000)
							.format('YYYY-MM-DD HH:mm:ss') : ""
						re.op_timeText = re.op_time > 0 ? moment(re.op_time * 1000)
							.format('YYYY-MM-DD HH:mm:ss') : ""
						re.op_end_timeText = re.op_end_time > 0 ? moment(re.op_end_time * 1000)
							.format('YYYY-MM-DD HH:mm:ss') : ""
					})
					this.list = res.data.list
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
		}
	}
</script>
<style lang="scss" scoped="scoped">
	.el-form-item {
		// margin-bottom: initial;
	}
</style>
