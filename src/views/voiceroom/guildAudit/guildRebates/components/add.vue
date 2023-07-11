<template>
    <div class="guildAudit-guildRebates-add-box">
        <el-dialog
        title="新增24小时房间"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        @closed="closed">
            <div class="formBox">
                <div class="sunBox">
                    <span>房间ID</span>
                    <el-input v-model="room_number" placeholder="请先输入房间ID"></el-input>
                </div>
                <el-button :disabled="!room_number" type="success" @click="addStatisticsroomFunc">添加</el-button>
                <el-button :disabled="!room_number" type="primary" @click="searchStatisticsroomFunc">查询</el-button>
            </div>
            <!-- 表格 -->
            <div class="table" v-if="tableData && tableData.length">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="online"
                  label="上周（自然周）开播时长(小时)"
                  >
                  <template slot-scope="{row}">
                    {{ row.online | filtersFormatTimeTwo }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="flow"
                  label="上周（自然周）开播流水（喵粮）">
                  <template slot-scope="{row}">
                    {{ row.flow + '钻石' }}
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { addStatisticsroom, roomS } from '@/api/user.js'
// 引入公共方法
import { formatTimeTwo } from '@/utils/common.js'
export default {
    data() {
        return {
            dialogVisible: false,
            room_number: '',
            tableData: []
        };
    },
  filters: {
    filtersFormatTimeTwo(status) {
      const res = formatTimeTwo(status)
      return res
    }
  },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams() {
            this.dialogVisible = true
        },
        // 添加24小时房间
        async addStatisticsroomFunc() {
            let res = await addStatisticsroom({ room_number: this.room_number })
            if(res.code === 2000) {
                this.$success('添加成功')
                this.dialogVisible = false
                this.$emit('getList')
            }
        },
        // 查询24小时房间
        async searchStatisticsroomFunc() {
           let res = await roomS({ room_number: this.room_number, page: 1, pagesize: 10, })
            if(res.code === 2000) {
              this.tableData = res.data.list;
            }
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.guildAudit-guildRebates-add-box {
    .formBox {
        display: flex;
        margin-bottom: 20px;
        .sunBox {
            display: flex;
            align-items: center;
            margin-right: 10px;
            >span {
                font-size: 15px;
                margin-right: 10px;
            }
            .el-input {
                width: 180px;
            }
        }
    }
}
</style>
