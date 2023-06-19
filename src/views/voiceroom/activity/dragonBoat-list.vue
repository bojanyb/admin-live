<template>
	<div class="app-container">
		<menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
		<giftListPage ref="giftListPage" v-if="tabIndex == '0'"/>
		<exchangeRankPage ref="exchangeRankPage" v-if="tabIndex == '1'"/>
		<loveRankPage ref="loveRankPage" v-if="tabIndex == '2'"/>
		<heroicRankPage ref="heroicRankPage" v-if="tabIndex == '3'" />
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
		giftListPage: () => import("./components/dragonBoat/gift-list.vue"),
		exchangeRankPage: () => import("./components/dragonBoat/exchange-rank-list.vue"),
		loveRankPage: () => import("./components/dragonBoat/love-rank-list.vue"),
		heroicRankPage: () => import("./components/dragonBoat/heroic-rank-list.vue"),
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
					name: '兑换数据'
				},
				{
					id: 3,
					name: '浓情榜单排名'
				},
				{
					id: 4,
					name: '壕情榜单排名'
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

