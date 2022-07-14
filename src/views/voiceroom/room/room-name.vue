<template>
  <div class="app-container">
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
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
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
  name: 'ReportList',
  components: {
    SearchPanel,
    tableList
  },
  mixins: [mixins],
  data() {
    return {
      loadParams: {},  // 当前数据
      status: null, // 状态
    }
  },
  computed: {
    forms() {
      return [
        {
          name: 'live_room_id',
          type: 'input',
          value: '',
          label: '被举报房主ID',
          isNum: true,
          placeholder: '请输入被举报房主ID'
        }
      ]
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.report,
        columns: [
		  {
            label: '举报人ID',
            prop: 'user_number'
          },
          {
            label: '直播场次ID',
            prop: 'live_room_id'
          },
          {
            label: '房间ID',
            prop: 'room_number'
          },
          {
            label: '房主昵称',
            prop: 'anchor'
          },
          {
            label: '房间类型',
            prop: 'room_genre_name'
          },
          {
            label: '举报原因',
            prop: 'content'
          },
          {
            label: '举报时间',
            prop: 'create_time',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          {
            label: '状态',
            prop: 'status',
            render: (h, params) => {
              let data = MAPDATA.AUDITSTATUSLISTTWO.find(item => { return params.row.status == item.value })
              return h('span', data ? data.name : '无')
            }
          },
		  {
            label: '操作人',
            prop: 'admin_name'
          }
        ]
      }
    }
  },
  methods: {
    // 重置
    reset() {
      this.searchParams = {}
      this.getList()
    },
    // 查询
    onSearch() {
      this.getList()
    },
    // 配置参数
    beforeSearch(params) {
      let s = this.searchParams
      return {
        page: params.page,
        pagesize: params.pagesize,
        status: '2,3',
        live_user_number: s.live_user_number
      }
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData()
    }
  }
}
</script>
