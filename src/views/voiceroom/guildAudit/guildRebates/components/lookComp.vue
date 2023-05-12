<template>
  <div class="guildReportComp-box">
    <el-dialog
      :title="editTitle"
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
    <div class="wrap">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>详情</span>
        </div>
      <el-table :data="tableData.list" style="width: 100%">
        <el-table-column prop="room_title" label="房间名" align="center">
        </el-table-column>
        <el-table-column prop="room_type_name" label="房间类型" align="center">
        </el-table-column>
        <el-table-column prop="flow" label="流水" align="center">
        </el-table-column>
        <el-table-column prop="t_flow" label="流水(含冻结）" align="center">
        </el-table-column>
      </el-table>
      <!--工具条-->
      <!-- <pagination
        v-show="lookTotal > 0"
        :total="lookTotal"
        :page.sync="lookPage.page"
        :limit.sync="lookPage.limit"
        @pagination="load"
      /> -->
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>统计</span>
        </div>
      <el-table :data="tableData.reward_list" style="width: 100%">
        <el-table-column prop="type_name" label="房间类型" align="center">
        </el-table-column>
        <el-table-column prop="flow" label="总流水" align="center">
        </el-table-column>
        <el-table-column prop="point" label="周奖励金额" align="center">
        </el-table-column>
      </el-table>
      <!--工具条-->
      <!-- <pagination
        v-show="lookTotal > 0"
        :total="lookTotal"
        :page.sync="lookPage.page"
        :limit.sync="lookPage.limit"
        @pagination="load"
      /> -->
      </el-card>
    </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { roomFlow } from "@/api/videoRoom";
// 分页
import Pagination from "@/components/Pagination";
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
      editTitle: ""
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async load(row) {
      this.dialogVisible = true;
      this.editTitle = `${row.guild_name}公会流水详情`
      let res = await roomFlow({
        ...this.lookPage,
        settle_id: row.id || "",
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
