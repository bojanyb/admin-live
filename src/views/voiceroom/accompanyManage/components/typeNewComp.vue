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
          v-model="type_id"
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
        <!-- <el-button
          type="success"
          :disabled="guild_number == 0 ? true : false"
          @click="bindTypes"
          >新增</el-button
        >
        <span style="color: red; margin-left: 15px" v-if="guild_number == 0"
          >非公会房间,不可修改房间分类</span
        > -->
      </div>
      <!-- <div style="width: 100%">
        <el-tag
          v-for="tag in tagsData"
          :key="tag.name"
          closable
          @close="deleteTypes(tag.id)"
          :disable-transitions="true"
          style="margin-right: 10px"
        >
          {{ tag.name }}
        </el-tag>
      </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="bindTypes">确 定</el-button>
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { roomTypes, roomBindType, delBind } from "@/api/house.js";
export default {
  data() {
    return {
      dialogVisible: false,
      // tagsData: [],
      typeList: [],
      type_id: null,
      room_number: null,
      guild_number: null,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取参数
    loadParams(row, list) {
      this.dialogVisible = true;
      this.room_number = row.room_number;
      this.guild_number = row.guild_number;
      // await this.getTypes(row.room_number);
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
    // // 获取分类
    // async getTypes(room_number) {
    //   let res = await roomTypes({ room_number });
    //   this.tagsData = res.data.list || [];
    // },
    // 绑定分类
    async bindTypes() {

      if (this.guild_number + "" === "0") {
        this.$error("非公会房间,不可修改房间分类");
        return false;
      }

      let { room_number, type_id } = this.$data;
      let res = await roomBindType({ room_number, type_id });
      if (res.code === 2000) {
        this.$success("添加成功");
        this.dialogVisible = false;
        // this.getTypes(this.room_number);
      }
    },
    // // 移除分类
    // async deleteTypes(id) {
    //   let res = await delBind({ id });
    //   if (res.code === 2000) {
    //     this.$success("移除成功");
    //     this.getTypes(this.room_number);
    //   }
    // },
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
