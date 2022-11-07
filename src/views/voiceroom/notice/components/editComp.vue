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
      >
        <el-form-item label="推送标题" prop="title" class="body_box-line">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入push推送标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="推送内容" prop="content" class="body_box-line">
          <el-input
            type="textarea"
            rows="3"
            resize="none"
            v-model="ruleForm.content"
            placeholder="请输入推送内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="落地类型" prop="push_val" class="body_box-line">
          <el-input
            placeholder="请选择落地类型"
            v-model="ruleForm.push_val"
            class="input-with-select"
          >
            <el-select
              v-model="ruleForm.push_type"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option
                v-for="item in pushTypeOptinos"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-row class="body_box-col">
          <el-col :span="12">
            <el-form-item label="目标用户" prop="target_type">
              <el-select
                v-model="ruleForm.target_type"
                placeholder="请选择目标用户"
              >
                <el-option
                  v-for="item in targetTypeOptinos"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间范围" prop="days">
              <el-row>
                <el-col :span="22">
                  <el-input v-model.number="ruleForm.days" placeholder="天" />
                </el-col>
                <el-col :span="2"> 内 </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
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
import { addPushLog } from "@/api/videoRoom";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  components: {},
  data() {
    return {
      status: "add",
      isEditComp: false,
      ruleForm: {},
      oldParams: {}, // 老数据
      rules: {
        title: [{ required: true, message: "请输入推送标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入推送内容", trigger: "blur" },
        ],
        push_val: [
          { required: true, message: "请选择落地类型", trigger: "change" },
        ],
        target_type: [
          { required: true, message: "请选择目标用户", trigger: "change" },
        ],
        days: [{ required: true, message: "请输入时间范围", trigger: "blur" }],
      },
      pushTypeOptinos: MAPDATA.PUSHTYPESTATUS,
      targetTypeOptinos: MAPDATA.TARGETTYPESTATUS,
    };
  },
  computed: {
    title() {
      // 标题
      return "push推送";
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
        para.title = params.title ? params.title : "";
        para.content = params.content ? params.content : "";
        para.push_val = params.push_val ? params.push_val : "";
        para.push_type = params.push_type ? params.push_type : "";
        para.target_type = params.target_type;
        para.days = params.days;
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
    // 提交
    async submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          let res = await addPushLog(params);
          if (res.code === 2000) {
            this.$success("新增成功");
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
  .body_box-line {
    padding-right: 12px;
    ::v-deep.el-select {
      width: 100%;
    }
  }
  .input-with-select {
    ::v-deep.el-select {
      width: 130px;
    }
  }
  ::v-deep.input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  ::v-deep.el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>