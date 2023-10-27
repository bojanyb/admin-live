vue Copy
<template>
  <div class="link-monitor-container">
    <el-dialog
      title="监测链接管理"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @closed="destroyComp"
    >
      <template v-if="initializeComponent">
        <el-table
          :data="tableData"
          class="table"
          style="width: 100%; margin-bottom: 30px"
          border
        >
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span class="channel-name">{{ scope.$index }}</span>
            </template>
          </el-table-column>
          <el-table-column label="渠道名称" width="180">
            <template slot-scope="scope">
              <span v-if="editingIndex !== scope.$index" class="channel-name">{{
                scope.row.channel
              }}</span>
              <el-input
                v-else
                v-model="scope.row.channel"
                size="mini"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="监测链接" width="180">
            <template slot-scope="scope">
              <span v-if="editingIndex !== scope.$index" class="channel-name">{{
                scope.row.ad_type
              }}</span>
              <el-input
                v-else
                v-model="scope.row.ad_type"
                size="mini"
              ></el-input>
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
                <el-button
                  size="mini"
                  @click="handleCancelEdit(scope.$index, scope.row)"
                  >取消</el-button
                >
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-link-button">
          <el-button type="primary" @click="handleAddLink"
            >新增监测链接</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from "@/utils/index";
import { getChain, configChain } from "@/api/market";
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
      initializeComponent: false,
      editCurrentRowData: {},
    };
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.fetchChainData();
      }
      this.initializeComponent = !!newVal;
    },
  },
  methods: {
    handleEdit(index, row) {
      this.editCurrentRowData = deepClone(row);
      this.editingIndex = index;
      console.log(this.tableData);
    },
    handleCancelEdit(index, row) {
      if (!row.channel && !row.ad_type) {
        this.tableData.pop();
        return;
      }

      this.tableData[index] = this.editCurrentRowData;
      this.editingIndex = -1;
    },
    async handleSave(index, row) {
      console.log(index, row);
      const prama = {
        ad_type: row.ad_type,
        channel: row.channel,
      };
      console.log(prama);
      try {
        const response = await configChain(prama);
        if (response.code === 2000) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.editingIndex = -1;
        }
      } catch (error) {
        console.error(error);
      }
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
      if (this.tableData.length - 1 === this.editingIndex) {
        this.$message({
          type: "warning",
          message: "请保存或取消编辑行再进行操作!",
        });
        return;
      }
      this.tableData.push({ channel: "", ad_type: "" });
      this.editingIndex = this.tableData.length - 1;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    destroyComp() {
      // 组件销毁逻辑
    },
    /**
     * 获取注册渠道数据并处理
     */
    async fetchChainData() {
      try {
        const response = await getChain();
        if (response.code === 2000) {
          this.tableData = response.data;
        }
      } catch (error) {
        console.error(error);
      }
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
  text-align: center;
}

.add-link-button {
  width: 100%;
  text-align: center;
}
</style>
