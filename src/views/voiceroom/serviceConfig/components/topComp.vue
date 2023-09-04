<template>
  <div class="serviceConfig-topComp-box">
    <el-dialog
      title="请选择置顶时间"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
      @closed="closed"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
            v-model="ruleForm.end_time"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { setTopMoment, check } from "@/api/dynamic";
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        moment_id: '',
        start_time: "",
        end_time: "",
      },
      rules: {
        end_time: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.resetForm('ruleForm');
      this.dialogVisible = false;
    },
    // 打开弹窗
    load(id) {
      this.ruleForm.moment_id = id;
      this.dialogVisible = true;
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          const params = {
            ...this.ruleForm,
            start_time: Math.floor(Number(new Date()) / 1000), // 当前时间
            end_time: Math.floor(this.ruleForm.end_time / 1000)
          }
          let setTop = setTopMoment(params);
          let setPass = check({ moments_ids: this.ruleForm.moment_id, check_status: 3 });
          Promise.all([setTop, setPass]).then((res) => {
            console.log('res',res);
            if(res[0].code === 2000 && res[1].code === 2000) {
              this.dialogVisible = false;
              this.$success("设置成功");
              this.$emit("getList");
            }
          });
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
