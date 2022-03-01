<template>
	<div class="app-container">
		<el-card class="financeInfoTimer">
			<div slot="header" class="clearfix">
				<div class="fl" style="height: 36px;line-height: 36px;"><span>账户信息 </span></div>
				<div class="fr">
					<span>选择时间: </span>
					<el-date-picker class="selectTime" v-model="timer" type="datetimerange" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" @change="getRoomWalletInfo" />
				</div>
			</div>
			<div class="userInfoBox" v-loading.fullscreen.lock="fullscreenLoading">
				<div class="userInfoItem text item">
					<div class="userTitle">
						钻石总数:
					</div>
					<div class="userContent">
						{{accountInfo.user_diamond}}
					</div>
				</div>
				<div class="userInfoItem text item">
					<div class="userTitle">
						喵粮总数:
					</div>
					<div class="userContent">
						{{accountInfo.user_gain}}
					</div>
				</div>
				<div class="userInfoItem text item">
					<div class="userTitle">
						平台礼物抽成:
					</div>
					<div class="userContent">
						{{accountInfo.gift / 100}}
					</div>
				</div>
				<div
					style="border-top: solid 1px #dcdcdc;display: inline-block;padding-top: 30px;margin-top: 30px;width: 100%;">
					<div class="userInfoItem text item">
						<div class="userTitle">
							用户总充值:
						</div>
						<div class="userContent" style="position: relative;">
							{{accountInfo.recharge / 100}}
							<span style="position: absolute;left: 60%;"> — </span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							公会总提取:
						</div>
						<div class="userContent" style="position: relative;">
							{{accountInfo.guild_gain / 100}}
							<span style="position: absolute;left: 60%;"> — </span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							平台总提取:
						</div>
						<div class="userContent" style="position: relative;">
							{{accountInfo.gain / 100}}
							<span style="position: absolute;left: 60%;"> = </span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							平台收益:
						</div>
						<div class="userContent">
							{{accountInfo.balance / 100}}
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							平台收益:
						</div>
						<div class="userContent" style="position: relative;">
							{{accountInfo.balance / 100}}
							<span style="position: absolute;left: 60%;"> — </span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							钻石欠额:
						</div>
						<div class="userContent color2" style="position: relative;">
							{{accountInfo.loan_diamond / 100}}
							<span style="position: absolute;left: 60%;color: initial;"> — </span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							喵粮欠额:
						</div>
						<div class="userContent color2" style="position: relative;">
							{{accountInfo.loan_gain / 100}}
							<span style="position: absolute;left: 60%;color: initial;"> = </span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							平台盈利:
						</div>
						<div class="userContent color3">
							{{accountInfo.profit / 100}}
						</div>
					</div>
				</div>
				<div
					style="border-top: solid 1px #dcdcdc;display: inline-block;padding-top: 30px;margin-top: 30px;width: 100%;">
					<div class="userInfoItem text item">
						<div class="userTitle">
							喵粮总收入:
						</div>
						<div class="userContent">
							{{accountInfo.gain_income}}
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							喵粮总支出:
						</div>
						<div class="userContent">
							{{accountInfo.gain_pay}}
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							公会喵粮总收入:
						</div>
						<div class="userContent">
							{{accountInfo.guild_gain_income}}
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							公会喵粮总支出:
						</div>
						<div class="userContent">
							{{accountInfo.guild_gain_pay}}
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							钻石总收入:
						</div>
						<div class="userContent">
							{{accountInfo.diamond_income}}
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle">
							钻石总支出:
						</div>
						<div class="userContent">
							{{accountInfo.diamond_pay}}
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getRoomWallet
	} from '@/api/videoRoom'
	import moment from 'moment'
	export default {
		name: 'guild-main',
		components: {},
		data() {
			return {
				fullscreenLoading: false,
				accountInfo: {
					"recharge": "", //时间段内用户总充值，单位分
					"guild_gain": "", //时间段内公会总提取，单位分
					"gain": "", //时间段内用户面向平台总提取，单位分
					"gift": "", //时间段内平台礼物抽成，单位分
					"user_diamond": "", //用户账户内钻石总数
					"user_gain": "", //用户账户内喵粮总数
					"diamond_income": "", //时间段内用户钻石总收入
					"diamond_pay": "", //时间段内用户钻石总支出
					"gain_income": "", //时间段内用户喵粮总收入
					"gain_pay": "", //时间段内用户喵粮总支出
					"guild_gain_income": "", //时间段内公会喵粮总收入
					"guild_gain_pay": "", //时间段内公会喵粮总支出
					"balance": "", //平台时间段内收益
					"loan_diamond": "", //平台时间段内钻石欠额
					"loan_gain": "", //平台时间段内喵粮欠额
					"profit": "" //平台时间段内盈利
				},
				timer: ""
			}
		},
		created() {},
		mounted() {
			this.getRoomWalletInfo()
		},
		methods: {
			getRoomWalletInfo() {
				this.fullscreenLoading = true;
				var params = {
					'account': 'ling12345',
					'start_time': this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					'end_time': this.timer ? JSON.stringify(new Date(this.timer[1]).getTime() / 1000) : "",
				}
				getRoomWallet(params).then(res => {
					if (res.code == 2000) {
						this.accountInfo = res.data;
						setTimeout(() => {
						  this.fullscreenLoading = false;
						}, 500);
					}
				}).catch(err => {
					this.$message.error(err);
					this.fullscreenLoading = false;
				})
			},
			handleReply() {
				console.log("跳转申请入会")
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.el-icon-circle-close {
		color: #FFFFFF;
	}

	.color1 {
		color: #67C23A;
	}

	.color2 {
		color: #F56C6C;
	}

	.color3 {
		color: #409EFF;
	}

	.userInfoBox {
		display: flow-root;
		padding: 15px 0;

		.userInfoItem {
			line-height: 35px;
			width: 25%;
			float: left;

			.userTitle {
				padding-right: 10px;
				text-align: left;
			}

			.userContent {
				font-size: 30px;
				font-weight: bold;
			}
		}
	}

	.financeInfoTimer {
		margin-top: 25px;

		.userInfoBox {
			.userInfoItem {
				margin-bottom: 20px;

				.userTitle,
				.userContent {
					// text-align: center;
				}
			}
		}
	}
</style>
