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
        :disabled="disabled"
      >
        <el-form-item label="发送时间" prop="aaa" class="body_box-line">
          <el-date-picker
            v-model="ruleForm.aaa"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="推送标题" prop="bbb" class="body_box-line">
          <el-input
            v-model="ruleForm.bbb"
            placeholder="请输入push推送标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送内容" prop="ccc" class="body_box-line">
          <el-input
            type="textarea"
            rows="3"
            resize="none"
            v-model="ruleForm.ccc"
            placeholder="请输入推送内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="落地类型" prop="ddd" class="body_box-line">
          <el-input
            placeholder="请输入落地类型"
            v-model="ruleForm.ddd"
            class="input-with-select"
          >
            <el-select
              v-model="ruleForm.eee"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option label="打开app" value="1"></el-option>
              <el-option label="进房间" value="2"></el-option>
              <el-option label="url" value="3"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-row class="body_box-col">
          <el-col :span="12">
            <el-form-item label="目标用户">
              <el-select v-model="ruleForm.fff" placeholder="请选择活动区域">
                <el-option label="注册" value="1"></el-option>
                <el-option label="登录" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间范围" prop="name">
              <el-row>
                <el-col :span="22">
                  <el-input v-model="ruleForm.ggg" placeholder="天" />
                </el-col>
                <el-col :span="2"> 内 </el-col>
              </el-row>
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
import { getGuildCreateV2, getGuildUpdateV2 } from "@/api/videoRoom";
export default {
  components: {},
  data() {
    return {
      status: "add",
      isEditComp: false,
      ruleForm: {
        aaa: null,
        bbb: "",
        ccc: "",
      },
      oldParams: {}, // 老数据
      rules: {
        aaa: [{ required: true, message: "请输入推送时间", trigger: "blur" }],
        bbb: [{ required: true, message: "请输入推送标题", trigger: "blur" }],
        ccc: [{ required: true, message: "请输入推送内容", trigger: "blur" }],
      },
    };
  },
  computed: {
    title() {
      // 标题
      if (this.status === "add") {
        return "新增发送广播消息";
      } else if (this.status === "update") {
        return "修改公会";
      }
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
    // 公会返点限制
    rebateInput() {
      let num = this.ruleForm.rebate;
      if (num && Number(num) > 10) {
        this.ruleForm.rebate = 10;
      }
    },
    // 新增 - 修改
    loadParams(status, row) {
      this.openComp();
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        let para = {};
        para.guild_type = params.guild_type ? params.guild_type : "";
        para.id = params.id ? params.id : "";
        para.name = params.name ? params.name : "";
        para.guild_number = params.guild_number ? params.guild_number : "";
        para.status = params.status;
        para.rebate = params.rebate;
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
          if (this.status === "add") {
            let res = await getGuildCreateV2(params);
            if (res.code === 2000) {
              this.$success("新增成功");
            }
          } else {
            let res = await getGuildUpdateV2(params);
            if (res.code === 2000) {
              this.$success("修改成功");
            }
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
  },
};
</script>

<style lang="scss" scoped>
.dialog_body_box {
  .body_box-line {
    padding-right: 12px;
    ::v-deep.el-select {
      width: 100%;
    }
  }
  .input-with-select {
    ::v-deep.el-select {
      width: 130px;
    }
  }
  ::v-deep.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  ::v-deep.el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>