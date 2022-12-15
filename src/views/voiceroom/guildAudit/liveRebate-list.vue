<template>
	<div class="guildAudit-guildRebate-list-box">
		<menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
		<component :ref="comp" :is="comp"></component>
	</div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入直播公会流水结算记录组件
import guildWeekWater from './liveRebate/guildWeekWater.vue'
// 引入直播公会流水结算记录组件
import guildMonthWater from './liveRebate/guildMonthWater.vue'
// 引入直播公会评级奖励组件
import dynamic from './liveRebate/dynamic.vue'
export default {
	components: {
		guildWeekWater,
		guildMonthWater,
		menuComp,
		dynamic
	},
	computed: {
		comp() {
			let compText= ""
			switch (this.tabIndex) {
				case '0': // 周流水
					compText= "guildWeekWater"
					break;
				case '1': // 公会周奖励结算
					compText= "dynamic"
					break;
				case '2': // 月奖励
					compText= "guildMonthWater"
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
					name: '直播公会周流水结算'
				},
				{
					name: '直播公会周流水奖励'
				},
				{
					name: '直播公会月流水奖励'
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