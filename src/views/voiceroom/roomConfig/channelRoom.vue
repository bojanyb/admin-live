<template>
  <div class="room-livelist">
    <menuComp
      ref="menuComp"
      :menuList="menuList"
      v-model="tabIndex"
      @tabChange="tabChange"
    ></menuComp>
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

    <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>

    <!-- 新增or修改组件 -->
    <editComp
      v-if="isDestoryComp"
      ref="editComp"
      :tabIndex="tabIndex"
      @destoryComp="destoryComp"
      @getList="getList"
    ></editComp>
  </div>
</template>

<script>
// 引入api
import { delAutoJoinRule, delChannels } from "@/api/videoRoom";
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
import { timeFormat, convertSecondsToTime } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "channelRoom",
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
      ruleForm: {},
      tabIndex: "0",
      menuList: [
        {
          name: "渠道进房配置",
        },
        {
          name: "渠道设置",
        },
      ],
    };
  },
  computed: {
    forms() {
      let arr = [
        {
          name: "code",
          type: "input",
          value: "",
          label: "渠道编号",
          placeholder: "请输入渠道编号",
        },
      ];

      let arr1 = [
        {
          name: "name",
          type: "input",
          value: "",
          label: "渠道名称",
          placeholder: "请输入渠道名称",
        },
      ];

      return this.tabIndex === "0" ? [...arr] : [...arr1];
    },
    cfgs() {
      let arr = [
        {
          label: "渠道编号",
          prop: "code",
        },
        {
          label: "渠道名称",
          prop: "name",
        },
        // {
        //   label: "性别",
        //   prop: "sex",
        //   render: (h, params) => {
        //     let data = MAPDATA.SEXLIST.find((item) => {
        //       return item.value === params.row.sex;
        //     });
        //     return h("span", data ? data.name : "未知");
        //   },
        // },
        {
          label: "渠道ID",
          prop: "channels",
        },
        {
          label: "进房间ID",
          prop: "room_number",
        },
        {
          label: "进入人数",
          prop: "number",
        },
        {
          label: "生效时间",
          prop: "end_time",
          render: (h, params) => {
            const date = new Date();
            const formattedDate = `${date.getFullYear()}-${(
              "0" +
              (date.getMonth() + 1)
            ).slice(-2)}-${("0" + date.getDate()).slice(
              -2
            )} ${convertSecondsToTime(params.row.end_time)}`;
            return h("span", params.row.end_time ? formattedDate : "");
          },
        },
        {
          label: "推荐状态",
          prop: "is_effect",
          render: (h, params) => {
            switch (params.row.is_effect) {
              case 0:
                return h("span", "未生效");
                break;
              case 1:
                return h("span", "已生效");
                break;

              default:
                return h("span", "无");
                break;
            }
          },
        },
        {
          label: "操作",
          minWidth: "120px",
          fixed: "right",
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
      ];

      let arr1 = [
        {
          label: "添加时间",
          render: (h, params) => {
            return h(
              "span",
              params.row.create_time
                ? timeFormat(
                    params.row.create_time,
                    "YYYY-MM-DD HH:mm:ss",
                    true
                  )
                : "--"
            );
          },
        },
        {
          label: "渠道编号",
          prop: "code",
        },
        {
          label: "渠道名称",
          prop: "name",
        },
        {
          label: "渠道ID",
          prop: "channels",
        },
        {
          label: "操作",
          minWidth: "120px",
          fixed: "right",
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
      ];
      let name;
      if (this.tabIndex === "0") {
        name = "getAutoJoinRule";
      } else {
        name = "getChannels";
      }
      return {
        vm: this,
        url: REQUEST.room[name],
        columns: this.tabIndex === "0" ? [...arr] : [...arr1],
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
        code: s.code,
        name: s.name,
        // start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
        // end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0,
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
    // 修改
    update(row) {
      this.load("update", row);
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
    // 列表返回数据
    saleAmunt(data) {
      const { total_cost, user_count, count } = data;
      this.ruleForm = { total_cost, user_count, count };
    },
    // 删除
    async deleteParams(id) {
      this.$confirm("确认删除当前动态吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res;
          if (this.tabIndex === "0") {
            res = await delAutoJoinRule({ id });
          } else if (this.tabIndex === "1") {
            res = await delChannels({ id });
          }

          if (res.code === 2000) {
            this.$success("删除成功");
            this.getList();
          }
        })
        .catch(() => {});
    },
    tabChange() {
      this.searchParams.code = "";
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
