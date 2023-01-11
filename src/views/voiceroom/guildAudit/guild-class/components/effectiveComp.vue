<template>
  <div class="systemConfig-guild-class-classComp-box">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="610px"
      :before-close="handleClose"
      @closed="closed"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <div class="formBox">
          <el-form-item label="奖励名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              maxlength="10"
              placeholder="仅支持中英文数字"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效人数" prop="now_flow" class="form-col">
            <el-input v-model="ruleForm.eff_user_total"></el-input>
            <div class="unit">人</div>
          </el-form-item>
        </div>
        <div class="formBox">
          <el-form-item label="奖励类型" prop="rewards_type">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="item in rewards_typeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖励数额" prop="rewards" class="form-col">
            <el-input
              onkeydown="this.value=this.value.replace(/^0+/,'');"
              oninput="this.value=this.value.replace(/[^\d]/g,'');"
              v-model="ruleForm.val"
            ></el-input>
            <div class="unit">
              {{ +ruleForm.type === 2 ? "%" : "喵粮" }}
            </div>
          </el-form-item>
        </div>
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
import {
  effectSave,
  getGuildType,
  guildRoomType,
} from "@/api/videoRoom.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  computed: {
    title() {
      // 标题
      if (this.status === "add") {
        return "添加配置";
      } else if (this.status === "update") {
        return "修改配置";
      }
    },
    startRules() {
      // 起始流水
      let params = {};
      params = {
        required: true,
        validator: (rules, val, cb) => {
          if (!this.ruleForm.start || this.ruleForm.start == 0) {
            cb(new Error("请输入有效起始流水"));
          } else {
            if (this.ruleForm.end) {
              if (Number(this.ruleForm.start) >= Number(this.ruleForm.end)) {
                cb(new Error("起始流水不可大于等于结束流水"));
              } else {
                cb();
              }
            } else {
              cb();
            }
          }
        },
      };
      return params;
    },
    endRules() {
      // 结束流水
      let params = {};
      params = {
        required: true,
        validator: (rules, val, cb) => {
          if (!this.ruleForm.end) {
            cb(new Error("请输入结束流水"));
          } else {
            if (this.ruleForm.start) {
              if (Number(this.ruleForm.end) <= Number(this.ruleForm.start)) {
                cb(new Error("结束流水不可小于等于起始流水"));
              } else {
                cb();
              }
            } else {
              cb();
            }
          }
        },
      };
      return params;
    },
  },
  data() {
    return {
      status: "add", // 当前状态
      dialogVisible: false,
      codeList: MAPDATA.CLASSLIST, // 公会等级
      rewards_typeList: MAPDATA.GUILDCONFIGURATIONRATETYPELIST, // 评级类型
      ruleForm: {
        id: "",
        name: "",
        eff_user_total: "",
        val: "",
        type: 2,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入奖励名称",
            trigger: "blur",
            validator: (rules, val, cb) => {
              let value = val.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/gi, "");
              this.ruleForm.name = value;
              return cb();
            },
          },
        ],
        eff_user_total: [
          { required: true, message: "请输入有效人数", trigger: "input" },
        ],
        type: [
          { required: true, message: "请选择奖励类型", trigger: "change" },
        ],
        val: [
          { required: true, message: "请输入奖励数额", trigger: "input" },
        ],
      },
      guildTypeList: [],
      roomTypeList: [],
    };
  },
  created() {
    this.getTypeList();
    this.getRoomTypeList();
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取数据
    loadParams(status, row) {
      this.status = status;
      this.dialogVisible = true;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        this.$set(this.$data, "ruleForm", params);
      }
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          let res = await effectSave(params);
          if (res.code === 2000) {
            if (this.status === "add") {
              this.$success("新增成功");
            } else {
              this.$success("修改成功");
            }
            this.dialogVisible = false;
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
    // 获取公会类型
    async getTypeList() {
      const response = await getGuildType();
      if (response.code === 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data.list) ? response.data.list : []
        );
        this.guildTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.remark,
              value: curr.type,
            });
            return prev;
          }, []) || [];
      }
    },
    // 获取房间类型
    async getRoomTypeList() {
      const response = await guildRoomType();
      if (response.code === 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data.list) ? response.data.list : []
        );
        this.roomTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.name,
              value: curr.id,
            });
            return prev;
          }, []) || [];
      }
    },
  },
};
</script>

<style lang="scss">
.systemConfig-guild-class-classComp-box {
  .formBox {
    display: flex;
    .el-select {
      width: 170px;
    }
    .el-input {
      width: 170px;
    }
  }
  .form-col {
    position: relative;
    .unit {
      position: absolute;
      top: 0;
      right: 10px;
    }
    .el-input__inner {
      padding-right: 30px;
    }
  }
}
</style>
