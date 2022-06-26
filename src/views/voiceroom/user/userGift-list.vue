<template>
	<div class="app-container">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
	</div>
</template>

<script>
	import {
		getUserStatistical
	} from '@/api/videoRoom'


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
		name: 'userGift-list',
		components: {
			tableList,
			SearchPanel
		},
		mixins: [mixins],
		computed: {
			forms() {
				return [
					{
						name: 'inputSelect',
						value: '',
						selectName: 'iSelect',
						type: 'inputSelect',
						placeholder: '请输入ID',
						selectPlaceholder: '请选择',
						selctValue: 'all',
						selectWidth: '130px',
						label: '交易查询',
						handler: {
							change: (v) => {
								console.log(v, 'v----')
								if(v == 'code') {
									// this.$set(this.searchParams, 'live_user_number', )
								}
							}
						},
						options: [
							{ key: 'all', label: '全部' },
							{ key: 'code', label: '送礼人ID' },
							{ key: 'name', label: '收礼人ID' }
						]
					},
					{
						name: 'dateTimeParams',
						type: 'datePicker',
						dateType: 'daterange',
						format: "yyyy-MM-dd",
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
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
							}
						},
						{
							label: '收礼人ID',
							prop: 'live_user_number'
						},
						{
							label: '送礼人ID',
							prop: 'user_number'
						},
						{
							label: '礼物来源',
							render: (h, params) => {
								return h('span', params.row.room_number ? '派对' : '私聊')
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
							label: '金额',
							prop: 'amount'
						},
						{
							label: '交易流水号',
							prop: 'relation_trade_no'
						}
					]
				}
			}
		},
		data() {
			return {

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
				if(s.inputSelect) {
					s.live_user_number = s.inputSelect
					s.user_number = s.inputSelect
					if(s.iSelect == 'code') {
						delete s.user_number
					} else if(s.iSelect == 'name') {
						delete s.live_user_number
					}
				}
				return {
					page: params.page,
					pagesize: params.size,
					user_number: s.user_number || '',
					live_user_number: s.live_user_number || '',
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
					end_time: s.end_time ? Math.floor(s.end_time / 1000) : ''
				}
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
			}
		}
	}
</script>
