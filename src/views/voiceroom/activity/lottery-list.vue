<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" @keyup.enter.native="activetyList()">
				<el-form-item label="抽奖人ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="抽奖人ID" clearable />
				</el-form-item>
				<el-form-item label="礼物名称">
					<el-input v-model="filters.gift_name" placeholder="礼物名称" clearable />
				</el-form-item>
				<el-form-item label="时间选择">
					<el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="activetyList">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="活动类型">
					<el-select v-model="filters.type" placeholder="请选择" @change="activetyList">
						<el-option v-for="item in lotteryType" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="activetyList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column align="center" label="序号" width="95">
				<template slot-scope="scope">
					{{ scope.$index + 1 }}
				</template>
			</el-table-column>
			<el-table-column label="时间" prop="create_timeText" align="center" />
			<el-table-column label="礼物图标" prop="gift_photo" align="center">
				<template slot-scope="scope">
					<el-image style="width: 50px; " :lazy="true" :src="scope.row.gift_photo ? scope.row.gift_photo : ''"
						@click="showImg(scope.row)" />
				</template>
			</el-table-column>
			<el-table-column label="礼物名称" prop="gift_name" align="center" show-overflow-tooltip />
			<el-table-column label="礼物ID" prop="gift_id" align="center" />
			<el-table-column label="礼物价值" prop="gift_diamond" align="center" />
			<el-table-column label="抽奖人ID" prop="user_id" align="center" />
			<el-table-column label="活动名称" prop="activity_name" align="center" />
			<el-table-column label="活动类型" prop="activity_type" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.activity_type == 1">派对</div>
					<div v-else-if="scope.row.activity_type == 2">背包</div>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="activetyList" />
	</div>
</template>

<script>
	import {
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
				lotteryType: [{
					"value": 1,
					"label": "派对",
				}, {
					"value": 2,
					"label": "背包",
				}],
				timer: "",
			}
		},
		created() {
			this.activetyList()
		},
		methods: {
			activetyList() {
				this.listLoading = true
				this.srcList = []
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit,
					"user_id": this.filters.user_id,
					"gift_name": this.filters.gift_name,
					"start_time": this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					"end_time": this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
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
</style>