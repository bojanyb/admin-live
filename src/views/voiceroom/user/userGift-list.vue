<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getUserGift()">
		
				<el-form-item label="送礼人ID">
					<el-input v-model="filters.user_number" v-input-limit="0" placeholder="请输入送礼人ID" clearable />
				</el-form-item>
				<el-form-item label="收礼人ID">
					<el-input v-model="filters.live_user_number" v-input-limit="0" placeholder="请输入收礼人ID" clearable />
				</el-form-item>
				<el-form-item label="选择时间">
					<el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="getUserGift">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUserGift">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="时间" prop="create_timeText" align="center" />
			<el-table-column label="收礼人ID" prop="live_user_number" align="center" />
			<el-table-column label="送礼人ID" prop="user_number" align="center" />
			<el-table-column label="礼物来源" prop="fromText" align="center" />
			<el-table-column label="礼物名称" prop="gift_name" align="center" />
			<el-table-column label="数量" prop="gift_num" align="center" />
			<el-table-column label="金额" prop="amount" align="center" />
			<el-table-column label="交易流水号" prop="relation_trade_no" align="center" />
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getUserGift" />
	</div>
</template>

<script>
	import {
		getUserStatistical
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'userGift-list',
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
					'user_number': '',
					'live_user_number': '',
				},
				lotteryType : [],
				activityTypeList : []
			}
		},
		created() {
			this.getUserGift()
		},
		methods: {
			getUserGift() {
				this.listLoading = true
				var params = {
					'user_number': this.filters.user_number,
					'live_user_number': this.filters.live_user_number,
					'start_time': this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					'end_time': this.timer ? JSON.stringify(new Date(this.timer[1]).getTime() / 1000) : "",
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserStatistical(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.create_timeText = res.create_time > 0 ? moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
						res.fromText = res.room_number > 0 ? "派对" : "私聊"
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			}
		}
	}
</script>
