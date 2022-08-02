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
				configList: [
                    {
                        name: '通话时长',
                        value: null,
                        unit: ' 分 '
                    },
                    {
                        name: '通话价格',
                        value: null,
                        unit: '喵粮'
                    },
                    {
                        name: '折扣',
                        value: null,
                        unit: ' 折 '
                    },
                    {
                        name: '折扣次数',
                        value: null,
                        unit: '次'
                    },
                    {
                        name: '收益比例',
                        value: null,
                        unit: '%'
                    }
                ]
			}
		},
		methods: {
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
