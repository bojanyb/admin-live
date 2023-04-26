<template>
  <div class="app-container">
    <div class="searchParams">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
    </div>
    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 封禁组件 -->
    <blocked ref="blocked" @evaluationFunc="evaluationFunc"></blocked>
  </div>
</template>

<script>
import {
  getFeedBackSave
} from '@/api/videoRoom'
// 引入api
import { getRoomSave } from '@/api/videoRoom.js'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入封禁组件
import blocked from '@/views/voiceroom/user/components/blocked.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'

export default {
  name: 'ReportList',
  components: {
    SearchPanel,
    tableList,
    blocked
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
          name: 'room_number',
          type: 'input',
          value: '',
          label: '房间ID',
          isNum: true,
          placeholder: '请输入房间ID'
        },
        {
          name: 'user_number',
          type: 'input',
          value: '',
          label: '举报人ID',
          isNum: true,
          placeholder: '请输入举报人ID'
        },
      ]
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.report,
        columns: [
          {
            label: '被举报房主ID',
            prop: 'live_user_number',
            minWidth: '120px'
          },
          {
            label: '直播场次ID',
            prop: 'live_room_id',
            minWidth: '120px'
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
            label: '房间类型名称',
            prop: 'room_genre_name',
            minWidth: '120px'
          },
          {
            label: '举报人ID',
            prop: 'user_number'
          },
          {
            label: '举报人名称',
            prop: 'user_name',
            minWidth: '120px'
          },
          {
            label: '举报内容',
            width: '160px',
            prop: 'content'
          },
          {
            label: '举报时间',
            width: '160px',
            prop: 'create_time',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          // {
          //   label: '状态',
          //   prop: 'status',
          //   render: (h, params) => {
          //     let data = MAPDATA.REPORTSTATUS.find(item => { return params.row.status == item.value })
          //     return h('span', data ? data.name : '无')
          //   }
          // },
          {
            label: '操作',
            width: '200px',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.FeedBackFunc(params.row, 2)}}},'处理'),
                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.loseSight(params.row, 3)}}},'忽略')
              ])
            }
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
        status: '1',
        room_number: s.room_number,
        user_number: s.user_number
      }
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData()
    },
    // 封禁
    FeedBackFunc(row, status) {
      this.status = status
      this.loadParams = row
      this.$refs.blocked.dialogVisible = true
      setTimeout(() => {
        this.$refs.blocked.resetForm('ruleForm')
      }, 10);
    },
    // 忽略
    loseSight(row, status) {
      this.status = status
      this.loadParams = row
      this.handleChange()
    },
    // 封禁参数
    async evaluationFunc(row) {
      let params = {
        status: 3,
        banned_remark: row.remark,
        banned_duration: row.kill_time,
        room_number: this.loadParams.room_number,
      }
      await getRoomSave(params)
      this.handleChange()
    },
    // 审核 - 处理
    async handleChange() {
      let params = {
        id: this.loadParams.id,
        status: this.status
      }
      let res = await getFeedBackSave(params)
      if(res.code === 3000) {
        this.$message.success('操作成功')
      }
      this.getList()
    }
  }
}
</script>
