<template>
  <div class="app-container">
    <div class="model">
      <span>用户收入统计：{{ ruleForm.total_income_sum ? Number(ruleForm.total_income_sum) : 0 }}</span>
      <span>用户支出统计：{{ ruleForm.meow_expenditure_sum ? Number(ruleForm.meow_expenditure_sum) : 0 }}</span>
    </div>
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
    </div>

		<tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
  </div>
</template>

<script>
// 引入api
import { getAdminRelationType } from '@/api/videoRoom'
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
  name: 'userBalance-list',
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
          name: 'trade_no',
          type: 'input',
          value: '',
          label: '交易流水号',
          placeholder: '请输入交易流水号'
        },
        {
          name: 'genre',
          type: 'select',
          value: '',
          keyName: 'value',
          optionLabel: 'name',
          label: '交易类型',
          placeholder: '请选择交易类型',
          options: MAPDATA.USERBALANCETYPE
        },
        {
          name: "relation_type",
          type: "cascader",
          value: null,
          keyName: "value",
          optionLabel: "label",
          label: "交易渠道",
          placeholder: "请选择",
          filterable: true,
          clearable: true,
          collapse: true,
          options: this.jsonMapList,
          props: { multiple: true }
        },
        {
          name: 'dateTimeParams',
          type: 'datePicker',
          dateType: 'datetimerange',
          format: "yyyy-MM-dd HH:mm:ss",
          label: '时间选择',
          value: '',
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
        url: REQUEST.deal.diamondLog,
        columns: [
          {
            label: '时间',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          {
            label: '用户ID',
            prop: 'user_number'
          },
          {
            label: '金额',
            render: (h, params) => {
              let num = params.row.diamond ? Number(params.row.diamond) : 0
              return h('span', num ? params.row.genre === 1 ? `+ ${Number(params.row.diamond)}` : `- ${Number(params.row.diamond)}` : Number(params.row.diamond))
            }
          },
          {
            label: '余额',
            render: (h, params) => {
              return h('span', params.row.balance ? Number(params.row.balance) : '0')
            }
          },
          {
            label: '类型',
            render: (h, params) => {
              let data = MAPDATA.USERBALANCETYPE.find(item => { return params.row.genre === item.value })
              return h('span', data ? data.name : '无')
            }
          },
          {
            label: '主渠道',
            prop: 'relation_type_name'
          },
          {
            label: '子渠道',
            prop: 'relation_sub_type_name'
          },
          {
            label: '交易流水号',
            render: (h, params) => {
              let data = params.row.genre === 1 ? params.row.relation_trade_no : params.row.trade_no
              return h('span', data ? data : '无')
            }
          }
        ]
      }
    }
  },
  components: {
    SearchPanel,
    tableList
  },
  data() {
    return {
      jsonMapList: [],
      ruleForm: {},
      searchParams: {
        dateTimeParams: [new Date(timeFormat(new Date(), 'YYYY-MM-DD', false) + ' 00:00:00'), new Date(timeFormat(new Date(), 'YYYY-MM-DD', false) + ' 23:59:59')]
      },
      dateTimeParams: {
        start_time: new Date(timeFormat(new Date(), 'YYYY-MM-DD', false) + ' 00:00:00'),
        end_time: new Date(timeFormat(new Date(), 'YYYY-MM-DD', false) + ' 23:59:59')
      }
    }
  },
  created() {
    this.getRelationTypeFunc()
    this.changeIndex(0, true)
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams }
      let data = s.relation_type ? JSON.parse(JSON.stringify(s.relation_type)) : []
      const result = data.reduce((prev, curr) => {
        curr.map((item, index) => {
          if (index !== 0) {
            prev.push(item)
          }
        })
        return prev
      }, []).join(',')
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        trade_no: s.trade_no,
        genre: s.genre,
        relation_type: (result && result.length) ? result : "",
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0
      }
    },
    // 刷新列表
    getList() {
      if(this.$refs.tableList) {
        this.$refs.tableList.getData()
      }
    },
    // 重置
    reset() {
      this.changeIndex(0, false)
      this.searchParams = {}
      this.getList()
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
    // 查询
    onSearch() {
      this.getList()
    },
    async getRelationTypeFunc() {
      let res = await getAdminRelationType()

      const result = res.data.list.reduce((prev, curr) => {
        const temp = {
          value: curr.code + '',
          label: curr.name,
          children: curr.child.map(item => {
            return {
              value: item.code + '',
              label: item.name,
            }
          })
        }
        prev.push(temp)
        return prev;
      }, [])

      this.jsonMapList = result
    },
    saleAmunt(row) {
      this.ruleForm = { ...row.total_sum }
      let time = JSON.parse(JSON.stringify(this.dateTimeParams));
      this.$set(this.searchParams, 'dateTimeParams', [time.start_time,time.end_time]);
    },
    // 更改日期
    changeIndex(index, isFirst) {
      let date = new Date()
      let now, now1, start, end;
      switch (index) {
          case 0:
              now1 = timeFormat(date, 'YYYY-MM-DD', false)
              now = timeFormat(date, 'YYYY-MM-DD', false)
              break;
          case 1:
              now1 = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
              now = timeFormat(date - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD', false)
              break;
          case 2:
              now1 = timeFormat(date, 'YYYY-MM-DD', false)
              now = timeFormat(date - 3600 * 1000 * 24 * 6, 'YYYY-MM-DD', false)
              break;
      }
      start = new Date(now + ' 00:00:00')
      if( index == 0) {
        end = new Date(timeFormat(date, 'YYYY-MM-DD HH:mm:ss', false))
      } else {
        end = new Date(now1 + ' 23:59:59')
      }
      if(isFirst) {
        let timer = setTimeout(() => {
          let time = [start.getTime(), end.getTime()]
          this.searchParams.dateTimeParams = time
          this.dateTimeParams.start_time = time[0]
          this.dateTimeParams.end_time = time[1]
          clearTimeout(timer)
        }, 200);
      } else {
        let time = [start.getTime(), end.getTime()]
        this.searchParams.dateTimeParams = time
        this.dateTimeParams.start_time = time[0]
        this.dateTimeParams.end_time = time[1]
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .model {
        width: 100%;
        height: 40px;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        padding: 0px 30px;
        box-sizing: border-box;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
        margin-bottom: 20px;
        >span {
            font-size: 15px;
            color: #fff;
            margin-right: 100px;
        }
    }
</style>
