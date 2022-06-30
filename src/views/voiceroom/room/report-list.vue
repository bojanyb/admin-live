<template>
  <div class="app-container">
    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <el-dialog :title="editTitle" :visible.sync="editPop">
      <el-form :model="popForm">
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="popForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="处理结果" :label-width="formLabelWidth">
          <el-input
            v-model="popForm.replay"
            type="textarea"
            :rows="5"
            style="width: 335px;"
            placeholder="请输入处理结果"
            clearable
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPop = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFeedBackSave
} from '@/api/videoRoom'

// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
  name: 'ReportList',
  components: {
    tableList
  },
  data() {
    return {
      loading: false,
      formLabelWidth: '120px',
      editTitle: '',
      editPop: false,
      popForm: {
        'id': '',
        'status': '',
        'replay': ''
      },
      statusList: MAPDATA.REPORTSTATUS
    }
  },
  computed: {
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.report,
        columns: [
          {
            label: '用户ID',
            prop: 'user_number'
          },
          {
            label: '直播场次ID',
            prop: 'live_room_id'
          },
          {
            label: '房间号码',
            prop: 'room_number'
          },
          {
            label: '房主昵称',
            prop: 'anchor'
          },
          {
            label: '房间类型名称',
            prop: 'room_genre_name'
          },
          {
            label: '举报房主ID',
            prop: 'live_user_number'
          },
          {
            label: '举报人昵称',
            prop: 'user_name'
          },
          {
            label: '举报内容',
            width: '160px',
            prop: 'content'
          },
          {
            label: '回复',
            width: '200px',
            render: (h, params) => {
              return h('span', params.row.reply || '无')
            }
          },
          {
            label: '举报时间',
            width: '160px',
            prop: 'create_time',
            render: (h, params) => {
              return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
            }
          },
          {
            label: '状态',
            prop: 'status',
            render: (h, params) => {
              let data = MAPDATA.REPORTSTATUS.find(item => { return params.row.status == item.value })
              return h('span', data ? data.name : '无')
            }
          },
          {
            label: '操作',
            render: (h, params) => {
              return h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.handleFeedBackEdit(params.row)}}},'审核')
            }
          }
        ]
      }
    }
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      return {
        page: params.page,
        pagesize: params.pagesize,
        status: '1'
      }
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData()
    },
    handleFeedBackEdit(row) {
      this.editTitle = '审核'
      this.popForm = {
        'id': row.id,
        'status': row.status,
        'replay': row.replay
      }
      this.editPop = true
    },
    handleChange() {
      if (this.popForm.status == 1) {
        this.$message.error('请先选择处理状态')
        return
      }
      getFeedBackSave(this.popForm).then(res => {
        this.getList()
        this.editPop = false
      })
    }
  }
}
</script>
