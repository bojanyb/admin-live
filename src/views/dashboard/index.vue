<!-- 总览 -->
<template>
	<div class="app-container">
		<el-card class="financeInfoTimer">
			<div class="userInfoBox" v-loading.fullscreen.lock="fullscreenLoading">
				<div class="dataBox">
					<span>选择时间: </span>
					<el-date-picker class="selectTime" v-model="timer" type="datetimerange" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="getRoomWalletInfo" />
				</div>

				<div class="all-box" style="clear: both;">
					<div class="userInfoItem text item" >
						<div class="userTitle fl">
							钻石总数:
						</div>
						<div class="userContent fl">
							{{accountInfo.total_diamond || 0}} <span class="unitText">钻石</span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle fl">
							喵粮总数:
						</div>
						<div class="userContent fl">
							{{accountInfo.total_gain || 0}} <span class="unitText">喵粮</span>
						</div>
					</div>
					<div class="userInfoItem text item">
						<div class="userTitle fl">
							总数:
						</div>
						<div class="userContent fl">
							{{Number(accountInfo.total_gain) + Number(accountInfo.total_diamond) || 0}}
						</div>
					</div>
				</div>
				<!-- <div class="userInfoItem text item">
					<div class="userTitle fl">
						提现中数量:
					</div>
					<div class="userContent fl">
						{{accountInfo.cashing || 0}} <span class="unitText">喵粮</span> 
					</div>
				</div> -->
				
				<div class="all-water-box">
					<div style="clear: both;">
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								活动总流水:
							</div>
							<div class="userContent fl">
								{{accountInfo.ac_in || 0}}
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								背包总价值:
							</div>
							<div class="userContent fl">
								{{accountInfo.ac_out || 0}}
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								消费总流水:
							</div>
							<div class="userContent fl">
								{{accountInfo.buy_goods || 0}}
							</div>
						</div>
					</div>
				</div>
				<div class="all-recharge-box" style="padding-bottom: 30px;">
					<div style="clear: both;">
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								礼物总流水:
							</div>
							<div class="userContent fl">
								{{accountInfo.gift_total || 0}} 
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								平台总分成:
							</div>
							<div class="userContent fl">
								{{accountInfo.commission || 0}}
							</div>
						</div>
					</div>
					
				</div>
				
				<div class="all-recharge-box">
					<div style="clear:both;">
						<div class="userInfoItem text item">            
							<div class="userTitle fl">
								充值总数:
							</div>
							<div class="userContent fl">
								{{accountInfo.total_in || 0}} <span class="unitText">钻石</span>
							</div>
						</div>
					</div>
					<div style="clear:both;">
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								提现中数量:
							</div>
							<div class="userContent fl">
								{{accountInfo.cashing || 0}} <span class="unitText">喵粮</span> 
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								提现总数:
							</div>
							<div class="userContent fl">
								{{accountInfo.total_cash || 0}} <span class="unitText">喵粮</span>
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								手续费:
							</div>
							<div class="userContent fl">
								{{accountInfo.total_rate || 0}} <span class="unitText">喵粮</span>
							</div>
						</div>
					</div>
				</div>

				<div class="give-box">
					<div style="clear:both;">
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								赠送钻石:
							</div>
							<div class="userContent fl">
								{{accountInfo.incDiamond || 0}} <span class="unitText">钻石</span>
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								赠送喵粮:
							</div>
							<div class="userContent fl">
								{{accountInfo.incGain || 0}} <span class="unitText">喵粮</span>
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								赠送总数:
							</div>
							<div class="userContent fl">
								{{Number(accountInfo.incGain) + Number(accountInfo.incDiamond) || 0}}
							</div>
						</div>
					</div>
					<div style="clear:both;">
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								扣除钻石:
							</div>
							<div class="userContent fl">
								{{accountInfo.decDiamond || 0}} <span class="unitText">钻石</span>
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								扣除喵粮:
							</div>
							<div class="userContent fl">
								{{accountInfo.decGain || 0}} <span class="unitText">喵粮</span>
							</div>
						</div>
						<div class="userInfoItem text item">
							<div class="userTitle fl">
								扣除总数:
							</div>
							<div class="userContent fl">
								{{Number(accountInfo.decGain) + Number(accountInfo.decDiamond) || 0}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		overview
	} from '@/api/videoRoom'
	export default {
		name: 'guild-main',
		components: {},
		data() {
			return {
				fullscreenLoading: false,
				accountInfo: {
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
				timer: "",
				pickerOptions: {
					shortcuts: [{
						text: '今天',
						onClick(picker) {
						let data = new Date()
						let y = data.getFullYear()
						let m = data.getMonth()
						let day = data.getDate()
						if(m + 1 <= 12) {
							m = m + 1
						} else {
							m = 1
						}
						let start = y + '-' + m + '-' + day + ' 00:00:00'
						let end = y + '-' + m + '-' + day + ' 23:59:59'
						picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三天',
						onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
						picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近七天',
						onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近十五天',
						onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
						picker.$emit('pick', [start, end]);
						}
					}]
				},
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
					'start_time': this.timer ? JSON.stringify(new Date(this.timer[0]).getTime() / 1000) : "",
					'end_time': this.timer ? JSON.stringify(new Date(this.timer[1]).getTime() / 1000) : "",
				}
				overview(params).then(res => {
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
	.unitText{
		font-size: initial;
		font-weight: initial;
	}

	.give-box {
		border-top: 1px solid #DCDCDC;
		padding-top: 40px;
		box-sizing: border-box;
		height: 100px;
		clear: both;
	}

	.userInfoBox {
		display: flow-root;
		padding: 15px 0;

		.userInfoItem {
			line-height: 35px;
			width: 33.33%;
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

	.all-box {
		border-bottom: 1px solid #dcdcdc;
		height: 70px;
		// box-shadow: 0px 0px 3px 0px rgba(0,0,0,1);
	}

	.all-water-box {
		// margin-top: 30px;
		// border-top: solid 1px #dcdcdc;
		padding: 30px 0px;
		box-sizing: border-box;
	}

	.all-recharge-box {
		margin-top: 30px;
		border-top: solid 1px #dcdcdc;
		padding-top: 30px;
		box-sizing: border-box;
	}

	.dataBox {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		border-bottom: solid 1px #dcdcdc;
		padding-bottom: 30px;
		margin-bottom: 30px;
		box-sizing: border-box;
		>span {
			margin-right: 10px;
		}
	}
</style>
