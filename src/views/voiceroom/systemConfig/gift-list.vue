<template>
	<div class="gift-list-box">
		<div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
		
		<tableList :cfgs="cfgs" ref="tableList"></tableList>
		
		<!-- 新增 - 修改组件 -->
		<giftAdd ref="giftAdd" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></giftAdd>
	</div>
</template>

<script>
	// 引入新增组件
	import giftAdd from './giftAdd/index.vue'
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
			giftAdd
		},
		data() {
			return {
				isDestoryComp: false // 是否销毁组件
			}
		},
		computed: {
			forms() {
				return [
					{
						name: 'status',
						type: 'select',
						value: '',
						keyName: 'value',
						optionLabel: 'name',
						label: '礼物状态',
						placeholder: '',
						options: MAPDATA.LIBRARYGIFTSLIST,
						handler: {
							change: (v) => {}
						}
					}
				]
			},
			cfgs() {
				return {
					vm: this,
					url: REQUEST.system.gift.giftList,
					columns: [
						{
							label: '排序',
							width: '95px',
							prop: 'sort'
						},
						{
							label: '礼物名称',
							width: '95px',
							prop: 'gift_name'
						},
						{
							label: '礼物图片',
							isimg: true,
							prop: 'gift_photo',
							// imgWidth: '50px',
							imgHeight: '60px',
							width: '100px',
							height: '70px'
						},
						{
							label: '礼物类型',
							width: '110px',
							render: (h, params) => {
								let data = MAPDATA.SYSTEMGIFTLIST.find(item => { return item.value === params.row.gift_genre })
								return h('span', data ? data.name : '无')
							}
						},
						{
							label: '钻石价格',
							width: '95px',
							prop: 'gift_diamond'
						},
						{
							label: '礼物价值',
							width: '95px',
							render: (h, params) => {
								let text = params.row.gain_price ? params.row.gain_price + '喵粮' : ''
								return h('span', text || '无')
							}
						},
						{
							label: '平台礼物抽成',
							width: '110px',
							render: (h, params) => {
								let text = params.row.gift_rate ? params.row.gift_rate / 100 + '%' : ''
								return h('span', text || '无')
							}
						},
						{
							label: '状态',
							render: (h, params) => {
								let data = MAPDATA.LIBRARYGIFTSLIST.find(item => { return item.value === params.row.status })
								return h('span', {
									style: {
										color: params.row.status === 1 ? '#67C23A' : '#F56C6C'
									}
								}, data ? data.name : '无')
							}
						},
						{
							label: '礼物说明',
							width: '110px',
							render: (h, params) => {
								return h('span', params.row.gift_desc || '无')
							}
						},
						{
							label: '礼物生效时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物失效时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物添加时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物修改时间',
							width: '180px',
							render: (h, params) => {
								return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
							}
						},
						{
							label: '礼物版本号',
							width: '95px',
							render: (h, params) => {
								return h('span', params.row.gift_version || '无')
							}
						},
						{
							label: '操作',
							width : '120px',
							fixed: 'right',
							render: (h, params) => {
								return h('div', [
									h('el-button', { props : { type: 'primary'}, style: {
										display: params.row.status === 1 ? 'unset' : 'none'
									}, on: {click:()=>{this.update(params.row)}}}, '修改')
									// h('el-button', { props : { type: 'danger'}, style: {
									// 	display: params.row.status === 2 ? 'unset' : 'none'
									// }, on: {click:()=>{this.handleEdit(params.row)}}}, '删除')
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
					status: s.status
				}
			},
			// 刷新列表
			getList() {
				this.$refs.tableList.getData()
			},
			// 重置
			reset() {
				this.searchParams = {
					status: ''
				}
				this.getList()
			},
			// 查询
			onSearch() {
				this.getList()
			},
			// 新增
			add() {
				this.load('add')
			},
			// 修改
			update(row) {
				this.load('update', row)
			},
			load(status, row) {
				this.isDestoryComp = true
				setTimeout(() => {
					this.$refs.giftAdd.loadParams(status, row)
				}, 50);
			},
			// 销毁组件
			destoryComp() {
				this.isDestoryComp = false
			},

			// 暂时保留 - 这个好像没什么用
			handleGiftRefresh() {
				this.$prompt('请输入缓存刷新密码', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(res => {
					if (res.value == "888888") {
						getGiftRefresh().then(row => {
							console.log(row)
						}).catch(err => {
							this.$message.error(err)
						})
					} else {
						this.$message.error("请输入正确的密码")
					}
				}).catch(() => {});
			}
		}
	}
</script>
<style lang="scss">
.gift-list-box {
	padding: 20px;
	box-sizing: border-box;
}
</style>
