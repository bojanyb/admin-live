<template>
	<div class="app-container userTurnover-list-box">
		<div class="model">
            <span>收礼人数：{{ ruleForm.user_count || 0 }}人</span>
            <span>选择时间内总金额：{{ ruleForm.total_amount || 0 }}喵粮</span>
        </div>
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
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
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	export default {
		name: 'userTurnover-list',
		components: {
			tableList,
			SearchPanel
		},
		mixins: [mixins],
		computed: {
			forms() {
				return [
					{
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会ID',
						isNum: true,
						placeholder: '请输入公会ID'
					},
					{
						name: 'room_number',
						type: 'input',
						value: '',
						label: '派对ID',
						isNum: true,
						placeholder: '请输入派对ID'
					},
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '收礼人ID',
						isNum: true,
						placeholder: '请输入收礼人ID'
					},
					{
						name: 'source',
						type: 'select',
						value: 0,
						keyName: 'value',
						optionLabel: 'name',
						label: '类型',
						placeholder: '请选择',
						options: MAPDATA.DEALSOURCETYPELIST
					},
					{
						name: 'flow_type',
						type: 'select',
						value: 0,
						keyName: 'id',
						optionLabel: 'name',
						label: '来源',
						placeholder: '请选择',
						options: MAPDATA.DEALSOURCELIST
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
					url: REQUEST.deal.userFlow1,
					columns: [
						{
							label: '时间',
							minWidth: '130px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '交易流水号',
							minWidth: '150px',
							prop: 'relation_trade_no'
						},
						{
							label: '收礼ID',
							prop: 'live_user_number'
						},
						{
							label: '派对ID',
							render: (h, params) => {
								return h('span', params.row.room_number || '无')
							}
						},
						{
							label: '公会ID',
							render: (h, params) => {
								return h('span', params.row.guild_number || '无')
							}
						},
						{
							label: '类型',
							render: (h, params) => {
								let data = MAPDATA.DEALSOURCETYPELIST.find(item => { return item.value === params.row.source })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '来源',
							render: (h, params) => {
								let data = MAPDATA.DEALSOURCELIST.find(item => { return item.value === params.row.flow_type })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '金额',
							prop: 'amount'
						}
					]
				}
			}
		},
		data() {
			return {
				ruleForm: {},
				searchParams: {
					dateTimeParams: [],
					flow_type: 0
				},
				dateTimeParams: {
					start_time: null,
					end_time: null
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
				return {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number,
					room_number: s.room_number,
					user_number: s.user_number,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
					end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
					flow_type: s.flow_type,
					source: s.source
				}
			},
			// 重置
			reset() {
				this.changeIndex(0)
				this.searchParams = {
					flow_type: 0
				}
				// this.dateTimeParams = {}
				this.getList()
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
			// 列表返回数据
			saleAmunt(row) {
				this.ruleForm = { ...row }
			},
			// 更改日期
			changeIndex(index) {
				let date = new Date()
				let now, now1, start, end;
				switch (index) {
					case 0:
						now1 = timeFormat(date, 'YYYY-MM-DD', false)
						now = timeFormat(date, 'YYYY-MM-DD', false)
						break;
					case 1:
						now1 = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
						now = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
						break;
					case 2:
						now1 = timeFormat(date, 'YYYY-MM-DD', false)
						now = timeFormat(date - 3600 * 1000 * 24 * 6, 'YYYY-MM-DD', false)
						break;
				}
				start = new Date(now + ' 00:00:00')
				if( index == 0) {
					end = new Date(timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false))
				} else {
					end = new Date(now1 + ' 23:59:59')
				}

				let time = [start.getTime(), end.getTime()]
				this.searchParams.dateTimeParams = time
				this.dateTimeParams.start_time = time[0]
				this.dateTimeParams.end_time = time[1]
			}
		},
		created() {
			this.changeIndex(0)
		}
	}
</script>

<style lang="scss">
.userTurnover-list-box {
	.model {
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        padding: 0px 30px;
        box-sizing: border-box;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
        margin-bottom: 20px;
        >span {
            font-size: 15px;
            color: #fff;
            margin-right: 100px;
        }
    }
}
</style>
