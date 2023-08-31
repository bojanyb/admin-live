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
        <el-form-item label="推荐时间" prop="start_time">
          <el-select v-model="ruleForm.start_time" placeholder="请选择">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
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
import { setTopMoment } from "@/api/dynamic";
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
        start_time: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        end_time: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
      },
      timeOptions: [
        {
          value: "1",
          label: "1小时",
        },
        {
          value: "2",
          label: "2小时",
        },
        {
          value: "3",
          label: "3小时",
        },
        {
          value: "4",
          label: "4小时",
        },
        {
          value: "5",
          label: "5小时",
        },
      ],
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
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.ruleForm);
          const params = {
            ...this.ruleForm,
            end_time: Math.floor(this.ruleForm.end_time / 1000)
          }
          let res = await setTopMoment(params);
          if (res.code === 2000) {
            this.dialogVisible = false;
            this.$success("设置成功");
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
