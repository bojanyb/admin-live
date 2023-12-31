<template>
	<div class="guildRebate-dynamic-box">
		<div class="model">
			<span>总条数：{{ ruleForm.count || 0 }}</span>
			<span>流水总计：{{ ruleForm.total_flow || 0 }}
        <el-popover
          placement="bottom"
          width="400"
          trigger="hover"
          >
          根据每周完成拍成的次数档位，发放房间（只是该拍拍房的）对应的流水返点奖励。
          <i class="icon-hover el-icon-question" slot="reference"></i>
        </el-popover>
      </span>
			<span>结算总计：{{ ruleForm.total_settlement || 0 }}</span>
			<span>拍成次数：{{ ruleForm.total_cp || 0 }}</span>
		</div>
		<div class="searchParams">
			<div class="formBox">
				<div class="sunBox">
					<span>公会</span>
					<el-input v-model="form.guild_number" placeholder="请输入公会ID"></el-input>
				</div>
				<div class="sunBox">
					<span>结算状态</span>
					<el-select v-model="form.status" placeholder="请选择">
						<el-option v-for="item in closeStatusList" :key="item.value" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="sunBox" v-if="form.status !== 2">
					<span>时间</span>
					<el-date-picker v-model="form.time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
						end-placeholder="结束日期" value-format="timestamp" :default-time="['00:00:00', '23:59:59']"
						@change="change">
					</el-date-picker>
				</div>
				<div class="btnBox">
					<el-button class="seeBox" type="primary" @click="getList">查询</el-button>
					<el-button icon="el-icon-refresh" @click="reset">重置</el-button>
					<el-button type="success" v-if="form.status === 1" @click="batchFunc(1)">批量通过</el-button>
					<el-button type="danger" v-if="form.status === 1" @click="batchFunc(2)">批量忽略</el-button>
					<el-button type="danger" @click="BatchRurn()">导出EXCEL</el-button>
				</div>
			</div>
			<!-- <SearchPanel ref="SearchPanel" v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" batch-func-name="批量返佣" :show-batch-pass="true" @batchPass="batchFunc"></SearchPanel> -->
		</div>

		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt" @handleSizeChange="handleSizeChange"></tableList>
	</div>
</template>

<script>
// 引入公会列表接口
import { guildList } from '@/api/user'
// 引入api
import { doSettlement, cpSettleLog, cpWeekList } from '@/api/videoRoom'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat, exportTableData } from '@/utils/common.js'
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
			let name = this.form.status === 2 ? 'cpWeekList' : 'cpSettleLog'
			let arr = [
				{
					label: '时间',
					minWidth: '240px',
					render: (h, params) => {
						let start_time = params.row.time_start ? timeFormat(params.row.time_start, 'YYYY-MM-DD HH:mm:ss', true) : ''
						let endTime = this.form.status === 2 ? params.row.time_end : params.row.create_time
						let end_time = endTime ? timeFormat(endTime, 'YYYY-MM-DD HH:mm:ss', true) : '无'
						return h('span', `${timeFormat(params.row.time_start, 'YYYY', true)}年第${params.row.now}周（${start_time}至${end_time}）`)
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
					prop: 'guild_name'
				},
				{
					label: '房间ID',
					minWidth: '120px',
					prop: 'room_number',
				},
				{
					label: '房间标题',
					minWidth: '120px',
					prop: 'room_title'
				},
				{
					label: '拍一拍房间流水',
					minWidth: '120px',
					render: (h, params) => {
						return h('span', params.row.room_flow ? params.row.room_flow + '钻石' : '无')
					}
				},
				{
					label: '拍成次数',
					minWidth: '120px',
					render: (h, params) => {
						return h('span', params.row.cp_stat + '次')
					}
				},
				{
					label: '总流水（含冻结）',
					minWidth: '140px',
					render: (h, params) => {
						return h('span', params.row.t_flow + '钻石')
					}
				},
				{
					label: '档位及返点比例',
					minWidth: '150px',
          headIcon: true,
          headConent: '档位及返点比例：这里取的是最新政策数据',
					render: (h, params) => {
						return h('span', `${params.row.reward_name ? params.row.reward_name : '--'}: ${params.row.reward_val ? params.row.reward_val : '--'}%` )
					}
				},
				{
					label: '周奖励金额',
					minWidth: '120px',
          headIcon: true,
          headConent: '周奖励金额：这里的数据是结算时的金额',
					render: (h, params) => {
						return h('span', params.row.settlement ? params.row.settlement + '喵粮' : '无')
					}
				},
				{
					label: '结算状态',
					minWidth: '120px',
					render: (h, params) => {
						let name;
						if (this.form.status === 1) {
							name = '待结算'
						} else if (this.form.status === 2) {
							name = '未结算'
						} else if (this.form.status === 3) {
							name = '已结算'
						} else {
							name = '已忽略'
						}
						return h('span', name)
					}
        },
				{
					label: '结算操作时间',
					width: '180px',
					render: (h, params) => {
						return h('span', params.row.op_time ? timeFormat(params.row.op_time, 'YYYY-MM-DD HH:mm:ss', true) : '-')
					}
				},
				{
					label: '操作人',
					render: (h, params) => {
						return h('span', params.row.op_user ? params.row.op_user : '-')
					}
				},
			]
			let arr1 = [
				{
					label: '操作',
					minWidth: '280px',
					fixed: 'right',
					render: (h, params) => {
						return h('div', [
              h('el-button', {
                props: { type: 'primary' },
                style: {
                  display :  +params.row.resettle !== 1 ? 'unset' : 'none',
                },
                on: { click: () => { this.rebateFunc(params.row.id, 1) } }
              }, '结算'),
              h('el-button', {
                props: { type: 'danger' },
                style: {
                  display :  +params.row.resettle !== 1 ? 'unset' : 'none',
                },
                on: { click: () => { this.rebateFunc(params.row.id, 2) } }
              }, '忽略'),
              h('el-button', {
                props: { type: 'primary' },
                style: {
                  display :  +params.row.resettle === 1 ? 'unset' : 'none',
                },
                on: { click: () => { this.rebateFunc(params.row.id, 1) } }
              }, '再次结算'),
						])
					}
				}
			]
			return {
				vm: this,
				url: REQUEST.guild[name],
				isShowCheckbox: this.form.status === 1,
				isShowIndex: true,
				columns: (this.form.status === 1 || this.form.status === 4) ? [...arr, ...arr1] : [...arr]
			}
		}
	},
	data() {
		return {
			guildList: [], // 公会列表
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
			page: 1,
		}
	},
	watch: {
		'form.status': {
			handler(n, o) {
				if ((o === 1 || o === 3 || o === 4) && (n === 1 || n === 3 || n === 4)) {
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
				page: params ? params.page : 1,
				pagesize: params ? params.size : 10,
				guild_number: s.guild_number ? s.guild_number : "",
				start_time: s.time && s.time.length > 0 ? Math.floor(s.time[0] / 1000) : 0,
				end_time: s.time && s.time.length > 0 ? Math.floor(s.time[1] / 1000) : 0,
				type: 6,
				status: s.status,
				guild_type: 2
			}
			if (this.form.status === 1) {
				data.status = 0
			} else if (this.form.status === 3) {
				data.status = 1
			} else if (this.form.status === 4) {
				data.status = 2
			}
			if (s.status === 2) {
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
			if (this.selectList.length <= 0) {
				this.$warning('请至少选择一条数据')
				return false
			}
			let text = status == 1 ?  "通过" : "忽略";
			this.$confirm("你确定要批量"+text+"此次数据吗？", "操作提醒", {
				type: "warning",
				confirmButtonText: "确定",
				cancelButtonText: "取消",
			})
			.then(async () => {
				let ids = []
				this.selectList.forEach(item => {
					ids.push(item.id)
				})
				let res = await doSettlement({ ids, type: 6, status, guild_type: 2 })
				if (res.code === 2000) {
					this.$success("批量操作成功");
				}
				this.getList()
			}).catch(() => {});
		},
		// 单个返点
		async rebateFunc(id, status) {
			let text = status == 1 ?  "结算" : "忽略";
			this.$confirm(text+"此次数据吗？", "操作提醒", {
				type: "warning",
				confirmButtonText: "确定",
				cancelButtonText: "取消",
			})
			.then(async () => {
				let ids = [id]
				let res = await doSettlement({ ids, type: 6, status, guild_type: 2 })
				if (res.code === 2000) {
					this.$success("操作成功");
				}
				this.getList()
			}).catch(() => {});
		},
		// 列表返回数据
		saleAmunt(row) {
			this.ruleForm = { ...row };
			this.page = this.ruleForm.page;
		},
		// 分页切换 当前页码
		handleSizeChange(val) {
			this.page = val;
		},
		// 获取公会列表
		async guildListFunc() {
			let res = await guildList()
			if (res.data.list && res.data.list.length > 0) {
				res.data.list.unshift({
					guild_number: 0,
					nickname: '全部公会'
				})
				this.guildList = res.data.list || []
			}

		},
		// 导出
		async BatchRurn() {
			if (this.ruleForm.list.length == 0) {
				this.$warning("当前没有数据可以导出");
				return
			}
			let s = this.beforeSearch();
			s.is_all = 1;
			if (this.page > 1) {
				s.page = this.page;
			}
			let res = {}
			if (this.form.status === 2) {
				res = await cpWeekList(s);
			} else {
				res = await cpSettleLog(s);
			}
			let arr = JSON.parse(JSON.stringify(res.data.list));
			if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
			arr = arr.map((item, index) => {
				let start_time = item.time_start ? timeFormat(item.time_start, 'YYYY-MM-DD HH:mm:ss', true) : '';
				let endTime = this.form.status === 2 ? item.time_end : item.create_time;
				let end_time = endTime ? timeFormat(endTime, 'YYYY-MM-DD HH:mm:ss', true) : '无';
				let timer = timeFormat(item.time_start, 'YYYY', true) + '年第' + item.now + "周" + start_time + "至" + end_time;
				let guild_type = MAPDATA.GUILDCONFIGTYPELIST.find(it => { return it.value === item.guild_type });
				let status_name = "";
				if (this.form.status === 1) {
					status_name = '待结算'
				} else if (this.form.status === 2) {
					status_name = '未结算'
				} else if (this.form.status === 3) {
					status_name = '已结算'
				} else {
					status_name = '已忽略'
				}
				let params = {
					num: (index + 1),
					timer: timer,
					guild_number: item.guild_number,
					guild_name: item.guild_name,
					room_number: item.room_number,
					room_title: item.room_title,
					room_flow: (item.room_flow ? item.room_flow + '钻石' : '无'),
					cp_stat: item.cp_stat + "次",
					t_flow: item.t_flow + "钻石",
					reward_name: item.reward_name,
					settlement: (item.settlement ? item.settlement + '喵粮' : '无'),
					status: status_name,
          op_time: item.op_time ? timeFormat(item.op_time, 'YYYY-MM-DD HH:mm:ss', true) : '-',
          op_user: item.op_user ? item.op_user : '-'
				};
				return params;
			});
			let nameList = [
				"序号",
				"时间",
				"公会ID",
				"公会名称",
				"房间ID",
				"房间标题",
				"拍一拍房间流水",
				"拍成次数",
				"总流水（含冻结）",
				"奖励名称",
				"周奖励金额",
				"结算状态",
        "操作时间",
        "操作人",
			];
			exportTableData(arr, nameList, "拍一拍房间次数结算");
		},
	}
}
</script>
<style lang="scss">
.guildRebate-dynamic-box {
	.model {
		width: 100%;
		height: 40px;
		background: rgba(0, 0, 0, 0.8);
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
