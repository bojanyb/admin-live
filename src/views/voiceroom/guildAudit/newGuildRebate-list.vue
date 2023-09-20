<template>
	<div class="guildAudit-guildRebate-list-box">
		<menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
		<component :ref="comp" :is="comp"></component>
	</div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入公会流水结算记录组件
import guildWeekWater from './guildRebates/guildWeekWater.vue'
// 引入公会流水结算记录组件
import guildMonthWater from './guildRebates/guildMonthWater.vue'
// 引入24小时房间奖励
import award from './guildRebates/award.vue'
// 引入公会评级奖励组件
import dynamic from './guildRebates/dynamic.vue'
// 引入拍一拍房间次数结算组件
import clapReward from './guildRebates/clapReward.vue'
// 引入拍一拍房间周奖励结算组件
import clapWeekReward from './guildRebates/clapWeekReward.vue'
export default {
	components: {
		guildWeekWater,
		guildMonthWater,
		award,
		menuComp,
		dynamic,
		clapReward,
		clapWeekReward
	},
	computed: {
		comp() {
			let compText = ""
			switch (this.tabIndex) {
				case '0': // 周流水
					compText = "guildWeekWater"
					break;
				case '1': // 公会周奖励结算
					compText = "dynamic"
					break;
				case '2': // 24小时房间奖励
					compText = "award"
					break;
				case '3': // 月奖励
					compText = "guildMonthWater"
					break;
				case '4': // 拍一拍房间次数结算
					compText = "clapReward"
					break;
				case '5': // 拍一拍房间周奖励结算
					compText = "clapWeekReward"
					break;
				default:
					break;
			}
			return compText
		}
	},
	data() {
		return {
			menuList: [
				{
					name: '派对公会周流水奖励结算'
				},
				{
					name: '派对公会类型周奖励'
				},
				{
					name: '派对公会24小时房间奖励结算'
				},
				{
					name: '派对公会月奖励结算'
				},
				{
					name: '派对公会拍一拍房间次数结算'
				},
				{
					name: '派对公会拍一拍房间周奖励结算'
				}
			],
			tabIndex: '0',
		};
	},
}
</script>

<style lang="scss">
.guildAudit-guildRebate-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
