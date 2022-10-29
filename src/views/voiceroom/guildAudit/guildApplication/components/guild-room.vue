<template>
	<div class="guildApplication-list-box">
		<SearchPanel v-model="searchParams" :forms=" forms" :showAdd=" true " :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
		<tableList :cfgs="cfgs" ref="tableList"></tableList>
		<el-dialog
        title="添加房间"
        :width="'600px'"
        :visible.sync="isAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" label-suffix=":">
                <el-form-item label="公会ID" prop="guild_number">
                    <el-input v-model="ruleForm.guild_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入公会ID" clearable></el-input>
                </el-form-item>
				<el-form-item label="房主ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入房主ID" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAdd = false">取 消</el-button>
                <el-button type="primary" @click="handelAdd">确 定</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
	import {addGuildRoom,rmGuildRoom} from '@/api/videoRoom.js'
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
	export default {
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		computed: {
			forms() {
				return [
					{
						name: 'room_number',
						type: 'input',
						value: '',
						label: '房间ID',
						isNum: true,
						placeholder: '请输入房间ID'
					},
					{
						name: 'guild_number',
						type: 'input',
						value: '',
						label: '公会ID',
						isNum: true,
						placeholder: '请输入公会ID'
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.guild.guildRooms,
					columns: [
						{
							label: '添加时间',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '房间ID',
							prop: 'room_number'
						},
						{
							label: '房间标题',
							prop: 'room_title'
						},
						{
							label: '所属公会ID',
							prop: 'guild_number'
						},

						{
							label: '所属公会名称',
							prop: 'guild_nickname'
						},
						{
							label: '操作',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.del(params.row)}}},'移除')
								])
							}
						}
					]
				}
			},
		},
		data() {
			return {
				isAdd :false,
				ruleForm : {
					guild_number : "",
					user_number : ""
				},
				rules: {
					guild_number: [
						{ required: true, message: '请输入公会ID', trigger: 'blur' ,
						validator: (rules, value, cb) => {
							if (!value) {
								return cb(new Error('公会ID不能为空!'))
							}
							return cb()
						}
					}
					],
					user_number: [
						{ required: true, message: '请输入房主ID', trigger: 'blur',
						validator: (rules, value, cb) => {
							if (!value) {
								return cb(new Error('房主ID不能为空!'))
							}
							return cb()
						}
					 }
					],
				},
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					room_number: s.room_number,
					guild_number: s.guild_number,
					status: s.status,
					type: s.type
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
			// 公会房间 - 新增
			add(){
				this.isAdd = true
			},
			// 公会房间 - 新增确定
			async handelAdd(){
				this.$refs.ruleForm.validate(async (valid) => {
					if (valid) {
						let params = { ...this.ruleForm }
						let res = await addGuildRoom(params)
						if(res.code === 2000) {
							this.$message({
								type: 'success',
								message: '新增成功!'
							});
							this.isAdd = false
							this.getList()
						}
					}
				})
			},
			// 公会房间 - 移除
			del(row){
				let title = "确认移除 [ " + row.room_title + " ] 吗？"
				this.$confirm(title, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let res = await rmGuildRoom({ id: row.id })
					if(res.code === 2000) {
						this.$message({
							type: 'success',
							message: '移除成功!'
						});
						this.getList()
					}
				}).catch(() => {});
			},
		}
	}
</script>
<style lang="scss">
.guildApplication-list-box {
	padding: 20px;
	box-sizing: border-box;

	.headerBox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ccc;
		margin-bottom: 30px;
		.select {
			display: flex;
			align-items: center;
			>span {
				display: flex;
				align-items: center;
				justify-content: center;
				width: auto;
				height: 50px;
				margin-left: 20px;
				cursor: pointer;
				border-bottom: 2px solid rgba(0,0,0,0);
				transform: translateY(1px);
			}
			>span.high {
				border-color: blue;
			}
		}
	}
}
</style>
