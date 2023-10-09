<template>
  <div class="guild-live-list">
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
    <div
      class="model"
      v-if="tabIndex === '1'"
      v-loading="modelLoading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <span>开播记录：{{ tableData.count || "0" }}条</span>
      <span>直播总时长：{{ liveHistoryTotalData.all_time || "0" }}</span>
      <span
        >有效直播总时长：{{ liveHistoryTotalData.effective_time || "0" }}</span
      ><span
        >无效直播总时长：{{ liveHistoryTotalData.down_time || "0" }}</span
      >
      <span>直播总流水：{{ liveHistoryTotalData.total_gain || "0" }}</span>
      <span
        >进房总人数：{{ liveHistoryTotalData.enter_user_count || "0" }}人</span
      >
      <span
        >送礼总人数：{{
          liveHistoryTotalData.consume_user_count || "0"
        }}人</span
      >
    </div>
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

    <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>

    <!-- 房间直播详情组件 -->
    <liveDetails
      v-if="isDestoryComp"
      ref="liveDetails"
      @destoryComp="destoryComp"
      @getList="getList"
    ></liveDetails>

    <!-- 魅力榜组件 -->
    <charmComp v-if="isCharmDestoryComp" ref="charmComp" @destoryComp="destoryCharmComp"></charmComp>
  </div>
</template>

<script>
// 引入api
import { genreList } from "@/api/house.js";
import { liveHistoryTotal } from "@/api/videoRoom.js";
import { liveEnd } from "@/api/callApp.js";
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入房间直播详情组件
import liveDetails from "./components/liveDetails.vue";
// 引入魅力榜组件
import charmComp from "./components/charmComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共方法
import { formatTime } from "@/utils/common.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "RoomList",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    liveDetails,
    menuComp,
    charmComp,
  },
  data() {
    return {
      tabIndex: "0",
      menuList: [
        {
          name: "直播房间列表",
        },
        {
          name: "直播历史记录",
        },
      ],
      classifyList: [], // 房间类型列表
      isDestoryComp: false, // 是否销毁组件
      isCharmDestoryComp: false, // 是否销毁组件
      liveHistoryTotalData: {},
      tableData: {},
      modelLoading: true,
      liveStatusOptions: [
        {
          name: "全部",
          value: 0,
        },
        {
          name: "开播中",
          value: 1,
        },
        {
          name: "已关播",
          value: 2,
        },
      ],
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
          clearable: true,
          placeholder: "请输入房间ID",
        },
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          isNum: true,
          clearable: true,
          placeholder: "请输入公会ID",
        },
        {
          name: "live_status",
          type: "select",
          value: 1,
          keyName: "value",
          optionLabel: "name",
          label: "开播状态",
          placeholder: "请选择",
          options: this.liveStatusOptions,
        },
        {
          name: "room_category_id",
          type: "select",
          value: "",
          keyName: "id",
          optionLabel: "name",
          label: "房间类型",
          placeholder: "请选择",
          // options: this.classifyList,
        },
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "开播时间",
          value: "",
          linkage: true,
          handler: {
            change: (v) => {
              this.emptyDateTime();
              this.setDateTime(v);
              // this.getList();
            },
            selectChange: (v, key) => {
              this.emptyDateTime();
              // this.getList();
            },
          },
        },
      ];
    },
    cfgs() {
      let arr = [
        {
          label: "房间ID",
          prop: "room_number",
        },
        {
          label: "开播时间",
          minWidth: "180px",
          render: (h, params) => {
            return h(
              "span",
              params.row.start_time
                ? timeFormat(params.row.start_time, "YYYY-MM-DD HH:mm:ss", true)
                : "无"
            );
          },
        },
        {
          label: "房间类型",
          prop: "room_type",
        },
        {
          label: "房间标题",
          minWidth: "120px",
          prop: "room_title",
        },
        {
          label: "房间封面",
          isimg: true,
          prop: "room_cover",
          imgHeight: "50px",
          minWidth: "100px",
        },
        {
          label: "房主",
          minWidth: "120px",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.nickname),
              h("div", params.row.user_number || "无"),
            ]);
          },
        },
        {
          label: "所属公会",
          minWidth: "100px",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.guild_name),
              h("div", params.row.guild_number || "无"),
            ]);
          },
        },
        {
          label: "已开播时长",
          minWidth: "120px",
          render: (h, params) => {
            return h("span", params.row.live_time || "无");
          },
        },
        {
          label: "流水（钻石）",
          minWidth: "100px",
          prop: "now_flow",
        },
        {
          label: "在线人数",
          prop: "people",
        },
        {
          label: "操作",
          minWidth: "100px",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: { type: "danger" },
                  on: {
                    click: () => {
                      this.dissolveFunc(params.row);
                    },
                  },
                },
                "关播"
              ),
            ]);
          },
        },
      ];

      let arr1 = [
        {
          label: "房间ID",
          minWidth: "100px",
          prop: "room_number",
        },
        {
          label: "开播时间",
          minWidth: "180px",
          render: (h, params) => {
            return h(
              "span",
              params.row.start_time
                ? timeFormat(params.row.start_time, "YYYY-MM-DD HH:mm:ss", true)
                : "无"
            );
          },
        },
        {
          label: "关播时间",
          minWidth: "180px",
          render: (h, params) => {
            return h(
              "span",
              params.row.end_time
                ? timeFormat(params.row.end_time, "YYYY-MM-DD HH:mm:ss", true)
                : "--"
            );
          },
        },
        {
          label: "房间类型",
          minWidth: "100px",
          prop: "room_type",
        },
        {
          label: "房间名称",
          minWidth: "140px",
          prop: "room_title",
        },
        {
          label: "房间封面",
          isimg: true,
          prop: "room_cover",
          imgHeight: "50px",
          minWidth: "100px",
        },
        {
          label: "所属公会",
          minWidth: "120px",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.guild_name),
              h("div", params.row.guild_number || "无"),
            ]);
          },
        },
        {
          label: "房主",
          minWidth: "120px",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.nickname),
              h("div", params.row.user_number || "无"),
            ]);
          },
        },
        {
          label: "开播状态",
          minWidth: "120px",
          render: (h, params) => {
            return h(
              "span",
              params.row.live_status === 1
                ? "开播中"
                : params.row.live_status === 2
                ? "已关播"
                : "无"
            );
          },
        },
        {
          label: "有效直播时长",
          minWidth: "120px",
          render: (h, params) => {
            return h("span", params.row.effective_time || "无");
          },
        },
        {
          label: "无效直播时长",
          minWidth: "130px",
          sortable: "custom",
          prop: "down_time",
          render: (h, params) => {
            return h("span", params.row.down_time || "无");
          },
        },
        {
          label: "直播流水",
          minWidth: "120px",
          sortable: "custom",
          prop: "total_gain",
        },
        {
          label: "进房人数",
          minWidth: "100px",
          prop: "enter_user_count",
        },
        {
          label: "送礼人数",
          minWidth: "120px",
          prop: "consume_user_count",
        },
        {
          label: "魅力榜",
          minWidth: "100px",
          render: (h, params) => {
            return h("el-link",{
                  props: { type: "primary" },
                  on: {
                    click: () => {
                      this.viewRank(params.row.id);
                    },
                  },
                } ,"查看榜单");
          },
        },
        {
          label: "操作",
          minWidth: "100px",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: { type: "danger" },
                  style: {
                    display: params.row.live_status === 1 ? "unset" : "none",
                  },
                  on: {
                    click: () => {
                      this.dissolveFunc(params.row);
                    },
                  },
                },
                "关播"
              ),
            ]);
          },
        },
      ];
      let name;
      if (this.tabIndex === "0") {
        name = "liveList";
      } else {
        name = "liveHistoryList";
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
      s = {
        ...s,
        start_time: s.dateTimeParams ? s.dateTimeParams[0] : null,
        end_time: s.dateTimeParams ? s.dateTimeParams[1] : null,
      }
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        room_number: s.room_number,
        room_category_id: s.room_category_id,
        guild_number: s.guild_number,
        live_status: s.live_status ? s.live_status : 1,
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
    // 重置
    reset() {
      this.searchParams = {};
      this.dateTimeParams = {};
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
      this.getLiveHistoryTotal();
    },
    // 解散房间
    async dissolveFunc(row) {
      this.$confirm("是否确认关闭当前直播间?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let params = {
            room_id: row.room_id,
            uid: row.uid || "1",
            "admin-token": this.$store.getters.token,
          };
          let res = await liveEnd(params);
          if (res.code === 2000) {
            this.$success("关闭成功");
          }
          this.getList();
        })
        .catch(() => {});
    },
    // 编辑房间
    liveEditFunc(row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.liveDetails.loadParams(row);
      }, 50);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    destoryCharmComp() {
      this.isCharmDestoryComp = false;
    },
    // 获取房间分类
    async getHouse() {
      let res = await genreList({ belong: 2 });
      if (res.data.list && res.data.list.length > 0) {
        res.data.list.unshift({
          name: "全部",
          id: "",
        });
      }
      this.classifyList = res.data.list || [];
    },
    // 获取房间列表统计
    async getLiveHistoryTotal() {
      this.liveHistoryTotalData = {};
      const searchParams = this.beforeSearch();
      console.log(searchParams, "searchParams");

      try {
        this.modelLoading = true;
        const { code, data } = await liveHistoryTotal(searchParams);
        if (code === 2000 && typeof data === "object") {
          this.liveHistoryTotalData = data.list;
        }
        this.modelLoading = false;
      } catch (error) {
        this.modelLoading = false;
        console.error("获取直播历史总数出错:", error);
      }
    },
    // table 返回数据
    saleAmunt(row) {
      this.tableData = row;
    },
    // 获取当天时间
    getTodayTimestamps() {
      let time = new Date();
      let date = timeFormat(time, "YYYY-MM-DD", false);
      let start = new Date(date + " 00:00:00").getTime();
      let end = new Date(
        timeFormat(time, "YYYY-MM-DD HH:mm:ss", false)
      ).getTime();

      this.searchParams.dateTimeParams = [start, end];
      this.setDateTime([start, end]);
      this.getLiveHistoryTotal();
    },
    // 查看榜单
    viewRank(liveId) {
      this.isCharmDestoryComp = true
      setTimeout(() => {
        this.$refs.charmComp.show(liveId);
      }, 50);
    },
  },
  created() {
    this.getHouse();
    this.getTodayTimestamps();
  },
};
</script>
<style lang="scss">
.guild-live-list {
  padding: 20px;
  box-sizing: border-box;
  .model {
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 30px;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    border-radius: 10px;
    > span {
      font-size: 15px;
      color: #fff;
      margin-right: 50px;
    }
  }
  .el-loading-spinner {
    margin-top: -8px;
  }
}
</style>
