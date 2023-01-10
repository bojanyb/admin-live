<!-- banner图片配置 -->
<template>
    <div class="banner-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" :show-batch-rurn="true" 
            batchRurnName="导出EXCEL"
            @BatchRurn="BatchRurn"
            ></SearchPanel>
        </div>
        <!-- 汇总数据 -->
        <el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
          <div class="box-card-inner">
            <div>抽奖人数：{{sumSource.user_count || 0}}人</div>
            <div>抽奖次数：{{sumSource.lottery_count || 0}}次</div>
            <div>总消耗拼图数量：{{sumSource.lottery_count || 0}}次</div>
          </div>
        </el-card>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
        <!-- 详情组件 -->
        <discussComp v-if="isDestoryComp" ref="discussComp" :msg_id="msg_id" @destoryComp="destoryComp"></discussComp>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入api
import { getCashHisityAll } from '@/api/finance.js'
// 引入公共方法
import { timeFormat,exportTableData } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 详情组件
import discussComp from './components/jigsawDiscussComp.vue'
export default {
    components: {
        tableList,
        SearchPanel,
        discussComp,
    },
    mixins: [mixins],
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
                },
                {
                  name: 'user_number',
                  type: 'input',
                  value: '',
                  label: '奖品ID',
                  isNum: true,
                  placeholder: '请输入奖品ID'
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
                url: REQUEST.activity.resourceList,
                columns: [
                    {
                        label: '抽奖时间',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY/MM/DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '抽奖人ID',
                        prop: 'name'
                    },
                    {
                        label: '抽奖人昵称',
                        prop: 'name'
                    },
                    {
                        label: '抽奖人次数',
                        prop: 'sort',
                    },
                     {
                        label: '奖品名称',
                        prop: 'sort',
                    },
                     {
                        label: '奖品ID',
                        prop: 'sort',
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.detail(params.row)}}},'详情')
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
            user_count : 0,
            lottery_count : 0,
            lottery_count : 0,
          },
          ruleForm: {
              alreadyMoney: null,
              deductMoney: null
          },
          isDestoryComp: false, // 销毁组件
          msg_id: "",
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
                start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
                end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
                type: s.type,
                name: s.name,
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
            // this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
        },
        // 加载
        load(status,row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.add.dialogVisible = true
                this.$refs.add.load(status, row)
            }, 100);
        },
        // 详情
        detail(row){
          this.msg_id = row.id
          this.isDestoryComp = true
          setTimeout(() => {
              this.$refs.discussComp.dialogVisible = true
          }, 50);
        },
         // 导出excel
        async BatchRurn() {
            let s = this.beforeSearch()
            delete s.page
            let res = await getCashHisityAll(s)
            let arr = JSON.parse(JSON.stringify(res.data.list))
            if(arr.length <= 0) return this.$warning('当前没有数据可以导出')
            arr = arr.map((item,index) => {
                let name = MAPDATA.STATUSLIST.find(a => { return a.value === item.status })
                let params = {
                    user_id: item.user_id,
                    addtime: timeFormat(item.addtime, 'YYYY-MM-DD HH:mm:ss', true),
                    money: item.money,
                    applyMoney: item.money / 100,
                    cash_rate: item.rate_money,
                    toMoney: item.status != 3 ? item.real_money / 100 : item.money / 100,
                }
                return params
            })
            let nameList = ['抽奖时间','抽奖人ID','抽奖人昵称', '抽奖人次数','奖品名称','奖品ID']
            exportTableData(arr, nameList, '拼图抽奖记录')
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
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