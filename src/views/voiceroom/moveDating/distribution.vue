<template>
	<div class="app-container moveDating-price-box">
		<el-card>
			<div slot="header">分成配置<span class="text-red">（私密房间除畅聊卡以外其他礼物的分成配置）</span></div>
			<div class="configItem" v-for="item in configList">
				<div class="configLable">{{item.name}}</div>
				<div class="configSouce">
					<el-input placeholder="请输入返点比例" v-model="item.value" v-input-limit="0">
						<template slot="append">
                            <span class="unit">{{ item.unit }}</span>
                        </template>
					</el-input>
				</div>
				<div class="configSave">
					<el-button type="primary" @click="saveCardConfigFunc(item)">保 存</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { getCardConfig, saveCardConfig } from '@/api/moveDating'
	export default {
		name: 'platform-rebate',
		data() {
			return {
				configList: [
                    {
                        name: '公会主播',
                        value: null,
                        unit: '%',
						key: 'heartbeat_call_minute'
                    },
                    {
                        name: '公会长实时返点',
                        value: null,
                        unit: '%',
						key: 'heartbeat_call_price'
                    },
                    {
                        name: '无公会主播',
                        value: null,
                        unit: '%',
						key: 'heartbeat_call_discount_ratio'
                    }
                ]
			}
		},
		methods: {
			// 获取配置
			async getCardConfigFunc() {
				let res = await getCardConfig()
				if(res.code === 2000) {
					if(res.data.config) {
						for (const key in res.data.config) {
							this.configList.forEach(item => {
								if(item.key === key) {
									item.value = res.data.config[key]
								}
							})
						}
					}
				}
			},

			// 设置心动配置
			async saveCardConfigFunc(row) {
				if(!row.value) {
					this.$message.error('请设置' + row.name)
					return false
				}
				let params = {
					key: row.key,
					value: row.value
				}
				let res = await saveCardConfig(params)
				if(res.code === 2000) {
					this.$success('设置成功')
					this.getCardConfigFunc()
				}
			}
		},
		mounted() {
			this.getCardConfigFunc()
		}
	}
</script>

<style lang="scss">
.moveDating-price-box {
	.text-red {
		color: #ff4949;
	}
    .configItem {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		.configLable {
			margin-right: 15px;
			width: 120px;
			text-align: right;
		}
		.configSave {
			margin-left: 15px;
		}
        .unit {
            display: flex;
            width: 30px;
            justify-content: center;
            align-items: center;
        }
	}
}
</style>
