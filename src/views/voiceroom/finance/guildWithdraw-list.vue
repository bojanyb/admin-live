<template>
	<div class="app-container">

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px; display: none;">
			<el-form :inline="true" :model="filters" @keyup.enter.native="getGuildListInfo()">
				<el-form-item label="类型">
					<el-select v-model="filters.guild_self" placeholder="请选择">
						<el-option label="全部" value="" />
						<el-option key="1" label="非自营" value="1" />
						<el-option key="2" label="自营" value="2" />
					</el-select>
				</el-form-item>
				<el-form-item label="结算类型">
					<el-select v-model="filters.guild_genre" placeholder="请选择">
						<el-option label="全部" value="" />
						<el-option key="1" label="对私结算" value="1" />
						<el-option key="2" label="对公结算" value="2" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getGuildListInfo">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table ref="multipleTable" v-loading="listLoading" :data="list" element-loading-text="拼命加载中" border fit
			highlight-current-row>
			<el-table-column label="公会ID" prop="guild_id" align="center" width="70" />
			<el-table-column label="流水号" prop="trade_no" align="center" width="160" show-overflow-tooltip />
			<el-table-column label="外部流水号" prop="out_trade_no" align="center" width="160" show-overflow-tooltip />
			<el-table-column label="提现金额" prop="amountText" align="center" />
			<el-table-column label="手续费" prop="feeText" align="center" />
			<el-table-column label="提取喵粮数" prop="gain" align="center" width="100" />
			<el-table-column label="状态" prop="status" align="center" width="95">
				<template slot-scope="scope">
					<div class="color2" v-if="scope.row.status == 1">待打款</div>
					<div class="color1" v-if="scope.row.status == 2">已打款</div>
					<div class="color3" v-if="scope.row.status == 3">已退回</div>
				</template>
			</el-table-column>
			<el-table-column label="交易凭证" prop="photo" align="center">
				<template slot-scope="scope">
					<el-image v-if="scope.row.photo.length > 0" style="width: 30px; height: 30px" :lazy="true"
						:src="scope.row.photo ? scope.row.photo : ''" :preview-src-list="photolist" />
				</template>
			</el-table-column>
			<el-table-column label="主体名" prop="bank_user" align="center" />
			<el-table-column label="银行卡号" prop="bank_no" align="center" width="260" />
			<el-table-column label="银行名" prop="bank_name" align="center" />
			<el-table-column label="开户行" prop="bank_address" align="center" />
			<el-table-column label="创建时间" prop="create_timeText" align="center" width="160" />
			<el-table-column label="修改时间" prop="update_timeText" align="center" width="160" />
			
			<el-table-column label="备注" prop="remark" align="center" width="100" show-overflow-tooltip />
			<el-table-column label="操作" prop="gift_str" align="center">
				<template slot-scope="scope">
					<el-button v-if="scope.row.status == 1" type="primary" @click="handleAudit(scope.row)">审核
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit"
			@pagination="getGuildListInfo" />

		<el-dialog title="审核" :visible.sync="auditPop">
			<el-form :model="auditForm" ref="auditForm">
				<el-form-item prop="status" label="状态" :label-width="formLabelWidth">
					<el-radio-group v-model="auditForm.status" style="display: initial">
						<el-radio :label="2">提取通过(需财务进行打款)</el-radio>
						<el-radio :label="3">提取驳回</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop="out_trade_no" label="外部交易单号" :label-width="formLabelWidth" v-if="auditForm.status == 2">
					<el-input v-model="auditForm.out_trade_no" v-input-limit="0" style="width: 335px;" placeholder="外部交易单号，打款时可填写" clearable
						autocomplete="off" />
				</el-form-item>
				<el-form-item prop="photo" label="交易凭证" :label-width="formLabelWidth" v-if="auditForm.status == 2">
					<el-upload class="avatar-uploader" action="" :auto-upload="false" :show-file-list="false"
						:on-change="handleChangeImg" :limit="1">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item prop="remark" label="驳回说明" :label-width="formLabelWidth" v-if="auditForm.status == 3">
					<el-input v-model="auditForm.remark" style="width: 335px;" placeholder="驳回说明" clearable
						autocomplete="off" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" />
				</el-form-item>
				<el-form-item size="large" style="text-align: right;">
					<el-button type="primary" @click="handleSubmit">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getGuildWithdrawList,
		getGuildWalletCheck
	} from '@/api/videoRoom'
	import Pagination from '@/components/Pagination'
	import moment from 'moment'
	export default {
		name: 'guildWithdraw-list',
		components: {
			Pagination
		},
		data() {
			return {
				list: [],
				loading: false,
				listLoading: true,
				total: 0,
				filters: {
					'guild_self': '',
					'guild_genre': '',
				},
				page: {
					page: 1,
					limit: 10
				},
				photolist: [],
				formLabelWidth: '120px',
				auditPop: false,
				auditForm: {
					"trade_no": "",
					"out_trade_no" : "",
					"status": 2,
					"remark": "",
					"photo": ""
				},
				imageUrl: "",
				imageFile: "",
			}
		},
		created() {
			this.getGuildListInfo()
		},
		methods: {
			getGuildListInfo() {
				this.listLoading = true
				var params = {
					'page': this.page.page,
					'pagesize': this.page.limit,
					'guild_self': this.filters.guild_self,
					'guild_genre': this.filters.guild_genre
				}
				getGuildWithdrawList(params).then(response => {
					this.total = response.data.count
					this.list = response.data.list
					this.list.map(res => {
						if (res.photo && res.photo !== "") {
							this.photolist.push(res.photo)
						}
						res.amountText = res.amount / 100;
						res.feeText = res.fee / 100;
						res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:MM:SS')
						res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:MM:SS')
					})
					this.listLoading = false
				}).catch(err => {
					this.listLoading = false
				})
			},
			handleAudit(trade_no) {
				this.auditForm.trade_no = trade_no;
				this.auditPop = true
			},
			handleSubmit() {
				let param = new FormData();
				param.append('status', this.auditForm.status);
				param.append('trade_no', this.auditForm.trade_no);
				if(this.auditForm.status == 2){
					param.append('out_trade_no', this.auditForm.out_trade_no);
					param.append('photo', this.imageFile.raw);
				}
				if(this.auditForm.status == 3){
					param.append('remark', this.auditForm.remark);
				}
				getGuildWalletCheck(param).then(res=>{
					if(res.code == 2000){
						this.getGuildListInfo();
						this.$message.success("审核成功");
					}
				}).catch(err=>{
					this.$message.error(err)
				})
				this.auditPop = false
			},
			handleChangeImg(file) {
				var isFile = this.beforeAvatarUpload(file);
				this.imageFile = file;
				if (isFile == true) {
					this.imageUrl = URL.createObjectURL(file.raw);
				}
			},
			beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
		}
	}
</script>
<style lang="scss">
	.pagination-container {
		margin-top: initial;
	}
	.el-form-item__content{
		.avatar-uploader{
			.el-upload--text {
				border: 1px dashed #d9d9d9 !important;
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
			}
			.el-upload--text:hover {
				border-color: #409EFF;
			}
			.avatar-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 178px;
				height: 178px;
				line-height: 178px;
				text-align: center;
			}
			.avatar {
			    width: 178px;
			    height: 178px;
			    display: block;
			  }
		} 
	}

	.color1 {
		color: #67C23A;
	}

	.color2 {
		color: #E6A23C;
	}

	.color3 {
		color: #409EFF;
	}

	.color4 {
		color: #F56C6C;
	}

	.color5 {
		color: #909399;
	}
</style>
