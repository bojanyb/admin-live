<template>
  <div class="userPunish_unban-comp-box">
      <el-dialog
      title="解除处罚"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
      @closed="closed">
        <div>
          <div class="tips">{{Array.isArray(ruleForm.result) ? ruleForm.result.join(';') : ruleForm.result}}<span v-if="ruleForm.remove_time">{{ruleForm.remove_time}}到期解除</span></div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="解封原因" prop="remove_reason">
                <el-select v-model="ruleForm.remove_reason" placeholder="请选择解封原因" @change="handleChange">
                  <el-option label="误封解除" value="误封解除"></el-option>
                  <el-option label="申诉解除" value="申诉解除"></el-option>
                  <el-option label="其他解除" value="其他解除"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="解封说明" prop="remove_illustrate">
                <el-input v-model="ruleForm.remove_illustrate" type="textarea" :rows="4" resize="none" placeholder="请输入解封说明"></el-input>
              </el-form-item>
          </el-form>
        </div>
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
              result: [],
              remove_time: '',
              remove_reason: '',
              remove_illustrate: ''
          },
          rules: {
              remove_reason: [
                  { required: true, message: '请选择解封原因', trigger: 'change' },
              ],
              remove_illustrate: [
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
        this.dialogVisible = true
        params.remove_reason = '';
        params.remove_illustrate = '';
        this.$set(this.$data, 'ruleForm', params)
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
      },
      // 下拉选择变更
      handleChange(val) {
        console.log('[ val ] >', val)
        if(val === '其他解除') {
          this.rules.remove_illustrate[0].required = true;
        } else {
          this.rules.remove_illustrate[0].required = false;
        }
      },
  }
}
</script>
<style lang="scss">
.userPunish_unban-comp-box {
  .tips {
    text-align: center;
    margin-bottom: 20px;
  }
  .el-input,.el-textarea {
    width: 300px;
  }
}
</style>