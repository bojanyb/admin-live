<template>
  <div class="editPunishComp-box">
    <el-dialog
      :title="(actionType === 1 ? '新增' : '编辑') + '举报/投诉配置'"
      :visible.sync="dialogVisible"
      center
      width="50%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
      ref="form"
    >
      <div class="wrap">
        <el-form
          ref="form"
          label-position="top"
          :model="formData"
          label-width="80px"
        >
          <el-form-item label="处罚类别" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入处罚类别"
            ></el-input>
          </el-form-item>
          <el-form-item label="警告文案" prop="warning_msg">
            <el-input
              type="textarea"
              v-model="formData.warning_msg"
              :rows="4"
              placeholder="请填写警告文案"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { updatePunishWords } from "@/api/risk";
export default {
  data() {
    return {
      dialogVisible: false,
      formData: {
        id: "",
        name: "",
        warning_msg: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入处罚类别", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        warning_msg: [
          { required: true, message: "请填写警告文案", trigger: "blur" },
        ],
      },
      actionType: 1, //1-新增；2-编辑
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    // 获取数据
    loadParams(row) {
      this.dialogVisible = true;
      if (row) {
        this.$set(this, "formData", row);
        this.$set(this, "actionType", 2);
      } else {
        this.$set(this, "formData", {
          id: "",
          name: "",
          warning_msg: "",
        });
        this.$set(this, "actionType", 1);
      }
      // if (Array.isArray(row)) {
      //   this.isBatch = true;
      //   this.title = "批量编辑";
      //   this.formList = deepClone(row);
      //   this.tabsValue = String(row[0].id);
      // } else {
      //   let params = deepClone(row);
      //   this.formList.push(params);
      // }
    },

    onSubmit() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const { code } = await updatePunishWords({ data: [this.formData] });
          if (code === 2000) {
            this.$success("操作成功!");
            this.dialogVisible = false;
            this.$emit("getList");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.editPunishComp-box {
  .wrap {
    max-height: 50vh;
    padding: 0 20px;
    overflow-y: scroll;
    .el-dialog__body {
      width: 80% !important;
      padding: 30px 20px 0 !important;
    }
  }
}
</style>
