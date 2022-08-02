<template>
  <div class="app-container">
    
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
    </div>

    <div class="model">
      <span>用户收入统计：{{ ruleForm.total_income_sum || 0 }}</span>
      <span>用户支出统计：{{ ruleForm.meow_expenditure_sum || 0 }}</span>
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
          name: 'relation_type',
          type: 'select',
          value: '',
          keyName: 'code',
          optionLabel: 'name',
          label: '交易渠道',
          placeholder: '请选择交易渠道',
          options: this.jsonMapList
        },
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
              let num = params.row.diamond ? Number(params.row.diamond) : params.row.diamond
              return h('span', num ? params.row.genre === 1 ? `+ ${params.row.diamond}` : `- ${params.row.diamond}` : params.row.diamond)
            }
          },
          {
            label: '余额',
            render: (h, params) => {
              return h('span', params.row.balance || '0')
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
            label: '渠道',
            prop: 'relation_type_name'
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
      ruleForm: {}
    }
  },
  created() {
    this.getRelationTypeFunc()
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams }
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        trade_no: s.trade_no,
        genre: s.genre,
        relation_type: s.relation_type
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
    async getRelationTypeFunc() {
      let res = await getAdminRelationType()
      if(res.data.list && res.data.list.length > 0) {
        res.data.list.unshift({
          code: '',
          name: '全部'
        })
      }
      this.jsonMapList = res.data.list
    },
    saleAmunt(row) {
      this.ruleForm = { ...row.total_sum }
    }
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
