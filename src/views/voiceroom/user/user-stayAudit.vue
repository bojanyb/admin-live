// 本页面暂时废弃 - 审核列表
<template>
	<div class="user-stayAudit-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
	import { checkContentAudit } from '@/api/user' // 接口勿用 - 这里会审核图片 - 现在有图片审核模块 - 会重复审核
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
		data() {
			return { }
		},
		computed: {
			forms() {
				return [
					{
						name: 'user_number',
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
					url: REQUEST.audit.toAuditList,
					columns: [
						{
							label: '用户ID',
							render: (h, params) => {
								return h('span', params.row.user_number || '')
							}
						},
                        {
							label: '昵称',
							render: (h, params) => {
								return h('span', params.row.nickname || '')
							}
						},
                        {
							label: '头像',
							isimg: true,
							prop: 'face',
							imgWidth: '50px',
							imgHeight: '50px'
						},
                        {
							label: '个性签名',
							render: (h, params) => {
								return h('span', params.row.autograph || '')
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
							isimg: true,
							prop: 'sound',
							imgWidth: '50px',
							imgHeight: '50px',
							width: '300px'
						},
                        {
							label: '动态内容',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.moments_content || '')
							}
						},
                        {
							label: '动态图片/视频',
							isimgList: true,
							prop: 'moments_media_list',
							type: 'moments_media_type',
							imgWidth: '70px',
							imgHeight: '70px',
							width: '200px'
						},
						{
							label: '上传时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '')
							}
						},
						{
							label: '操作',
							width : '200px',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.audioFunc(params.row, 1)}}}, '通过'),
									h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.audioFunc(params.row, 2)}}},'驳回')
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
					user_number: s.user_number
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
			// 审核
			async audioFunc(row, status) {
				console.log(row, 'row-------------')
				let params = {
					id: row.id,
					status: status
				}
				let res = await checkContentAudit(params) // 接口勿用 - 这里会审核图片 - 现在有图片审核模块 - 会重复审核
				if(res.code === 2000) {
					if(status === 1) {
						this.$message.success('审核通过')
					} else {
						this.$message.success('驳回成功')
					}
				}
				this.getList()
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
