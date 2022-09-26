<template>
	<div class="guildRebate-list-box">
		<div class="model">
			<span>总条数：{{ ruleForm.count || 0 }}</span>
			<span>流水总计：{{ form.status === 1 ? ruleForm.all_flow : ruleForm.total_flow }}</span>
			<span>结算总计：{{ this.form.status === 1 ? ruleForm.all_settlement : ruleForm.total_settlement }}</span>
		</div>

		<div class="searchParams">
			<div class="formBox">
				<div class="sunBox">
					<span>公会</span>
					<el-select v-model="form.guild_number" placeholder="请选择" @change="change">
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
				<div class="sunBox" v-if="form.status === 1">
					<span>时间</span>
					<el-date-picker
					v-model="form.time"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="timestamp"
					:default-time="['00:00:00', '23:59:59']"
					@change="change">
					</el-date-picker>
				</div>
				<div class="btnBox">
					<el-button class="seeBox" type="primary" @click="getList">查询</el-button>
					<el-button icon="el-icon-refresh" @click="reset">重置</el-button>
					<el-button type="success" v-if="form.status === 1" @click="batchFunc">批量通过</el-button>
				</div>
			</div>
            <!-- <SearchPanel ref="SearchPanel" v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" batch-func-name="批量返佣" :show-batch-pass="true" @batchPass="batchFunc"></SearchPanel> -->
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
	// 引入格式化时间包
	import moment from 'moment'

	export default {
		name: 'guildRebate-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
		},
		computed: {
			cfgs() {
				let name = this.form.status === 1 ? 'settlementLog' : 'guildWeekList'
				let arr = [
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
							return h('span', this.form.status === 1 ? params.row.flow + '钻石' : params.row.week_flow + '钻石')
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
							return h('span', this.form.status === 1 ? params.row.settlement + '喵粮' : '无')
						}
					},
					{
						label: '结算状态',
						minWidth: '120px',
						render: (h, params) => {
							return h('span', this.form.status === 1 ? '待结算' : '未结算')
						}
					}
				]
				let arr1 = [
					{
						label: '操作',
						minWidth: '120px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.rebateFunc(params.row.id, 1)}}}, '结算')
							])
						}
					}
				]
				return {
					vm: this,
					url: REQUEST.guild[name],
					isShowCheckbox: this.form.status === 1,
					isShowIndex: true,
					columns: this.form.status === 1 ? [ ...arr, ...arr1 ] : [ ...arr ]
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
					time: [],
					start_time: null,
					end_time: null
				},
				selectList: [], // 选中
				ruleForm: {},
				dateTimeParams: {
					start_time: null,
					end_time: null
				}
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.form, ...this.dateTimeParams }
				let data = {
					page: params.page,
					pagesize: params.size,
					guild_number: s.guild_number,
					status: 0,
					type: 1,
					start_time: s.time && s.time.length > 0 ? Math.floor(s.time[0] / 1000) : 0,
					end_time: s.time && s.time.length > 0 ? Math.floor(s.time[1] / 1000) : 0
				}
				if(s.status === 2) {
					delete data.status
					delete data.start_time,
					delete data.end_time
				}
				return data
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.form = {
					guild_number: 0,
					status: 1,
					time: [],
					start_time: null,
					end_time: null
				}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// 更改
			change() {
				this.getList()
			},
			// 选中
			selectionChange(v) {
				console.log(v, 'v-----------2020')
				this.selectList = v
			},
			// 批量返佣
			async batchFunc() {
				if(this.selectList.length <= 0) {
					this.$warning('请至少选择一条数据')
					return false
				}

				let ids = []
				this.selectList.forEach(item => {
					ids.push(item.id)
				})
				let res = await getWeekRebate({ ids })
				if(res.code === 2000) {
					this.$success("批量返佣成功");
				}
				this.getList()
			},
			// 单个返点
			async rebateFunc(id) {
				let ids = [id]
				let res = await getWeekRebate({ ids })
				if(res.code === 2000) {
					this.$message.success("返佣成功");
				}
				this.getList()
			},
			// 列表返回数据
			saleAmunt(row) {
				this.ruleForm = { ...row }
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
			flex-wrap: wrap;
			.sunBox {
				margin-right: 12px;
				margin-bottom: 20px;
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
			.btnBox {
				margin-bottom: 20px;
			}
		}
	}
}
</style>
