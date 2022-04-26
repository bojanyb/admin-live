<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="success" @click="handleLiveRankAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<!-- <el-table-column label="ID" align="center" prop="id" width="95" /> -->
			<el-table-column label="等级" prop="live_rank" align="center" width="95" />
			<el-table-column label="总魅力" prop="income" align="center" />
			<el-table-column label="修改时间" prop="update_timeText" align="center" />
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleLiveRankEdit(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getLiveRank" />

		<el-dialog :title="editTitle" :visible.sync="editPop">
			<el-form ref="popForm" :model="popForm" :rules="popFormRules">
				<el-form-item label="等级" v-if="editTitle == '添加'" prop="live_rank" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.live_rank" v-input-limit="0" style="width: 335px;"
							placeholder="请输入等级数值" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
				<!-- <el-form-item label="头衔名称" prop="live_rank_name" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.live_rank_name" style="width: 335px;" placeholder="请输入头衔名称" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item> -->
				<!-- <el-form-item label="总魅力" prop="gain_total" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.gain_total" v-input-limit="0" style="width: 335px;"
							placeholder="请输入总魅力" clearable autocomplete="off" />
					</el-col>
				</el-form-item> -->
				<el-form-item label="礼物总价值" prop="income" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.income" v-input-limit="0" style="width: 335px;"
							placeholder="请输入总魅力" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editPop = false">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getGiftList,
		getLiveRanklist,
		getLiveRankConfig
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'LivetitleList',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				giftList: [],
				multipleSelection: [],
				loading: false,
				listLoading: false,
				giftLoading: false,
				total: 0,
				giftTotal: 0,
				formLabelWidth: '120px',
				page: {
					page: 1,
					limit: 10
				},
				editTitle: '',
				editPop: false,
				popForm: {
					'live_rank': '',
					// 'live_rank_name': '',
					// 'gain_total': '',
					'income': ''
				},
				popFormRules: {
					live_rank: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.live_rank && this.editTitle == '添加') {
								return cb(new Error('请输入等级数值!'))
							}
							if(this.popForm.live_rank  && parseInt(this.popForm.live_rank) > 100){
								
								return cb(new Error('等级最大值为100!'))
							}
							
							return cb()
						}
					}],
					// live_rank_name: [{
					// 	required: true,
					// 	trigger: 'blur',
					// 	validator: (rules, value, cb) => {
					// 		if (!this.popForm.live_rank_name) {
					// 			return cb(new Error('头衔名称不能为空!'))
					// 		}
					// 		return cb()
					// 	}
					// }],
					// gain_total: [{
					// 	required: true,
					// 	trigger: 'blur',
					// 	validator: (rules, value, cb) => {
					// 		if (!this.popForm.gain_total) {
					// 			return cb(new Error('总魅力不能为空!'))
					// 		}
					// 		return cb()
					// 	}
					// }],
					income: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.income) {
								return cb(new Error('总魅力不能为空!'))
							}
							return cb()
						}
					}]
				}
			}
		},
		created() {
			this.getGift()
			this.getLiveRank()
		},
		methods: {
			getGift() {
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				this.giftLoading = true
				getGiftList(params).then(response => {
					this.giftTotal = response.data.count
					this.giftList = response.data.list
					this.giftList.map(res => {
						res.num = 0
					})
					this.giftLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			getLiveRank() {
				this.listLoading = true
				var params = {
					page : this.page.page
				}
				getLiveRanklist(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
					})
					this.listLoading = false
				})
			},
			handleLiveRankAdd() {
				this.editTitle = '添加'
				this.popForm = {
					'live_rank': '',
					// 'live_rank_name': '',
					// 'gain_total': '',
					'income': ''
				}
				this.editPop = true
			},
			handleLiveRankEdit(row) {
				this.editTitle = '修改'
				this.popForm = {
					'live_rank': row.live_rank,
					// 'live_rank_name': row.live_rank_name,
					// 'gain_total': row.gain_total,
					'income': row.income,
					'id': row.id
				}
				this.editPop = true
			},
			handleChange() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						getLiveRankConfig(this.popForm).then(res => {
							this.getLiveRank()
							this.editPop = false
						})
					}
				})

			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			}
		}
	}
</script>
