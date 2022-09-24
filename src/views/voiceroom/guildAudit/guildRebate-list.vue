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
export default {
	components: {
		guildWater,
		award,
		menuComp
	},
	computed: {
		comp() {
			return this.tabIndex === '0' ? 'guildWater' : 'award'
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