<template>
  <div class="guildComplainComp-box">
    <el-dialog
      title="受理"
      :visible.sync="dialogVisible"
      width="400px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="destoryComp"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-suffix=":"
        ref="ruleForm"
      >
        <el-form-item label="被投诉公会">
          <div>{{ ruleForm.guild_name }}</div>
        </el-form-item>
        <el-form-item label="公会所属运营">
          <div>{{ ruleForm.operator }}</div>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input
            v-model="ruleForm.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入备注说明，内容将发给对应用户"
            maxlength="20"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="destoryComp">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { handleUserComplain } from "@/api/videoRoom";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        id: '',
        user_number: '',
        guild_name: '',
        operator: '',
        remark: '',
      },
      rules: {
        remark: [
          { required: true, message: "请输入备注说明", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.destoryComp();
    },
    load(row) {
      const params = JSON.parse(JSON.stringify(row))
      this.$set(this.$data, 'ruleForm', params)
      this.dialogVisible = true;
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            id: this.ruleForm.id,
            user_number: this.ruleForm.guild_user_id,
            remark: this.ruleForm.remark,
          }
          handleUserComplain(params)
            .then((res) => {
              if (res.code === 2000) {
                this.dialogVisible = false;
                this.$emit("onSearch");
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 销毁组件
    destoryComp() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss">
.guildComplainComp-box {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
