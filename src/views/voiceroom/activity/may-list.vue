<template>
	<div class="app-container">
		<menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
		<giftListPage ref="giftListPage" v-if="tabIndex == '0'"/>
		<cpRankPage ref="cpRankPage" v-if="tabIndex == '1'"/>
		<loveTreePage ref="loveTreePage" v-if="tabIndex == '2'"/>
		<cpBindPage ref="cpBindPage" v-if="tabIndex == '3'" />
	</div>
</template>

<script>
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'

export default {
	mixins: [mixins],
	components: {
		menuComp,
		giftListPage: () => import("./components/mayComp/gift-list.vue"),
		cpRankPage: () => import("./components/mayComp/cp-rank-list.vue"),
		loveTreePage: () => import("./components/mayComp/love-tree-list.vue"),
		cpBindPage: () => import("./components/mayComp/cp-bind-list.vue"),
	},
	data() {
		return {
			menuList: [
				{
					id: 1,
					name: '礼物数据'
				},
				{
					id: 2,
					name: 'CP排行榜'
				},
				{
					id: 3,
					name: '爱情树抽奖数据'
				},
				{
					id: 4,
					name: '绑定CP记录'
				}
			],
			tabIndex: '0',
		}
	},
	computed: {},
	mounted() {},
	methods: {
		// 菜单切换
		tabChange() {
			if (this.$refs.tableList) {
				this.$refs.tableList.getData()
			}
		},
	}
}
</script>
<style lang="scss">
.el-icon-circle-close {
	color: #FFFFFF;
}

.box-card {
	width: 100%;
	height: 40px;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	padding: 0px 30px;
	box-sizing: border-box;
	margin-bottom: 20px;

	.el-card__body {
		width: 100%;
		padding: 0;

		.box-card-inner {
			display: flex;
			justify-content: space-around;

			div {
				font-size: 15px;
				color: #ffffff;
			}
		}
	}
}
</style>

