<template>
  <div class="roomConfig-typeComp-box">
    <el-dialog
      title="批量设置房间类型"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <el-row>
        <div>批量修改房间类型</div>
      </el-row>
      <el-divider></el-divider>
      <el-row>
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

          <el-button type="primary" @click="bindTypes">确 定</el-button>
        </div>
      </el-row>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="bindTypes">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { changePartyRoom, canChangeType, closeRoomLives } from "@/api/house.js";
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
      room_type: null,
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
      console.log(this.ruleForm);
      this.getCanChangeTypeData(row.user_id);
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    changeType() {
      this.$confirm("确定要更改房间类型吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.bindTypes();
      });
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
        this.$success("修改成功");
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
