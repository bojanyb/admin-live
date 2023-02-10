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
        <el-table-column prop="room_number" label="团员ID" align="center">
        </el-table-column>
        <el-table-column prop="not_guild_free" label="团员昵称" align="center">
        </el-table-column>
        <el-table-column prop="not_guild_free" label="里程值" align="center">
        </el-table-column>
        <el-table-column prop="not_guild_free" label="背包流水" align="center">
        </el-table-column>
        <el-table-column prop="not_guild_free" label="直刷流水" align="center">
        </el-table-column>
      </el-table>
      <!--工具条-->
      <pagination
        v-show="lookTotal > 0"
        :total="lookTotal"
        :page.sync="lookPage.page"
        :limit.sync="lookPage.limit"
        @pagination="load"
      />
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getTraveList } from "@/api/activity";
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
      let res = await getTraveList({
        ...this.lookPage,
        id: row.id || "",
      });
      this.lookTotal = res.data.count;
      this.tableData = res.data.list || [];
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
