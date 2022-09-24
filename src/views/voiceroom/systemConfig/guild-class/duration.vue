<template>
	<div class="systemConfig-guild-class-duration-box">
		<el-card>
			<div slot="header" class="clearfix">
				<div class="fl" style="height: 36px;line-height: 36px;"><span>时长奖励配置</span></div>
			</div>
			<div class="configItem" v-for="item in configList">
				<div class="configLable fl">{{item.remark}}</div>
				<div class="configSouce fl">
					<el-input placeholder="请输入返点比例" v-model="item.value" v-input-limit="0">
						<template slot="append" v-if="item.key === 'guild_week_online_reward_online'">小时</template>
						<template slot="append" v-if="item.key === 'guild_week_online_reward_flow'">砖石</template>
						<template slot="append" v-if="item.key === 'guild_week_online_reward_reward'">喵粮</template>
					</el-input>
				</div>
				<div class="configSave fl">
					<el-button type="primary" @click="handleConfigSave(item)">保 存</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {
		getSyetermConfig,
		getSyetermConfigSave
	} from '@/api/videoRoom'
	export default {
		name: 'platform-rebate',
		data() {
			return {
				loading: false,
				formLabelWidth: "120px",
				configList: []
			}
		},
		created() {},
		mounted() {
			this.getSyetermConfigSource();
		},
		methods: {
			getSyetermConfigSource() {
				this.loading = true;
				getSyetermConfig().then(res => {
                    let arr = []
                    let arr1 = ['guild_week_online_reward_online', 'guild_week_online_reward_flow', 'guild_week_online_reward_reward']
                    if(res.data.config && res.data.config.length > 0) {
                        res.data.config.forEach(item => {
                            arr1.forEach(a => {
                                if(item.key === a) {
                                    arr.push(item)
                                }
                            })
                        })
                    }
					this.configList = arr;
					this.loading = false;
				}).catch(err => {
					this.$message.error(err);
					this.loading = false;
				})
			},
			handleConfigSave(row) {
				if(!row.value){
					this.$warning('请输入' + row.remark);
					return
				}
				var params = {
					"key" : row.key,
					"value": row.value
				}
				getSyetermConfigSave(params).then(res=>{
					this.$message.success(row.remark +" 修改成功");
					this.getSyetermConfigSource();
				}).catch(err=>{
					this.$message.error(err);
				})
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
	.configItem {
		display: flex;
		align-items: center;
		// justify-content: center;
		margin-bottom: 20px;

		.configLable {
			margin-right: 15px;
			width: 160px;
			text-align: right;
		}

		.configSave {
			margin-left: 15px;
		}
	}
</style>
