<template>
	<div>
		<tableList :cfgs="cfgs" ref="tableList"></tableList>

		<!-- 新增 - 编辑组件 -->
		<editQrCodeComp ref="editQrCodeComp" v-if="isDestoryComp" @destoryComp="destoryComp" :type="1" @getList="getList">
		</editQrCodeComp>
	</div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入详情组件
import editQrCodeComp from './editQrCodeComp.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
	name: 'guild-list',
	mixins: [mixins],
	components: {
		tableList,
		editQrCodeComp,
	},
	data() {
		return {
			isDestoryComp: false,
			status: null,
			ruleForm: {},
			guildTypeList: [],
			operatorList: [],
			isAuth: 0
		}
	},
	computed: {
		cfgs() {
			let columnsList = [];
			let arr1 = [
				{
					label: '序号',
					prop: 'id',
				},
				{
					label: '公会运营',
					prop: 'username'
				},
				{
					label: '公会二维码',
					isimg: true,
					prop: 'wechat_code',
					imgWidth: '50px',
					imgHeight: '50px'
				},
			]
			let arr2 = [
				{
					label: '操作',
					fixed: 'right',
					render: (h, params) => {
						return h('div', [
							h('el-button', {
								props: { type: 'primary' },
								on: { click: () => { this.update(params.row) } }
							}, '编辑'),
						])
					}
				}
			]
			if (this.permissionArr.includes('GuildOperate@saveWechatCode')) {
				columnsList = arr1.concat(arr2);
			} else {
				columnsList = arr1;
			}
			return {
				vm: this,
				url: REQUEST.guild.guildOperateList,
				columns: columnsList
			}
		}
	},
	created() { },
	methods: {
		// 刷新列表
		getList() {
			this.$refs.tableList.getData()
		},
		// 修改
		update(row) {
			this.load('update', row)
		},
		load(status, row) {
			this.isDestoryComp = true
			setTimeout(() => {
				this.$refs.editQrCodeComp.loadParams(status, row)
			}, 50);
		},
		// 销毁组件
		destoryComp() {
			this.isDestoryComp = false
		},

		// 获取公会类型
		async getTypeList() {
			const response = await getGuildType()
			if (response.code === 2000) {
				const tempArr = Array.from(
					Array.isArray(response.data.list) ? response.data.list : []
				)
				this.guildTypeList = tempArr.reduce((prev, curr) => {
					prev.push({
						name: curr.remark,
						value: curr.type
					})
					return prev
				}, []) || []
			}
		},
	}
}
</script>

<style lang="scss" scoped="scoped"></style>
