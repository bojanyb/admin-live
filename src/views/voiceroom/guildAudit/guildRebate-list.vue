<template>
	<div class="guildRebate-list-box">
		<div class="model">
			<span>总条数：{{ ruleForm.count || 0 }}</span>
			<span>流水总计：{{ ruleForm.all_week_flow || 0 }}</span>
			<span>结算总计：{{ ruleForm.all_week_back || 0 }}</span>
		</div>

		<div class="searchParams">
			<div class="formBox">
				<div class="sunBox">
					<span>公会</span>
					<el-select v-model="form.guild_number" placeholder="请选择">
						<el-option
						v-for="item in guildList"
						:key="item.guild_number"
						:label="item.nickname"
						:value="item.guild_number">
						</el-option>
					</el-select>
				</div>
				<div class="sunBox">
					<span>结算状态</span>
					<el-select v-model="form.status" placeholder="请选择">
						<el-option
						v-for="item in closeStatusList"
						:key="item.value"
						:label="item.name"
						:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="sunBox">
					<span>时间</span>
					<el-date-picker
					v-model="form.time"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<el-button type="primary">查询</el-button>
				<el-button type="primary">查询</el-button>
			</div>
            <SearchPanel ref="SearchPanel" v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" batch-func-name="批量返佣" :show-batch-pass="true" @batchPass="batchFunc"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
	// 引入公会列表接口
	import { guildList } from '@/api/user'
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
				let arr = [
					{
						name: 'guild_number',
						type: 'select',
						value: 0,
						keyName: 'guild_number',
						optionLabel: 'nickname',
						label: '公会',
						placeholder: '请选择',
						options: this.guildList
					},
					{
						name: 'status',
						type: 'select',
						value: 1,
						keyName: 'value',
						optionLabel: 'name',
						label: '结算状态',
						placeholder: '请选择',
						options: MAPDATA.GUILDCLOSEANACCOUNTSTATUSLIST,
						handler: {
							change: v => {
								console.log(v, 'v----------2020')
								let val = JSON.parse(JSON.stringify(v))
								// console.log(this.searchParams, 'searchParams--------3030')
								this.$set(this.searchParams, 'status', val)
								// this.$forceUpdate()
								this.$refs.SearchPanel.updateView(val, 'status')
							}
						}
					},
				]
				let arr1 = [
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
				return this.searchParams.status === 1 ? [ ...arr ] : [ ...arr, ...arr1 ]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.guildWeekList,
					isShowCheckbox: true,
					isShowIndex: true,
					columns: [
						// {
						// 	label: '创建时间',
						// 	minWidth: '100px',
						// 	render: (h, params) => {
						// 		return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
						// 	}
						// },
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
				guildList: [], // 公会列表
				closeStatusList: MAPDATA.GUILDCLOSEANACCOUNTSTATUSLIST, // 结算状态
				form: { // 表单数据
					guild_number: 0,
					status: 1,
					time: []
				},
				selectList: [], // 选中
				ruleForm: {},
				searchParams: {
					dateTimeParams: [],
					status: 1
				},
				dateTimeParams: {
					start_time: null,
					end_time: null
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
					// start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
					// end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				// this.changeIndex(2)
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
			},
			// 获取公会列表
			async guildListFunc() {
				let res = await guildList()
				if(res.data.list && res.data.list.length > 0) {
					res.data.list.unshift({
						guild_number: 0,
						nickname: '全部公会'
					})
					this.guildList = res.data.list || []
				}
				
			}
		},
		created() {
			this.guildListFunc()
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
	.searchParams {
		.formBox {
			display: flex;
			align-items: center;
			.sunBox {
				margin-left: 12px;
				>span {
					font-size: 14px;
    				color: #606266;
					font-weight: 700;
					margin-right: 12px;
				}
				.el-select {
					border: none;
					input {
						border: none;
						background: #F5F7FA;
					}
				}
				.el-date-editor {
					border: none;
					background: #F5F7FA;
					input {
						background: #F5F7FA;
					}
				}
			}
			>div:first-child {
				margin-left: 0px;
			}
		}
	}
}
</style>
