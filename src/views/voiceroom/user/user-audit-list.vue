<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getUserAuditSource()">
				<el-form-item label="用户ID">
					<el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入用户ID" clearable />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUserAuditSource">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAuditAll">批量通过</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			@selection-change="handleSelectionChange" highlight-current-row>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="用户ID" prop="user_id" align="center" width="120">
			</el-table-column>
			<el-table-column label="昵称" prop="nickname" align="center">
				<template slot-scope="scope">
					<div class="showText">{{scope.row.nickname}}</div>
					<div class="newTips" v-if="scope.row.startList[0] == '1'">新</div>
				</template>
			</el-table-column>
			<el-table-column label="头像" prop="face" align="center">
				<template slot-scope="scope">
					<el-image style="width: 30px; height: 30px;border-radius: 5px;" :lazy="true"
						:src="scope.row.face ? scope.row.face : ''" :preview-src-list="userImglist" />
					<div class="newTips" v-if="scope.row.startList[1] == '10'">新</div>
				</template>
			</el-table-column>
			<el-table-column label="个性签名" prop="autograph" align="center" width="320" show-overflow-tooltip>
				<template slot-scope="scope">
					<div class="showText">{{scope.row.autograph}}</div>
					<div class="newTips" v-if="scope.row.startList[2] == '100'">新</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" prop="gift_str" align="center">
				<template slot-scope="scope">
					<el-button type="primary" @click="handleAudit(scope.row,'pass')">通过</el-button>
					<el-button type="danger" @click="handleAudit(scope.row,'back')">驳回</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getUserAuditSource" />

		<el-dialog title="驳回" :visible.sync="editPop">
			<el-form :model="popForm">
				<el-form-item label="驳回类型" :label-width="formLabelWidth">
					<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
						<el-checkbox v-for="(item,index) in userAuditTypeList" :disabled="item.isdisabled"
							:label="item.num" :key="item.name">
							{{ item.name }}
						</el-checkbox>
					</el-checkbox-group>
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
		getUserAuditList,
		getUserAudit
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'user-audit-list',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				editPop: false,
				loading: false,
				listLoading: false,
				total: 0,
				formLabelWidth: '120px',
				page: {
					page: 1,
					limit: 10
				},
				filters: {
					'user_id': '',
					'status': '',
				},
				popForm: {
					"user_id": "",
					'nickname': '',
					'status': 1,
					'face': '',
					'autograph': ''
				},
				userImglist: [],
				userImglist2: [],
				checkedCities: [],
				userAuditTypeList: [{
						"name": '昵称',
						"num": "1",
						"isdisabled": true
					},
					{
						"name": '头像',
						"num": "10",
						"isdisabled": true
					},
					{
						"name": '个性签名',
						"num": "100",
						"isdisabled": true
					}
				],
				auditSelect: "",
				multipleSelection: [],
				auditAllNum: 0,
				IsAuditAll: false,
			}
		},
		created() {
			this.getUserAuditSource();
		},
		methods: {
			getUserAuditSource() {
				this.listLoading = true
				this.userImglist = []
				var params = {
					'user_id': this.filters.user_id,
					'status': this.filters.status,
					'page': this.page.page,
					'pagesize': this.page.limit
				}
				getUserAuditList(params).then(response => {
					this.total = response.data.count;
					this.list = response.data.list;
					this.list.map(res => {
						res.startList = JSON.stringify(res.status).split("");
						if (res.startList.length == 2) {
							res.startList[0] = res.startList[0] + "0";
						}
						if (res.startList.length == 3) {
							res.startList[0] = res.startList[0] + "00";
							res.startList[1] = res.startList[1] > 0 ? res.startList[1] + "0" : "0";
						}
						res.startList.reverse()
						this.userImglist.push(res.face)
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleAudit(row, type) {
				this.popForm.user_id = row.user_id;
				this.popForm.nickname = row.nickname;
				this.popForm.status = type == "back" ? row.status : 0;
				this.popForm.face = row.face;
				this.popForm.autograph = row.autograph;
				this.userImglist2 = [];
				this.userImglist2.push(row.face);
				if (this.popForm.status !== 0) {
					this.handleChangeCheckedCities(row);
					this.editPop = true;
				} else {
					this.handleChange(this.popForm);
				}
			},
			handleChange(source) {
				var params = {};
				if (!source) {
					params = {
						"user_id": JSON.stringify(this.popForm.user_id),
						"status": JSON.stringify(this.popForm.status),
					}
				} else {
					params = {
						"user_id": source.user_id,
						"status": source.status,
					}
				}
				getUserAudit(params).then(res => {
					if (res.code == 2000) {
						if (this.auditAllNum == this.multipleSelection.length || this.IsAuditAll == false) {
							this.$message.success("审核成功");
							this.getUserAuditSource();
						}
						if (this.IsAuditAll == true) {
							this.auditAllNum++;
						} else {
							this.editPop = false;
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			handleCheckedCitiesChange(value) {
				let selectArr = JSON.parse(JSON.stringify(value));
				let selectStatus = 0;
				selectArr.map(res => {
					selectStatus += parseInt(res)
				})
				this.popForm.status = selectStatus;
			},
			handleChangeCheckedCities(row) {
				this.checkedCities = JSON.stringify(row.status).split("");
				this.auditSelect = "";
				if (this.checkedCities.length == 2) {
					this.checkedCities[0] = this.checkedCities[0] + "0";
				}
				if (this.checkedCities.length == 3) {
					this.checkedCities[0] = this.checkedCities[0] + "00";
					this.checkedCities[1] = this.checkedCities[1] + "0";
				}
				this.checkedCities = this.checkedCities.sort();
				this.userAuditTypeList.map(item => {
					item.isdisabled = true;
				})
				this.checkedCities.map(res => {
					this.userAuditTypeList.map(item => {
						if (res == item.num) {
							item.isdisabled = false;
						}
					})
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleAuditAll() {
				this.auditAllNum = 0;
				this.IsAuditAll = true;
				this.multipleSelection.forEach(res => {
					var params = {};
					params.user_id = JSON.stringify(res.user_id);
					params.status = "0";
					this.handleChange(params);
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.el-icon-circle-close {
		color: #FFFFFF;
	}

	.cell {
		position: relative;
		display: block;
		overflow: initial;

		.newTips {
			position: absolute;
			top: 10px;
			left: 10px;
			width: 20px;
			height: 20px;
			line-height: 20px;
			border-radius: 50%;
			background: red;
			color: #FFFFFF;
		}
	}
</style>
