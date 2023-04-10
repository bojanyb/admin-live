  <template>
	<div class="guildReport-list-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 详情组件 -->
		<guildReportComp v-if="isDestoryComp" ref="guildReportComp" @destoryComp="destoryComp"></guildReportComp>
	</div>
</template>

<script>
	// 引入api
	import { getGuildDealReport } from '@/api/videoRoom'
	// 引入详情组件
	import guildReportComp from './components/guildReportComp.vue'
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
	export default {
		name: 'guildReport-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			guildReportComp
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
						name: 'status',
						type: 'select',
						value: '未处理',
						keyName: 'value',
						optionLabel: 'name',
						label: '状态',
						placeholder: '请选择',
						options: MAPDATA.GUILDREPORTSTATUS
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.guildUserReport,
					columns: [
						{
							label: '举报公会名称（ID）',
							minWidth: '180px',
							render: (h, params) => {
								return h('div', [
									h('div', params.row.guild_nickname),
									h('div', params.row.guild_number || '无')
								])
							}
						},
						{
							label: '公会等级',
							render: (h, params) => {
								let data = MAPDATA.CLASSLIST.find(item => { return item.value === params.row.rank })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '公会长昵称（ID）',
							minWidth: '150px',
							render: (h, params) => {
								return h('div', [
									h('div', params.row.guild_owner.nickname),
									h('div', params.row.guild_owner.user_number || '无')
								])
							}
						},
						{
							label: '被举报成员昵称（ID）',
							minWidth: '180px',
							render: (h, params) => {
								return h('div', [
									h('div', params.row.reported_user.nickname),
									h('div', params.row.reported_user.user_number || '无')
								])
							}
						},
						{
							label: '近72小时非本公会厅收入',
							minWidth: '200px',
							render: (h, params) => {
								return h('span', {
									style: {
										color: params.row.not_guild_free ? '#67C23A' : '#606266'
									},
									on: {
										click: () => {
											this.details(params.row)
										}
									}
								}, params.row.not_guild_free || '0')
							}
						},
						{
							label: '状态',
							render: (h, params) => {
								let data = MAPDATA.GUILDREPORTSTATUS.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '举报时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '处理人',
							prop: 'deal_user'
						},
						{
							label: '处理时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '操作',
							minWidth : '230px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.func(params.row.id, 2)}}},'同意'),
									h('el-button', { props: { type: 'danger'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.func(params.row.id, 3)}}},'拒绝')
								])
							}
						}
					]
				}
			}
		},
		data() {
			return {
				isDestoryComp: false, // 是否销毁组件
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number,
					status: s.status ? s.status: 1
				}
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
			// 操作 - 通过 - 拒绝
			async func(id, status) {
				let res = await getGuildDealReport({ id, status })
				if(res.code === 2000) {
					this.$message.success('操作成功')
				}
				this.getList()
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			// 详情 - 近72小时非本公会厅收入
			details(row) {
				if(row.not_guild_free && row.reported_user) {
					let params = {
						user_id: row.reported_user.user_number,
						guild_id: row.guild_number
					}
					this.isDestoryComp = true
					setTimeout(() => {
						this.$refs.guildReportComp.loadParams(params)
					}, 50);
				}
			}
		}
	}
</script>
<style lang="scss">
.guildReport-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
