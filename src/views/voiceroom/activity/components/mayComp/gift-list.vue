<template>
	<div class="page-container">
		<div class="searchParams">
			<SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset"
				@onSearch="onSearch"></SearchPanel>
		</div>
        <el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
			<div class="box-card-inner">
				<div>送礼人数：{{sumSource.user_count || 0}}人</div>
				<div>收礼人数：{{sumSource.live_user_count || 0}}人</div>
				<div>礼物总金额：{{sumSource.gift_diamond_total || 0}}钻石</div>
			</div>
		</el-card>
		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
	</div>
</template>

<script>
// 引入api
import { getGiftList } from '@/api/activity'
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
            sumSource: {}
		}
	},
	computed: {
		forms() {
			return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '送礼人ID',
                    isNum: true,
                    linkage: true,
                    placeholder: '请输入送礼人ID'
                },
                {
                    name: 'live_user_number',
                    type: 'input',
                    value: '',
                    label: '收礼人ID',
                    linkage: true,
                    placeholder: '请输入收礼人ID'
                },
                {
                    name: 'gift_id',
                    type: 'select',
                    value: "全部",
                    keyName: 'gift_id',
                    optionLabel: 'gift_name',
                    label: '礼物名称',
                    placeholder: '请选择',
                    options: this.giftNameList,
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
				url: REQUEST.activity.giftLogList,
				columns: [
					{
						label: '时间',
						width: '180px',
                        prop: 'create_time'
					},
					{
                        label: '送礼人ID',
                        prop: 'user_number'
                    },
                    {
                        label: '送礼人昵称',
                        prop: 'nickname',
                    },
                    {
                        label: '收礼人ID',
                        prop: 'live_user_number'
                    },
                    {
                        label: '收礼人昵称',
                        prop: 'live_nickname',
                    },
                    {
                        label: '礼物名称',
                        prop: 'gift_name',
                    },
                    {
                        label: '数量',
                        prop: 'gift_num',
                    },
                    {
                        label: '单价',
                        prop: 'gift_diamond',
                    },
                    {
                        label: '礼物总价值',
                        render: (h, params) => {
                            return h('span', params.row.gift_diamond * params.row.gift_num)
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
                live_user_number: s.live_user_number,
                gift_id: (s.gift_id == -1 || s.gift_id == "全部") ? "" : s.gift_id,
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
            let res = await getGiftList();
            if(res.code == 2000){
                this.giftNameList = res.data.list;
                let all = {gift_id: 0, gift_name: "全部"}
                this.giftNameList.unshift(all)
            }
        },
	}
}
</script>
<style lang="scss">
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
</style>



