<template>
  <div class="superAdmin-add-messageComp-box">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
      @closed="closed"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="文案" prop="content">
          <el-input
            type="textarea"
            v-model="ruleForm.content"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input type="number" v-model="ruleForm.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { addSuperMsg, updateSuperMsg } from "@/api/super.js";
export default {
  data() {
    return {
      dialogVisible: false,
      status: "",
      ruleForm: {
        id: null,
        type: "",
        content: "",
        sort: "",
      },
      rules: {
        content: [{ required: true, message: "请输入文案", trigger: "blur" }],
        sort: [{ required: true, message: "请输入序号", trigger: "blur" }],
      },
    };
  },
  computed: {
    title() {
      let str = "";
      if (this.status === "add") {
        str = "新增";
      } else {
        str = "修改";
      }
      if (this.ruleForm.type === "sup_msg_punish") {
        str += "超管处罚文案";
      } else if (this.ruleForm.type === "sup_msg_tip") {
        str += "超管提示文案";
      } else if (this.ruleForm.type === "sup_msg_warning") {
        str += "超管警告文案";
      }
      return str;
    },
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取数据
    loadParams(status, row) {
      this.dialogVisible = true;
      this.status = status;
      if (typeof row === "string") {
        this.ruleForm.type = row;
      } else {
        let params = JSON.parse(JSON.stringify(row));
        this.$set(this.$data, "ruleForm", params);
      }
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let s = this.ruleForm;
          let params = {
            type: s.type,
            content: s.content.replace(/\t|\n|\v|\r|\f|\s|\r\n/g,''),
            sort: s.sort,
          };
          let res;
          if (this.status === "add") {
            res = await addSuperMsg(params);
          } else {
            params.id = s.id;
            res = await updateSuperMsg(params);
          }
          if (res.code === 2000) {
            this.dialogVisible = false;
            this.$success(this.status === "add" ? "新增成功" : "修改成功");
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
