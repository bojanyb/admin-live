<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
        <el-button size="mini" circle icon="el-icon-search" @click="toggleSearch" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top" v-if="refresh">
        <el-button size="mini" circle icon="el-icon-refresh" @click="toRefresh" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="columns">
        <el-button size="mini" circle icon="el-icon-menu" @click="showColumn" />
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body @open="handleOpen()">
      <div style="display: flex;justify-content: center;">
        <el-transfer
          :titles="['显示', '隐藏']"
          v-model="value"
          :data="transferData"
          @change="dataChange"
          ></el-transfer>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="open = false">取 消</el-button>
        <el-button type="primary" @click="confirmColumn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { deepClone } from "@/utils/index"
export default {
  name: "RightToolbar",
  data() {
    return {
      // 显隐数据
      value: [],
      transferData: [],
      // 弹出层标题
      title: "显示/隐藏",
      // 是否显示弹出层
      open: false,
    };
  },
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Array,
    },
    search: {
      type: Boolean,
      default: false,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
    gutter: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    style() {
      const ret = {};
      if (this.gutter) {
        ret.marginRight = `${this.gutter / 2}px`;
      }
      return ret;
    }
  },
  watch: {
    columns(val) {
      this.handleOpen(val)
    }
  },
  methods: {
    // 搜索
    toggleSearch() {
      this.$emit("update:showSearch", !this.showSearch);
    },
    // 刷新
    toRefresh() {
      this.$emit("queryTable");
    },
    // 右侧列表元素变化
    dataChange(data) {
      for (let item in this.transferData) {
        const key = this.transferData[item].key;
        this.transferData[item].visible = !data.includes(key);
      }
    },
    // 打开显隐列dialog
    showColumn() {
      this.open = true;
    },
    // 显示变换之前的数据
    handleOpen(val) {
      // 显隐列初始默认隐藏列
      this.transferData = deepClone(val || this.columns);
      this.value = [];
      this.transferData.forEach(item => {
        if(item.visible === false) {
          this.value.push(item.key);
        }
      })
    },
    // 提交修改后的列表
    confirmColumn() {
      this.$emit("refreshTable", deepClone(this.transferData));
      this.open = false;
    }
  },
};
</script>
<style lang="scss" scoped>
.top-right-btn {
  position: relative;
  float: right;
}
::v-deep .el-transfer__button {
  border-radius: 50%;
  padding: 12px;
  display: block;
  margin-left: 0px;
}
::v-deep .el-transfer__button:first-child {
  margin-bottom: 10px;
}
</style>
