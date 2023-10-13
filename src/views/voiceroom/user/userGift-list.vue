<template>
	<div class="app-container">
    <div class="model">
        <span>送礼人贡献值:{{ ruleForm.gift_flow || 0 }}</span>
        <span>收礼人流水额：{{ ruleForm.gift_dot || 0 }}</span>
    </div>
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
	</div>
</template>

<script>
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	export default {
		name: 'userGift-list',
		components: {
			tableList,
			SearchPanel
		},
		mixins: [mixins],
		computed: {
			forms() {
				return [
					// {
					// 	name: 'inputSelect',
					// 	value: '',
					// 	selectName: 'iSelect',
					// 	type: 'inputSelect',
					// 	placeholder: '请输入ID',
					// 	selectPlaceholder: '请选择',
					// 	selctValue: 'all',
					// 	selectWidth: '130px',
					// 	label: '交易查询',
					// 	noClear: true,
					// 	handler: {
					// 		change: (v) => {}
					// 	},
					// 	options: [
					// 		{ key: 'all', label: '全部' },
					// 		{ key: 'code', label: '送礼人ID' },
					// 		{ key: 'name', label: '收礼人ID' }
					// 	]
					// },
					{
						name: 'send_user_number',
						type: 'input',
						value: '',
						label: '送礼人ID',
						isNum: true,
						placeholder: '送礼人ID'
					},
					{
						name: 'reveive_user_number',
						type: 'input',
						value: '',
						label: '收礼人ID',
						isNum: true,
						placeholder: '收礼人ID'
					},
					{
						name: 'is_room',
						type: 'select',
						value: '',
						keyName: 'id',
						optionLabel: 'name',
						label: '类型',
						placeholder: '请选择',
						options: this.typeList
					},
					{
						name: 'dateTimeParams',
						type: 'datePicker',
						dateType: 'datetimerange',
						format: "yyyy-MM-dd HH:mm:ss",
						label: '时间选择',
						value: '',
						handler: {
							change: v => {
								this.emptyDateTime()
								this.setDateTime(v)
								this.getList()
							},
							selectChange: (v, key) => {
								this.emptyDateTime()
								this.getList()
							}
						}
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.deal.userFlow2,
					columns: [
						{
							label: '时间',
							minWidth: '130px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '送礼人ID',
							prop: 'send_user_number'
						},
						{
							label: '收礼人ID',
							prop: 'reveive_user_number'
						},
						{
							label: '礼物来源',
							render: (h, params) => {
                return h('span',
                  +params.row.room_category === 0 ? '私聊' :
                  +params.row.room_category === 1 ? '直播房间' :
                  +params.row.room_category === 2 ? '派对房间' : '无'
                )
							}
						},
						{
							label: '礼物名称',
							prop: 'gift_name'
						},
						{
							label: '数量',
							prop: 'gift_num'
						},
						{
							label: '喵粮',
							prop: 'amount'
						},
						{
							label: '交易流水号',
							minWidth: '150px',
							prop: 'relation_trade_no'
						},
            {
							label: '送礼人IP',
							render: (h, params) => {
								return h('span', params.row.send_ip || '无')
							}
						},
            {
							label: '收礼人IP',
							render: (h, params) => {
								return h('span', params.row.receive_ip || '无')
							}
						}
					]
				}
			}
		},
		data() {
			return {
				typeList: [
					{
						id: 0,
						name: '全部'
					},
					{
						id: 1,
						name: '派对房间'
					},
					{
						id: 3,
						name: '直播房间'
					},
					{
						id: 2,
						name: '私聊'
          }
				],
				id: null,
				searchParams: {
					dateTimeParams: []
				},
				dateTimeParams: {
					start_time: null,
					end_time: null
				},
        ruleForm: {
          total_amount: 0
        }
			}
		},
		methods: {
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				// if(s.inputSelect) {
				// 	s.live_user_number = s.inputSelect
				// 	s.user_number = s.inputSelect
				// 	if(s.iSelect == 'code') {
				// 		delete s.live_user_number
				// 	} else if(s.iSelect == 'name') {
				// 		delete s.user_number
				// 	}
				// }
				return {
					page: params.page,
					pagesize: params.size,
					reveive_user_number: s.reveive_user_number || '',
					send_user_number: s.send_user_number || '',
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
					end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
					is_room: s.is_room
				}
			},
			// 重置
			reset() {
				this.changeIndex();
				this.searchParams = {
					iSelect: 'all',
					inputSelect: ''
				}
				// this.dateTimeParams = {}
				this.getList()
			},
      // 列表返回数据
			saleAmunt(row) {
				this.ruleForm = { ...row }
        let time = JSON.parse(JSON.stringify(this.dateTimeParams));
        this.$set(this.searchParams, 'dateTimeParams', [time.start_time,time.end_time]);
			},
			// 查询
			onSearch() {
				this.getList()
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
			// 更改日期
			changeIndex() {
        const currentTimestamp = Date.now();
        const oneHourAgoTimestamp = currentTimestamp - 3600000;

				let time = [oneHourAgoTimestamp, currentTimestamp];
				this.searchParams.dateTimeParams = time;
				this.dateTimeParams.start_time = time[0];
				this.dateTimeParams.end_time = time[1];
			},
		},
		created() {
      this.changeIndex();
		}
	}
</script>
<style lang="sass" scoped>
.app-container
  .model
    width: 100%
    height: 40px
    background: rgba(0,0,0,0.8)
    display: flex
    align-items: center
    padding: 0px 30px
    box-sizing: border-box
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15)
    margin-bottom: 20px
    >span
      font-size: 15px
      color: #fff
      margin-right: 120px
</style>
