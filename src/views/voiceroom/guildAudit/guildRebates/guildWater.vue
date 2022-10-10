<template>
	<div class="guildRebate-list-box">
		<div class="model">
			<span>总条数：{{ ruleForm.count || 0 }}</span>
			<span>流水总计：{{ (form.status === 1 ? ruleForm.all_flow : ruleForm.total_flow) || 0 }}</span>
			<span>结算总计：{{ (this.form.status === 1 ? ruleForm.all_settlement : ruleForm.total_settlement) || 0 }}</span>
		</div>

		<div class="searchParams">
			<div class="formBox">
				<div class="sunBox">
					<span>公会</span>
					<!-- <el-select v-model="form.guild_number" placeholder="请选择" @change="change">
						<el-option
						v-for="item in guildList"
						:key="item.guild_number"
						:label="item.nickname"
						:value="item.guild_number">
						</el-option>
					</el-select> -->
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
					<el-button type="success" v-if="form.status === 1" @click="batchFunc(1)">批量通过</el-button>
					<el-button type="danger" v-if="form.status === 1" @click="batchFunc(2)">批量忽略</el-button>
					<el-button type="success" @click="exportTable">导出EXCEL</el-button>
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
				let name = this.form.status === 2 ? 'guildWeekList': 'settlementLog'

				let arr = [
					{
						label: '时间',
						minWidth: '240px',
						render: (h, params) => {
							let start_time = params.row.week_start ? timeFormat(params.row.week_start, 'YYYY-MM-DD HH:mm:ss', true) : ''
							let end_time = params.row.week_end ? timeFormat(params.row.week_end, 'YYYY-MM-DD HH:mm:ss', true) : '无'
							return h('span', `${timeFormat(params.row.week_start, 'YYYY', true)}年第${params.row.w}周（${start_time}至${end_time}）`)
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
							return h('span', this.form.status === 2 ? params.row.week_flow + '钻石' : params.row.flow + '钻石')
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
							return h('span', this.form.status === 2 ? '无' : params.row.settlement + '喵粮')
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
						minWidth: '150px',
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
					url: REQUEST.guild[name],
					isShowCheckbox: this.form.status === 1,
					isShowIndex: true,
					columns: this.form.status === 1 ? [ ...arr, ...arr1 ] : [ ...arr ]
				}
			}
		},
		watch: {
			'form.status': {
				handler(n, o) {
					if((o === 1 || o === 3 || o == 4) && (n === 1 || n === 3 || n === 4)) {
						this.getList()
					}
				},
				deep: true
			}
		},
		data() {
			return {
				guildList: [], // 公会列表
				closeStatusList: MAPDATA.GUILDCLOSEANACCOUNTSTATUSLIST, // 结算状态
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
					type: 1,
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
				let res = await getWeekRebate({ ids, type: 1, status })
				if(res.code === 2000) {
					this.$success("批量操作成功");
				}
				this.getList()
			},
			// 单个返点
			async rebateFunc(id, status) {
				let ids = [id]
				let res = await getWeekRebate({ ids, type: 1, status })
				if(res.code === 2000) {
					this.$success("操作成功");
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
				
			},
			// 转base64
			base64(s) {
				return window.btoa(unescape(encodeURIComponent(s)))
			},
			// 导出excel
			exportTable() {
				let arr = JSON.parse(JSON.stringify(this.ruleForm.list))
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
				arr = arr.map((item,index) => {
					let params = {
						index: index + 1,
						time: `2022年第${item.w}周（${timeFormat(item.week_start, 'YYYY-MM-DD HH:mm:ss', true)}至${timeFormat(item.week_end, 'YYYY-MM-DD HH:mm:ss', true)}）`,
						guild_number: item.guild_number,
						nickname: item.nickname,
						guild_nickanme: item.guild_nickanme,
						flow: item.flow,
						rebate: item.rebate + '%',
						rebateMoney: (item.flow / 100 * item.rebate) + '喵粮',
						status: name,
					}
					return params
				})
				let str = '<tr><td style="text-align:center;height: 50px;">序号</td><td style="text-align:center;">时间</td><td style="text-align:center;">公会ID</td><td style="text-align:center;">公会名称</td><td style="text-align:center;">公会长昵称</td><td style="text-align:center;">流水</td><td style="text-align:center;">周返点比例</td><td style="text-align:center;">周返点金额</td><td style="text-align:center;">结算状态</td></tr>';
				// 循环遍历，每行加入tr标签，每个单元格加td标签
				for(let i = 0 ; i < arr.length ; i++ ){
					str+='<tr>';
					for(const key in arr[i]){
						// 增加  为了不让表格显示科学计数法或者其他格式
						str+=`<td style="text-align:center;height: 40px;">${ (arr[i][key] || '无') + '  '}</td>`;    
					}
					str+='</tr>';
				}
				// Worksheet名
				const worksheet = 'Sheet1'
				const uri = 'data:application/vnd.ms-excel;base64,';
		
				// 下载的表格模板数据
				const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
				xmlns:x="urn:schemas-microsoft-com:office:excel"
				xmlns="http://www.w3.org/TR/REC-html40">
				<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
				<x:Name>${worksheet}</x:Name>
				<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
				</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
				</head><body><table>${str}</table></body></html>`;
				// 下载模板
				window.location.href = uri + this.base64(template);
			}
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
