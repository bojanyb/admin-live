<template>
  <div class="guildReportComp-box">
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="user_number" label="团员ID" align="center">
        </el-table-column>
        <el-table-column prop="nickname" label="团员昵称" align="center">
        </el-table-column>
        <el-table-column prop="level_value" label="里程值" align="center">
        </el-table-column>
        <el-table-column prop="money_count" label="总流水" align="center">
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
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getTraveListDetail } from "@/api/activity";
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
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    async load(row) {
      this.dialogVisible = true;
      let res = await getTraveListDetail({
        ...this.lookPage,
        group_id: row.id || "",
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
}
</style>
