<template>
  <div class="shopping-add-box">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @closed="destoryComp"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-suffix=":"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="是否跨屏礼物" prop="accross_screen">
          <el-radio-group v-model="ruleForm.accross_screen">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="PK类型" prop="pk_type">
          <el-radio-group v-model="ruleForm.pk_type">
            <el-radio :label="1">增加PK值</el-radio>
            <el-radio :label="0">减少PK值</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="PK值数" prop="pk_value">
          <el-input
            v-model="ruleForm.pk_value"
            placeholder="请输入整数"
          ></el-input>
        </el-form-item>

        <el-form-item label="说明" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入礼物说明"
            v-model="ruleForm.remark"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择礼物状态">
            <el-option
              v-for="item in gitStatusList"
              :label="item.name"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生效时间" prop="start_time" :rules="startTime">
          <el-date-picker
            v-model="ruleForm.start_time"
            value-format="timestamp"
            type="datetime"
            :picker-options="StartPicker"
            placeholder="生效时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="过期时间" prop="end_time" :rules="endTime">
          <el-date-picker
            v-model="ruleForm.end_time"
            value-format="timestamp"
            type="datetime"
            :picker-options="EndPicker"
            placeholder="过期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择礼物" prop="gift_id">
          <el-select v-model="ruleForm.gift_id" placeholder="请选择礼物" :disabled="status === 'update'">
            <el-option
              v-for="item in gifts"
              :label="item.gift_name"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
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
// 引入api
import { getGiftsList, updatePKGift, addPKGift } from "@/api/userActivity.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
import { debounce } from "@/utils";

export default {
  computed: {
    title() {
      // 标题
      if (this.status === "add") {
        return "新增PK礼物";
      } else if (this.status === "update") {
        return "修改PK礼物";
      }
    },
    StartPicker() {
      // 开始时间配置
      return {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
        },
      };
    },
    EndPicker() {
      // 结束时间配置
      return {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
        },
      };
    },
    startTime() {
      // 开始时间限制
      let start = this.ruleForm.start_time;
      let now = new Date().getTime();
      let params = {};
      params = {
        required: true,
        validator: (rules, val, cb) => {
          if (start < now && this.status === "add") {
            cb(new Error("商品生效时间不可小于当前时间"));
          } else {
            cb();
          }
        },
      };
      return params;
    },
    endTime() {
      // 结束时间限制
      let start = this.ruleForm.start_time;
      let now = new Date().getTime();
      let params = {};
      params = {
        required: true,
        validator: (rules, val, cb) => {
          if (start < now && this.status === "add") {
            cb(new Error("商品生效时间不可小于当前时间"));
          } else {
            cb();
          }
        },
      };
      return params;
    },
  },
  data() {
    return {
      dialogVisible: false,
      priorityGiveList: MAPDATA.PRIORITYGIVE,
      gitStatusList: MAPDATA.GIFTSTATUS,
      status: "add",
      ruleForm: {
        accross_screen: 1,
        pk_type: 1,
        pk_value: 0,
        remark: null,
        status: 0,
        start_time: "",
        end_time: "",
        gift_id: null,
        id: null,
      },
      gifts: [], // 礼物列表
      rules: {
        accross_screen: [
          {
            required: true,
            message: "请选择是否为跨屏礼物",
            trigger: "change",
          },
        ],
        pk_type: [
          { required: true, message: "请选择PK类型", trigger: "change" },
        ],
        pk_value: [
          { required: true, message: "请选择PK数值", trigger: "change" },
        ],
        remark: [
          { required: true, message: "请输入礼物说明", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择礼物状态", trigger: "change" },
        ],
        start_time: [
          { required: true, message: "请设置礼物生效时间", trigger: "change" },
        ],
        end_time: [
          { required: true, message: "请设置礼物过期时间", trigger: "change" },
        ],
        gift_id: [
          { required: true, message: "请选择PK礼物", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.close();
    },
    load(status, row) {
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        params.start_time = params.start_time * 1000;
        params.end_time = params.end_time * 1000;
        this.$set(this.$data, "ruleForm", params);
      }
    },
    // 提交
    submitForm: debounce(function () {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          let params = {};
          params.accross_screen = this.ruleForm.accross_screen;
          params.pk_type = this.ruleForm.pk_type;
          params.pk_value = this.ruleForm.pk_value;
          params.remark = this.ruleForm.remark;
          params.status = this.ruleForm.status;
          params.gift_id = this.ruleForm.gift_id;
          params.id = this.ruleForm.id;
          params.start_time = Math.floor(this.ruleForm.start_time / 1000);
          params.end_time = Math.floor(this.ruleForm.end_time / 1000);
          try {
            if (this.status === "add") {
              this.add(params);
            }
            if (this.status === "update") {
              this.update(params);
            }
            this.$message.success("操作成功");
            this.dialogVisible = false;
            this.$emit("onSearch");
          } catch (error) {
            this.$message.error(error);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }, 500),
    async add(params) {
      return await addPKGift(params);
    },
    async update(params) {
      return await updatePKGift(params);
    },
    // 重置
    resetForm(formName) {
      this.close();
    },
    // 关闭弹窗
    close() {
      this.$confirm("关闭后数据不会保存，确定关闭吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dialogVisible = false;
          this.$emit("onSearch");
        })
        .catch(() => {});
    },
    // 销毁组件
    destoryComp() {
      this.$emit("destoryComp");
    },
    // 获取礼物列表
    async getGifts() {
      let res = await getGiftsList();
      this.gifts = res.data.list || [];
    },
  },
  mounted() {
    this.getGifts();
  },
};
</script>

<style lang="scss">
.shopping-add-box {
  .el-form {
    .el-form-item__label::before {
      margin-right: 0px !important;
    }
    .el-input {
      width: 300px;
    }
    .el-textarea {
      width: 300px;
    }
    .limit-content {
      .el-form-item__content {
        display: flex;
        // align-items: center;
        .el-button {
          height: 36px;
          margin-left: 10px;
        }
      }
    }
    .limit-fa {
      .limit {
        display: flex;
        align-items: center;
        .el-input {
          width: 150px;
        }
      }
    }
    .goodsImg {
      .el-form-item__label::before {
        content: "*";
        color: #ff4949;
      }
    }
  }
}
</style>
