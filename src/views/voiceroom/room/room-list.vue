<template>
  <div class="app-container">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @keyup.enter.native="roomList()">
        <el-form-item label="房间号码">
          <el-input v-model="filters.room_number" v-input-limit="0" placeholder="请输入房间号码" clearable />
        </el-form-item>
        <el-form-item label="直播状态">
          <el-select v-model="filters.is_live" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option key="0" label="未开始" value="0" />
            <el-option key="1" label="直播中" value="1" />
            <el-option key="2" label="已结束" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="roomList">查询</el-button>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="房间号码">
        <template slot-scope="scope">
          {{ scope.row.room_number }}
        </template>
      </el-table-column>
      <el-table-column label="房间名称" prop="room_name" align="center" show-overflow-tooltip />
      <el-table-column label="房主昵称" prop="live_user_name" align="center" />
      <el-table-column label="房间类型" prop="room_genre_name" align="center" />
      <el-table-column label="在线时长" prop="live_timeText" align="center" />
      <el-table-column label="开播时间" prop="start_timeText" align="center" />
      <el-table-column label="结束时间" prop="end_timeText" align="center" />
      <el-table-column label="在线人数" align="center" prop="people" width="95" />
      <el-table-column label="被举报次数" align="center" prop="report" width="95" />
      <el-table-column label="直播状态" align="center" width="95">
        <template slot-scope="scope">
          <div v-if="scope.row.is_live == 0">未开始</div>
          <div v-else-if="scope.row.is_live == 1">直播中</div>
          <div v-else-if="scope.row.is_live == 2">已结束</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="statusText" width="95">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">正常绑定</div>
          <div v-if="scope.row.status == 2">待绑定</div>
          <div v-if="scope.row.status == 3">冻结</div>
          <div v-if="scope.row.status == 4">过期</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="95">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="danger" @click="handleRoom(scope.row)">冻结</el-button>
          <el-button v-if="scope.row.status == 3" type="primary" @click="handleRoom(scope.row)">解冻</el-button>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="roomList"
    />

  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import {
  getRoomList,
  getRoomSave
} from '@/api/videoRoom'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'RoomList',
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      multipleSelection: [],
      filters: {
        'room_number': '',
        'is_live': ''
      },
      page: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.roomList()
  },
  methods: {
    // 房间列表
    roomList() {
      this.listLoading = true
      var params = {
        'page': this.page.page,
		'pagesize': this.page.limit,
        'room_number': this.filters.room_number,
        'is_live': this.filters.is_live
      }
      getRoomList(params).then(response => {
        this.total = response.data.count
        this.list = response.data.list
        this.list.map(function(item) {
          item.start_timeText = moment(item.start_time * 1000).format('YYYY-MM-DD HH:MM:SS')
          item.end_timeText = moment(item.end_time * 1000).format('YYYY-MM-DD HH:MM:SS')
          if (item.live_time > 60) {
            item.live_timeText = parseInt(item.live_time / 60) + '小时 ' + (item.live_time %
								60) + '分钟'
          } else {
            item.live_timeText = item.live_time + '分钟'
          }
        })
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
      })
    },

    // 冻结/解冻
    handleRoom(source) {
      var tipsText = source.status == 1 ? '确定冻结当前房间吗?' : '确定解冻当前房间吗?'
      this.$alert(tipsText, '提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action == 'confirm') {
            var params = {
              'room_number': JSON.stringify(source.room_number),
              'status': source.status == 1 ? '3' : '1'
            }
            getRoomSave(params).then(res => {
              this.$message.success(res.msg)
              this.roomList()
            }).catch(err => {
              this.$message.error(err.msg)
            })
          } else if (action == 'cancel') {}
        }
      })
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
