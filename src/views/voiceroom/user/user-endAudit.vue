<template>
	<div class="user-endAudit-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>
	</div>
</template>

<script>
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
					url: REQUEST.audit.auditedList,
					columns: [
						{
							label: '用户ID',
							width: '100px',
							render: (h, params) => {
								return h('span', params.row.user_number || '')
							}
						},
                        {
							label: '昵称',
							width: '130px',
							render: (h, params) => {
								return h('span', params.row.nickname || '')
							}
						},
                        {
							label: '头像',
							isimg: true,
							prop: 'face',
							imgWidth: '50px',
							imgHeight: '50px',
							width: '100px'
						},
                        {
							label: '个性签名',
							width: '100px',
							render: (h, params) => {
								return h('span', params.row.autograph || '')
							}
						},
                        {
							label: '背景图片',
							isimg: true,
							prop: 'pic',
							imgWidth: '50px',
							imgHeight: '50px',
							width: '100px',
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
							label: '状态',
							width: '100px',
							render: (h, params) => {
								let data = MAPDATA.AUDITSTATUSLIST.find(item => { return item.value === params.row.status })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '处理时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.update_time ? timeFormat(params.row.update_time, 'YYYY-MM-DD HH:mm:ss', true) : '')
							}
						},
						{
							label: '处理人',
							width: '100px',
							render: (h, params) => {
								return h('span', params.row.admin_name || '')
							}
						},
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
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-endAudit-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>
