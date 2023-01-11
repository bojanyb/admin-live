<!-- banner图片配置 -->
<template>
    <div class="banner-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <!-- 汇总数据 -->
        <el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
          <div class="box-card-inner">
            <div>获得碎片人数：{{sumSource.user_count || 0}}人</div>
            <div>获得碎片次数：{{sumSource.puzzle_count || 0}}次</div>
            <div>总获得碎片数量：{{sumSource.puzzle_total_count || 0}}个</div>
          </div>
        </el-card>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
import REQUEST from '@/request/index.js'
// api 引用
import { sourceType } from '@/api/activity'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
export default {
    components: {
        tableList,
        SearchPanel,
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
                    name: 'type_name',
                    type: 'select',
                    value: null,
                    keyName: 'type',
                    optionLabel: 'name',
                    label: '碎片来源',
                    placeholder: '请选择',
                    clearable: true,
                    options: this.sourceType
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
                url: REQUEST.activity.getPuzzleLog,
                columns: [
                    {
                        label: '时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY/MM/DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '用户昵称',
                        prop: 'nickname'
                    },
                    {
                        label: '碎片来源',
                        prop: 'remark',
                    },
                     {
                        label: '碎片数量',
                        prop: 'number',
                    },
                ]
            }
        },
    },
    data() {
        return {
          sumSource: {
            user_count: 0,
            puzzle_count: 0,
            puzzle_total_count: 0,
          },
          sourceType: []
        };
    },
    mounted() {
      this.getSourceType()
    },
    methods: {
        // 碎片来源类型
        async getSourceType(){
          let res = await sourceType()
          if(res.code + "" === "2000"){
            this.sourceType = res.data.typeArr
            console.log("🚀 ~ file: jigsawDebris-list.vue:131 ~ getSourceType ~ this.sourceType", this.sourceType)
          }
        },
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
                type_name: s.type_name,
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
        // 加载
        load(status,row) {
            setTimeout(() => {
                this.$refs.add.dialogVisible = true
                this.$refs.add.load(status, row)
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