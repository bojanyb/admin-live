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
          <el-form-item label="公会类型" prop="guild_type">
            <el-select
              v-model="ruleForm.guild_type"
              placeholder="请选择公会类型"
            >
              <el-option
                v-for="item in guildTypeList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formBox">
          <el-form-item label="实时返点比例" prop="rebate" :rules="rebateRules">
            <el-input
              onkeydown="this.value=this.value.replace(/[^0-9.]/g,'')"
              oninput="this.value=this.value.replace(/[^0-9.]/g,'')"
              v-model="ruleForm.rebate"
            ></el-input>
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
import { updateGuildRebate, addGuildRebate, getGuildType } from "@/api/videoRoom.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  computed: {
    title() {
      // 标题
      return `${this.status === 'add' ? '新增' : '修改'}修改实时返点配置`;
    },
    // 实时返点限制
    rebateRules() {
      let params = {};
      params = {
        required: true,
        validator: (rules, val, cb) => {
          if (!this.ruleForm.rebate || this.ruleForm.rebate == 0) {
            cb(new Error("请输入有效实时返点比例"));
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
      status: "add", // 当前状态
      dialogVisible: false,
      codeList: MAPDATA.CLASSLIST, // 公会等级
      ruleForm: {
        guild_type: null,
        rebate: null,
      },
      rules: {
        guild_type: [
          { required: true, message: "请选择公会类型", trigger: "change" },
        ],
        rebate: [
          { required: true, message: "请输入实时返点比例", trigger: "blur" },
        ],
      },
      guildTypeList: [],
    };
  },
  created() {
    this.getTypeList();
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
          let params = {
            guild_type: this.ruleForm.guild_type,
            rebate: this.ruleForm.rebate,
          };

          let res;
          if (this.status === "add") {
            res = await addGuildRebate(params);
          }
          else if (this.status === "update") {
            params.id = this.ruleForm.id;
            res = await updateGuildRebate(params);
          }

          if (res.code === 2000) {
            if (this.status === "add") {
              this.$success("新增成功");
            } else if (this.status === "update") {
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
}
</style>
