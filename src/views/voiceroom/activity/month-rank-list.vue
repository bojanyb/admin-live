<template>
	<div class="app-container">
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
		<div class="searchParams">
        <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
    </div>
		<tableList :cfgs="cfgs" ref="tableList" :isHidePage="true" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>



	// 引入api
	import { getMonthStarRound } from '@/api/activity'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
  // 引入tab菜单组件
  import menuComp from '@/components/menuComp/index.vue'

	export default {
		mixins: [mixins],
		components: {
			tableList,
			SearchPanel,
      		menuComp
		},
		data() {
			return {
				menuList: [
					{
						name: '派对榜排名'
					},
					{
						name: '直播榜排名'
					},
					{
						name: '壕气榜榜单排名'
					}
				],
				tabIndex: '0',
				giftNameList: [], // 礼物名称
				poolList: [], // 轮次
				searchParams: {
					round : 1,
				}
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'round',
						type: 'select',
						value: '第1轮',
						keyName: 'round_number',
						optionLabel: 'title',
						label: '活动轮次',
						placeholder: '请选择',
						clearable: true,
            			linkage: true,
						options: this.poolList
					},
				]
			},
			cfgs() {
				let columnsList = [];
				let arr1 = [
						{
							label: '时间',
							width: '310px',
							render: (h, params) => {
								return h('span', params.row.start_time + " 至 " + params.row.end_time)
							}
						},
            			{
							label: '轮次',
							prop: 'round'
						},
            			{
							label: '榜单',
							prop: 'desc'
						},
						{
							label: '排名',
							prop: 'ranking'
						},
				];
				let arr2 = [
						{
							label: '用户ID',
							prop: 'user_number'
						},
						{
							label: '用户昵称',
							prop: 'nickname',
						}
				]
				let arr3 = [
						{
							label: '房间ID',
							prop: 'room_number'
						},
						{
							label: '房间昵称',
							prop: 'room_title',
						}
				]
				let arr4 = [
						{
							label: '礼物总价值',
							render: (h, params) => {
								return h('span', params.row.value)
							}
						}
				]
				let portName = "";
				if(Number(this.tabIndex) < 2){
					columnsList = arr1.concat(arr3).concat(arr4);
					portName = "getRoomRanking";
				}else{
					columnsList = arr1.concat(arr2).concat(arr4);
					portName = "getUserRanking";
				}
				return {
					vm: this,
					url: REQUEST.monthStar[portName],
					columns: columnsList
				}
			}
		},
		mounted(){
      		this.getRoundSource();
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				let params_new = {
					page: params.page,
					pagesize: params.size,
          			type: (Number(this.tabIndex) + 1),
					round: s.round ? s.round : 1
				}
				if(this.tabIndex < 2){
					params_new.room_category = this.tabIndex == 0 ? 2 :1;
				}
				return params_new
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// table 返回数据
			saleAmunt(row){
				// this.sumSource = row.data
			},
			// 获取轮数
			async getRoundSource() {
				let res = await getMonthStarRound();
				if(res.code == 2000){
					// 全部默认选择第一个
					this.searchParams.round = res.data.round[0].round_number;
					this.poolList = res.data.round;
				}
			},
			// 菜单切换
			tabChange() {
				this.$nextTick(res=>{
					this.searchParams.round = 1;
					if(this.$refs.tableList && this.tabIndex < 2) {
						this.$refs.tableList.getData()
					}
				})
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
		.el-card__body{
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



