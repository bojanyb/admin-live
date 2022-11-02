<template>
  <div class="room-livelist">
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-add="tabIndex === '0'"
        :show-search-btn="tabIndex === '0'"
        :show-save="tabIndex === '1'"
        @add="add"
        @onSearch="onSearch"
        @save="onSave"
      ></SearchPanel>
    </div>

    <el-card class="box-card" shadow="always" v-show="tabIndex === '0'">
      <div class="box-card-inner">
        <span v-for="item in topListFilter" :key="item.type"
          >{{ item.name }}: {{ item.value }}</span
        >
      </div>
    </el-card>

    <tableList v-if="tabIndex === '0'" :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 新增or修改组件 -->
    <editComp
      v-if="isDestoryComp"
      ref="editComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></editComp>
  </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入新增or修改组件
import editComp from "./components/editComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";

export default {
  name: "BroadcastList",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    editComp,
    menuComp,
  },
  data() {
    return {
      tabIndex: "0",
      menuList: [{ name: "房间广播列表" }, { name: "房间广播配置" }],
      isDestoryComp: false, // 是否销毁组件
      topListFilter: [
        {
          name: "查询期间",
          value: 100,
          type: 1,
        },
        {
          name: "发送人数",
          value: 100,
          type: 2,
        },
        {
          name: "发送条数",
          value: 100,
          type: 3,
        },
        {
          name: "广播内容",
          value: 100,
          type: 3,
        },
      ],
    };
  },
  computed: {
    forms() {
      const BroadcastList = [
        {
          name: "room_number",
          type: "input",
          value: "",
          label: "房间ID",
          isNum: true,
          placeholder: "请输入房间ID",
        },
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "开播时间",
          value: "",
          handler: {
            change: (v) => {
              this.emptyDateTime();
              this.setDateTime(v);
              this.getList();
            },
            selectChange: (v, key) => {
              this.emptyDateTime();
              this.getList();
            },
          },
        },
      ];
      const BroadcastOptions = [
        {
          name: "price",
          type: "input",
          value: "",
          label: "广播单价",
          isNum: true,
          placeholder: "请输入推广单价",
        },
      ];
      return this.tabIndex === "1" ? BroadcastOptions : BroadcastList;
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.liveList,
        columns: [
          {
            label: "发送时间",
            minWidth: "180px",
            render: (h, params) => {
              return h(
                "span",
                params.row.start_time
                  ? timeFormat(
                      params.row.start_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : "无"
              );
            },
          },
          {
            label: "用户",
            prop: "room_number",
          },
          {
            label: "发送类型",
            prop: "room_type",
          },
          {
            label: "广播内容",
            prop: "room_content",
          },
        ],
      };
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        room_number: s.room_number,
        room_category_id: s.room_category_id,
        guild_number: s.guild_number,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 设置时间段
    setDateTime(arr) {
      const date = arr
        ? {
            start_time: arr[0],
            end_time: arr[1],
          }
        : {};
      this.$set(this, "dateTimeParams", date);
    },
    // 清空日期选择
    emptyDateTime() {
      this.dateTimeParams = {};
    },
    // 新增
    add() {
      this.load("add");
    },
    // 保存
    onSave() {
      this.$confirm("此操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.editComp.loadParams(status, row);
      }, 50);
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
  },
};
</script>
<style lang="scss">
.room-livelist {
  padding: 20px;
  box-sizing: border-box;
  .box-card {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    padding: 0px 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .box-card-inner {
      > span {
        font-size: 15px;
        color: #ffffff;
        margin-right: 100px;
      }
    }
  }
}
</style>
