<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @keyup.enter.native="getWallet()">
        <el-form-item label="用户ID">
          <el-input v-model="filters.user_id" v-input-limit="0" placeholder="请输入用户ID" clearable />
        </el-form-item>
        <el-form-item label="排序类型">
          <el-select v-model="filters.order" placeholder="请选择" @change="getWallet">
            <el-option label="全部" value="" />
            <el-option key="gain" label="按照收入喵粮排序" value="gain" />
            <el-option key="diamond" label="按照钻石数排序" value="diamond" />
            <el-option key="guild_rate" label="按照公会分成排序" value="guild_rate" />
            <el-option key="freeze_gain" label="按照冻结喵粮排序" value="freeze_gain" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select v-model="filters.sort" placeholder="请选择" @change="getWallet">
            <el-option label="全部" value="" />
            <el-option key="asc" label="正序" value="asc" />
            <el-option key="desc" label="倒序" value="desc" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getWallet">查询</el-button>
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
      <el-table-column label="ID" align="center" prop="id" width="95" />
      <el-table-column label="公会ID" prop="guild_id" align="center" width="95" />
      <el-table-column label="用户ID" prop="user_id" align="center" width="95" />
      <el-table-column label="星探ID" prop="scout_id" align="center" width="95" />
      <el-table-column label="钻石数" prop="diamond" align="center" />
      <el-table-column label="喵粮(个)" prop="gain" align="center" />
      <el-table-column label="冻结喵粮(个)" prop="freeze_gain" align="center" />
      <el-table-column label="结算类型" prop="guild_genreText" align="center" />
      <el-table-column label="公会分成" prop="guild_rateText" align="center" />
      <el-table-column label="账户状态" prop="statusText" align="center" width="95" />
      <el-table-column label="操作" prop="gift_str" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="danger" @click="handleAccount(scope.row)">冻结
          </el-button>
          <el-button v-if="scope.row.status == 2" type="success" @click="handleAccount(scope.row)">正常
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
      @pagination="getWallet"
    />

    <el-dialog :title="editTitle" :visible.sync="editPop">
      <el-form :model="popForm">
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="popForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">冻结</el-radio>
          </el-radio-group>
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
  getWalletList,
  getWalletSave
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'AccountList',
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
        'status': '',
        'user_id': ''
      },
      filters: {
        'user_id': '',
        'order': '',
        'sort': ''
      }
    }
  },
  created() {
    this.getWallet()
  },
  methods: {
    getWallet() {
      this.listLoading = true
      var params = {
        'page': this.page.page,
        'pagesize': this.page.limit,
        'user_id': this.filters.user_id,
        'order': this.filters.order,
        'sort': this.filters.sort
      }
      getWalletList(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        this.list.map(res => {
          res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:MM:SS')
          if (res.guild_genre == 1) {
            res.guild_genreText = '对私结算'
          } else if (res.guild_genre == 2) {
            res.guild_genreText = '对公结算'
          }

          if (res.status == 1) {
            res.statusText = '正常'
          } else if (res.status == 2) {
            res.statusText = '解冻'
          }

          res.guild_rateText = res.guild_rate / 100 + '%'
        })
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },
    handleAccount(row) {
      this.editTitle = '操作'
      this.popForm = {
        'status': row.status,
        'user_id': row.user_id
      }
      this.editPop = true
    },
    handleChange() {
      this.loading = true
      getWalletSave(this.popForm).then(res => {
        this.getWallet()
        this.editPop = false
        this.loading = false
      })
    }
  }
}
</script>
