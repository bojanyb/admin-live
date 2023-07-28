<template>
  <div class="user-excelDownloadComp-box">
    <el-dialog
      title="导出文件名称"
      :visible.sync="dialogVisible"
      width="50%"
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
        <el-form-item label="请输入本次文件名称" prop="file_name">
          <el-input
            v-model="ruleForm.file_name"
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
import { userExport } from "@/api/user.js";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      ruleForm: {
        file_name: "",
      },
      rules: {
        file_name: [
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
    loadParams(row) {
      this.dialogVisible = true;
      let params = JSON.parse(JSON.stringify(row))
      this.$set(this.$data, 'form', params)
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            ...this.form,
            ...this.ruleForm
          }
          let res = await userExport(params);
          if (res && res.code === 2000) {
            this.$success("文件导出任务已开始！");
          }
          this.dialogVisible = false;
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
