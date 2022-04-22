<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" @keyup.enter.native="getActivetyDrawLogList()">
				<el-form-item label="抽奖人ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="抽奖人ID" clearable />
				</el-form-item>
				<el-form-item label="宝箱类型">
					<el-select v-model="filters.type" placeholder="请选择" @change="getActivetyDrawLogList">
						<el-option v-for="item in lotteryType" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="活动类型">
					<el-select v-model="filters.type" placeholder="请选择" @change="getActivetyDrawLogList">
						<el-option v-for="item in ativeType" :key="item.value" :label="item.label"
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
				<div class="sumBoxItem fl">宝箱开箱次数：0</div>
				<div class="sumBoxItem fl">宝箱收入：0</div>
				<div class="sumBoxItem fl">宝箱产出：0</div>
				<div class="sumBoxItem fl">宝箱投入产出比：0</div>
			</el-card>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column align="center" label="序号" width="95">
				<template slot-scope="scope">
					{{ scope.$index + 1 }}
				</template>
			</el-table-column>
			<el-table-column label="用户ID" prop="gift_id" align="center" />
			<el-table-column label="时间" prop="create_timeText" align="center" />
			<el-table-column label="活动类型" prop="gift_name" align="center" />
			<el-table-column label="宝箱类型" prop="gift_diamond" align="center" />
			<el-table-column label="开箱次数" prop="user_id" align="center" />
			<el-table-column label="投入(RMB)" prop="activity_name" align="center" />
			<el-table-column label="产出(RMB)" prop="activity_name" align="center" />
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
					"user_id": "",
					"gift_name": "",
					"start_time": "",
					"end_time": "",
					"type": ""
				},
				lotteryType: [],
				ativeType: [{
					"value": '',
					"label": "全部",
				}, {
					"value": 1,
					"label": "背包",
				}, {
					"value": 2,
					"label": "派对",
				}],
				timer: "",
			}
		},
		created() {
			this.getActivetyListSource();
			this.getActivetyDrawLogList()
		},
		methods: {
			getActivetyListSource() {
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getActivetyList(params).then(response => {
					this.lotteryType = response.data.list
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
					"user_id": this.filters.user_id,
					"gift_name": this.filters.gift_name,
					"start_time": this.timer ? (new Date(this.timer[0]).getTime() / 1000) : "",
					"end_time": this.timer ? (new Date(this.timer[1]).getTime() / 1000) : "",
					"type": this.filters.type
				}

				// 过滤传递参数为空的参数
				for (let i in params) {
					if (params[i] == "") {
						delete params[i];
					}
				}
				getActivetyDrawLog(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
					})
					this.listLoading = false
				}).catch(err => {
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
		.el-card__body{
			width: 100%;
			.sumBoxItem{
				width: 25%;
				text-align: center;
				border-right: solid 1px #DCDCDC;
			}
			.sumBoxItem:last-child{
				border-right: none;
			}
		}
	}
</style>
