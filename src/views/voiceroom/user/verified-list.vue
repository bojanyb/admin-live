<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;" />

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="用户ID" prop="user_id" align="center" width="95" />
      <el-table-column label="姓名" prop="name" align="center" width="160" show-overflow-tooltip />
      <el-table-column label="昵称" prop="nickname" align="center"  show-overflow-tooltip />
      <el-table-column label="手机号" prop="phone" align="center" />
      <el-table-column label="身份证号" prop="id_card" align="center" />
      <el-table-column label="认证时间" prop="create_timeText" align="center" />
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getVerify"
    />
  </div>
</template>

<script>
import {
  getVerifyList
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'VerifiedList',
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: false,
      total: 0,
      formLabelWidth: '120px',
      page: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getVerify()
  },
  methods: {
    getVerify() {
      this.listLoading = true
      var params = {
        'page': this.page.page,
        'pagesize': this.page.limit
      }
      getVerifyList(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        this.list.map(res => {
          res.create_timeText = moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
        })
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    }
  }
}
</script>
