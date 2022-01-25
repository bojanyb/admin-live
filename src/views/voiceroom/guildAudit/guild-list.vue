<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px; display: none;">
      <el-form :inline="true" :model="filters" @keyup.enter.native="getGuildListInfo()">
        <el-form-item label="类型">
          <el-select v-model="filters.guild_self" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option key="1" label="非自营" value="1" />
            <el-option key="2" label="自营" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="结算类型">
          <el-select v-model="filters.guild_genre" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option key="1" label="对私结算" value="1" />
            <el-option key="2" label="对公结算" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getGuildListInfo">查询</el-button>
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
      <el-table-column label="手机号" prop="phone" align="center" />
      <el-table-column label="账号" prop="account" align="center" />
      <el-table-column label="公会ID" prop="id" align="center" />
      <el-table-column label="公会名" prop="guild_name" align="center" />
      <el-table-column label="公会所有人ID" prop="guild_user_id" align="center" />
      <el-table-column label="公会号" prop="guild_number" align="center" />
     <el-table-column label="类型" align="center" width="95">
       <template slot-scope="scope">
         <div v-if="scope.row.guild_self == 1">非自营</div>
         <div v-else-if="scope.row.guild_self == 2">自营</div>
       </template>
     </el-table-column>
	 <el-table-column label="结算类型" align="center" width="95">
	   <template slot-scope="scope">
	     <div v-if="scope.row.guild_genre == 1">对私结算</div>
	     <div v-else-if="scope.row.guild_genre == 2">对公结算</div>
	   </template>
	 </el-table-column>
      <el-table-column label="账户喵粮余额" prop="gain" align="center" />
      <el-table-column label="账户冻结喵粮" prop="freeze_gain" align="center" />
      <el-table-column label="状态" prop="status" align="center" width="95">
        <template slot-scope="scope">
          <div class="color1" v-if="scope.row.status == 1">账户正常</div>
          <div class="color4" v-if="scope.row.status == 2">账户冻结</div>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getGuildListInfo"
    />
	
  </div>
</template>

<script>
import {
  getGuildList
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'guild-list',
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      loading: false,
      listLoading: true,
      total: 0,
      multipleSelection: [],
      filters: {
        'guild_self': '',
        'guild_genre': '',
      },
      page: {
        page: 1,
        limit: 10
      },
      audioPop: false,
      formLabelWidth: '120px',
      audioForm: {
        'id': '',
        'status': 2,
        'reject': '',
        'remark': ''
      },
      audioFormRules: {
        status: [{
          required: true,
          trigger: 'change',
          validator: (rules, value, cb) => {
            if (!this.audioForm.status) {
              return cb(new Error('请选择状态!'))
            }
            return cb()
          }
        }],
        reject: [{
          required: true,
          trigger: 'change',
          validator: (rules, value, cb) => {
            if (this.checkList.length == 0 && this.audioForm.status == 3) {
              return cb(new Error('请选择驳回字段!'))
            }
            return cb()
          }
        }],
        remark: [{
          required: true,
          trigger: 'blur',
          validator: (rules, value, cb) => {
            if (!this.audioForm.remark && this.audioForm.status == 3) {
              return cb(new Error('驳回原因不能为空!'))
            }
            return cb()
          }
        }]
      },
      rejectList: [],
      checkList: []
    }
  },
  created() {
    this.getGuildListInfo()
  },
  methods: {
    getGuildListInfo() {
      this.listLoading = true
      var params = {
        'page': this.page.page,
		'pagesize' : this.page.limit,
        'guild_self': this.filters.guild_self,
        'guild_genre': this.filters.guild_genre
      }
      getGuildList(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        for (const i in this.list) {}
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped="scoped">
	.el-form-item {
		// margin-bottom: initial;
	}

	.pagination-container {
		margin-top: initial;
	}
	
	.color1{
		color: #67C23A;
	}
	.color2{
		color: #E6A23C;
	}
	.color3{
		color: #409EFF;
	}
	.color4{
		color: #F56C6C;
	}
	.color5{
		color: #909399;
	}
</style>
