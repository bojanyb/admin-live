<template>
  <div class="dialog_body_box">
    <el-dialog
      :title="title"
      :width="'600px'"
      @closed="closed"
      :visible.sync="isEditComp"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="90px"
        class="body_box-line"
        label-suffix=":"
      >
        <div class="body_box-table">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            max-height="250"
          >
            <el-table-column fixed prop="id_card" label="身份证" width="200">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="200">
            </el-table-column>
            <el-table-column prop="cash_channel" label="当前提现通道">
              <template slot-scope="scope">
                {{ scope.row.cash_channel | filterChannel }}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-row style="padding: 20px">
          <el-col>
            <el-form-item label="修改提现通道" prop="channels" label-width="80">
              <el-select
                v-model="ruleForm.cash_channel"
                placeholder="请选择修改提现通道"
                style="width: 80%"
              >
                <el-option
                  v-for="item in cashList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { updateCashChannel } from "@/api/videoRoom";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  components: {},
  data() {
    return {
      isEditComp: false,
      ruleForm: {},
      tableData: [],
      cashList: MAPDATA.CASHCHANNEL,
      status: "",
    };
  },
  computed: {
    title() {
      // 标题
      if (this.status === "single") {
        return "修改";
      } else if (this.status === "batch") {
        return "批量修改";
      }
    },
  },
  filters: {
    filterChannel(cash_channel) {
      let data = MAPDATA.CASHCHANNEL.find((item) => {
        return item.value === cash_channel;
      });
      return data.name;
    },
  },
  methods: {
    // 新增 - 修改
    async loadParams(status, row) {
      this.status = status;
      if (status === "single") {
        this.tableData = [row];
      } else if (status === "batch") {
        this.tableData = row;
      }
      this.openComp();
    },
    openComp(status = true) {
      this.isEditComp = status;
    },
    // 取消
    cancel() {
      // 记录数据 - 有改动就提示
      this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.openComp(false);
        })
        .catch(() => {});
    },
    // 修改
    update() {},
    // 提交
    async submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let ids = this.tableData
            .reduce((prev, curr) => {
              prev.push(curr.id_card);
              return prev;
            }, [])
            .join(",");

          let temp = {
            id_card: ids,
            cash_channel: this.ruleForm.cash_channel,
          };

          const res = await updateCashChannel(temp);

          if (res.code + "" === "2000") {
            this.$success("保存成功");
            this.openComp(false);
            this.$emit("getList");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.openComp(false);
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog_body_box {
  .el-select,
  .el-input {
    width: 100%;
  }
  .body_box-table {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
