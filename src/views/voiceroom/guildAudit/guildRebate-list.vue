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
					<el-button type="primary" @click="getRebateAll">批量返佣</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			@selection-change="handleSelectionChange" highlight-current-row>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="序号" prop="num" align="center" width="95" />
			<el-table-column label="公会ID" prop="guild_number" align="center" width="150"/>
			<el-table-column label="公会等级" prop="rank" align="center" width="150"/>
			<el-table-column label="公会长ID" prop="user_id" align="center" width="150"/>
			<el-table-column label="时间区间" align="center" width="305">
				<template slot-scope="scope">
					<div class="fl">{{scope.row.last_week_startText}} </div>
					<div class="fl" style="margin: 0 5px;"> --- </div>
					<div class="fl"> {{scope.row.last_week_endText}}</div>
				</template>
			</el-table-column>
			<el-table-column label="流水" prop="last_week_flow" align="center" />
			<el-table-column label="返佣比例" prop="rebate" align="center" />
			<el-table-column label="应结算" prop="last_week_back" align="center" />
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getRebateList" />

	</div>
</template>

<script>
	import {
		getGuildWeekList,
		getWeekRebate
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'guildRebate-list',
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
				getGuildWeekList(params).then(res => {
					this.total = res.data.count;
					res.data.list.map((re,i)=> {
						re.num = i + 1;
						re.last_week_startText = re.last_week_start > 0 ? moment(re.last_week_start * 1000)
							.format('YYYY-MM-DD HH:mm:ss') : ""
						re.last_week_endText = re.last_week_end > 0 ? moment(re.last_week_end * 1000)
							.format('YYYY-MM-DD HH:mm:ss') : ""
					})
					this.list = res.data.list
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleSelectionChange(row){
				this.ids = [];
				if(row.length > 0){
					row.map(res=>{
						this.ids.push(res.id);
					});
					
					// 数组去重
					this.ids = [...new Set(this.ids)];
				}
			},
			getRebateAll() {
				if(this.ids.length > 0){
					let params = {
						'ids' : this.ids
					}
					getWeekRebate(params).then(res=>{
						this.$message.success("返佣成功");
						this.getRebateList();
					}).catch(err=>{
						this.$message.error(err);
					})
				}else{
					this.$message.error("至少选择一条数据");
				}
			}
		}
	}
</script>
<style lang="scss" scoped="scoped">
	.el-form-item {
		// margin-bottom: initial;
	}
</style>
