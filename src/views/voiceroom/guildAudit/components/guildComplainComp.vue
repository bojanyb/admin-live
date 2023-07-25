<template>
  <div class="guildComplainComp-box">
    <el-dialog
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
        label-width="110px"
      >
        <el-form-item label="靓号类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择靓号类型">
            <el-option
              v-for="item in goodsNumTypeList"
              :label="item.name"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="靓号ID" prop="goods_number">
          <el-input
            v-model="ruleForm.goods_number"
            placeholder="请输入靓号ID"
            clearable
          />
        </el-form-item>
        <el-form-item label="备注说明" prop="goods_describe">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入备注说明，内容将发给对应用户"
            maxlength="300"
            v-model="ruleForm.goods_describe"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { getNotGuildFree } from "@/api/videoRoom";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        goods_describe: "",
      },
      rules: {
        goods_describe: [
          { required: true, message: "请输入备注说明", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.close();
    },
    load(params) {
      this.dialogVisible = true;
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          add(this.ruleForm)
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
    // 重置
    resetForm(formName) {},
    // 销毁组件
    destoryComp() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss"></style>
