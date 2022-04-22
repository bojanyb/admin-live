<template>
	<div class="app-container">
		<el-card>
			<div slot="header" class="clearfix">
				<div class="fl" style="height: 36px;line-height: 36px;"><span>平台返点配置</span></div>
			</div>
			<div class="configItem" v-for="item in configList">
				<div class="configLable fl">{{item.remark}}</div>
				<div class="configSouce fl">
					<el-input placeholder="请输入返点比例" v-model="item.value" v-input-limit="0">
						<template slot="append">%</template>
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
					this.configList = res.data.config;
					this.loading = false;
				}).catch(err => {
					this.$message.error(err);
					this.loading = false;
				})
			},
			handleConfigSave(row) {
				if(row.value < 1 || row.value > 100){
					this.$message.error(row.remark + "范围为1%~100%");
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
			width: 120px;
			text-align: right;
		}

		.configSave {
			margin-left: 15px;
		}
	}
</style>
