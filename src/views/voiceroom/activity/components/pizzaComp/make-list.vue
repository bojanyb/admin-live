<template>
	<div class="page-container">
		<div class="searchParams">
			<SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset"
				@onSearch="onSearch"></SearchPanel>
		</div>
        <el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
			<div class="box-card-inner">
				<div>制作人数：{{sumSource.user_count || 0}}人</div>
				<div>培根披萨数：{{sumSource.bacon_pizza_count || 0}}个</div>
                <div>榴莲披萨数：{{sumSource.durian_pizza_count || 0}}个</div>
                <div>加速数量：{{sumSource.speed_up_count_num || 0}}个</div>
				<div>加速钻石：{{sumSource.speed_up_count_diamond || 0}}钻石</div>
			</div>
		</el-card>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
// 引入api
import { getPizzaGift } from '@/api/activity'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'

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
            sumSource: {},
            markTypeList : [
                {
                    id: 0,
                    name : "全部"
                },
                {
                    id: 1,
                    name : "制作"
                },
                {
                    id: 2,
                    name : "签到"
                }
            ],
            pizzaNameList: [
                {
                    id : "",
                    name : "全部"
                },
                {
                    id : "bacon_pizza",
                    name : "培根披萨"
                },
                {
                    id : "durian_pizza",
                    name : "榴莲披萨"
                }
            ]
		}
	},
	computed: {
		forms() {
			return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '制作人ID',
                    isNum: true,
                    linkage: true,
                    placeholder: '请输入制作人ID'
                },
                {
                    name: 'pizza_code',
                    type: 'select',
                    value: "全部",
                    keyName: 'id',
                    optionLabel: 'name',
                    label: '披萨名称',
                    placeholder: '请选择',
                    options: this.pizzaNameList,
                },
                {
                    name: 'type',
                    type: 'select',
                    value: "全部",
                    keyName: 'id',
                    optionLabel: 'name',
                    label: '制作方式',
                    placeholder: '请选择',
                    options: this.markTypeList,
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    label: '时间选择',
                    value: '',
                    linkage: true,
                    handler: {
                        change: v => {
                            this.emptyDateTime()
                            this.setDateTime(v)
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                        }
                    }
                }
			]
		},
		cfgs() {
			return {
				vm: this,
				url: REQUEST.activity.getPizzaGiftProduceLog,
				columns: [
					{
						label: '制作开始时间',
						width: '180px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
					},
					{
                        label: '制作方式',
                        render: (h, params) => {
                            let mark = this.markTypeList.find(item => { return item.id == params.row.type })
                            return h('span', mark.name)
                        }
                    },
                    {
                        label: '制作人ID',
                        prop: 'user_number'
                    },
                    {
                        label: '制作人昵称',
                        prop: 'nickname',
                    },
                    {
                        label: '披萨名称',
                        prop: 'pizza_name',
                    },
                    {
                        label: '数量',
                        render: (h, params) => {
                            return h('span', params.row.num || 0)
                        }
                    },
                    {
                        label: '加速数量',
                        render: (h, params) => {
                            return h('span', params.row.speed_num || 0)
                        }
                    },
                    {
                        label: '加速钻石',
                        render: (h, params) => {
                            return h('span', params.row.cost_diamond || 0)
                        }
                    }
				]
			}
		}
	},
	mounted() {
        this.getPoolNameSource();
    },
	methods: {
		// 配置参数
		beforeSearch(params) {
			let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
                user_number: s.user_number,
                pizza_code: (s.pizza_code == -1 || s.pizza_code == "全部") ? "" : s.pizza_code,
                type: (s.type == -1 || s.type == "全部") ? "" : s.type,
            }
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
		// 刷新列表
		getList() {
			this.$refs.tableList.getData()
		},
		// 重置
		reset() {
			this.searchParams = {}
            this.dateTimeParams = {}
			this.getList()
		},
		// 查询
		onSearch() {
			this.getList()
		},
		// table 返回数据
		saleAmunt(row) {
			this.sumSource = row.data
		},
        // 获取礼物名称
        async getPoolNameSource() {
            let res = await getPizzaGift();
            if(res.code == 2000){
                this.giftNameList = res.data.list;
                let all = {gift_id: 0, gift_name: "全部"}
                this.giftNameList.unshift(all)
            }
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
    height: 33rem !important;
}
</style>



