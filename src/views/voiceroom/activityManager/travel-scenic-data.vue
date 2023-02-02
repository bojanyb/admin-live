<!-- banner图片配置 -->
<template>
    <div class="banner-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <!-- 汇总数据 -->
        <el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
          <div class="box-card-inner">
            <div>到达景点旅行团：{{sumSource.user_count || 0}}人</div>
            <div>旅行团总人数：{{sumSource.exchange_count || 0}}个</div>
            <div>打卡人数：{{sumSource.fu_value || 0}}钻石</div>
            <div>总里程值：{{sumSource.gift_value || 0}}钻石</div>
            <div>背包流水：{{sumSource.profit_value || 0}}钻石</div>
            <div>直刷流水：{{sumSource.profit_value || 0}}钻石</div>
            <div>总流水{{sumSource.profit_value || 0}}钻石</div>
          </div>
        </el-card>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
		<!-- 详情组件 -->
		<lookComp ref="lookComp"></lookComp>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入详情组件
import lookComp from './components/lookComp.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat} from '@/utils/common.js'
export default {
    components: {
        tableList,
        SearchPanel,
        lookComp
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                  name: 'user_number',
                  type: 'input',
                  value: '',
                  label: '旅行团ID',
                  isNum: true,
                  placeholder: '请输入用户ID'
                },
                {
                  name: 'user_number',
                  type: 'input',
                  value: '',
                  label: '用户ID',
                  isNum: true,
                  placeholder: '请输入用户ID'
                },
                {
                    name: 'type_name',
                    type: 'select',
                    value: null,
                    keyName: 'type',
                    optionLabel: 'name',
                    label: '到达景点',
                    placeholder: '请选择到达景点',
                    clearable: true,
                    options: this.sourceType
                },
                {
                    name: 'type_name',
                    type: 'select',
                    value: null,
                    keyName: 'type',
                    optionLabel: 'name',
                    label: '活动流水',
                    placeholder: '请选择活动流水',
                    clearable: true,
                    options: this.sourceType1
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
                url: REQUEST.activity.exchangeLog,
                columns: [
                    {
                        label: '时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY/MM/DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '团长ID',
                        prop: 'user_number'
                    },
                    {
                        label: '团长昵称',
                        prop: 'nickname'
                    },
                    {
                        label: '旅行团ID',
                        prop: 'type_desc',
                    },
                     {
                        label: '旅行团名称',
                        prop: 'fu_number',
                    },
                    {
                        label: '到达景点',
                        prop: 'fu_value',
                    },
                    {
                        label: '团队人数',
                        prop: 'desc',
                    },
                    {
                        label: '打卡人数',
                        prop: 'gift_id',
                    },
                    {
                        label: '旅行团里程值',
                        prop: 'gift_value',
                    },
                    {
                        label: '流水',
                        prop: 'profit',
                    },
                    {
                        label: '旅行团明细',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.see(params.row)}}},'查看'),
                            ])
                        }
                    }
                ]
            }
        },
    },
    data() {
        return {
          sumSource: {
            user_count: 0,
            exchange_count: 0,
            fu_value: 0,
            gift_value: 0,
            profit_value: 0,
          },
          ruleForm: {
              alreadyMoney: null,
              deductMoney: null
          },
          msg_id: "",
          sourceType: [{name: "景点1", value: 1}, {name: "景点2", value: 2}, {name: "景点3", value: 3}],
          sourceType1: [{name: "背包流水", value: 1}, {name: "直刷流水", value: 2}],
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params ? params.page : null,
                pagesize: 10,
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
                user_number: s.user_number,
                gift_name: s.gift_name,
            }
        },
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
        // 查询
        reset() {
            this.searchParams = {}
            this.getList()
        },
        // 重置
        onSearch() {
            this.getList()
        },
        // 列表返回数据
        saleAmunt(data) {
          this.sumSource = data.data
        },
        // 查看
      see(row) {
          this.$refs.lookComp.dialogVisible = true
          this.load('see', row)
        },
        // 加载
        load(status,row) {
            setTimeout(() => {
                this.$refs.lookComp.load(status, row)
            }, 100);
        },
    }
}
</script>

<style lang="scss">
.banner-box {
    padding: 20px;
    box-sizing: border-box;
    .model {
        margin-bottom: 20px;
    }
    .bounce_fa {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .bounce {
            position: absolute;
            left: 0;
            font-size: 17px;
            color: #ff4949;
            font-weight: 600;
            transform: translateY(5px);
            animation: bounce 1s infinite;
        }

        @keyframes bounce {
            0% {
                transform: translateY(5px);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(5px);
            }
        }
    }
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
		.el-card__body{
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
