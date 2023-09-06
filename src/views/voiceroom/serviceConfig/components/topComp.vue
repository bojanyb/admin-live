<template>
  <div class="serviceConfig-topComp-box">
    <el-dialog
      title="请选择置顶时间"
      :visible.sync="dialogVisible"
      width="500px"
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
            :picker-options="pickerOptions"
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
        moment_id: "",
        start_time: "",
        end_time: "",
      },
      rules: {
        end_time: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
      },
      // 是否通过审核
      isPass: false,
      pickerOptions: {
        disabledDate(date) {
          // 禁用今天之前的时间
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
        selectableRange: new Date().getHours() + ':'+(new Date().getMinutes()+1)+':00' + ' - 23:59:59'
      },
    };
  },
  watch:{
    'ruleForm.end_time'(selectTime){
      const date = new Date(new Date(selectTime).setHours(0,0,0,0)).getTime()
      const today = new Date(new Date().setHours(0,0,0,0)).getTime()
      if (date <= today){
        // 当选择的日期就是当天的时候，这个时候就要限制时间应当大于此时此刻的时分秒
        this.pickerOptions.selectableRange =  new Date().getHours() + ':'+(new Date().getMinutes()+1)+':00' + '- 23:59:59'
      }else {
        // 当选择的日期大于当天的时候，这时需要把时分秒的限制放开，否则不能选择
        this.pickerOptions.selectableRange = '00:00:00 - 23:59:59'
      }
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.resetForm("ruleForm");
      this.dialogVisible = false;
    },
    // 打开弹窗
    load(id, isPass = false) {
      this.ruleForm.moment_id = id;
      this.isPass = isPass;
      this.dialogVisible = true;
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          const params = {
            ...this.ruleForm,
            start_time: Math.floor(Number(new Date()) / 1000), // 当前时间
            end_time: Math.floor(this.ruleForm.end_time / 1000),
          };
          const setTop = await setTopMoment(params);
          if (!this.isPass) {
            await check({
              moments_ids: this.ruleForm.moment_id,
              check_status: 3,
            });
          }
          if (setTop.code === 2000) {
            this.dialogVisible = false;
            this.$success("推荐成功");
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
