<template>
	<div class="app-container">
		<el-card id="guildLevelRebatePage">
			<div class="levelHead">
				<div class="levelHeadItem fl">公会等级</div>
				<div class="levelHeadItem fl">公会返点配置</div>
			</div>
			<div class="levelCenter">
				<div class="levelCenterItem" v-for="item in configList">
					<div class="levelName fl"> {{item.name}} </div>
					<div class="levelSource fl">
						<div class="levelSourceHead">
							<div class="levelSourceHeadItem fl">流水区间</div>
							<div class="levelSourceHeadItem fl">固定返点</div>
							<div class="levelSourceHeadItem fl">周返点</div>
						</div>
						<div class="levelSourceCenter">
							<div class="levelSourceCenterItem" v-for="it in item.configSource">
								<div class="flowInterval fl">
									<el-input v-model="it.minNum" style="width:45%" placeholder="" /> ~
									<el-input v-model="it.maxNum" style="width:45%" placeholder="" />
								</div>
								<div class="fixedRebate fl">
									<el-input v-model="it.fixedRebate" style="width:90%" placeholder="固定返点" />
								</div>
								<div class="weeklyRebate fl">
									<el-input v-model="it.weeklyRebate" style="width:90%" placeholder="周返点" />
								</div>
							</div>
						</div>
						<div class="levelSourceFooter">
							<el-button class="fr" type="primary">修改</el-button>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getUserAddMoney
	} from '@/api/videoRoom'
	export default {
		name: 'guildLevelRebate',
		data() {
			return {
				configList: [{
						"id": 1,
						"name": "A",
						"configSource": [{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							},
							{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							},
							{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							}
						]
					},
					{
						"id": 2,
						"name": "AA",
						"configSource": [{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							},
							{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							},
							{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							}
						]
					},
					{
						"id": 3,
						"name": "AAA",
						"configSource": [{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							},
							{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							},
							{
								"minNum": 0,
								"maxNum": 0,
								"fixedRebate": 0,
								"weeklyRebate": 0,
							}
						]
					}
				],
				formLabelWidth: "120px",
				popForm: {},
				popFormRules: {}
			}
		},
		created() {},
		mounted() {},
		methods: {
			handleGive() {}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	#guildLevelRebatePage {
		.levelHead {
			height: 60px;
			line-height: 60px;
			display: flex;
			font-size: 20px;

			.levelHeadItem {
				border: solid 1px #DCDCDC;
				width: 30.1%;
				text-align: center;
			}

			.levelHeadItem:last-child {
				border-left: none;
				width: 69.9%;
			}
		}

		.levelCenter {
			border: solid 1px #DCDCDC;
			border-top: none;

			.levelCenterItem {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				width: 100%;
				border-bottom: solid 1px #DCDCDC;
				
				.levelName,
				.levelSource {
					width: 70%;
					border-left: solid 1px #DCDCDC;
					.levelSourceHead {
						height: 45px;
						line-height: 45px;

						.levelSourceHeadItem {
							width: 25%;
						}

						.levelSourceHeadItem:first-child {
							width: 50%;
						}
					}

					.levelSourceCenter {
						display: grid;

						.levelSourceCenterItem {
							margin-bottom: 10px;

							.flowInterval {
								width: 50%;
							}

							.fixedRebate {
								width: 25%
							}

							.weeklyRebate {
								width: 25%
							}
						}
					}

					.levelSourceFooter {
						display: flex;
						justify-content: end;
						margin: 10px;
					}
				}
				.levelName{
					font-size: 25px;
					font-weight: bold;
					width: 30%;
					border: none;
				}
			}
			.levelCenterItem:last-child{
				border-bottom: none;
			}
		}
	}
</style>
