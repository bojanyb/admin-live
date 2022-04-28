<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @keyup.enter.native="getBannerInfo()">
        <el-form-item label="用户ID">
          <el-input v-model="filters.user_number" v-input-limit="0" placeholder="请输入用户ID" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getBannerInfo">查询</el-button>
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
      <el-table-column label="时间" prop="create_timeText" align="center"/>
	  <el-table-column label="用户ID" prop="user_number" align="center" />
      <el-table-column label="金额" prop="diamond" align="center"/>
      <el-table-column label="余额" prop="balance" align="center"/>
      <el-table-column label="类型" prop="genreText" align="center" />
      <el-table-column label="交易流水号" prop="trade_noText" align="center" />
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getBannerInfo"
    />
  </div>
</template>

<script>
import {
  getUserDiamondLog
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'userBalance-list',
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
        'user_number': '',
      }
    }
  },
  created() {
    this.getBannerInfo()
  },
  methods: {
    getBannerInfo() {
      this.listLoading = true
      var params = {
        'user_number': this.filters.user_number,
        'page': this.page.page,
        'pagesize': this.page.limit
      }
      getUserDiamondLog(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        this.list.map(res => {
          res.create_timeText = res.create_time > 0 ? moment(res.create_time * 1000).format('YYYY-MM-DD HH:mm:ss') : ""
		  res.trade_noText = res.genre == 1 ? res.relation_trade_no : res.trade_no
		  res.genreText = res.genre == 1 ? "收入" : "支出"
		  
        })
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    }
  }
}
</script>
