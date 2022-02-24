<template>
  <div class="app-container">

    <!--工具条-->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column label="ID" prop="id" align="center" width="95" /> -->
      <el-table-column label="用户ID" prop="user_id" align="center" width="95" />
      <el-table-column label="直播场次ID" prop="live_room_id" align="center" width="95" />
      <el-table-column label="房间号码" prop="room_number" align="center" />
      <el-table-column label="房主昵称" prop="anchor" align="center" />
      <el-table-column label="房间类型名称" prop="room_genre_name" align="center" />
      <el-table-column label="举报房主ID" prop="live_user_id" align="center" width="95" />
      <el-table-column label="举报人昵称" prop="user_name" align="center" />
      <el-table-column label="举报内容" prop="content" align="center" width="160" show-overflow-tooltip />
      <el-table-column label="回复" prop="reply" align="center" />
      <el-table-column label="举报时间" prop="create_timeText" align="center" width="160" />
      <el-table-column label="状态" prop="statusText" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary" @click="handleFeedBackEdit(scope.row)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getFeedBack"
    />
    <el-dialog :title="editTitle" :visible.sync="editPop">
      <el-form :model="popForm">
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="popForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
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
            placeholder="请输入礼物说明"
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
  getFeedBackList,
  getFeedBackSave
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'ReportList',
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      loading: false,
      listLoading: false,
      total: 0,
      formLabelWidth: '120px',
      page: {
        page: 1,
        limit: 10
      },
      editTitle: '',
      editPop: false,
      popForm: {
        'id': '',
        'status': '',
        'replay': ''
      },
      statusList: [{
        'label': '未核实',
        'value': 1
      },
      {
        'label': '核实通过',
        'value': 2
      },
      {
        'label': '核实不通过',
        'value': 3
      }
      ]
    }
  },
  created() {
    this.getFeedBack()
  },
  methods: {
    getFeedBack() {
      this.listLoading = true
      var params = {
        'page': this.page.page,
        'pagesize': this.page.limit
      }
      getFeedBackList(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        this.list.map(res => {
          res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
          var status = ''
          switch (res.status) {
            case 1:
              status = '未核实'
              break
            case 2:
              status = '核实通过'
              break
            case 3:
              status = '核实不通过'
              break
          }
          res.statusText = status
        })
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },
    handleFeedBackEdit(row) {
      this.editTitle = '修改'
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
        this.getFeedBack()
        this.editPop = false
      })
    }
  }
}
</script>
