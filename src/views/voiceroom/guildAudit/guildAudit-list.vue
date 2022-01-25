<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @keyup.enter.native="getGuildList()">
        <el-form-item label="类型">
          <el-select v-model="filters.genre" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option key="1" label="个人户或工作室" value="1" />
            <el-option key="2" label="公司" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filters.status" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option key="1" label="待审核" value="1" />
            <el-option key="2" label="已审核" value="2" />
            <el-option key="3" label="已驳回" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getGuildList">查询</el-button>
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
      <el-table-column label="公会名称" prop="guild_name" align="center" />
      <el-table-column label="结算类型" align="center" width="95">
        <template slot-scope="scope">
          <div v-if="scope.row.guild_genre == 1">对私结算</div>
          <div v-else-if="scope.row.guild_genre == 2">对公结算</div>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" prop="true_name" align="center" />
      <el-table-column label="身份证号" prop="id_card" align="center" />
      <el-table-column label="身份证正面" prop="id_card_one" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :lazy="true"
            :src="scope.row.id_card_one ? scope.row.id_card_one : ''"
            :preview-src-list="cardsList1"
          />
        </template>
      </el-table-column>
      <el-table-column label="身份证反面" prop="id_card_two" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :lazy="true"
            :src="scope.row.id_card_two ? scope.row.id_card_two : ''"
            :preview-src-list="cardsList2"
          />
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" width="95">
        <template slot-scope="scope">
          <div v-if="scope.row.genre == 1">个人户或工作室</div>
          <div v-else-if="scope.row.genre == 2">公司</div>
        </template>
      </el-table-column>
      <el-table-column label="营业执照" prop="license" align="center">
        <template slot-scope="scope">
          <el-image
            v-if="scope.row.license.length > 0"
            style="width: 40px; height: 40px"
            :lazy="true"
            :src="scope.row.license ? scope.row.license : ''"
            :preview-src-list="licenseList"
          />
        </template>
      </el-table-column>
      <el-table-column label="营业执照号码" prop="license_id" align="center" />
      <el-table-column label="主体名称" prop="license_name" align="center" />
      <el-table-column label="银行名称" prop="bank_name" align="center" />
      <el-table-column label="银行卡号" prop="bank_no" align="center" />
      <el-table-column label="开户行" prop="bank_address" align="center" />
      <el-table-column label="驳回字段" prop="reject" align="center" />
      <el-table-column label="驳回原因" prop="remark" align="center" />
      <el-table-column label="状态" prop="statusText" align="center" width="95">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">待审核</div>
          <div v-if="scope.row.status == 2">已审核</div>
          <div v-if="scope.row.status == 3">已驳回</div>
        </template>
      </el-table-column>
      <el-table-column label="首次替提交时间" prop="create_timeText" align="center" />
      <el-table-column label="提交时间" prop="update_timeText" align="center" />
      <el-table-column align="center" label="操作" width="95">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary" @click="handleGuild(scope.row)">审核
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
      @pagination="getGuildList"
    />

    <el-dialog title="审核" :visible.sync="audioPop">
      <el-form ref="audioForm" :model="audioForm" :rules="audioFormRules">
        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
          <el-radio-group v-model="audioForm.status">
            <el-radio :label="2">通过</el-radio>
            <el-radio :label="3">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="audioForm.status == 3" prop="reject" label="驳回字段" :label-width="formLabelWidth">
          <template>
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="item in rejectList" :label="item.text" :value="item.name" />
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item v-if="audioForm.status == 3" prop="remark" label="驳回原因" :label-width="formLabelWidth">
          <el-input
            v-model="audioForm.remark"
            style="width: 335px;"
            type="textarea"
            :rows="5"
            placeholder="请输入驳回原因"
            clearable
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="audioPop = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="handleAudio">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  getGuildCheckList,
  getGuildCheck
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'GuildAuditList',
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
        'user_id': '',
        'genre': '',
        'status': ''
      },
      page: {
        page: 1,
        limit: 10
      },
      cardsList1: [],
      cardsList2: [],
      licenseList: [],
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
    this.getGuildList()
  },
  methods: {
    getGuildList() {
      this.listLoading = true
      var params = {
        'page': this.page.page,
        'user_id': this.filters.user_id,
        'genre': this.filters.genre,
        'status': this.filters.status
      }
      this.cardsList1 = []
      this.cardsList2 = []
      this.licenseList = []
      getGuildCheckList(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        for (const i in this.list) {
          const item = this.list[i]
          for (const j in item) {
            if (j !== 'id' && j !== 'user_id' && j !== 'create_time' && j !== 'update_time' &&
								j !== 'status' && j !== 'reject' && j !== 'remark') {
              const curretnName = this.changeRejectName(j)
              const currentSource = {
                'text': curretnName,
                'name': j
              }

              // 个人 营业执照、营业执照号码、主体名称可以为空 这里不做选择
              if (item.genre == 1) {
                if (j !== 'license' && j !== 'license_id' && j !== 'license_name') {
                  this.rejectList.push(currentSource)
                }
              } else { // 公司类型
                this.rejectList.push(currentSource)
              }
            }
          }
          item.create_timeText = moment(item.create_time * 1000).format('YYYY-MM-DD HH:MM:SS')
          item.update_timeText = moment(item.update_time * 1000).format('YYYY-MM-DD HH:MM:SS')
          if (item.id_card_one !== '') {
            this.cardsList1.push(item.id_card_one)
          }
          if (item.id_card_two !== '') {
            this.cardsList2.push(item.id_card_two)
          }
          if (item.license !== '') {
            this.licenseList.push(item.license)
          }
        }
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },

    // 审核
    handleGuild(row) {
      this.audioForm.id = row.id
      this.audioPop = true
    },

    // 审核确定
    handleAudio() {
      this.$refs.audioForm.validate(valid => {
        if (valid) {
          var params = {
            'id': this.audioForm.id,
            'status': this.audioForm.status
          }
          if (params.status == 3) { // 驳回
            params.reject = this.handleChangeReject()
            params.remark = this.audioForm.remark
          }
          this.loading = true
          getGuildCheck(params).then(res => {
            if (res.code == 2000) {
              this.$message.success(res.msg)
              this.getGuildList()
              this.audioPop = false
            }
            this.loading = false
          }).catch(err => {
            this.$message.error(err)
            this.loading = false
            this.audioPop = false
          })
        }
      })
    },

    // 审核获取 驳回字段
    handleChangeReject() {
      var rejectName = ''
      this.checkList.map(item => {
        this.rejectList.map(it => {
          if (item == it.text) {
            rejectName += it.name + '&'
          }
        })
      })
      rejectName = rejectName.substring(rejectName.length - 1, 0)
      return rejectName
    },

    // 字段名称转换
    changeRejectName(text) {
      var name = ''
      switch (text) {
        case 'guild_name':
          name = '公会名称'
          break
        case 'guild_genre':
          name = '结算类型'
          break
        case 'true_name':
          name = '真实姓名'
          break
        case 'id_card':
          name = '身份证号'
          break
        case 'genre':
          name = '类型'
          break
        case 'license':
          name = '营业执照'
          break
        case 'license_id':
          name = '营业执照号码'
          break
        case 'license_name':
          name = '主体名称'
          break
        case 'bank_name':
          name = '银行名'
          break
        case 'bank_no':
          name = '银行卡号'
          break
        case 'bank_address':
          name = '开户行'
          break
        case 'id_card_one':
          name = '身份证正面'
          break
        case 'id_card_two':
          name = '身份证反面'
          break
      }
      return name
    }
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
</style>
