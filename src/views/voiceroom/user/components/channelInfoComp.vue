<template>
  <div class="channelInfoComp-box">
    <el-dialog
      title="渠道内容详情"
      :visible.sync="dialogVisible"
      width="300px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        label-suffix=":"
      >
        <el-form-item label="头像" prop="face">
          <el-image
            style="width: 100px; height: 100px"
            :src="ruleForm.face || defaultImg"
            :preview-src-list="[ruleForm.face || defaultImg]"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <div>{{ ruleForm.nickname || "--" }}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      defaultImg: require("@/assets/default.png"), // 默认头像
      ruleForm: {
        face: "",
        nickname: "",
      },
    };
  },
  methods: {
    // 获取数据
    loadParams(row) {
      let params = JSON.parse(JSON.stringify(row));
      this.$set(this.$data, "ruleForm", params);
      this.dialogVisible = true;
    },
    // 取消
    handleClose() {
      this.dialogVisible = false;
    },
    resetForm() {
      this.dialogVisible = false;
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>
