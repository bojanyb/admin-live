<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="success" @click="handleLiveRankAdd">新增</el-button>
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
      <el-table-column label="头衔" prop="live_rank" align="center" width="95" />
      <el-table-column label="头衔名称" prop="live_rank_name" align="center" />
      <el-table-column label="收入喵粮总数" prop="gain_total" align="center" />
      <el-table-column label="礼物总价值" prop="income" align="center" />
      <el-table-column label="修改时间" prop="update_timeText" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleLiveRankEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getLiveRank"
    />

    <el-dialog :title="editTitle" :visible.sync="editPop">
      <el-form :model="popForm">
        <el-form-item label="头衔" :label-width="formLabelWidth">
          <el-col :span="17">
            <el-input
              v-model="popForm.live_rank"
              v-input-limit="0"
              style="width: 335px;"
              placeholder="请输入头衔数值"
              clearable
              autocomplete="off"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="头衔名称" :label-width="formLabelWidth">
          <el-col :span="17">
            <el-input
              v-model="popForm.live_rank_name"
              style="width: 335px;"
              placeholder="请输入头衔名称"
              clearable
              autocomplete="off"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="收入喵粮总数" :label-width="formLabelWidth">
          <el-col :span="17">
            <el-input
              v-model="popForm.gain_total"
              v-input-limit="0"
              style="width: 335px;"
              placeholder="请输入收入喵粮总数"
              clearable
              autocomplete="off"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="礼物总价值" :label-width="formLabelWidth">
          <el-col :span="17">
            <el-input
              v-model="popForm.income"
              v-input-limit="0"
              style="width: 335px;"
              placeholder="请输入礼物总价值"
              clearable
              autocomplete="off"
            />
          </el-col>
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
  getGiftList,
  getLiveRanklist,
  getLiveRankConfig
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'LivetitleList',
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      giftList: [],
      multipleSelection: [],
      loading: false,
      listLoading: false,
      giftLoading: false,
      total: 0,
      giftTotal: 0,
      formLabelWidth: '120px',
      page: {
        page: 1,
        limit: 10
      },
      editTitle: '',
      editPop: false,
      popForm: {
        'live_rank': '',
        'live_rank_name': '',
        'gain_total': '',
        'income': ''
      }
    }
  },
  created() {
    this.getGift()
    this.getLiveRank()
  },
  methods: {
    getGift() {
      var params = {
        'page': this.page.page
      }
      this.giftLoading = true
      getGiftList(params).then(response => {
        this.giftTotal = response.data.count
        this.giftList = response.data.list
        this.giftList.map(res => {
          res.num = 0
        })
        this.giftLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },
    getLiveRank() {
      this.listLoading = true
      getLiveRanklist().then(response => {
        this.total = response.data.count
        this.list = response.data.list
        this.list.map(res => {
          res.update_timeText = moment(res.update_time * 1000).format('YYYY-MM-DD HH:MM:SS')
        })
        this.listLoading = false
      })
    },
    handleLiveRankAdd() {
      this.editTitle = '添加'
      this.popForm = {
        'live_rank': '',
        'live_rank_name': '',
        'gain_total': '',
        'income': ''
      }
      this.editPop = true
    },
    handleLiveRankEdit(row) {
      this.editTitle = '修改'
      this.popForm = {
        'live_rank': row.live_rank,
        'live_rank_name': row.live_rank_name,
        'gain_total': row.gain_total,
        'income': row.income,
        'id': row.id
      }
      this.editPop = true
    },
    handleChange() {
      getLiveRankConfig(this.popForm).then(res => {
        this.getLiveRank()
        this.editPop = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
