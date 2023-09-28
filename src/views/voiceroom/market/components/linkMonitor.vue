vue Copy
<template>
  <div class="link-monitor-container">
    <el-dialog
      title="监测链接管理"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @closed="destroyComp"
    >
      <el-table
        :data="tableData"
        class="table"
        style="width: 100%; margin-bottom: 30px"
        border
      >
        <el-table-column width="50">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="渠道名称" width="180">
          <template slot-scope="scope">
            <span v-if="editingIndex !== scope.$index" class="channel-name">{{
              scope.row.channel
            }}</span>
            <el-input v-else v-model="scope.row.channel" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <template v-if="editingIndex !== scope.$index">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
            <template v-else>
              <el-button
                size="mini"
                type="success"
                @click="handleSave(scope.$index, scope.row)"
                >保存</el-button
              >
              <el-button size="mini" @click="handleCancelEdit">取消</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-link-button">
        <el-button type="primary" @click="handleAddLink"
          >新增监测链接</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          channel: "王小虎",
        },
      ],
      editingIndex: -1,
    };
  },
  methods: {
    handleEdit(index, row) {
      this.editingIndex = index;
    },
    handleCancelEdit() {
      this.editingIndex = -1;
    },
    handleDelete(index, row) {
      this.$confirm("确定要删除该渠道吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAddLink() {
      this.tableData.push({ channel: "" });
      this.editingIndex = this.tableData.length - 1;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    destroyComp() {
      // 组件销毁逻辑
    },
  },
};
</script>

<style lang="scss">
.link-monitor-container {
  padding: 20px;
}

.channel-name {
  margin-left: 10px;
}

.add-link-button {
  width: 100%;
  text-align: center;
}
</style>
