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
			<el-table-column label="等级" prop="user_rank" align="center" width="95" />
			<el-table-column label="等级名称" prop="rank_name" align="center" />
			<el-table-column label="消费钻石总数" prop="diamond_total" align="center" />
			<el-table-column label="总支出(个)" prop="spending" align="center" />
			<el-table-column label="修改时间" prop="update_timeText" align="center" />
			<el-table-column label="操作" prop="gift_str" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleLiveRankEdit(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getUserRank" />

		<el-dialog :title="editTitle" :visible.sync="editPop">
			<el-form ref="popForm" :model="popForm" :rules="popFormRules">
				<el-form-item label="等级" prop="user_rank" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.user_rank" v-input-limit="0" style="width: 335px;"
							placeholder="请输入等级数值" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="等级名称" prop="rank_name" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.rank_name" style="width: 335px;" placeholder="请输入等级名称" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="消费钻石总数" prop="diamond_total" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.diamond_total" v-input-limit="0" style="width: 335px;"
							placeholder="请输入收入消费钻石总数" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="总支出" prop="spending" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.spending" v-input-limit="0" style="width: 335px;"
							placeholder="请输入总支出" clearable autocomplete="off" />
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
		getUserRankList,
		getUserRankConfig
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'ConsumeList',
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
				editTitle: '',
				editPop: false,
				popForm: {
					'user_rank': '',
					'rank_name': '',
					'diamond_total': '',
					'spending': ''
				},
				popFormRules: {
					user_rank: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.sort) {
								return cb(new Error('等级不能为空!'))
							}
							return cb()
						}
					}],
					rank_name: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.rank_name) {
								return cb(new Error('等级名称不能为空!'))
							}
							return cb()
						}
					}],
					diamond_total: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.diamond_total) {
								return cb(new Error('消费钻石总数不能为空!'))
							}
							return cb()
						}
					}],
					spending: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.spending) {
								return cb(new Error('总支出不能为空!'))
							}
							return cb()
						}
					}]
				}
			}
		},
		created() {
			this.getUserRank()
		},
		methods: {
			getUserRank() {
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				this.listLoading = true
				getUserRankList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleLiveRankAdd() {
				this.editTitle = '添加'
				this.popForm = {
					'user_rank': '',
					'rank_name': '',
					'diamond_total': '',
					'spending': ''
				}
				if(this.$refs["popForm"]){
					this.$refs["popForm"].resetFields();
				}
				this.editPop = true
			},
			handleLiveRankEdit(row) {
				this.editTitle = '修改'
				this.popForm = {
					'user_rank': row.user_rank,
					'rank_name': row.rank_name,
					'diamond_total': row.diamond_total,
					'spending': row.spending
				}
				if(this.$refs["popForm"]){
					this.$refs["popForm"].resetFields();
				}
				this.editPop = true
			},
			handleChange() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						getUserRankConfig(this.popForm).then(res => {
							this.getUserRank()
							this.editPop = false
						})
					}
				})
			}
		}
	}
</script>
