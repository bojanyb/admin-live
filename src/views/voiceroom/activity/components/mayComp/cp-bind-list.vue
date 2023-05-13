<template>
	<div class="page-container">
		<div class="searchParams">
			<SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" :show-add="true" add-name="新增"
				@onSearch="onSearch" @add="add"></SearchPanel>
		</div>
		<tableList :cfgs="cfgs" ref="tableList"></tableList>
		<addBind ref="addBind" v-if="isAdd" @handleBind="handleBind"/>
	</div>
</template>

<script>
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'

export default {
	mixins: [mixins],
	components: {
		tableList,
		SearchPanel,
		addBind: () => import("./addBind.vue"),
	},
	data() {
		return {
			isAdd: false,
			tabIndex: '0',
			giftNameList: [], // 礼物名称
			searchParams: {},
		}
	},
	computed: {
		forms() {
			return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '发起方ID',
                    isNum: true,
                    linkage: true,
                    placeholder: '请输入发起方ID'
                },
				{
                    name: 'to_user_number',
                    type: 'input',
                    value: '',
                    label: '接收方ID',
                    isNum: true,
                    linkage: true,
                    placeholder: '请输入接收方ID'
                }
			]
		},
		cfgs() {
			return {
				vm: this,
				url: REQUEST.activity.getCpLogV520,
				columns: [
					{
						label: '绑定时间',
						width: '180px',
                        prop: 'create_time'
					},
					{
                        label: '发起方ID',
                        render: (h, params) => {
                            return h('span', params.row.user.user_number ? params.row.user.user_number : '--')
                        }
                    },
                    {
                        label: '发起方昵称',
                        render: (h, params) => {
                            return h('span', params.row.user.nickname ? params.row.user.nickname : '--')
                        }
                    },
                    {
                        label: '接收方ID',
                        render: (h, params) => {
                            return h('span', params.row.to_user.user_number ? params.row.to_user.user_number : '--')
                        }
                    },
                    {
                        label: '接收方昵称',
                        render: (h, params) => {
                            return h('span', params.row.to_user.nickname ? params.row.to_user.nickname : '--')
                        }
                    },
                    {
                        label: '类型',
                        render: (h, params) => {
                            return h('span', params.row.type.nickn == 0 ? '邀请绑定' : '后台绑定')
                        }
                    }
				]
			}
		}
	},
	mounted() {},
	methods: {
		// 配置参数
		beforeSearch(params) {
			let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number,
				to_user_number: s.to_user_number
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
		// 新增绑定
		add() {
			this.isAdd = true
			setTimeout(() => {
				this.$refs.addBind.loadParams()
			}, 50);
		},
		// 绑定CP
		handleBind(){
			this.getList();
		},
	}
}
</script>
<style lang="scss" scoped>
.el-icon-circle-close {
	color: #FFFFFF;
}

.box-card {
	width: 100%;
	height: 40px;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	padding: 0px 30px;
	box-sizing: border-box;
	margin-bottom: 20px;

	.el-card__body {
		width: 100%;
		padding: 0;

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
    height: 34.5rem !important;
}
</style>



