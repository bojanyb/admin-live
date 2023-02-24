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
        <el-form-item label="房间类型" prop="room_genre">
          <el-select v-model="ruleForm.room_genre" placeholder="请选择房间类型">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间ID" prop="user_number">
          <el-input
            v-model="ruleForm.user_number"
            placeholder="请输入房间ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="生效时间" prop="timeRange">
          <el-date-picker
            style="width: 100%"
            v-model="ruleForm.timeRange"
            type="datetimerange"
            align="center"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注说明" prop="describe">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入备注说明"
            maxlength="300"
            v-model="ruleForm.describe"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="首页权重" prop="sort">
          <el-input
            v-model="ruleForm.sort"
            placeholder="请输入首页权重"
          ></el-input>
        </el-form-item>
        <el-form-item label="角标" prop="sort">
          <Upload
            v-model="ruleForm.icon"
            :imgUrl="ruleForm.icon"
            @validateField="validateField"
            :disabled="disabled"
            ref="Upload"
          ></Upload>
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
// 引入上传图片组件
import Upload from "@/components/uploadImg/index.vue";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      status: "add",
      isEditComp: false,
      typeList: MAPDATA.ROOMTYPELIST,
      ruleForm: {
        room_genre: "",
        timeRange: [],
        user_number: null,
        sort: null,
        describe: "",
      },
      oldParams: {}, // 老数据
      rules: {
        room_genre: [
          { required: true, message: "请选择房间类型", trigger: "change" },
        ],
        timeRange: [
          {
            type: "array",
            required: true,
            message: "请选择日期区间",
          },
        ],
        sort: [{ required: true, message: "请输入权重排序", trigger: "blur" }],
        user_number: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    title() {
      // 标题
      return "新增";
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
        para.room_genre = params.room_genre || "";
        para.user_number = params.user_number || "";
        para.sort = params.sort || "";
        para.describe = params.describe || "";
        if (params.start_time && params.end_time) {
          para.timeRange = [params.start_time * 1000, params.end_time * 1000];
        }
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
          if (params.timeRange && params.timeRange.length) {
            params.start_time = params.timeRange[0] / 1000;
            params.end_time = params.timeRange[1] / 1000;
            delete params.timeRange;
          }
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
