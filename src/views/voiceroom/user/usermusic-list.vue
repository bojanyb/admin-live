<template>
	<div class="usermusic-list-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<upMusic v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList" ref="upMusic"></upMusic>
	</div>
</template>

<script>
	// 引入api
	import { getUserMusicBack, putaway } from '@/api/videoRoom'
	// 引入修改组件
	import upMusic from './components/upMusic.vue'
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
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList,
			upMusic
		},
		data() {
			return {
				searchParams: { // 搜索参数
					sort: 0
				},
				isDestoryComp: false // 是否销毁组件
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'sort',
						type: 'select',
						value: 0,
						keyName: 'value',
						optionLabel: 'name',
						label: '排序查看',
						placeholder: '请选择',
						options: MAPDATA.SORTLIST
					},
					{
						name: 'status',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '筛选查看',
						placeholder: '请选择',
						options: MAPDATA.USERMUSICUPLIST
					},
					{
						name: 'user_number',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					},
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.user.musicList,
					columns: [
						{
							label: '上传用户昵称',
							minWidth: '120px',
							prop: 'nickname'
						},
						{
							label: '上传用户ID',
							minWidth: '120px',
							prop: 'user_number'
						},
						{
							label: '上传时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '音乐',
							isimg: true,
							prop: 'url',
							nameProp: 'name',
							tagProp: 'tags',
							width: '300px'
						},
						{
							label: '处理时间',
							minWidth: '180px',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '处理人',
							render: (h, params) => {
								return h('span', params.row.deal_user_name || '无')
							}
						},
						{
							label: '操作',
							minWidth: '200px',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.editFunc(params.row)}}}, '修改'),
									h('el-button', { style: {
										display: params.row.status === 1 ? 'none' : 'unset'
									}, on: {click:()=>{this.up(params.row)}}}, '上架'),
									h('el-button', { props: { type: 'danger'}, style: {
										display: params.row.status === 2 ? 'none' : 'unset'
									}, on: {click:()=>{this.down(params.row)}}}, '下架')
								])
							}
						}
					]
				}
			}
		},
		methods: {
			// 配置参数
			beforeSearch(params) {
				let s = { ...this.searchParams }
				return {
					page: params.page,
					pagesize: params.size,
					user_number: s.user_number,
					status: s.status,
					sort: s.sort
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
			// 编辑
			editFunc(row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.upMusic.loadParams(row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},
			async up(row) {
				await putaway({ id: row.id })
				this.$message.success('上架成功')
				this.getList();
			},
			async down(row) {
				this.$confirm('确定要下架该音乐？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					await getUserMusicBack({ id: row.id })
					this.$message.success("下架成功");
					this.getList();
				}).catch(() => {});
			},
		}
	}
</script>
<style lang="scss">
.usermusic-list-box {
	padding: 20px;
	box-sizing: border-box;
	.el-table {
		.audioBox {
			audio {
				height: 35px;
			}
		}
	}
}
</style>
