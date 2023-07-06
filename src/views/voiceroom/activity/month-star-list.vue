<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
		<el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
			<div class="box-card-inner">
				<div>送礼人数：{{sumSource.user_count || 0}}人</div>
				<div>收礼人数：{{sumSource.live_user_count || 0}}人</div>
				<div>派对房间收礼金额：{{sumSource.party_gift_diamond_total || 0}}钻石</div>
				<div>直播房间收礼金额：{{sumSource.live_gift_diamond_total || 0}}钻石</div>
				<div>送礼总金额：{{sumSource.all_gift_diamond_total || 0}}钻石</div>
			</div>
		</el-card>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
	// 引入api
	import { getMonthStarGift,getMonthStarRound } from '@/api/activity'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'

	export default {
		mixins: [mixins],
		components: {
			tableList,
			SearchPanel,
		},
		data() {
			return {
				giftNameList: [], // 礼物名称
				poolList: [], // 轮次
				sumSource: {
					user_count : 0,
					live_user_count : 0,
					party_gift_diamond_total : 0,
					live_gift_diamond_total : 0,
					all_gift_diamond_total : 0
				},
				roomTypeList: [
					{
						id: 0,
						name: "全部"
					},
					{
						id: 1,
						name: "直播"
					},
					{
						id: 2,
						name: "派对"
					}
				],
				searchParams: {
					round: 1
				}
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '送礼人ID',
						isNum: true,
            			linkage: true,
						placeholder: '请输入送礼人ID'
					},
					{
						name: 'live_user_number',
						type: 'input',
						value: '',
						label: '收礼人ID',
            			linkage: true,
						placeholder: '请输入收礼人ID'
					},
					{
						name: 'room_number',
						type: 'input',
						value: '',
						label: '房间ID',
            			linkage: true,
						placeholder: '请输入房间ID'
					},
					{
						name: 'gift_id',
						type: 'select',
						value: "全部",
						keyName: 'gift_id',
						optionLabel: 'gift_name',
						label: '礼物名称',
						placeholder: '请选择',
						options: this.giftNameList,
					},
					{
						name: 'room_category',
						type: 'select',
						value: "全部",
						keyName: 'id',
						optionLabel: 'name',
						label: '房间类型',
						placeholder: '请选择',
						options: this.roomTypeList,
					},
					{
						name: 'round',
						type: 'select',
						value: '全部',
						keyName: 'round_number',
						optionLabel: 'title',
						label: '活动轮次',
						placeholder: '请选择',
						clearable: true,
            			linkage: true,
						options: this.poolList
					},
					{
						name: 'dateTimeParams',
						type: 'datePicker',
						dateType: 'datetimerange',
						format: "yyyy-MM-dd HH:mm:ss",
						label: '时间选择',
						value: '',
            			linkage: true,
						handler: {
							change: v => {
								this.emptyDateTime()
								this.setDateTime(v)
							},
							selectChange: (v, key) => {
								this.emptyDateTime()
							}
						}
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.monthStar.giftLog,
					columns: [
						{
							label: '时间',
							width: '180px',
							prop: 'create_time'
						},
						{
							label: '房间类型',
							prop: 'room_category',
							render: (h, params) => {
								let roomName =  "";
								switch (params.row.room_category) {
									case 1:
									roomName =  "直播";
										break;
									case 2:
									roomName =  "派对";
										break;
								}
								return h('span', roomName || '--')
							}
						},
						{
							label: '房间ID',
							prop: 'room_number'
						},
            			{
							label: '活动轮次',
							prop: 'round'
						},
						{
							label: '送礼人ID',
							prop: 'user_number'
						},
						{
							label: '送礼人昵称',
							showOverFlow: true,
							prop: 'nickname',
						},
            			{
							label: '收礼人ID',
							prop: 'live_user_number'
						},
						{
							label: '收礼人昵称',
							showOverFlow: true,
							prop: 'live_nickname',
						},
						{
							label: '礼物名称',
							showOverFlow: true,
							prop: 'gift_name',
						},
						{
							label: '礼物数量',
							prop: 'gift_num',
						},
						{
							label: '礼物单价',
							prop: 'gift_diamond',
						},
						{
							label: '礼物总价值',
							render: (h, params) => {
								return h('span', params.row.gift_diamond * params.row.gift_num)
							}
						}
					]
				}
			}
		},
		mounted(){
			this.getPoolNameSource();
      		this.getRoundSource();
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params.page,
					pagesize: params.size,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
          			end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
					round: s.round ? s.round : 1,
					user_number: s.user_number,
          			live_user_number: s.live_user_number,
					room_number: s.room_number,
					room_category: (s.room_category == -1 || s.room_category == "全部") ? "" : s.room_category,
					gift_id: (s.gift_id == -1 || s.gift_id == "全部") ? "" : s.gift_id,
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 设置时间段
			setDateTime(arr) {
				const date = arr ? {
					start_time: arr[0],
					end_time: arr[1]
				} : {}
				this.$set(this, 'dateTimeParams', date)
			},
			// 清空日期选择
			emptyDateTime() {
				this.dateTimeParams = {}
			},
			// 重置
			reset() {
				this.searchParams = {}
				this.dateTimeParams = {}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// table 返回数据
			saleAmunt(row){
				this.sumSource = row.data
			},
			// 获取礼物名称
			async getPoolNameSource() {
				let res = await getMonthStarGift();
				if(res.code == 2000){
					this.giftNameList = res.data.list;
          			let all = {gift_id: 0, gift_name: "全部"}
					this.giftNameList.unshift(all)
				}
			},
			// 获取轮数
			async getRoundSource() {
				let res = await getMonthStarRound();
				if(res.code == 2000){
					// 全部默认选择第一个
					this.searchParams.round = res.data.round[0].round_number;
					this.poolList = res.data.round;
				}
			}
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



