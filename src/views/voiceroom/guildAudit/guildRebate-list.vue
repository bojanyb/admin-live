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
import guildWater from './guildRebates/guildWater.vue'
// 引入24小时房间奖励
import award from './guildRebates/award.vue'
// 引入公会评级奖励组件
import dynamic from './guildRebates/dynamic.vue'
export default {
	components: {
		guildWater,
		award,
		menuComp,
		dynamic
	},
	computed: {
		comp() {
			if(this.tabIndex === '0') {
				return 'guildWater'
			} else if(this.tabIndex === '1') {
				return 'award'
			} else {
				return 'dynamic'
			}
		}
	},
	data() {
		return {
			menuList: [
				{
					name: '公会流水结算记录'
				},
				{
					name: '24小时房间奖励'
				},
				// {
				// 	name: '公会评级奖励'
				// }
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