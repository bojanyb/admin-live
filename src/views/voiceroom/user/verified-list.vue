// 实名列表
<template>
  <div class="app-container">
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
    </div>

		<tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 实名详情组件 -->
    <verifiedComp ref="verifiedComp"></verifiedComp>
  </div>
</template>

<script>
// 引入实名详情组件
import verifiedComp from './components/verifiedComp.vue'
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

export default {
  name: 'VerifiedList',
  components: {
    SearchPanel,
    tableList,
    verifiedComp
  },
  mixins: [mixins],
  data() {
    return {
      
    }
  },
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
          name: 'user_phone',
          type: 'input',
          value: '',
          label: '手机号',
          isNum: true,
          placeholder: '请输入手机号'
        },
      ]
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.user.autonymlist,
        columns: [
          {
            label: '用户ID',
            prop: 'user_id'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '昵称',
            showOverFlow: true,
            render: (h, params) => {
              return h('span', params.row.nickname || '无')
            }
          },
          {
            label: '手机号',
            render: (h, params) => {
              return h('span', params.row.phone || '无')
            }
          },
          {
            label: '身份证号',
            prop: 'id_card',
            render: (h, params) => {
              let data = params.row.id_card.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2")
              return h('span', data || '无')
            }
          },
          {
            label: '认证时间',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          }
        ]
      }
    }
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams }
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        user_phone: s.user_phone
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
    }
  }
}
</script>
