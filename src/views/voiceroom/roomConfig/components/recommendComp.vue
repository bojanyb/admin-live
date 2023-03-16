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
        label-width="120px"
        class="body_box-line"
        label-suffix=":"
        :hide-required-asterisk="status === 'see'"
      >
        <el-form-item label="首页列表序号" prop="pos_index">
          <el-select v-model="ruleForm.pos_index" placeholder="请选择首页列表序号" :disabled="status === 'update'">
            <el-option
              v-for="item in roomTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
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
        <!-- <el-form-item label="首页权重" prop="sort">
          <el-input
            v-model="ruleForm.sort"
            placeholder="请输入首页权重"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="房间ID" prop="room_number">
          <el-input
            v-model="ruleForm.room_number"
            placeholder="请输入房间ID"
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
import { createRoomPushFlow, updateRoomPushFlow } from "@/api/house.js";
export default {
  components: {},
  data() {
    return {
      status: "add",
      isEditComp: false,
      roomTypeList: [],
      ruleForm: {
        pos_index: "",
        timeRange: [],
        room_number: null,
        // sort: null,
        // room_category: 2
      },
      oldParams: {}, // 老数据
      rules: {
        pos_index: [
          { required: true, message: "请选择首页列表序号", trigger: "change" },
        ],
        timeRange: [
          {
            type: "array",
            required: true,
            message: "请选择日期区间",
          },
        ],
        // sort: [{ required: true, message: "请输入权重排序", trigger: "blur" }],
        room_number: [
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
        para.pos_index = params.pos_index || "";
        // para.room_category = params.room_category || "";
        para.room_number = params.room_number || "";
        // para.sort = params.sort || "";
        para.id = params.id || "";
        if (params.start_time && params.end_time) {
          para.timeRange = [params.start_time * 1000, params.end_time * 1000]
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
            params.start_time = params.timeRange[0] / 1000
            params.end_time = params.timeRange[1] / 1000
            delete params.timeRange
          }
          let res;
          if (this.status === "add") {
            res = await createRoomPushFlow(params);
          } else if (this.status === "update") {
            res = await updateRoomPushFlow(params)
          }
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
    // 获取房间类型
    async getGenreList(params) {
      for (let index = 1; index <= 10; index++) {
        this.roomTypeList.push({
          name: `首页房间推荐${index}`,
          value: index
        })
      }
    },
  },
  created() {
   this.getGenreList();
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
