<template>
	<div class="page-container">
		<div class="searchParams">
			<SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset"
				@onSearch="onSearch"></SearchPanel>
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
// 引入公共参数
import mixins from '@/utils/mixins.js'

export default {
	mixins: [mixins],
	components: {
		tableList,
		SearchPanel
	},
	data() {
		return {
			tabIndex: '0',
			giftNameList: [], // 礼物名称
            dateTimeParams: {},
		}
	},
	computed: {
		forms() {
			return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '收礼方ID',
                    isNum: true,
                    linkage: true,
                    placeholder: '请输入收礼方ID'
                },
				{
                    name: 'to_user_number',
                    type: 'input',
                    value: '',
                    label: '送礼方ID',
                    isNum: true,
                    linkage: true,
                    placeholder: '请输入送礼方ID'
                }
			]
		},
		cfgs() {
			return {
				vm: this,
				url: REQUEST.activity.getCpRankingV520,
				columns: [
					{
						label: '排名',
						width: '180px',
                        prop: 'ranking'
					},
					{
                        label: '收礼方ID',
						render: (h, params) => {
                            return h('span', params.row.user.user_number)
                        }
                    },
                    {
                        label: '收礼方昵称',
						render: (h, params) => {
                            return h('span', params.row.user.nickname)
                        }
                    },
                    {
                        label: '送礼方ID',
                        render: (h, params) => {
                            return h('span', params.row.to_user.user_number)
                        }
                    },
                    {
                        label: '送礼方昵称',
                        render: (h, params) => {
                            return h('span', params.row.to_user.nickname)
                        }
                    },
                    {
                        label: '甜蜜值',
                        prop: 'value',
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



