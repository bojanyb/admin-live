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
    <recommendComp
      v-if="isDestoryComp"
      ref="recommendComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></recommendComp>
  </div>
</template>

<script>
// 引入api
import { deleteRoomHotConf } from "@/api/house.js";
// 引入api
import { guildRoomType } from "@/api/videoRoom.js";
// 引入新增组件
import recommendComp from "./components/recommendComp.vue";
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
import { timeFormat } from "@/utils/common";
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    recommendComp,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      roomTypeList: [],
      searchParams: {
        room_category: 1,
        room_category_id: null
      },
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "room_category_id",
          type: "select",
          value: null,
          keyName: "value",
          optionLabel: "name",
          label: "房间类型",
          placeholder: "请输入房间类型",
          clearable: true,
          options: this.roomTypeList,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.house.RoomHotConfList,
        columns: [
          {
            label: "房间类型",
            render: (h, params) => {
              let data = this.roomTypeList.find((item) => {
                return item.value === params.row.room_category_id;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "首页权重",
            prop: "sort",
          },
          {
            label: "房间ID",
            prop: "room_number",
          },
          {
            label: "有效时间",
            minWidth: "200px",
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
              let data = MAPDATA.RESOURCESACTIVESTATUS.find((item) => {
                return item.value === params.row.status;
              });
              return h("span", data ? data.name : "无");
            },
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
        room_category: 1,
        room_category_id: s.room_category_id,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {
        room_category: 1,
        room_category_id: null
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
        this.$refs.recommendComp.loadParams(status, row);
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
          let res = await deleteRoomHotConf({ id });
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
    async getGenreList() {
      const params = {
        belong: 1
      }
      const response = await guildRoomType(params);
      if (response.code == 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data.list) ? response.data.list : []
        );
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
  },
};
</script>

<style lang="scss" scoped></style>
