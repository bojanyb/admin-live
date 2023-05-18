<template>
  <div class="roomConfig-typeComp-box">
    <el-dialog
      title="设置房间分类"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div class="btnBox">
        <el-select
          v-model="ruleForm.room_type"
          placeholder="请选择房间分类"
          style="margin-right: 10px"
        >
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="bindTypes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { changePartyRoom, canChangeType } from "@/api/house.js";
export default {
  data() {
    return {
      dialogVisible: false,
      typeList: [],
      ruleForm: {
        user_id: null,
        room_type: null,
        guild_number: null,
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取参数
    loadParams(row) {
      this.dialogVisible = true;
      this.ruleForm = {
        ...row,
      };
      this.getCanChangeTypeData(row.user_id)
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    // 绑定分类
    async bindTypes() {
      if (this.ruleForm.guild_number + "" === "0") {
        this.$error("非公会房间,不可修改房间分类");
        return false;
      }
      let { room_type, user_id } = this.$data.ruleForm;
      let res = await changePartyRoom({ room_type, user_id });
      if (res.code === 2000) {
        this.$success("添加成功");
        this.dialogVisible = false;
        this.$emit("getList");
      }
    },
    // 获取房间类型
    async getCanChangeTypeData(user_id) {
      let res = await canChangeType({ user_id });
      if (res.code + "" === "2000") {
        this.typeList = res.data;
      }
    },
  },
};
</script>

<style lang="scss">
.roomConfig-typeComp-box {
  .el-dialog__body {
    padding: 10px 20px 30px 20px;
    .btnBox {
      margin-bottom: 20px;
    }
  }
}

.typeComp-custom-dialog-box {
  .el-dialog__body {
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
