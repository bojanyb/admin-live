<template>
	<div class="guildRebate-list-box">
		<div class="model">
			<span>流水总计：{{ ruleForm.all_week_flow || 0 }}</span>
			<span>结算总计：{{ ruleForm.all_week_back || 0 }}</span>
		</div>

		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" batch-func-name="批量返佣" :show-batch-pass="true" @batchPass="batchFunc"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
	// 引入api
	import { getWeekRebate } from '@/api/videoRoom'
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
		name: 'guildRebate-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
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
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.guildWeekList,
					isShowCheckbox: true,
					isShowIndex: true,
					columns: [
						{
							label: '公会ID',
							prop: 'guild_number'
						},
						{
							label: '公会等级',
							render: (h, params) => {
								let data = MAPDATA.CLASSLIST.find(item => { return item.value === params.row.rank })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '公会长ID',
							prop: 'user_number'
						},
						{
							label: '时间区间',
							minWidth: '240px',
							render: (h, params) => {
								let s = params.row
								let start = s.last_week_start ? s.last_week_start : ''
								let end = s.last_week_end ? s.last_week_end - 1 : ''
								return h('span', start ? timeFormat(start, 'YYYY-MM-DD HH:mm:ss', true) + ' - ' + timeFormat(end, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '流水',
							prop: 'last_week_flow'
						},
						{
							label: '返佣比例',
							prop: 'rebate'
						},
						{
							label: '应结算',
							prop: 'last_week_back'
						}
					]
				}
			}
		},
		data() {
			return {
				selectList: [], // 选中
				ruleForm: {}
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number
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
			// 选中
			selectionChange(v) {
				this.selectList = v
			},
			// 批量返佣
			async batchFunc() {
				if(this.selectList.length <= 0) {
					this.$message.error('请至少选择一条数据')
					return false
				}

				let ids = []
				this.selectList.forEach(item => {
					ids.push(item.id)
				})
				let res = await getWeekRebate({ ids })
				if(res.code === 2000) {
					this.$message.success("批量返佣成功");
				}
				this.getList()
			},
			// 列表返回数据
			saleAmunt(row) {
				this.ruleForm = { ...row }
			},
		}
	}
</script>
<style lang="scss">
.guildRebate-list-box {
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
