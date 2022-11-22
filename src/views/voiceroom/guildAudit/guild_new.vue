<template>
	<div class="app-container new-price-box">
		<el-card>
			<div slot="header" class="clearfix">
				<div class="fl" style="height: 36px;line-height: 36px;"><span>萌新用户设置</span></div>
			</div>
			<div class="configItem" v-for="item in configList">
				<div class="configLable fl">{{item.kv_title}}</div>
				<div class="configSouce fl">
					<el-input :placeholder="'输入范围： 1 ~ ' + item.max " v-model="item.kv_value" v-input-limit="0">
						<template slot="append">
                            <span class="unit">{{ item.unit }}</span>
                        </template>
					</el-input>
				</div>
				<div class="configSave fl">
					<el-button type="primary" @click="saveGreetConfigFunc(item)">保 存</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { greetConfig, greetConfigSave } from '@/api/videoRoom'
	export default {
		name: 'guildNews',
		data() {
			return {
				configList: [
                    {
                        kv_title: '注册时间',
                        kv_value: 1,
                        unit: '天内',
						max: 30,
						key: 'new_user_filter_time'
                    },
                    {
                        kv_title: '财富等级',
                        kv_value: 1,
                        unit: '级内',
						max: 100,
						key: 'new_user_filter_level'
                    },
                    {
                        kv_title: '刷新间隔',
                        kv_value: 1,
                        unit: '分钟',
						max: 1440,
						key: 'new_user_refresh'
                    },
                ]
			}
		},
		methods: {
			// 获取萌新配置
			async getGreetConfigFunc() {
				let res = await greetConfig()
				if(res.code === 2000) {
					if(res.data) {
						for (const key in res.data) {
							this.configList.forEach(item => {
								if(item.key === res.data[key].kv_key) {
									item.kv_value = res.data[key].kv_value
									item.kv_id = res.data[key].kv_id
								}
							})
						}
					}
				}
			},

			// 设置萌新配置
			async saveGreetConfigFunc(row) {
				console.log("🚀 ~ file: guild_new.vue ~ line 75 ~ saveGreetConfigFunc ~ row", row)
				if(!row.kv_value) {
					this.$message.error('请设置' + row.kv_title)
					return false
				}
				if(row.kv_value > row.max || row.kv_value < 1){
					this.$message.error(row.kv_title + '设置范围为： 1 ~ ' + row.max)
					return
				}
				let params = {
					kv_id: row.kv_id,
					kv_value: Number(row.kv_value)
				}
				let res = await greetConfigSave(params)
				if(res.code === 2000) {
					this.$success('设置成功')
					this.getGreetConfigFunc()
				}
			},
		},
		mounted() {
			this.getGreetConfigFunc()
		}
	}
</script>

<style lang="scss">
.new-price-box {
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
