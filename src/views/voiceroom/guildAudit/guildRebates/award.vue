<template>
	<div class="guildAudit-award-box">
		<div class="searchParams">
			<div class="formBox">
				<div class="sunBox">
					<span>公会</span>
					<el-input v-model="form.guild_number" placeholder="请输入公会ID"></el-input>
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
				<div class="sunBox" v-if="form.status !== 2">
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
					<el-button type="success" v-if="form.status === 1" @click="batchFunc(1)">批量通过</el-button>
					<el-button type="danger" v-if="form.status === 1" @click="batchFunc(2)">批量忽略</el-button>
					<el-button type="success" @click="addHome">添加24小时房间</el-button>
				</div>
			</div>
        </div>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
		<!-- 新增24小时房间组件 -->
		<homeComp v-if="isDestoryComp" ref="homeComp" @destoryComp="destoryComp"></homeComp>
	</div>
</template>

<script>
	// 引入api
	import { doSettlement } from '@/api/videoRoom'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { formatTimeTwo,timeFormat } from '@/utils/common.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	// 引入新增24小时房间组件
	import homeComp from './components/homeComp.vue'

	export default {
		name: 'guildRebate-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			homeComp
		},
		computed: {
			cfgs() {
				let name = this.form.status === 2 ? 'getNowRoomOnlineReward': 'settlementLog'
				// let name = this.form.status === 2 ? 'getNowRoomOnlineReward' : 'getRoomOnlineRewardLog'
				let arr = [
					{
						label: '时间',
						minWidth: '240px',
						render: (h, params) => {
							let start_time = params.row.time_start ? timeFormat(params.row.time_start, 'YYYY-MM-DD HH:mm:ss', true) : ''
							let end_time = params.row.time_end ? timeFormat(params.row.time_end, 'YYYY-MM-DD HH:mm:ss', true) : '无'
							return h('span', `${timeFormat(params.row.time_start, 'YYYY', true)}年第${params.row.now}周（${start_time}至${end_time}）`)
						}
					},
					{
						label: '房间ID',
						minWidth: '100px',
						prop: 'room_number'
					},
					{
						label: '房间标题',
						minWidth: '100px',
						prop: 'room_title'
					},
					{
						label: '所属公会ID',
						minWidth: '100px',
						prop: 'guild_number'
					},
					{
						label: '所属公会名称',
						minWidth: '120px',
						prop: 'guild_name'
					},
					{
						label: '本周营业时长',
						minWidth: '140px',
						prop: 'online',
                        render: (h, params) => {
							let status = params.row.online ?  formatTimeTwo(params.row.online) : '--'
							return h('span', status)
                        }
					},
					{
						label: '本周流水',
						minWidth: '120px',
						render: (h, params) => {
							return h('span', params.row.flow + '钻石')
						}
					},
					{
						label: '时长奖励',
						minWidth: '100px',
                        render: (h, params) => {
                            let name = this.form.status === 2 ? '无' : (params.row.settlement || 0) + '喵粮'
                            return h('span', name)
                        }
					},
					{
						label: '结算状态',
						minWidth: '120px',
						render: (h, params) => {
							let name;
							if(this.form.status === 1) {
								name = '待结算'
							} else if(this.form.status === 2) {
								name = '未结算'
							} else if(this.form.status === 3) {
								name = '已结算'
							} else {
								name = '已忽略'
							}
							return h('span', name)
						}
					}
				]
				let arr1 = [
					{
						label: '操作',
						minWidth: '160px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.rebateFunc(params.row.id, 1)}}}, '结算'),
								h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.rebateFunc(params.row.id, 2)}}}, '忽略')
							])
						}
					}
				]
				return {
					vm: this,
					url: this.form.status === 2 ? REQUEST.system.guild[name] : REQUEST.guild[name],
					// url: REQUEST.system.guild[name],
					isShowCheckbox: true,
					isShowIndex: true,
					columns: this.form.status === 1 ? [ ...arr, ...arr1 ] : [ ...arr ]
				}
			}
		},
		data() {
			return {
				closeStatusList: MAPDATA.GUILDCLOSEANACCOUNTSTATUSLISTCOPY, // 结算状态
				form: { // 表单数据
					guild_number: '',
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
				},
				isDestoryComp: false // 是否销毁组件
			}
		},
		watch: {
			'form.status': {
				handler(n, o) {
					if((o === 3 || o === 1 || o === 4) && (n === 1 || n === 3 || n === 4)) {
						setTimeout(() => {
							this.getList()
						}, 50);
					}
				},
				deep: true
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
					type : 4,
					status: s.status,
					start_time: s.time && s.time.length > 0 ? Math.floor(s.time[0] / 1000) : 0,
					end_time: s.time && s.time.length > 0 ? Math.floor(s.time[1] / 1000) : 0
				}
				if(this.form.status === 1) {
					data.status = 0
				} else if(this.form.status === 3) {
					data.status = 1
				} else if(this.form.status === 4) {
					data.status = 2
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
					guild_number: '',
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
				this.selectList = v
			},
			// 批量返佣
			async batchFunc(status) {
				if(this.selectList.length <= 0) {
					this.$warning('请至少选择一条数据')
					return false
				}

				let ids = []
				this.selectList.forEach(item => {
					ids.push(item.id)
				})
				let res = await doSettlement({ ids, status })
				if(res.code === 2000) {
					this.$success("批量操作成功");
				}
				this.getList()
			},
			// 单个返点
			async rebateFunc(id, status) {
				let ids = [id]
				let res = await doSettlement({ ids, status })
				if(res.code === 2000) {
					this.$success("操作成功");
				}
				this.getList()
			},
			// 列表返回数据
			saleAmunt(row) {
				this.ruleForm = { ...row }
			},
			// 添加24小时房间
			addHome() {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.homeComp.loadParams()
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			}
		}
	}
</script>
<style lang="scss">
.guildAudit-award-box {
	.searchParams {
		// margin-bottom: 20px;
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
				.el-input {
					width: 180px;
					input {
						border: none;
						background: #F5F7FA;
					}
				}
				.el-select {
					width: 180px;
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
