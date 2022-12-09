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
// 引入公会直播列表组件
import guildLiveComp from './components/guild-liveComp.vue'
// 引入公会申请列表组件
import guildListApplyComp from './components/guild-list-applyComp.vue'
export default {
	components: {
		menuComp,
		guildListComp,
		guildListApplyComp,
    guildLiveComp
	},
	data() {
		return {
			menuList: [
                {
                    // name: '公会列表'
                    name: '派对公会'
                },
                {
                    name: '直播公会'
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
      let nav = ""
      switch (this.tabIndex) {
        case "0":
        nav = "guildListComp"
          break;
        case "1":
        nav = "guildLiveComp"
          break;
        case "2":
        nav = "guildListApplyComp"
          break;
        default:
          break;
      }
			return nav
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