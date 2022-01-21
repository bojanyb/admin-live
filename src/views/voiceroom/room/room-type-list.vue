<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" @keyup.enter.native="getGenreList()">
        <el-form-item>
          <el-button type="success" @click="handleAddSubmit()">新 增</el-button>
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
      <el-table-column label="序号" prop="sort" align="center" width="150" />
      <el-table-column label="ID" prop="id" align="center" width="150" />
      <el-table-column label="类型名称" prop="name" align="center" />
      <el-table-column label="创建时间" align="center" prop="create_timeText" />
      <el-table-column label="开始时间" align="center" prop="start_timeText" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getGenreList"
    />

    <el-dialog :title="popTitle" :visible.sync="popFormVisible">
      <el-form ref="popForm" :model="popForm" :rules="popFormRules">
        <el-form-item label="序号" prop="sort" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input
              v-model="popForm.sort"
              v-input-limit="0"
              placeholder="输入序号范围: 1 ~ 65535"
              style="width: 235px;"
              clearable
              autocomplete="off"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="类型名称" prop="name" :label-width="formLabelWidth">
          <el-col :span="7">
            <el-input
              v-model="popForm.name"
              style="width: 235px;"
              clearable
              autocomplete="off"
              @change="inputChange($event)"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time" :label-width="formLabelWidth">
          <el-date-picker
            v-model="popForm.start_time"
            style="width: 235px;"
            type="date"
            placeholder="选择日期"
            clearable
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除" :visible.sync="delVisible" width="30%">
      <span>确定删除该类型名称吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelSubmit(delSource)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoomGenre,
  getRoomGenreSave
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'RoomTypeList',
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      page: {
        page: 1,
        limit: 10
      },
      delVisible: false,
      popFormVisible: false,
      delSource: '',
      formLabelWidth: '120px',
      popTitle: '',
      popForm: {
        'sort': '',
        'name': '',
        'start_time': '',
        'id': '',
        'is_del': '0'
      },
      popFormRules: {
        sort: [{
          required: true,
          trigger: 'blur',
          validator: (rules, value, cb) => {
            if (!this.popForm.sort) {
              return cb(new Error('序号不能为空!'))
            } else if (this.popForm.sort < 1 || this.popForm.sort > 65535) {
              if (this.popForm.sort < 1) {
                this.popForm.sort = 1
              }
              if (this.popForm.sort > 65535) {
                this.popForm.sort = 65535
              }
              return cb(new Error('序号输入范围为: 1 ~ 65535!'))
            }
            return cb()
          }
        }],
        name: [{
          required: true,
          trigger: 'blur',
          validator: (rules, value, cb) => {
            if (!this.popForm.name) {
              return cb(new Error('类型名称不能为空!'))
            }
            return cb()
          }
        }],
        start_time: [{
          required: true,
          trigger: 'blur',
          validator: (rules, value, cb) => {
            if (!this.popForm.start_time) {
              return cb(new Error('请选择开始时间!'))
            }
            return cb()
          }
        }]
      }
    }
  },
  created() {
    this.getGenreList()
  },
  methods: {
    getGenreList() {
      this.listLoading = true
      var params = {
        'page': this.page.page,
        'pagesize': this.page.limit
      }
      getRoomGenre(params).then(response => {
        if (response && response.data.list.length > 0) {
          this.total = response.data.count
          this.list = response.data.list
          this.list.map(function(item) {
            item.create_timeText = moment(item.create_time * 1000).format(
              'YYYY-MM-DD HH:MM:SS')
            item.start_timeText = JSON.stringify(item.start_time).length > 9 ? moment(item
              .start_time * 1000).format(
              'YYYY-MM-DD HH:MM:SS') : ''
            if (item.live_time > 60) {
              item.live_timeText = parseInt(item.live_time / 60) + '小时 ' + (item
                .live_time %
									60) + '分钟'
            } else {
              item.live_timeText = item.live_time + '分钟'
            }
          })
        }
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },

    // 修改
    handleEdit(row) {
      if (this.$refs['popForm']) {
        this.$refs['popForm'].resetFields()
      }
      this.popTitle = '修改'
      this.popForm.id = row.id
      this.popForm.sort = row.sort
      this.popForm.name = row.name
      this.popForm.start_time = JSON.stringify(row.start_time).length == 10 ? row.start_time * 1000 : ''
      this.popForm.is_del = '0'
      this.popFormVisible = true
      console.log(this.popForm)
    },

    // 新增
    handleAddSubmit() {
      if (this.$refs['popForm']) {
        this.$refs['popForm'].resetFields()
      }
      this.popTitle = '新增'
      this.popForm.sort = ''
      this.popForm.name = ''
      this.popForm.start_time = ''
      this.popForm.is_del = '0'
      this.popFormVisible = true
    },

    // 确定修改
    handleChange() {
      this.popForm.start_time = (typeof this.popForm.start_time === 'object') ? this.popForm.start_time
        .getTime() / 1000 : this.popForm.start_time
      this.$refs.popForm.validate(valid => {
        if (valid) {
          var params = {
            'id': this.popForm.id,
            'name': this.popForm.name,
            'sort': this.popForm.sort,
            'start_time': this.popForm.start_time,
            'is_del': this.popForm.is_del
          }
          getRoomGenreSave(params).then(res => {
            this.popFormVisible = false
            this.$message.success(this.popTitle + '成功')
            this.getGenreList()
          }).catch(err => {
            this.$message.error(this.popTitle + '失败')
          })
        }
      })
    },

    // 删除
    handleDel(row) {
      this.delSource = row
      this.delVisible = true
    },

    // 确定删除
    handleDelSubmit() {
      this.popForm.is_del = '2'
      this.popForm.id = this.delSource.id
      this.popForm.sort = this.delSource.sort
      this.popForm.name = this.delSource.name
      this.popForm.start_time = this.delSource.start_time
      getRoomGenreSave(this.popForm).then(res => {
        this.$message.success('删除成功')
        this.getGenreList()
      }).catch(err => {
        this.$message.error('删除失败')
      })
      this.delVisible = false
    },

    // 限制输入框只能输入汉字
    inputChange() {
      let o = this.popForm.name
      if (!/^[\u4e00-\u9fa5]+$/gi.test(o)) {
        if (o) {
          o = o.substring(0, o.length - 1)
        }
      }
      this.popForm.name = o
    }

  }
}
</script>

<style lang="scss" scoped="scoped">
	.el-table__row {
		.el-button {
			padding: 8px 15px;
		}
	}
</style>
