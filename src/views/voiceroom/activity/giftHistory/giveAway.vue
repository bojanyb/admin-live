// 暂时废弃 - 合并到 giftHistory-list页面
<template>
	<div class="app-container">
		<el-card>
			<el-form :model="popForm" ref="popForm" :rules="popFormRules">
				<el-form-item label="用户ID" prop="user_number" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.user_number" style="width: 335px;" v-input-limit="0"
							placeholder="请输入被充值用户ID" clearable autocomplete="off" @blur="handleUserInfo" />
					</el-col>
				</el-form-item>
				<el-form-item :label-width="formLabelWidth" v-if="isShowUser == true ">
					<el-col :span="17">
						<div class="userInfoBox">
							<div class="userImg fl"><img :src="userInfo.face"></div>
							<div class="userInfo">
								<div class="userName">昵称： {{userInfo.nickname}}</div>
								<div class="userBanner">余额： {{userInfo.balance}}</div>
							</div>
						</div>
					</el-col>
				</el-form-item>
				<el-form-item label="充值类型" prop="currency" :label-width="formLabelWidth">
					<el-radio-group v-model="popForm.currency">
						<el-radio :label="1">钻石</el-radio>
						<el-radio :label="2">喵粮</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="充值数量" prop="amount" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input v-model="popForm.amount" style="width: 335px;" placeholder="请输入非0的正负整数" clearable
							autocomplete="off" />
					</el-col>
				</el-form-item>
				<el-form-item label="充值原因" prop="remark" :label-width="formLabelWidth">
					<el-col :span="17">
						<el-input type="textarea" maxlength="100" minlength="1" show-word-limit
							:autosize="{ minRows: 2, maxRows: 6}" v-model="popForm.remark" style="width: 335px;"
							placeholder="请输入充值原因" clearable autocomplete="off" />
					</el-col>
				</el-form-item>
			</el-form>
			<el-button class="giveBtn fl" type="primary" @click="handleGive">确定</el-button>
		</el-card>
	</div>
</template>

<script>
	import {
		getUserWallet,
		getUserAddMoney
	} from '@/api/videoRoom'
	export default {
		name: 'giveAway',
		data() {
			return {
				formLabelWidth: "120px",
				userInfo: {
					face: "",
					nickname: "",
					balance: 0
				},
				isShowUser: false,
				popForm: {
					"user_number": "",
					"currency": 1,
					"amount": "",
					"remark": "",
				},
				popFormRules: {
					user_number: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.user_number || this.popForm.user_number == "") {
								return cb(new Error('被充值用户ID不能为空!'))
							}
							return cb()
						}
					}],
					currency: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.currency || this.popForm.currency == "") {
								return cb(new Error('充值类型不能为空!'))
							}
							return cb()
						}
					}],
					amount: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							let amount = this.popForm.amount
							if (!amount || amount == "") {
								return cb(new Error('充值数量不能为空!'))
							}

							if (amount.indexOf(".") > -1) {
								return cb(new Error('充值数量不能为小数!'))
							}

							if (amount == "0") {
								return cb(new Error('充值数量不能为0!'))
							}

							if (amount.indexOf("-") > -1) {
								let tempAmount = amount.split("-")[1];
								if (tempAmount > this.userInfo.balance) {
									return cb(new Error('充值数量最小不能超出用户余额!'))
								}
								if (tempAmount == "0") {
									return cb(new Error('充值数量不能为0!'))
								}
							}

							if (this.popForm.amount > 10000000) {
								return cb(new Error('充值数量最大范围10000000!'))
							}
							return cb()
						}
					}],
					remark: [{
						required: true,
						trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!this.popForm.remark || this.popForm.remark == "") {
								return cb(new Error('充值原因不能为空!'))
							}
							if (this.popForm.remark.length < 1 || this.popForm.remark > 100) {
								return cb(new Error('充值原因字符范围1~100!'))
							}
							return cb()
						}
					}],
				}
			}
		},
		created() {},
		mounted() {},
		methods: {
			handleUserInfo() {
				if(this.popForm.user_number) {
					var params = {
						user_number: this.popForm.user_number
					}
					getUserWallet(params).then(res => {
						this.userInfo = res.data;
						this.userInfo.balance = parseInt(res.data.diamond) + parseInt(res.data.gain);
						this.isShowUser = true;
					}).catch(err => {})
				}
			},
			handleGive() {
				this.$refs.popForm.validate(valid => {
					if (valid) {
						getUserAddMoney(this.popForm).then(res => {
							this.popForm = {
								"user_number": "",
								"currency": this.popForm.currency,
								"amount": "",
								"remark": "",
							}
							this.$message.success("充值成功");
							this.userInfo = {
								face: "",
								nickname: "",
								balance: 0
							}
							this.popForm.currency = 1;
							this.isShowUser = false;
						}).catch(err => {
							this.$message.error(err);
						})
					}
				})
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.giveBtn {
		width: 150px;
		margin-top: 30px;
		margin-bottom: 20px;
		margin-left: 150px;
	}

	.userInfoBox {
		.userImg {
			width: 45px;
			max-height: 45px;
			margin-right: 15px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.userInfo {

			.userName,
			.userBanner {
				height: 25px;
				line-height: 25px;
			}
		}
	}
</style>
