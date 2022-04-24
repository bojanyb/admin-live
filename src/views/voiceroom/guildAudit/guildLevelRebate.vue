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
									<el-input v-model="it.start" style="width:45%" v-input-limit="0" /> ~
									<el-input v-model="it.end" style="width:45%" v-input-limit="0" />
								</div>
								<div class="fixedRebate fl">
									<el-input v-model="it.rebate" disabled style="width:90%" placeholder="固定返点" v-input-limit="0" />
								</div>
								<div class="weeklyRebate fl">
									<el-input v-model="it.week_rebate" style="width:90%" placeholder="周返点" v-input-limit="0" />
								</div>
							</div>
						</div>
						<div class="levelSourceFooter">
							<el-button class="fr" type="primary" @click="handleChange(item)">修改</el-button>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getUserRebateConfig,
		getUserConfigRebate
	} from '@/api/videoRoom'
	export default {
		name: 'guildLevelRebate',
		data() {
			return {
				configList: [{
						"id": 1,
						"name": "A",
						"configSource": [{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
							{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
						]
					},
					{
						"id": 2,
						"name": "AA",
						"configSource": [{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
							{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
							{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
						]
					},
					{
						"id": 3,
						"name": "AAA",
						"configSource": [{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
							{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
							{
								"start": 0,
								"end": 0,
								"rebate": 0,
								"week_rebate": 0,
							},
						]
					}
				],
				formLabelWidth: "120px",
				popForm: {},
				popFormRules: {}
			}
		},
		created() {
			this.getUserRebateConfigSource();
		},
		mounted() {},
		methods: {
			getUserRebateConfigSource() {
				this.configList = [];
				getUserRebateConfig().then(res => {
					for (let i in res.data) {
						if (res.data[i]) {
							let source = {
								"name": i,
								"configSource": res.data[i]
							}
							this.configList.push(source);
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			handleChange(row) {
				
				let isReturn = false;
				row.configSource.map(res=>{
					if(res.rebate > 100){
						this.$message.error("固定返点 取值范围为1~100");
						isReturn = true;
						return
					}
					if(res.week_rebate > 100){
						this.$message.error("周返点 取值范围为1~100");
						isReturn = true;
						return
					}
				})
				
				if(isReturn == true){
					return
				}
				var params = {
					config: row.configSource
				}
				getUserConfigRebate(params).then(res => {
					this.$message.success("等级 " + row.name + " 修改成功");
					this.getUserRebateConfigSource();
				}).catch(err => {
					this.$message.error(err);
				})

			},
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

				.levelName {
					font-size: 25px;
					font-weight: bold;
					width: 30%;
					border: none;
				}
			}

			.levelCenterItem:last-child {
				border-bottom: none;
			}
		}
	}
</style>
