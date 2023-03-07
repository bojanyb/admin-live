<template>
  <div class="recommend-box">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        @onReset="reset"
        @onSearch="onSearch"
      ></SearchPanel>
    </div>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 详情组件 -->
    <component
      v-if="isDestoryComp"
      :ref="Comp"
      :is="Comp"
      @destoryComp="destoryComp"
    ></component>
  </div>
</template>

<script>
// 引入详情组件
import bindAnchorComp from "./components/bindAnchorComp.vue";
import bindUserComp from "./components/bindUserComp.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
export default {
  components: {
    tableList,
    SearchPanel,
    bindAnchorComp,
    bindUserComp,
  },
  mixins: [mixins],
  computed: {
    forms() {
      return [
        {
          name: "isTopup",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "是否充值",
          placeholder: "请选择",
          options: this.topupList,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.userHistory.recommender,
        columns: [
          {
            label: "注册时间",
            width: "180px",
            render: (h, params) => {
              return h(
                "span",
                params.row.create_time
                  ? timeFormat(
                      params.row.create_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : ""
              );
            },
          },
          {
            label: "ID",
            render: (h, params) => {
              return h("span", params.row.user_number || "无");
            },
          },
          {
            label: "用户名字",
            render: (h, params) => {
              return h("span", params.row.nickname || "无");
            },
          },
          {
            label: "性别",
            prop: "today_gain",
          },
          {
            label: "地区",
            prop: "total_gain",
          },
          {
            label: "充值金额",
            prop: "today_gain",
          },
          {
            label: "消费金额",
            prop: "total_gain",
          },
          {
            label: "所属公会",
            prop: "today_gain",
          },
          {
            label: "是否厅主",
            prop: "total_gain",
          },
        ],
      };
    },
  },
  data() {
    return {
      isDestoryComp: true, // 是否销毁组件
      Comp: "", // 组件名称
      topupList: [
        { name: "全部", value: 0 },
        { name: "是", value: 1 },
        { name: "否", value: 2 },
      ],
    };
  },
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      return {
        page: params.page,
        pagesize: params.size,
        isTopup: s.isTopup,
      };
    },
    // 重置
    reset() {
      this.searchParams = {};
      this.getList();
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
.recommend-box {
  padding: 20px;
  box-sizing: border-box;
  .btnBox {
    margin-bottom: 20px;
  }
}
</style>
