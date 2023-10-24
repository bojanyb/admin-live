<template>
  <div class="ignore-comp-box">
      <el-dialog
      title="确认忽略"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
      @closed="closed">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm">
              <el-form-item label="备注说明" prop="content">
                <el-input v-model="ruleForm.content" type="textarea" :rows="4" resize="none" placeholder="请输入备注说明"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
// 引入api
import { passUserPunish } from "@/api/risk";
export default {
  data() {
      return {
          dialogVisible: false,
          ruleForm: {
              content: ''
          },
          rules: {
              content: [
                  { required: false, message: '请输入备注说明', trigger: 'change' },
              ]
          }
      };
  },
  methods: {
      // 关闭弹窗
      handleClose() {
        this.dialogVisible = false
      },
      // 打开弹窗
      load(id) {
        this.ruleForm.id = id;
        this.dialogVisible = true
      },
      // 提交
      async submitForm(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
                let res = await passUserPunish(this.ruleForm)
                if(res.code === 2000) {
                    this.dialogVisible = false
                    this.$success('操作成功')
                    this.$emit('getList')
                }
              } else {
                  console.log('error submit!!');
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
          this.$emit('destoryComp')
      }
  }
}
</script>
<style lang="scss">
.unban-comp-box {
  .el-input,.el-textarea {
    width: 300px;
  }
}
</style>