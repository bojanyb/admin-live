<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getGuildTurnover()">
				<el-form-item label="活动类型">
					<el-select v-model="filters.activity_type_id" placeholder="请选择" @change="getGuildTurnover">
						<el-option v-for="item in lotteryType" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="活动类别">
					<el-select v-model="filters.activity_type" placeholder="请选择" @change="getGuildTurnover">
						<el-option v-for="item in activityTypeList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="用户ID">
					<el-input v-model="filters.user_number" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item label="交易流水ID">
					<el-input v-model="filters.relation_trade_no" v-input-limit="0" placeholder="请输入交易流水ID" clearable />
				</el-form-item>
				<el-form-item label="选择时间">
					<el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="getGuildTurnover">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getGuildTurnover">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="抽奖人ID" prop="user_number" align="center" />
			<el-table-column label="抽奖人昵称" prop="nickname" align="center" show-overflow-tooltip />
			<el-table-column label="宝箱类型" prop="activity_name" align="center" />
			<el-table-column label="交易时间" prop="create_timeText" align="center" />
			<el-table-column label="交易类型" prop="activity_typeText" align="center" />
			<el-table-column label="礼物ID" prop="gift_id" align="center" />
			<el-table-column label="礼物名称" prop="gift_name" align="center" />
			<el-table-column label="礼物数量" prop="number" align="center" />
			<el-table-column label="礼物价值" prop="gift_diamond" align="center" />
			<el-table-column label="交易流水" prop="relation_trade_no" align="center" width="200" />
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getGuildTurnover" />
	</div>
</template>

<script>
	import {
		getActivetyList,
		getUserDrawLog
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'lotteryDetails-list',
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
				timer: "",
				page: {
					page: 1,
					limit: 10
				},
				filters: {
					'activity_type': '',
					'activity_type_id': '',
					'user_number': '',
					'relation_trade_no': '',
				},
				lotteryType: [],
				activityTypeList: [{
					"value": 1,
					"label": "背包",
				}, {
					"value": 2,
					"label": "派对",
				}],
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
					this.getGuildTurnover();
				}).catch(err => {
					console.log(err);
				})
			},
			getGuildTurnover() {
				this.listLoading = true
				var params = {
					'activity_type': this.filters.activity_type,
					'activity_type_id': this.filters.activity_type_id,
					'user_number': this.filters.user_number,
					'relation_trade_no': this.filters.relation_trade_no,
					'start_time': this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					'end_time': this.timer ? JSON.stringify(new Date(this.timer[1]).getTime() / 1000) : "",
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserDrawLog(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.create_timeText = res.create_time > 0 ? moment(res.create_time * 1000).format(
							'YYYY-MM-DD HH:mm:ss') : ""
						res.activity_typeText = res.activity_type == 1 ? "背包" : "派对"
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			}
		}
	}
</script>
