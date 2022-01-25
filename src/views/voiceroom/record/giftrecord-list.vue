<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getGiftRecord()">
				<el-form-item label="送礼用户ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入送礼用户ID" clearable />
				</el-form-item>
				<el-form-item label="收礼用户ID">
					<el-input v-model="filters.live_user_id" v-input-limit="0" placeholder="请输入收礼用户ID" clearable />
				</el-form-item>
				<el-form-item label="直播间号">
					<el-input v-model="filters.room_number" v-input-limit="0" placeholder="请输入直播间号" clearable />
				</el-form-item>
				<el-form-item label="公会ID">
					<el-input v-model="filters.guild_id" v-input-limit="0" placeholder="请输入公会ID" clearable />
				</el-form-item>
				<el-form-item label="礼物">
					<el-select class="giftList" v-model="filters.gift_id" placeholder="请选择" @change="getGiftRecord"
						popper-class="eloption" :popper-append-to-body="false">
						<el-option v-for="item in giftList" :key="item.id"
							:label="item.gift_name + ' (ID: ' + item.id +')'" :value="item.id" />
						<div class="changeGiftPage">
							<el-button type="primary" class="beforePage" :disabled="giftPage.isFrist == true"
								@click="handleChangeGiftPage('before')">上一页</el-button>
							<el-button type="primary" class="nextPage" :disabled="giftPage.isEnd == true"
								@click="handleChangeGiftPage('next')">下一页</el-button>
						</div>
					</el-select>
				</el-form-item>
				<el-form-item label="选择时间">
					<el-date-picker v-model="timer" type="datetimerange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" @change="getGiftRecord">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getGiftRecord">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="礼物名" prop="gift_name" align="center" />
			<el-table-column label="礼物数量" prop="gift_num" align="center" />
			<el-table-column label="礼物总价格(钻石)" prop="amount" align="center" />
			<el-table-column label="直播间号" prop="room_number" align="center" />
			<el-table-column label="送礼用户ID" prop="user_id" align="center" width="95" />
			<el-table-column label="收礼用户ID" prop="live_user_id" width="100" align="center" />
			<el-table-column label="收礼用户收益" prop="live_gain" align="center" />
			<el-table-column label="公会ID" prop="guild_id" width="100" align="center" />
			<el-table-column label="公会收益小计" prop="guild_fee" align="center" />
			<el-table-column label="平台收益小计" prop="platform_fee" align="center" />
			<el-table-column label="结算类型" prop="guild_genreText" align="center" />
			<el-table-column label="流水号" prop="trade_no" align="center" width="180" />
			<el-table-column label="创建时间" prop="create_timeText" align="center" width="160" />
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getGiftRecord" />
	</div>
</template>

<script>
	import {
		getGiftList,
		getGiftRecordList
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'giftrecord-list',
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
				giftPage: {
					page: 1,
					limit: 10,
					isEnd: false,
					isFrist: true
				},
				giftList: [],
				filters: {
					'user_id': '',
					'live_user_id': '',
					'gift_id': '',
					'room_number': '',
					'guild_id': '',
					'start_time': '',
					'end_time': ''
				},
				timer: ""
			}
		},
		created() {
			this.getGift()
			this.getGiftRecord()
		},
		methods: {
			getGift() {
				var params = {
					"page": this.giftPage.page,
					'pagesize': this.giftPage.limit
				}
				getGiftList(params).then(res => {
					if (res.data.list.length > 0) {
						this.giftList = res.data.list
					}
					var currentNum = res.data.page * res.data.pagesize
					if (currentNum <= res.data.page || res.data.page == 1) {
						this.giftPage.isFrist = true
					} else {
						this.giftPage.isFrist = false
					}
					if (currentNum >= res.data.count) {
						this.giftPage.isEnd = true
					} else {
						this.giftPage.isEnd = false
					}
				})
			},
			getGiftRecord() {
				this.listLoading = true
				var params = {
					'user_id': this.filters.user_id,
					'live_user_id': this.filters.live_user_id,
					'gift_id': this.filters.gift_id,
					'room_number': this.filters.room_number,
					'guild_id': this.filters.guild_id,
					'start_time': this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					'end_time': this.timer ? JSON.stringify(new Date(this.timer[1]).getTime() / 1000) : "",
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getGiftRecordList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						if (res.guild_genre == '1') {
							res.guild_genreText = "对私"
						} else if (res.guild_genre == '2') {
							res.guild_genreText = "对公"
						}
						res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:MM:SS')
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleChangeGiftPage(type) {
				if (this.giftPage.isEnd == false && type == "next") {
					this.giftPage.page = this.giftPage.page + 1;
				}
				if (this.giftPage.isFrist == false && type == "before") {
					this.giftPage.page = this.giftPage.page - 1;
				}
				this.getGift()
			},
		}
	}
</script>

<style scoped="scoped" lang="scss">
	::v-deep .eloption .el-select-dropdown__wrap {
		max-height: initial !important;
	}

	.changeGiftPage {
		font-size: 14px;
		height: 45px;
		line-height: 55px;
		text-align: center;
		border-top: solid 1px #dcdcdc;
		color: #606266;

		div {
			width: 35%;
			float: left;
		}
	}
</style>
