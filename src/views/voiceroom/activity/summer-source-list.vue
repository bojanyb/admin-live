<template>
	<div class="app-container">
    	<menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
		<div class="searchParams">
			<SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
		</div>
		<el-card class="box-card" shadow="always" v-if="tabIndex === '2'">
			<div class="box-card-inner">
				<div>送礼人数：{{sumSource.user_count || 0}}人</div>
				<div>收礼人数：{{sumSource.live_user_count || 0}}人</div>
				<div>礼物总金额：{{sumSource.gift_diamond_total || 0}}钻石</div>
			</div>
		</el-card>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
	// 引入api
	import {
		getAuditPass,
		getGiftVsummer,
		giftLogVsummer
	} from '@/api/activity'
	// 引入菜单组件
	import SearchPanel from '@/components/SearchPanel/final.vue'
	// 引入列表组件
	import tableList from '@/components/tableList/TableList.vue'
	// 引入api
	import REQUEST from '@/request/index.js'
	// 引入公共参数
	import mixins from '@/utils/mixins.js'
	// 引入tab菜单组件
	import menuComp from '@/components/menuComp/index.vue'
	// 引入公共方法
	import { timeFormat } from '@/utils/common.js'
	export default {
		mixins: [mixins],
		components: {
			tableList,
			SearchPanel,
      		menuComp
		},
		data() {
			return {
				menuList: [
					{
						name: '点赞数据'
					},
					{
						name: '排名数据'
					},
					{
						name: '收送礼数据'
					}
				],
				tabIndex: '0',
				searchParams: {
					config_id: 2,
					type: this.tabIndex == '0' ? '' : 1,
					gift_id : '0'
				},
				upvoteMatchList : [
					{
						id: 2,
						title: "初选赛点赞数据"
					},
					{
						id: 3,
						title: "晋级赛点赞数据"
					},
					{
						id: 4,
						title: "半决赛点赞数据"
					},
				],
				rankMatchList : [
					{
						id: 1,
						title: "初选赛点赞排名"
					},
					{
						id: 2,
						title: "晋级赛点赞排名"
					},
					{
						id: 3,
						title: "半决赛点赞排名"
					},
					{
						id: 4,
						title: "半决赛魅力排名"
					},
					{
						id: 5,
						title: "总决赛魅力排名"
					},
					{
						id: 6,
						title: "总决赛壕气排名"
					},
				],
				giftList: [],
				ruleForm: {
					user_number: ""
				},
				editRuleForm: {
					id : "",
					remark: ""
				},
				sumSource: {
					user_count: 0,
					live_user_count: 0,
					gift_diamond_total: 0,
				}
			}
		},
		computed: {
			forms() {
				let arr1 = [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					},
					{
						name: 'config_id',
						type: 'select',
						value: 2,
						keyName: 'id',
						optionLabel: 'title',
						label: '赛事',
						placeholder: '请选择',
						clearable: true,
            			linkage: true,
						options: this.upvoteMatchList
					},
				]
				let arr2 = [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					},
					{
						name: 'type',
						type: 'select',
						value: 1,
						keyName: 'id',
						optionLabel: 'title',
						label: '赛事',
						placeholder: '请选择',
						clearable: true,
            			linkage: true,
						options: this.rankMatchList
					}
				]
				let arr3 = [
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '送礼人ID',
						isNum: true,
						placeholder: '请输入送礼人ID'
					},
					{
						name: 'live_user_number',
						type: 'input',
						value: '',
						label: '收礼人ID',
						isNum: true,
						placeholder: '请输入收礼人ID'
					},
					{
						name: 'gift_id',
						type: 'select',
						value: "0",
						keyName: 'gift_id',
						optionLabel: 'gift_name',
						label: '礼物名称',
						placeholder: '请选择',
						clearable: true,
            			linkage: true,
						options: this.giftList
					},
					{
						name: 'dateTimeParams',
						type: 'datePicker',
						dateType: 'datetimerange',
						format: "yyyy-MM-dd HH:mm:ss",
						label: '时间',
						value: '',
						handler: {
							change: v => {
								this.emptyDateTime()
								this.setDateTime(v)
								this.getList();
							},
							selectChange: (v, key) => {
								this.emptyDateTime()
								this.getList();
							}
						}
					}
				]
				let arr = []
				switch (this.tabIndex) {
					case "0":
						arr = arr1
						break;
					case "1":
						arr = arr2
						break;
					case "2":
						arr = arr3
						break;
				}
				return arr
			},
			cfgs() {
				let columnsList = [];
				let arr1 = [
					{
						label: '点赞时间',
						render: (h, params) => {
							return h('span', params.row.create_time)
						}
					},
					{
						label: '点赞用户ID',
						prop: 'from_user_number',
					},
					{
						label: '收到点赞的用户ID',
						prop: 'to_user_number'
					},
					{
						label: '点赞数',
						prop: 'like_number'
					}
				];
				let arr2 = [
					{
						label: '排名',
						minWidth: '120px',
						prop: 'nickname'
					},
					{
						label: '用户ID',
						minWidth: '120px',
						prop: 'user_number'
					},
					{
						label: '用户昵称',
						minWidth: '120px',
						prop: 'user_number'
					},
					{
						label: '礼物总价值',
						minWidth: '120px',
						prop: 'user_number'
					},
				]
				let arr3 = [
					{
						label: '时间',
						minWidth: '180px',
						render: (h, params) => {
							return h('span', params.row.create_time || '无')
						}
					},
					{
						label: '送礼人ID',
						prop: 'user_number'
					},
					{
						label: '送礼人昵称',
						prop: 'nickname'
					},
					{
						label: '收礼人ID',
						prop: 'live_user_number'
					},
					{
						label: '收礼人昵称',
						prop: 'live_nickname'
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
						label: '单价',
						prop: 'gift_diamond'
					},
					{
						label: '礼物总价值',
						prop: 'score',
						render: (h, params) => {
							return h('span', params.row.gift_num * params.row.gift_diamond)
						}
					},
				]
				let portName = "";
				switch (Number(this.tabIndex)) {
					case 0:
						columnsList = arr1;
						portName = "likeLog";
						break;
					case 1:
						columnsList = arr2;
						portName = "getRanking";
						break;
					case 2:
						columnsList = arr3;
						portName = "giftLog";
						break;
					default:
						break;
				}
				return {
					vm: this,
					url: REQUEST.summerSign[portName],
					columns: columnsList
				}
			}
		},
		mounted(){
			this.getGiftVsummerFun();
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams, ...this.dateTimeParams }
				let params_new = {
					page: params ? params.page : 1,
					pagesize: params ? params.size : 10,
					user_number: s.user_number ? s.user_number : "",
				}
				switch (this.tabIndex) {
					case "0":
						params_new.config_id = s.config_id ? s.config_id: 2
						break;
					case "1":
						params_new.type = s.type ? s.type: 1
						break;
					case "2":
						params_new.gift_id = s.gift_id ? s.gift_id: "0";
						params_new.live_user_number = s.live_user_number ? s.live_user_number : "";
						params_new.start_time = s.start_time ? Math.floor(s.start_time / 1000) : s.start_time;
						params_new.end_time = s.end_time ? Math.floor(s.end_time / 1000) : s.end_time;
						break;
				}
				return params_new
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
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// table 返回数据
			saleAmunt(row){
				if(row.data){
					this.sumSource = row.data
				}
			},
			// 菜单切换
			tabChange() {
				// this.$nextTick(res=>{
				// 	this.searchParams.round = 1;
				// 	if(this.$refs.tableList) {
				// 		this.$refs.tableList.getData()
				// 	}
				// })
      		},
			// 限制用户id输入
			roomInput(type) {
				let changeNum = type == 1 ? this.ruleForm.user_number : this.ruleForm.user_number;
				changeNum = changeNum.replace(
					/[\u4E00-\u9FA5A-Za-z_^%&'\-\*\ /;.，。、‘；、】【=?$\[\]!@#()\\~]/g,
					""
				);
				this.ruleForm.user_number = changeNum;
			},
			// 审核通过
			async pass(row){
				this.$confirm('确认通过吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let params = {
						id : row.id
					}
					let res = await getAuditPass(params);
					if(res.code === 2000){
						this.$success('操作成功')
						this.$refs.tableList.getData()
					}
				}).catch(() => {});
			},
			// 总决赛实力榜打分修改
			finalEdit(){
				console.log("总决赛实力榜打分修改---");
			},
			async getGiftVsummerFun(){
				let res = await getGiftVsummer();
				if(res.code == 2000){
					let giftList = res.data.list;
					giftList.unshift({"gift_id": "0","gift_name": "全部"});
					this.$set(this,"giftList",giftList)
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.el-icon-circle-close {
		color: #FFFFFF;
	}
	::v-deep .box-card {
		width: 100%;
		height: 40px;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		padding: 0px 30px;
		box-sizing: border-box;
		margin-bottom: 20px;
		.el-card__body{
			padding: 0;
			width: 100% !important;
			.box-card-inner {
				display: flex;
				justify-content: space-around;
				div {
					font-size: 15px;
					color: #ffffff;
				}
			}
		}
	}
	::v-deep .share-table-list-box .el-table__body-wrapper {
		height: 33rem !important;
	}
	::v-deep .share-table-list-box .el-table__body-wrapper::-webkit-scrollbar {
		width: 5px;
		background-color: #F5F5F5;
	}
	::v-deep .share-table-list-box .el-table__body-wrapper::-webkit-scrollbar-thumb {
		border-radius:5px;
		background:rgba(0,0,0,0.1);
	}
</style>



