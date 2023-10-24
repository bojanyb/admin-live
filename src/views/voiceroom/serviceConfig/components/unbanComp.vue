<template>
  <div class="unban-comp-box">
      <el-dialog
      title="解除处罚"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
      @closed="closed">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="解封原因" prop="content">
                <el-select v-model="ruleForm.content" placeholder="请选择解封原因">
                  <el-option label="误封解除" value="1"></el-option>
                  <el-option label="申诉解除" value="2"></el-option>
                  <el-option label="其他解除" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="解封说明" prop="target_val">
                <el-input v-model="ruleForm.target_val" type="textarea" :rows="4" resize="none"></el-input>
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
import { removeUserPunish } from "@/api/risk";
export default {
  data() {
      return {
          dialogVisible: false,
          ruleForm: {
              content: '',
              target_val: ''
          },
          rules: {
              content: [
                  { required: true, message: '请选择解封原因', trigger: 'change' },
              ],
              target_val: [
                  { required: false, message: '请输入解封说明', trigger: 'blur' },
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
      load(params) {
        this.ruleForm = params;
        this.dialogVisible = true
      },
      // 提交
      async submitForm(formName) {
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
                let res = await removeUserPunish(this.ruleForm)
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