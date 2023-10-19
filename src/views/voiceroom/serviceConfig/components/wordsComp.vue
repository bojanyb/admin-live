<template>
  <div class="wordsComp-box">
    <el-dialog
      title="举报/投诉配置"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
      <div class="button-wrap">
        <el-button type="danger" @click="batchEdit">批量编辑</el-button>
        <el-button type="primary" @click="update()">新增</el-button>
      </div>
      <div class="wrap">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="类型" align="center">
          </el-table-column>
          <el-table-column prop="warning_msg" label="警告提示" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="update(scope.row)"
                type="primary"
                size="small"
              >
                编辑
              </el-button>

              <el-button
                @click.native.prevent="del(scope.row)"
                type="danger"
                size="small"
              >
                删除
              </el-button>
            </template>
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
    <!-- 风控文案编辑 -->
    <!-- <wordsEditComp
      v-if="isDestoryComp"
      ref="wordsEditComp"
      @getList="getList"
      @destoryComp="destoryComp"
    ></wordsEditComp> -->
    <!-- 新增/编辑举报投诉配置 -->
    <editPunishComp
      v-if="isDestoryComp"
      ref="editPunishComp"
      @getList="getList"
      @destoryComp="destoryComp"
    >
    </editPunishComp>
  </div>
</template>

<script>
// 引入api
import { getPunishWordsList, deletePunishWords } from "@/api/risk";
// 分页
import Pagination from "@/components/Pagination";
// 引入风控文案编辑组件
import wordsEditComp from "./wordsEditComp.vue";
// 引入风控文案编辑组件
import editPunishComp from "./editPunishComp.vue";
export default {
  components: {
    Pagination,
    wordsEditComp,
    editPunishComp
  },
  data() {
    return {
      dialogVisible: false,
      isDestoryComp: false, // 是否销毁组件
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
    load() {
      this.dialogVisible = true;
      this.getList();
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    batchEdit() {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.wordsEditComp.loadParams(this.tableData);
      }, 50);
    },
    update(row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.editPunishComp.loadParams(row);
      }, 50);
    },
    del(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          console.log(row);
          const { id } = row;
          await deletePunishWords({ id });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async getList() {
      const res = await getPunishWordsList();
      if (res.code !== 2000) return;
      this.tableData = res.data || [];
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
  },
};
</script>

<style lang="scss">
.wordsComp-box {
  .el-dialog__body {
    padding: 0 0 20px;
  }
  .button-wrap {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .wrap {
    max-height: 50vh;
    padding: 0 20px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      height: 10px;
      width: 10px;
      background: #e8e8e8;
    }

    &::-webkit-scrollbar-thumb {
      background: #c7c7c7;
      border-radius: 5px;
    }

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
      clear: both;
    }

    .box-card {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
