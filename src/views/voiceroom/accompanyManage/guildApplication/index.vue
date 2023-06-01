<template>
	<div class="guildAudit-guildRebate-list-box">
		<!-- <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp> -->
		<component :ref="comp" :is="comp"></component>
	</div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 公会房间组件
import guildRoom from './components/guild-room.vue'
// 公会房间申请组件
import guildApply  from './components/guild-apply.vue'

export default {
	components: {
		menuComp,
		guildRoom,
		guildApply
	},
	computed: {
		comp() {
			let compText= ""
			switch (this.tabIndex) {
				case '0': // 公会房间
					compText= "guildRoom"
					break;
				case '1': // 公会房间申请
					compText= "guildApply"
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
					name: '公会房间'
				},
				{
					name: '公会房间申请列表'
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
