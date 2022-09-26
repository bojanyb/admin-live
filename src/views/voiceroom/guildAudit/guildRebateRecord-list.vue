<template>
	<div class="guildRebateRecord-list-box">
		<div class="model">
			<span>流水总计：{{ ruleForm.all_flow || 0 }}</span>
			<span>结算总计：{{ ruleForm.all_settlement || 0 }}</span>
		</div>

		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	// 引入格式化时间包
	import moment from 'moment'
	export default {
		name: 'guildRebateRecord-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		data() {
			return {
				searchParams: {
					dateTimeParams: []
				},
				dateTimeParams: {
					start_time: null,
					end_time: null
				},
				ruleForm: {}
			}
		},
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
					url: REQUEST.guild.settlementLog,
					columns: [
						{
							label: '时间',
							minWidth: '240px',
							render: (h, params) => {
								let year = timeFormat(new Date(), 'YYYY', false)
								let week = moment().week()
								let start_time = params.row.week_start ? timeFormat(params.row.week_start, 'YYYY-MM-DD HH:mm:ss', true) : ''
								let end_time = params.row.week_end ? timeFormat(params.row.week_end, 'YYYY-MM-DD HH:mm:ss', true) : '无'
								return h('span', `${year}年第${week}周（${start_time}至${end_time}）`)
							}
						},
						{
							label: '公会ID',
							minWidth: '100px',
							prop: 'guild_number'
						},
						{
							label: '公会名称',
							minWidth: '100px',
							prop: 'nickname'
						},
						{
							label: '公会长昵称',
							minWidth: '120px',
							prop: 'guild_nickanme'
						},
						{
							label: '流水',
							minWidth: '120px',
							render: (h, params) => {
								return h('span', params.row.flow + '钻石')
							}
						},
						{
							label: '周返点比例',
							minWidth: '100px',
							render: (h, params) => {
								return h('span', params.row.rebate + '%')
							}
						},
						{
							label: '周返点金额',
							minWidth: '120px',
							render: (h, params) => {
								return h('span', params.row.settlement + '喵粮')
							}
						},
						{
							label: '结算状态',
							minWidth: '120px',
							render: (h, params) => {
								return h('span', '已结算')
							}
						},
						{
							label: '操作人',
							prop: 'op_user',
							minWidth: '100px',
							render: (h, params) => {
								return h('span', params.row.op_user || '无')
							}
						}
					]
				}
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				return {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
					end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0,
					status: 1,
					type: 1
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
				this.changeIndex(0)
				this.searchParams = {}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
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
				end = new Date(now1 + ' 23:59:59')

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
.guildRebateRecord-list-box {
	padding: 20px;
	box-sizing: border-box;
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
