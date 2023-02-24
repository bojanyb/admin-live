<template>
  <div class="app-container roomConfig-category-box">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-add="true"
        @onReset="reset"
        @onSearch="onSearch"
        @add="add"
      ></SearchPanel>
    </div>

    <tableList :isHidePage="true" :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 新增组件 -->
    <cornerComp
      v-if="isDestoryComp"
      ref="cornerComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></cornerComp>
  </div>
</template>

<script>
// 引入api
import { delGenre } from "@/api/house.js";
// 引入新增组件
import cornerComp from "./components/cornerComp.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    cornerComp,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      searchParams: {
        name: "",
      },
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "room_number",
          type: "input",
          value: "",
          label: "房间ID",
          isNum: true,
          placeholder: "请输入房间ID",
        },
        {
          name: "name",
          type: "input",
          value: "",
          label: "房间类型",
          placeholder: "请输入房间类型",
        },
        {
          label: "处理状态",
          render: (h, params) => {
            let paramsData = MAPDATA.STATUSLIST.find((item) => {
              return item.value === params.row.status;
            });
            return h("span", paramsData ? paramsData.name : "--");
          },
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.house.genreList,
        columns: [
          {
            label: "房间ID",
            prop: "sort",
          },
          {
            label: "房间ID",
            prop: "room_name",
          },
          {
            label: "类型图片",
            isimg: true,
            prop: "icon",
            imgHeight: "50px",
          },
          {
            label: "房间类型",
            prop: "name",
          },
          {
            label: "有效时间",
            minWidth: "310px",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  params.row.start_time
                    ? timeFormat(
                        params.row.start_time,
                        "YYYY-MM-DD HH:mm:ss",
                        true
                      )
                    : "无"
                ),
                h("span", " 至 "),
                h(
                  "span",
                  params.row.end_time
                    ? timeFormat(
                        params.row.end_time,
                        "YYYY-MM-DD HH:mm:ss",
                        true
                      )
                    : "无"
                ),
              ]);
            },
          },
          {
            label: "状态",
            render: (h, params) => {
              let data = MAPDATA.CATEGORYBUSINESSTYPELIST.find((item) => {
                return item.value === params.row.belong;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "备注说明",
            prop: "desc",
          },
          {
            label: "操作",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    on: {
                      click: () => {
                        this.update(params.row);
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "danger" },
                    style: {
                      display: params.row.id === 1 ? "none" : "unset",
                    },
                    on: {
                      click: () => {
                        this.deleteParams(params.row.id);
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
      };
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      return {
        page: params.page,
        pagesize: params.size,
        name: s.name,
        belong: s.belong,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {
        name: "",
      };
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 新增
    add() {
      this.load("add");
    },
    // 修改
    update(row) {
      this.load("update", row);
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.cornerComp.loadParams(status, row);
      }, 50);
    },
    // 删除
    async deleteParams(id) {
      let res = await delGenre({ id });
      if (res.code === 2000) {
        this.$success("删除成功");
        this.getList();
      }
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
