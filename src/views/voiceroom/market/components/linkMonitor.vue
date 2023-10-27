vue Copy
<template>
  <div class="link-monitor-container">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @closed="destroyComp"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-suffix=":"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="媒体" prop="category_id">
          <el-select v-model="ruleForm.category_id" placeholder="请选择" :disabled="disabledSelect">
            <el-option v-for="item in chainList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入活动名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="代理名称" prop="remark">
          <el-input
            v-model="ruleForm.remark"
            placeholder="请输入代理名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="链接编号" prop="ad_type">
          <el-input
            v-model="ruleForm.ad_type"
            placeholder="请输入链接编号"
            clearable
          />
        </el-form-item>
        <!-- <el-form-item label="绑定用户ID" prop="user_number">
          <el-input
            v-model="ruleForm.user_number"
            placeholder="请输入用户ID"
            clearable
          />
        </el-form-item> -->
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
import { deepClone } from "@/utils/index";
import { getAdSelect, addAdConf, updateAdConf } from "@/api/market";
export default {
  data() {
    return {
      status: "add",
      dialogVisible: false,
      disabledSelect: false,
      ruleForm: {
        category_id: "",
        name: "",
        remark: "",
        ad_type: "",
        room_number: "",
      },
      rules: {
        category_id: [{ required: true, message: "请选择媒体", trigger: "blur" }],
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        remark: [{ required: true, message: "请输入代理名称", trigger: "blur" }],
        ad_type: [{ required: true, message: "请输入链接编号", trigger: "blur" }],
      },
      chainList: []
    };
  },
  created() {
    this.fetchChainData()
  },
  computed: {
    title() {
      // 标题
      if (this.status === "add") {
        return "创建推广活动";
      } else if (this.status === "update") {
        return "修改推广活动";
      }
    },
  },
  methods: {
    load(status, row) {
      this.status = status;
      this.disabledSelect = false;
      if (status !== "add") {
        this.disabledSelect = true;
        let params = JSON.parse(JSON.stringify(row));
        this.$set(this.$data, "ruleForm", params);
      }
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 点击提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交
    async handleSubmit() {
      try {
        let response;
        if(this.status === 'add') {
          response = await addAdConf(this.ruleForm);
        } else {
          response = await updateAdConf(this.ruleForm);
        }
        if (response.code === 2000) {
          this.$message({
            type: "success",
            message: "操作成功",
          });
          this.dialogVisible = false;
          this.$emit("onSearch");
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 获取监测链接数据并处理
     */
     async fetchChainData() {
      try {
        const response = await getAdSelect();
        if (response.code === 2000) {
          this.chainList = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 重置
    resetForm(formName) {
      this.close();
    },
    // 关闭弹窗
    close() {
      this.dialogVisible = false;
    },
    // 销毁组件
    destroyComp() {
      this.$emit("destoryComp");
    },
    // 重置字段验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
    },
  },
};
</script>

<style lang="scss">
.link-monitor-container {
  padding: 20px;
  .el-input {
    width: 300px;
  }
}
</style>
