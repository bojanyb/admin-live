<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @keyup.enter.native="getUserInfo()">
        <el-form-item label="用户ID">
          <el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入用户ID" clearable />
        </el-form-item>
        <el-form-item label="排序类型">
          <el-select v-model="filters.order" placeholder="请选择" @change="getUserInfo">
            <el-option label="全部" value="" />
            <el-option key="gain_total" label="按照收入喵粮总数排序" value="gain_total" />
            <el-option key="live_time" label="按照直播时长排序" value="live_time" />
            <el-option key="user_rank" label="按照用户消费等级排序" value="user_rank" />
            <el-option key="live_rank" label="按照直播头衔排序" value="live_rank" />
            <el-option key="income" label="按照礼物总价值排序" value="income" />
            <el-option key="diamond_total" label="按照消费钻石总数排序" value="diamond_total" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="filters.sort" placeholder="请选择" @change="getUserInfo">
            <el-option label="全部" value="" />
            <el-option key="asc" label="正序" value="asc" />
            <el-option key="desc" label="倒序" value="desc" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserInfo">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

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
      <el-table-column label="直播头衔" prop="live_rank" align="center" width="95" />
      <el-table-column label="消费等级名称" prop="rank_name" align="center" width="200" show-overflow-tooltip />
      <el-table-column label="头衔名称" prop="live_rank_name" align="center" />
      <el-table-column label="用户消费等级" prop="user_rank" align="center" />
      <el-table-column label="消费钻石总数" prop="diamond_total" align="center" />
      <el-table-column label="总支出" prop="spending" align="center" />
      <el-table-column label="直播时长" prop="live_time" align="center" />
      <el-table-column label="收入喵粮总数" prop="gain_total" align="center" />
      <el-table-column label="礼物总价值" prop="income" align="center" />
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getUserInfo"
    />
  </div>
</template>

<script>
import {
  getUserInfoList
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'UserinfoList',
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
      filters: {
        'id': '',
        'order': '',
        'sort': ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.listLoading = true
      var params = {
        'id': this.filters.id,
        'order': this.filters.order,
        'sort': this.filters.sort,
        'page': this.page.page,
        'pagesize': this.page.limit
      }
      getUserInfoList(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        this.list.map(res => {
          res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:MM:SS')
        })
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    }
  }
}
</script>
