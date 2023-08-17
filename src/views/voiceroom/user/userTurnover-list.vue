<template>
	<div class="app-container userTurnover-list-box">
		<div class="model">
        <span>收礼人数：{{ ruleForm.user_count || 0 }}人</span>
        <span>房间数量：{{ ruleForm.room_count || 0 }}个</span>
        <span>公会数量：{{ ruleForm.guild_count || 0 }}个</span>
        <span>选择时间内总金额：{{ ruleForm.total_amount || 0 }}喵粮</span>
    </div>
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"
			:show-batch-rurn="true"
			batchRurnName="导出EXCEL"
			@BatchRurn="batchRurnFileName"
			:show-batch-pass="true"
			batchFuncName="文件查询"
			@batchPass="batchFileSearch"
			></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>

		<!-- 导出文件名称 -->
		<el-dialog class="downFilePop" title="导出文件名称" width="50%" :visible.sync="batchFileNameVisible">
		<div>
			由于导出数据量较大，现采取异步导出的方案进行，导出文件需要一段时间进行，请稍后自行点击 "文件查询" 下载。
		</div>
		<el-form>
			<div class="inputBox">
				<el-form-item label="请输入本次文件名称：" prop="file_name" class="numberBox">
					<!-- <el-input v-model="file_name" placeholder="请输入本次文件名称" @input="fileNameInput" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input> -->
					<el-input v-model="file_name" placeholder="请输入本次文件名称" ></el-input>
				</el-form-item>
			</div>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="BatchRurn">确 定</el-button>
		</span>
		</el-dialog>

		<!-- 文件查询 -->
		<el-dialog class="downFileSearchPop" title="文件查询" width="50%" :visible.sync="batchFileVisible">
		<tableList
			:cfgs="cfgs1"
			ref="tableList2"
		></tableList>
		</el-dialog>
	</div>
</template>

<script>
	// 引入api
	import { getUserFlowAll,userFlow1Count } from "@/api/videoRoom.js";
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共方法
	import { timeFormat, exportTableData } from "@/utils/common.js";
	// 引入公共map
	import MAPDATA from '@/utils/jsonMap.js'
	export default {
		name: 'userTurnover-list',
		components: {
			tableList,
			SearchPanel
		},
		mixins: [mixins],
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
						name: 'room_number',
						type: 'input',
						value: '',
						label: '房间ID',
						isNum: true,
						placeholder: '请输入房间ID'
					},
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '收礼人ID',
						isNum: true,
						placeholder: '请输入收礼人ID'
					},
					{
						name: 'source',
						type: 'select',
						value: 0,
						keyName: 'value',
						optionLabel: 'name',
						label: '流水类型',
						placeholder: '请选择',
						options: MAPDATA.DEALSOURCETYPELIST
					},
					{
						name: 'flow_type',
						type: 'select',
						value: 0,
						keyName: 'id',
						optionLabel: 'name',
						label: '房间来源',
						placeholder: '请选择',
						options: MAPDATA.DEALSOURCELIST
					},
          			{
						name: 'guild_type',
						type: 'select',
						value: 0,
						keyName: 'id',
						optionLabel: 'name',
						label: '房间类型',
						placeholder: '请选择',
						options: this.roomTypeList
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
					url: REQUEST.deal.userFlow1,
					search: {
						sizes: [10, 30, 50, 100,300,500]
					},
					columns: [
						{
							label: '时间',
							minWidth: '130px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '交易流水号',
							minWidth: '150px',
							prop: 'relation_trade_no'
						},
						{
							label: '收礼ID',
							prop: 'live_user_number'
						},
						{
							label: '房间ID',
							render: (h, params) => {
								return h('span', params.row.room_number || '无')
							}
						},
						{
							label: '公会ID',
							render: (h, params) => {
								return h('span', params.row.guild_number || '无')
							}
						},
						{
							label: '流水类型',
							render: (h, params) => {
								let data = MAPDATA.DEALSOURCETYPELIST.find(item => { return item.value === params.row.source })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '房间来源',
							render: (h, params) => {
								let data = MAPDATA.DEALSOURCELIST.find(item => { return item.id === params.row.flow_type })
								return h('span', data ? data.name : '无')
							}
						},
            			{
							label: '房间类型',
							prop: 'amount',
              				render: (h, params) => {
								let data = this.roomTypeList.find(item => { return item.id === params.row.guild_type })
								let name = "";
								if(data.id == 0){
									name = "无"
								}else {
									name = data.name
								}
								return h('span', name ? name : '无')
							}
						},
						{
							label: '金额',
							prop: 'amount'
						},
						{
						label: "收礼人IP",
						minWidth: "80px",
							render: (h, params) => {
								return h("span", params.row.receive_ip ? params.row.receive_ip : '无');
							},
						},
					]
				}
			},
			cfgs1() {
				return {
					vm: this,
					url: REQUEST.diamondRecharge.exportTask,
					columns: [
					{
						label: "文件名称",
						render: (h, params) => {
						return h("span", params.row.file_name || "无");
						},
					},
					{
						label: "状态",
						render: (h, params) => {
						let stateName = this.fileStateList.find((item) => { return item.state == params.row.export_status} )
						return h("span", stateName.name || "无");
						},
					},
					{
						label: "下载",
						fixed: "right",
						render: (h, params) => {
						return h("div", [
							h("el-button",{props: { type: "primary" },style: { display: params.row.export_url !== '' ? 'unset' : 'none'}, on: {click: () => { this.downFile(params.row);}}},"下载"),
						]);
						},
					},
					],
				};
			},
		},
		data() {
			return {
				ruleForm: {},
				searchParams: {
					dateTimeParams: [],
					flow_type: 0
				},
				dateTimeParams: {
					start_time: null,
					end_time: null
				},
				roomTypeList : [
				{
					id : 0,
					name : "全部"
				},
				{
					id : 1,
					name : "直播房间"
				},
				{
					id : 2,
					name : "派对房间"
				},
				{
					id : 3,
					name : "心动岛房间"
				}
				],
				batchFileNameVisible: false,
				file_name: "",
				batchFileVisible: false,
				fileStateList: [
					{
					id: 1,
					state : 0,
					name : "待导出"
					},
					{
					id: 2,
					state : 1,
					name : "导出中"
					},
					{
					id: 3,
					state : 2,
					name : "导出成功"
					},
					{
					id: 4,
					state : 3,
					name : "导出失败"
					}
				]
			}
		},
		methods: {
			// 刷新列表
			getList() {
				this.getUserFlow1Count();
				this.$refs.tableList.getData();
			},
			// 配置参数
			beforeSearch(params) {
				// 文件查询
				if(this.batchFileVisible == true){
					let s = {
						page: params ? params.page : 1,
						pagesize: params ? params.size : 10,
						export_type : 2 // 1、财务管理-充值记录导出  2、交易管理-流水记录
					}
					return s
				}else{
					let s = { ...this.searchParams, ...this.dateTimeParams }
					return {
						page: params ? params.page : 1,
          				pagesize: params ? params.size : 10,
						guild_number: s.guild_number,
						room_number: s.room_number,
						user_number: s.user_number,
						start_time: s.start_time ? Math.floor(s.start_time / 1000) : '',
						end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
						flow_type: s.flow_type,
						guild_type: s.guild_type,
						source: s.source
					}
				}
			},
			// 重置
			reset() {
				this.changeIndex(0)
				this.searchParams = {
					flow_type: 0
				}
				this.dateTimeParams = {}
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
			// 列表返回数据
			saleAmunt(row) {
				// this.ruleForm = { ...row }
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
				if( index == 0) {
					end = new Date(timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false))
				} else {
					end = new Date(now1 + ' 23:59:59')
				}

				let time = [start.getTime(), end.getTime()]
				this.searchParams.dateTimeParams = time
				this.dateTimeParams.start_time = time[0]
				this.dateTimeParams.end_time = time[1]
			},
			// 导出文件名称弹框
			batchRurnFileName(){
				this.batchFileNameVisible = true;
			},
			// 限制id输入
			fileNameInput() {
				this.file_name = this.file_name.replace(/[/\\]*/g, '')
			},
			// 文件查询
			batchFileSearch(){
				this.batchFileVisible = true;
				if(this.$refs.tableList2){
					this.$refs.tableList2.getData();
				}
			},
			// 下载文件
			downFile(row){
				window.location.href = row.export_url;
			},
			// 导出excel
			BatchRurn() {
				if(this.file_name == ""){
					this.$message.warning("请先输入有效的文件名");
					return
				}
				let s = this.beforeSearch();
				delete s.page;
				s.file_name = this.file_name;
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				getUserFlowAll(s).then(res=>{
					let arr = JSON.parse(JSON.stringify(res.data.list));
					if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
					arr = arr.map((item) => {
						let source = MAPDATA.DEALSOURCETYPELIST.find(it => { return it.value === item.source })
						let flow_type = MAPDATA.DEALSOURCELIST.find(it => { return it.id === item.flow_type })
						let guild_type = this.roomTypeList.find(it => { return it.id === item.guild_type });
						let params = {
							create_time: timeFormat(
							item.create_time,
							"YYYY-MM-DD HH:mm:ss",
							true
							)+';',
							relation_trade_no: JSON.stringify(item.relation_trade_no),
							live_user_number: item.live_user_number,
							room_number: item.room_number,
							guild_number: item.guild_number,
							source: source.name? source.name: "无",
							flow_type: flow_type.name? flow_type.name: "无",
							guild_type: guild_type.name? guild_type.name: "无",
							amount: item.amount,
							receive_ip: item.receive_ip,
						};
						return params;
					});
					let nameList = [
					"时间",
					"交易流水号",
					"收礼ID",
					"房间ID",
					"公会ID",
					"流水类型",
					"房间来源",
					"房间类型",
					"金额",
					"收礼人IP"
					];
					exportTableData(arr, nameList, this.file_name);
					loading.close();
					this.file_name = "";
			}).catch(err=>{
				loading.close();
				this.file_name = "";
			});
			this.batchFileNameVisible = false;
    		},
			// 获取汇总数据
			async getUserFlow1Count(){

				let s = this.beforeSearch();
				let res = await userFlow1Count(s);
				if(res.code == 2000){
					this.ruleForm = res.data;
				}
			},
		},
		created() {
			this.changeIndex(0)
			this.getUserFlow1Count();
		}
	}
</script>

<style lang="scss">
.userTurnover-list-box {
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
