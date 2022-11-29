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
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="body_box-line"
        label-suffix=":"
        :hide-required-asterisk="status === 'see'"
      >
        <el-form-item label="app渠道" prop="channel">
          <el-input
            v-model="ruleForm.channel"
            placeholder="请输入app渠道"
          ></el-input>
        </el-form-item>
        <el-form-item label="房间ID" prop="room_number">
          <el-row>
            <el-col :span="16">
              <el-input
                v-model="ruleForm.room_number"
                placeholder="请输入房间ID"
              ></el-input>
            </el-col>
            <el-col :span="6" style="margin-left: 10px">
              <el-button type="primary" @click="handlerAdd">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <div class="body_box-table">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            max-height="250"
          >
            <el-table-column fixed prop="date" label="添加时间" width="200">
            </el-table-column>
            <el-table-column prop="name" label="直播间ID" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
import { addAutoJoinConfig } from "@/api/videoRoom";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  components: {},
  data() {
    return {
      status: "add",
      isEditComp: false,
      rankList: MAPDATA.CLASSLIST,
      guildTypeList: MAPDATA.GUILDCONFIGTYPELIST,
      ruleForm: {
        channel: "",
        room_number: "",
      },
      oldParams: {}, // 老数据
      rules: {
        channel: [
          { required: true, message: "请输入app渠道", trigger: "blur" },
        ],
        room_number: [
          { required: true, message: "请输入房间ID", trigger: "blur" },
        ],
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  computed: {
    title() {
      // 标题
      return "提示";
    },
    disabled() {
      // 是否禁止输入
      if (this.status === "see") {
        return true;
      }
      return false;
    },
  },
  methods: {
    // 新增 - 修改
    loadParams(status, row) {
      this.openComp();
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        let para = {};
        para.channel = params.channel || "";
        para.room_number = params.room_number || "";
        this.$set(this.$data, "ruleForm", para);
      }

      this.oldParams = JSON.parse(JSON.stringify(this.ruleForm));
    },
    openComp(status = true) {
      this.isEditComp = status;
    },
    // 取消
    cancel() {
      if (JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) {
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
      } else {
        this.openComp(false);
      }
    },
    // 修改
    update() {
      this.status = "update";
    },
    // 提交
    async submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          let res = await addAutoJoinConfig(params);
          if (res.code === 2000) {
            this.$success("保存成功");
          }
          this.openComp(false);
          this.$emit("getList");
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
    // 重置字段验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handlerAdd() {
      this.$confirm("此操作将添加渠道进房, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加",
          });
        });
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
