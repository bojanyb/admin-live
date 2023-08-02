<template>
  <div class="wordsComp-box">
    <el-dialog
      title="风控文案库"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
    <div class="wrap">
      <div class="button-wrap">
        <el-button type="danger" @click="batchEdit">批量编辑</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="explain" label="警告提示" align="center">
        </el-table-column>
        <el-table-column prop="admin" label="操作" align="center">
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
    <wordsEditComp ref="wordsEditComp"></wordsEditComp>
  </div>
</template>

<script>
// 引入api
import { punishOperateLog } from "@/api/risk";
// 分页
import Pagination from "@/components/Pagination";
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入风控文案编辑组件
import wordsEditComp from "./wordsEditComp.vue"
export default {
  components: {
    Pagination,
    wordsEditComp
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
    load() {
      this.dialogVisible = true;
      // let res = await punishOperateLog({
      //   ...this.lookPage,
      // });
      this.tableData = [];
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    batchEdit() {
      setTimeout(() => {
        this.$refs.wordsEditComp.loadParams();
      }, 50);
    }
  },
};
</script>

<style lang="scss">
.wordsComp-box {
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
