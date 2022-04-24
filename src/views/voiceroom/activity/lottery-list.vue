<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" @keyup.enter.native="getActivetyDrawLogList()">
				<el-form-item label="抽奖人ID">
					<el-input v-model="filters.user_number" v-input-limit="0" placeholder="抽奖人ID" clearable />
				</el-form-item>
				<el-form-item label="宝箱类型">
					<el-select v-model="filters.activity_type_id" placeholder="请选择" @change="getActivetyDrawLogList">
						<el-option v-for="item in lotteryType" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="活动类型">
					<el-select v-model="filters.activity_type" placeholder="请选择" @change="getActivetyDrawLogList">
						<el-option v-for="item in activityTypeList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="时间选择">
					<el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="getActivetyDrawLogList">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getActivetyDrawLogList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-card class="sumBox">
				<div class="sumBoxItem fl">宝箱开箱次数：{{baoxiang.baoxiang_open_count}}</div>
				<div class="sumBoxItem fl">宝箱投入：{{baoxiang.baoxiang_out}}</div>
				<div class="sumBoxItem fl">宝箱产出：{{baoxiang.baoxiang_in}}</div>
				<div class="sumBoxItem fl">宝箱投入产出比：{{baoxiang.proportion}}</div>
			</el-card>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column align="center" label="序号" width="95">
				<template slot-scope="scope">
					{{ scope.$index + 1 }}
				</template>
			</el-table-column>
			<el-table-column label="用户ID" prop="user_number" align="center" />
			<el-table-column label="活动类型" prop="activeTypeText" align="center" />
			<el-table-column label="宝箱类型" prop="boxTypeText" align="center" />
			<el-table-column label="开箱次数" prop="user_open_count" align="center" />
			<el-table-column label="投入" prop="user_in" align="center" />
			<el-table-column label="产出" prop="user_out" align="center" />
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getActivetyDrawLogList" />
	</div>
</template>

<script>
	import {
		getActivetyList,
		getActivetyDrawLog
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'lotteryList',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				listLoading: true,
				total: 0,
				page: {
					page: 1,
					limit: 10
				},
				filters: {
					"user_number": "",
					"start_time": "",
					"end_time": "",
					"activity_type": 1,
					"activity_type_id": ""
				},
				lotteryType: [],
				activityTypeList: [{
					"value": 1,
					"label": "背包",
				}, {
					"value": 2,
					"label": "派对",
				}],
				timer: "",
				baoxiang: {},
			}
		},
		created() {
			this.getActivetyListSource();
		},
		methods: {
			getActivetyListSource() {
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit,
				}
				getActivetyList(params).then(response => {
					response.data.list.map((re, i) => {
						if (i == 0) {
							this.filters.activity_type_id = re.id;
						}
					})
					this.lotteryType = response.data.list;
					this.getActivetyDrawLogList();
				}).catch(err => {
					console.log(err);
				})
			},
			getActivetyDrawLogList() {
				this.listLoading = true
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit,
					"user_number": this.filters.user_number,
					"start_time": this.timer ? (new Date(this.timer[0]).getTime() / 1000) : "",
					"end_time": this.timer ? (new Date(this.timer[1]).getTime() / 1000) : "",
					'activity_type': this.filters.activity_type,
					'activity_type_id': this.filters.activity_type_id
				}
				getActivetyDrawLog(params).then(response => {
					this.total = response.data.count
					response.data.baoxiang.proportion = ((response.data.baoxiang.baoxiang_in / response.data
						.baoxiang.baoxiang_out) * 100).toFixed(1) + '%'
					this.baoxiang = response.data.baoxiang;
					let activeTypeText = "";
					let boxTypeText = "";
					this.lotteryType.map(res => {
						if (res.id == this.filters.activity_type_id) {
							activeTypeText = res.name;
						}
					})
					this.activityTypeList.map(res => {
						if (res.value == this.filters.activity_type) {
							boxTypeText = res.label;
						}
					})
					response.data.list.map(re => {
						re.activeTypeText = activeTypeText;
						re.boxTypeText = boxTypeText;
					})
					this.list = response.data.list
					this.listLoading = false
				}).catch(err => {
					this.$message.error(err);
					this.listLoading = false
				})
			},
		}
	}
</script>
<style scoped="scoped" lang="scss">
	::v-deep.sumBox {
		margin-bottom: 20px;
		display: flex;

		.el-card__body {
			width: 100%;

			.sumBoxItem {
				width: 25%;
				text-align: center;
				border-right: solid 1px #DCDCDC;
			}

			.sumBoxItem:last-child {
				border-right: none;
			}
		}
	}
</style>
