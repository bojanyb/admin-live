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
import { deleteRoomHonour } from "@/api/house.js";
// 引入api
import { guildRoomType } from "@/api/videoRoom.js";
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
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
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
      roomTypeList: [],
      statusList: [],
      searchParams: {
        room_category: 1,
        status: 0,
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
          name: "room_category",
          type: "select",
          value: 0,
          keyName: "value",
          optionLabel: "name",
          label: "房间类型",
          placeholder: "请选择房间类型",
          clearable: true,
          options: this.roomTypeList,
        },
        {
          name: "status",
          type: "select",
          value: 0,
          keyName: "value",
          optionLabel: "name",
          label: "状态",
          placeholder: "请选择状态",
          clearable: true,
          options: this.statusList,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.house.RoomHonourList,
        columns: [
          {
            label: "房间ID",
            prop: "room_number_list",
            render: (h, params) => {
              return h("div", [
                params.row.room_number_list &&
                  params.row.room_number_list.map((item) => {
                    return h("div", item ? `${item}；`: "无");
                  }),
              ]);
            },
          },
          {
            label: "房间标题",
            prop: "room_title_list",
            render: (h, params) => {
              return h("div", [
                params.row.room_title_list &&
                  params.row.room_title_list.map((item) => {
                    return h("div", item ? `${item}；` : "无");
                  }),
              ]);
            },
          },
          {
            label: "房间角标图片",
            isimg: true,
            prop: "honour_icon",
            imgHeight: "50px",
          },
          {
            label: "房间类型",
            render: (h, params) => {
              let data = this.roomTypeList.find((item) => {
                return item.value === params.row.room_category;
              });
              return h("span", data ? data.name : "无");
            },
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
              let data = this.statusList.find((item) => {
                return item.value === params.row.status;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "备注说明",
            prop: "remark",
          },
          {
            label: "操作",
            minWidth: "200px",
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
        room_category: 0,
        status: 0,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {
        room_category: 0,
        status: 0,
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
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteRoomHonour({ id });
          if (res.code === 2000) {
            this.$success("删除成功");
            this.getList();
          }
        })
        .catch(() => {});
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 获取房间类型
    async getGenreList(params) {
      const response = await guildRoomType(params);
      if (response.code == 2000) {
        const tempArr = [{name: "直播" , id: 1 }, {name: "派对" , id: 2 }, {name: "全部" , id: 0 }]
        this.roomTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.name,
              value: curr.id,
            });
            return prev;
          }, []) || [];
      }
    },
  },
  created() {
    this.getGenreList();
    this.statusList = [{name: "待开始" , value: 1 }, {name: "生效中" , value: 2 }, {name: "已过期" , value: 3 }, {name: "全部" , value: 0 }]
  },
};
</script>

<style lang="scss" scoped></style>
