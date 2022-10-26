<template>
	<div class="guild-list-box">
		<menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
		<component :is="comp"></component>
	</div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入公会列表组件
import guildListComp from './components/guild-listComp.vue'
// 引入公会申请列表组件
import guildListApplyComp from './components/guild-list-applyComp.vue'
export default {
	components: {
		menuComp,
		guildListComp,
		guildListApplyComp
	},
	data() {
		return {
			menuList: [
                {
                    name: '公会列表'
                },
                {
                    name: '公会申请列表'
                }
            ],
			tabIndex: '0',
		};
	},
	computed: {
		comp() {
			return this.tabIndex === '0' ? 'guildListComp' : 'guildListApplyComp'
		}
	}
}
</script>

<style lang="scss" scoped>
.guild-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>