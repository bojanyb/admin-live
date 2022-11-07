<template>
  <div class="push-notice">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-add="true"
        :show-search-btn="true"
        @add="add"
        @onSearch="onSearch"
      ></SearchPanel>
    </div>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 房间直播详情组件 -->
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
// 引入房间直播详情组件
import editComp from "./components/editComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

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
      isDestoryComp: false, // 是否销毁组件
    };
  },
  computed: {
    forms() {
      const BroadcastList = [
        {
          name: "title",
          type: "input",
          value: "",
          label: "消息标题",
          placeholder: "请输入消息标题",
        },
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "创建时间",
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
      return BroadcastList;
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.message.pushLogList,
        columns: [
          {
            label: "创建时间",
            prop: "create_time",
            minWidth: "180px",
          },
          {
            label: "推送标题",
            prop: "title",
          },
          {
            label: "推送内容",
            prop: "content",
          },
          {
            label: "落地类型",
            prop: "push_type",
            render: (h, params) => {
              let data = MAPDATA.PUSHTYPESTATUS.find((item) => {
                return item.value === params.row.push_type;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "操作人",
            prop: "admin_user_nickname",
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
        title: s.title,
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
.push-notice {
  padding: 20px;
  box-sizing: border-box;
}
</style>
  