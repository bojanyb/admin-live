<template>
	<div class="room-livelist">
		<menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 房间直播详情组件 -->
		<liveDetails v-if="isDestoryComp" ref="liveDetails" @destoryComp="destoryComp" @getList="getList"></liveDetails>
	</div>
</template>

<script>
	// 引入api
	import { genreList } from '@/api/house.js'
	import { liveEnd } from '@/api/callApp.js'
	// 引入tab菜单组件
	import menuComp from '@/components/menuComp/index.vue'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入房间直播详情组件
	import liveDetails from './components/liveDetails.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共方法
	import { formatTime } from '@/utils/common.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'

	export default {
		name: 'RoomList',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			liveDetails,
			menuComp
		},
		data() {
			return {
				tabIndex: '0',
				menuList: [
					{
						name: '直播房间列表'
					},
					{
					    name: '直播历史记录'
					}
				],
				classifyList: [], // 房间类型列表
				isDestoryComp: false // 是否销毁组件
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '主播ID',
						isNum: true,
						placeholder: '请输入主播ID'
					},
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
						label: '开播时间',
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
				let arr = [
					{
						label: '开播时间',
						minWidth: '180px',
						render: (h, params) => {
							return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
						}
					},
					{
						label: '房间ID',
						prop: 'room_number'
					},
					{
						label: '房间标题',
						minWidth: '120px',
						prop: 'room_title'
					},
					{
						label: '房间封面',
						isimg: true,
						prop: 'room_cover',
						imgHeight: '50px',
						minWidth: '100px'
					},
					{
						label: '房间类型',
						prop: 'room_type'
					},
					{
						label: '房主',
						minWidth: '120px',
						render: (h, params) => {
							return h('div', [
								h('div', params.row.nickname),
								h('div', params.row.user_number || '无')
							])
						}
					},
					{
						label: '所属公会',
						minWidth: '100px',
						render: (h, params) => {
							return h('div', [
								h('div', params.row.guild_name),
								h('div', params.row.guild_number || '无')
							])
						}
					},
					{
						label: '已开播时长',
						minWidth: '120px',
						render: (h, params) => {
							return h('span', params.row.live_time || '无')
						}
					},
					{
						label: '流水（钻石）',
						minWidth: '100px',
						prop: 'now_flow'
					},
					{
						label: '在线人数',
						prop: 'people'
					},
					{
						label: '操作',
						minWidth : '100px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'danger' }, on: {click:()=>{this.dissolveFunc(params.row)}}}, '关播')
							])
						}
					}
				]

				let arr1 = [
					{
						label: '开播时间',
						minWidth: '180px',
						render: (h, params) => {
							return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
						}
					},
					{
						label: '关播时间',
						minWidth: '180px',
						render: (h, params) => {
							return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
						}
					},
					{
						label: '房间ID',
						minWidth: '100px',
						prop: 'room_number'
					},
					{
						label: '房间标题',
						minWidth: '120px',
						prop: 'room_title'
					},
					{
						label: '房间封面',
						isimg: true,
						prop: 'room_cover',
						imgHeight: '50px',
						minWidth: '100px'
					},
					{
						label: '房间类型',
						minWidth: '100px',
						prop: 'room_type'
					},
					{
						label: '房主',
						minWidth: '120px',
						render: (h, params) => {
							return h('div', [
								h('div', params.row.nickname),
								h('div', params.row.user_number || '无')
							])
						}
					},
					{
						label: '所属公会',
						minWidth: '120px',
						render: (h, params) => {
							return h('div', [
								h('div', params.row.guild_name),
								h('div', params.row.guild_number || '无')
							])
						}
					},
					{
						label: '开播时长',
						minWidth: '120px',
						render: (h, params) => {
							return h('span', params.row.live_time || '无')
						}
					},
					{
						label: '流水（钻石）',
						minWidth: '120px',
						prop: 'total_gain'
					},
					{
						label: '进房人数',
						minWidth: '100px',
						prop: 'enter_user_count'
					},
					{
						label: '送礼用户数',
						minWidth: '120px',
						prop: 'consume_user_count'
					},
					{
						label: '关闭类型',
						minWidth: '100px',
						render: (h, params) => {
							let data = MAPDATA.DISSOLUTIONTYPELISTCOPY.find(item => { return item.value === params.row.disband_type })
							return h('span', data ? data.name : '无')
						}
					},
					{
						label: '关闭人',
						minWidth: '120px',
						prop: 'disband_username'
					}
				]
				let name;
				if(this.tabIndex === '0') {
					name = 'anchorLiveList'
				} else {
					name = 'anchorLiveHistoryList'
				}
				return {
					vm: this,
					url: REQUEST.live[name],
					columns: this.tabIndex === '0' ? [ ...arr ] : [ ...arr1 ]
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
					user_number: s.user_number,
					room_category_id: s.room_category_id,
					guild_number: s.guild_number,
					start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
                	end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0
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
			// 解散房间
			async dissolveFunc(row) {
				this.$confirm('是否确认关闭当前直播间?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let params = {
						"room_id": row.room_id,
						"uid": row.uid,
						"admin-token": this.$store.getters.token
					}
					let res = await liveEnd(params)
					if(res.code === 2000) {
						this.$success('关闭成功')
					}
					this.getList()
				}).catch(() => {});
			},
			// 编辑房间
			liveEditFunc(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.liveDetails.loadParams(row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			// 获取房间分类
			async getHouse() {
				let res = await genreList({ belong: 1 })
				if(res.data.list && res.data.list.length > 0) {
					res.data.list.unshift({
						name: '全部',
						id: ''
					})
				}
				this.classifyList = res.data.list || []
			}
		},
		created() {
			this.getHouse()
		}
	}
</script>
<style lang="scss">
.room-livelist {
	padding: 20px;
	box-sizing: border-box;
}
</style>
