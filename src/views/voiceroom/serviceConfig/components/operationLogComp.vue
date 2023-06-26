<template>
  <div class="guildReportComp-box">
    <el-dialog
      title="操作日志"
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
    <div class="wrap">

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="操作类型" align="center">
				<template slot-scope="scope">
					<div>{{ scope.row.type  | typeFilter}}</div>
				</template>
        </el-table-column>
        <el-table-column prop="explain" label="操作说明" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="操作时间" align="center">
        </el-table-column>
        <el-table-column prop="admin" label="操作人" align="center">
        </el-table-column>
      </el-table>
      <!-- 工具条 -->
      <pagination
        v-show="lookTotal > 0"
        :total="lookTotal"
        :page.sync="lookPage.page"
        :limit.sync="lookPage.limit"
        @pagination="load"
      />
    </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { punishOperateLog } from "@/api/risk";
// 分页
import Pagination from "@/components/Pagination";
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      lookTotal: 0,
      lookPage: {
        page: 1,
        pagesize: 10,
      },
      status: ""
    };
  },
    filters: {
        typeFilter(val) {
            let params = MAPDATA.USERPUNISHSTATUSLISTCOPY.find(item => { return item.value === val })
            return params ? params.name : '无'
        }
    },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async load(row, status) {
      this.status = status;
      this.dialogVisible = true;
      let res = await punishOperateLog({
        ...this.lookPage,
        id: row.report_event_id || "",
      });
      this.tableData = res.data || [];
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss">
.guildReportComp-box {
  .wrap {
    padding: 10px;
    margin-bottom: 20px;

    .text {
      font-size: 16px;
      font-weight: 700;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .el-dialog__body {
    max-height: 70vh;
    overflow-y: scroll;
    padding: 10px;
      &::-webkit-scrollbar {
        height: 10px;
        width: 10px;
        background: #e8e8e8;
      }

      &::-webkit-scrollbar-thumb {
        background: #c7c7c7;
        border-radius: 5px;
      }
  }
}
</style>
