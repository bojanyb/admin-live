<template>
  <div class="serviceConfig-audioComp-box">
    <drawer
      size="400px"
      :title="title"
      ref="drawer"
      @cancel="cancel"
      @submitForm="submitForm"
    >
      <el-form
        slot="body"
        ref="ruleForm"
        class="demo-ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="警告提示" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入警告提示"
            :rows="4"
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
    </drawer>
  </div>
</template>

<script>
// 引入抽屉组件
import drawer from "@/components/drawer/index";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  components: {
    drawer,
  },
  computed: {
    title() {
      // 标题
      if (this.status === "0") {
        return "编辑";
      } else {
        return "批量编辑";
      }
    },
  },
  data() {
    return {
      status: "",
      roleList: MAPDATA.RISKSYSTEMROLELIST, // 角色列表
      ruleForm: {},
      rules: {},
    };
  },
  methods: {
    // 获取数据
    loadParams(row) {
      this.openComp();
      if (row) {
        let params = JSON.parse(JSON.stringify(row));
        this.$set(this.$data, "ruleForm", params);
      }
    },
    openComp(status = true) {
      this.$refs.drawer.loadParams(status);
    },
    cancel() {
      this.openComp(false);
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          // let res = await coverCheck(params)
          // if(res.code === 2000) {
          //     this.$success('操作成功')
          //     this.openComp(false)
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.serviceConfig-audioComp-box {
  .el-select {
    width: 305px;
  }
  .el-date-editor {
    width: 305px;
  }
  .audioBox {
    .el-form-item__label {
      line-height: 55px;
    }
  }
}
</style>
