<template>
	<div class="app-container">
		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="举报时间" prop="create_timeText" align="center" />
			<el-table-column label="被举报ID" prop="talk_user_id" align="center" />
			<el-table-column label="被举报状态" prop="talk_user_statusText" align="center" />
			<el-table-column label="举报用户ID" prop="user_id" align="center" />
			<el-table-column label="举报原因" prop="talk_genre" align="center" />
			<el-table-column label="举报证据" prop="talk_content" align="center" show-overflow-tooltip />
			<el-table-column label="操作" prop="gift_str" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleTreat(scope.row.id,1)">处理</el-button>
					<el-button @click="handleTreat(scope.row.id,2)">忽略</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="userReportList" />

		<el-dialog title="处理" :visible.sync="editPop">
			<el-form ref="popForm" :model="popForm" :rules="popFormRules">
				<el-form-item label="封禁说明" prop="reply" :label-width="formLabelWidth">
					<el-input v-model="popForm.reply" style="width: 335px;" type="textarea" :rows="5"
						placeholder="封禁说明必填,至少二十个字" autocomplete="off" clearable />
				</el-form-item>
				<el-form-item label="封禁时间" prop="ban_duration" :label-width="formLabelWidth">
					<el-select v-model="popForm.ban_duration" placeholder="请选择">
						<el-option v-for="item in timerList" :key="item.value" :label="item.label"
							:value="item.value" />
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editPop = false">取 消</el-button>
				<el-button :loading="loading" type="primary" @click="handleChange()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getUserReportList,
		getUserReportDeal,
		getUserReportPass
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'user-not-reportList',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				loading: false,
				listLoading: false,
				editPop: false,
				total: 0,
				formLabelWidth: '120px',
				page: {
					page: 1,
					limit: 10
				},
				filters: {},
				popForm: {
					'reply': '',
					'ban_duration': ''
				},
				popFormRules: {
					reply: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.reply) {
								return cb(new Error('封禁说明不能为空!'))
							}
							if (this.popForm.reply.length < 20) {
								return cb(new Error('封禁说明必填, 至少二十个字!'))
							}
							return cb()
						}
					}],
					ban_duration: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.ban_duration) {
								return cb(new Error('封禁时间不能为空!'))
							}
							return cb()
						}
					}],
				},
				timerList: [{
						"value": 1,
						"label": "1天"
					},
					{
						"value": 3,
						"label": "3天"
					},
					{
						"value": 7,
						"label": "7天"
					},
					{
						"value": 15,
						"label": "15天"
					},
					{
						"value": 30,
						"label": "30天"
					},
					{
						"value": -1,
						"label": "永久"
					}
				],
			}
		},
		created() {
			this.userReportList();
		},
		methods: {
			userReportList() {
				var params = {
					"status": 1, // 处理状态： 1未处理 2已处理 3忽略
					"talk_user_id": "",
					"user_id": ""
				}
				getUserReportList(params).then(res => {
					this.total = res.data.count;
					res.data.list.map(re => {
						re.create_timeText = moment(re.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
						switch (re.talk_user_status) {
							case 1:
								re.talk_user_statusText = "正常";
								break;
							case 2:
								re.talk_user_statusText = "封禁";
								break;
							case 3:
								re.talk_user_statusText = "注销";
								break;
						}
					})
					this.list = res.data.list;
				}).catch(err => {
					this.$message.error(err);
				})
			},
			handleTreat(id, num) {
				this.popForm.id = id;
				if (num == 1) { // 处理
					if (this.$refs["popForm"]) {
						this.$refs["popForm"].resetFields();
					}
					this.editPop = true;
				} else if (num == 2) { // 忽略
					var params = {
						"id": this.popForm.id
					}
					getUserReportPass(params).then(res => {
						console.log(res);
						this.userReportList();
					}).catch(err => {
						this.$message.error(err);
					})
				}
			},
			handleChange() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						var params = {
							"id": this.popForm.id,
							"reply": this.popForm.reply,
							"ban_duration": this.popForm.ban_duration > 0 ? (this.popForm.ban_duration * 24 *
								60 * 60) : this.popForm.ban_duration
						}
						getUserReportDeal(params).then(res => {
							this.editPop = false;
							this.$message.success("操作成功");
							this.userReportList();
						}).catch(err => {
							this.editPop = false;
							this.$message.error(err);
						})
					}
				})
			},
		},
	}
</script>

<style>
</style>
