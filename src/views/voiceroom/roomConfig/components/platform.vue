<template>
	<div class="app-container roomConfig-platform-box">
		<el-card>
			<div slot="header" class="clearfix">
				<div class="fl" style="height: 36px;line-height: 36px;"><span>热度配置</span></div>
			</div>
			<div class="configItem" v-for="item in configList">
				<div class="configLable fl">{{item.name}}</div>
				<div class="configSouce fl">
					<el-input placeholder="请输入返点比例" v-model="item[item.value]" v-input-limit="item.limit">
						<template slot="append" v-if="item.unit">
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
		roomHotSetting
	} from '@/api/house'
	export default {
		name: 'platform-rebate',
		data() {
			return {
				configList: [
                    {
                        name: '衰减系数',
                        value: 'room_hot_damp',
                        limit: 2
                    },
                    {
                        name: '人数热度',
                        value: 'room_hot_people',
                        limit: 0
                    }
                ]
			}
		},
		methods: {
			async handleConfigSave(row) {
                let params;
                if(row) {
                    params = {
                        [row.value]: row[row.value]
                    }
                } else {
                    params = {}
                }
                let res = await roomHotSetting(params)
                if(res.data) {
                    this.configList.forEach(item => {
                        for (const key in res.data) {
                            if(item.value === key) {
                                // item[item.value] = res.data[key]
                                this.$set(item, item.value, res.data[key])
                            }
                        }
                    })

                    console.log(this.configList, 'configList----------1010')
                }
			}
		},
        created() {
            this.handleConfigSave()
        }
	}
</script>

<style lang="scss">
.roomConfig-platform-box {
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
