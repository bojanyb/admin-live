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
          v-model="ruleForm.type_id"
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
import { roomBindType } from "@/api/house.js";
export default {
  data() {
    return {
      dialogVisible: false,
      typeList: [],
      ruleForm: {
        type_id: null,
        room_number: null,
        guild_number: null,
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取参数
    loadParams(row, list) {
      this.dialogVisible = true;
      this.ruleForm = {
        ...row,
        type_id: row.room_category_id
      };
      if (list && list.length > 0) {
        this.typeList = list.filter((item) => {
          return item.name != "全部";
        });
      }
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

      let { room_number, type_id } = this.$data.ruleForm;
      let res = await roomBindType({ room_number, type_id });
      if (res.code === 2000) {
        this.$success("添加成功");
        this.dialogVisible = false;
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
