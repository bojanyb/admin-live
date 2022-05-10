<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getGuildTurnover()">
				<el-form-item label="派对ID">
					<el-input v-model="filters.room_number" v-input-limit="0" placeholder="请输入派对ID" clearable />
				</el-form-item>
				<el-form-item label="公会ID">
					<el-input v-model="filters.guild_number" v-input-limit="0" placeholder="请输入公会ID" clearable />
				</el-form-item>
				<el-form-item label="收礼人ID">
					<el-input v-model="filters.user_number" v-input-limit="0" placeholder="请输入收礼人ID" clearable />
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
			<el-table-column label="收礼ID" prop="live_user_number" align="center" />
			<el-table-column label="来源" prop="fromText" align="center" />
			<el-table-column label="时间" prop="create_timeText" align="center" />
			<el-table-column label="派对ID" prop="room_number" align="center" />
			<el-table-column label="公会ID" prop="guild_number" align="center" />
			<el-table-column label="金额" prop="amount" align="center" />
			<el-table-column label="交易流水号" prop="relation_trade_no" align="center" />
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getGuildTurnover" />
	</div>
</template>

<script>
	import {
		getUserTurnover
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'userTurnover-list',
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
					'guild_number': '',
					'room_number': '',
					'user_number': '',
				}
			}
		},
		created() {
			this.getGuildTurnover()
		},
		methods: {
			getGuildTurnover() {
				this.listLoading = true
				var params = {
					'guild_number': this.filters.guild_number,
					'room_number': this.filters.room_number,
					'user_number': this.filters.user_number,
					'start_time': this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					'end_time': this.timer ? JSON.stringify(new Date(this.timer[1]).getTime() / 1000) : "",
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserTurnover(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.room_number = res.room_number > 0 ? res.room_number : ""
						res.guild_number = res.guild_number > 0 ? res.guild_number : ""
						res.create_timeText = res.create_time > 0 ?  moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
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
