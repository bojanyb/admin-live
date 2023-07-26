<template>
  <div class="user-excelDownloadComp-box">
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
      @closed="closed"
    >
      <div class="mainBox">
        由于导出数据量较大，现采取异步导出的方案进行，导出文件需要一段时间进行，请稍后自行点击“<span class="strong">文件查询</span>”下载。
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="请输入本次文件名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入本次文件名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { updateLoginPwd } from "@/api/user.js";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      ruleForm: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入本次文件名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取数据
    loadParams() {
      this.dialogVisible = true;
    //   this.form = row;
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await updateLoginPwd({
            user_id: this.form.id,
            password: this.ruleForm.password,
          });
          if (res.code === 2000) {
            this.$success("修改成功");
            this.dialogVisible = false;
            this.$emit("getList");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss">
.user-excelDownloadComp-box {
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    .mainBox {
      margin-bottom: 30px;
      .strong {
        font-weight: bold;
      }
    }
  }
}
</style>
