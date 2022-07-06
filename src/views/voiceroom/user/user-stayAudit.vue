<template>
	<div class="user-stayAudit-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
	import { getUserBgiAudit } from '@/api/videoRoom'
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
		name: 'userbg-list',
		mixins: [mixins],
		components: {
			SearchPanel,
			tableList
		},
		data() {
			return { }
		},
		computed: {
			forms() {
				return [
					{
						name: 'user_id',
						type: 'input',
						value: '',
						label: '用户ID',
						isNum: true,
						placeholder: '请输入用户ID'
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.audit.list,
					columns: [
						{
							label: '用户ID',
							prop: 'user_id'
						},
                        {
							label: '昵称',
							render: (h, params) => {
								return h('span', params.row.userinfo.nickname || '无')
							}
						},
                        {
							label: '头像',
							isimg: true,
							prop: 'pic',
							imgWidth: '50px',
							imgHeight: '50px'
						},
                        {
							label: '个性签名',
							render: (h, params) => {
								return h('span', params.row.userinfo.nickname || '无')
							}
						},
                        {
							label: '背景图片',
							isimg: true,
							prop: 'pic',
							imgWidth: '50px',
							imgHeight: '50px'
						},
                        {
							label: '录制声音',
							render: (h, params) => {
								return h('span', params.row.userinfo.nickname || '无')
							}
						},
                        {
							label: '动态内容',
							render: (h, params) => {
								return h('span', params.row.userinfo.nickname || '无')
							}
						},
                        {
							label: '动态图片/视频',
							render: (h, params) => {
								return h('span', params.row.userinfo.nickname || '无')
							}
						},
						{
							label: '上传时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '操作',
							width : '230px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.handleChange(params.row, 1)}}}, '通过'),
									h('el-button', { props : { type: 'danger'}, on: {click:()=>{this.handleChange(params.row, 2)}}},'驳回')
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
					user_id: s.user_id,
					status: s.status
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {}
				this.dateTimeParams = {
					activity_type_id: 1
				}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			handleChange(row,status){
				var params = {
					id : row.id,
					status : status,
					make_userid: row.make_userid
				}
				getUserBgiAudit(params).then(res=>{
					this.$message.success("处理成功");
					this.getList();
				}).catch(err=>{
					this.$message.error(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-stayAudit-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>
