<template>
  <div class="dialog_body_box">
    <el-dialog
      :title="title"
      :width="'600px'"
      @closed="closed"
      :visible.sync="isEditComp"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="body_box-line"
        label-suffix=":"
        :hide-required-asterisk="status === 'see'"
      >
         <el-form-item label="广播类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio-button label="1">小喇叭</el-radio-button>
            <el-radio-button label="2">大喇叭</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户ID" prop="user_number">
          <el-input
            v-model="ruleForm.user_number"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="房间ID" prop="room_number">
          <el-input
            v-model="ruleForm.room_number"
            placeholder="请输入房间ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="广播内容" prop="content">
          <el-input
            type="textarea"
            rows="3"
            resize="none"
            maxlength="30"
            v-model="ruleForm.content"
            placeholder="请输入广播内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { sendBroadcast } from "@/api/videoRoom";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  components: {},
  data() {
    return {
      status: "add",
      isEditComp: false,
      rankList: MAPDATA.CLASSLIST,
      guildTypeList: MAPDATA.GUILDCONFIGTYPELIST,
      typeOptions: MAPDATA.BROADCASTTYPESTATUS,
      ruleForm: {
        type: "1",
        user_number: null,
        room_number: "",
        content: "",
      },
      oldParams: {}, // 老数据
      rules: {
        user_number: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入广播内容", trigger: "blur" },
        ],
        room_number: [
          { required: false, pattern: /^[+]{0,1}(\d+)$/, message: '请输入正整数', trigger: 'blur' },
        ]
      },
    };
  },
  computed: {
    title() {
      // 标题
      return "新增发送广播消息";
    },
    disabled() {
      // 是否禁止输入
      if (this.status === "see") {
        return true;
      }
      return false;
    },
  },
  methods: {
    // 新增 - 修改
    loadParams(status, row) {
      this.openComp();
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        let para = {};
        para.user_number = params.user_number || "";
        para.room_number = params.room_number || "";
        para.content = params.content || "";
        this.$set(this.$data, "ruleForm", para);
      }

      this.oldParams = JSON.parse(JSON.stringify(this.ruleForm));
    },
    openComp(status = true) {
      this.isEditComp = status;
    },
    // 取消
    cancel() {
      if (JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) {
        // 记录数据 - 有改动就提示
        this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.openComp(false);
          })
          .catch(() => {});
      } else {
        this.openComp(false);
      }
    },
    // 修改
    update() {
      this.status = "update";
    },
    // 提交
    async submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          let res = await sendBroadcast(params);
          if (res.code === 2000) {
            this.$success("发送成功");
          }
          this.openComp(false);
          this.$emit("getList");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.openComp(false);
    },
    // 重置字段验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog_body_box {
  .el-select,
  .el-input {
    width: 100%;
  }
}
</style>
