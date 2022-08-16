<template>
	<div class="app-container moveDating-price-box">
		<el-card>
			<div slot="header" class="clearfix">
				<div class="fl" style="height: 36px;line-height: 36px;"><span>心动价格配置</span></div>
			</div>
			<div class="configItem" v-for="item in configList">
				<div class="configLable fl">{{item.name}}</div>
				<div class="configSouce fl">
					<el-input placeholder="请输入返点比例" v-model="item.value" v-input-limit="0">
						<template slot="append">
                            <span class="unit">{{ item.unit }}</span>
                        </template>
					</el-input>
				</div>
				<div class="configSave fl">
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
                        name: '通话时长',
                        value: null,
                        unit: ' 分 ',
						key: 'heartbeat_call_minute'
                    },
                    {
                        name: '通话价格',
                        value: null,
                        unit: '喵粮',
						key: 'heartbeat_call_price'
                    },
                    {
                        name: '折扣',
                        value: null,
                        unit: ' 折 ',
						key: 'heartbeat_call_discount_ratio'
                    },
                    {
                        name: '折扣次数',
                        value: null,
                        unit: '次',
						key: 'heartbeat_call_discount_count'
                    },
                    {
                        name: '收益比例',
                        value: null,
                        unit: '%',
						key: 'heartbeat_call_profit_ratio'
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
