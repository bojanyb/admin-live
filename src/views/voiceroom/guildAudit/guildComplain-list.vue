<template>
  <div class="app-container">
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
    <guildComplainComp
      v-if="isDestoryComp"
      ref="guildComplainComp"
      @destoryComp="destoryComp"
    ></guildComplainComp>
  </div>
</template>

<script>
// 引入api
import { getGuildDealReport } from "@/api/videoRoom";
// 引入详情组件
import guildComplainComp from "./components/guildComplainComp.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  name: "guildComplain-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    guildComplainComp,
  },
  computed: {
    forms() {
      return [
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "投诉时间",
          value: "",
          handler: {
            change: (v) => {
              this.emptyDateTime();
              this.setDateTime(v);
            },
            selectChange: (v, key) => {
              this.emptyDateTime();
            },
          },
        },
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "投诉用户ID",
          isNum: true,
          placeholder: "请输入投诉用户ID",
        },
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会长ID",
          isNum: true,
          placeholder: "请输入公会长ID",
        },
        {
          name: "status",
          type: "select",
          value: "未处理",
          keyName: "value",
          optionLabel: "name",
          label: "状态",
          placeholder: "请选择",
          options: MAPDATA.GUILDREPORTSTATUS,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.guild.getUserComplainList,
        columns: [
          {
            label: "投诉时间",
            minWidth: 160,
			prop: "create_time"
          },
          {
            label: "投诉用户",
            prop: "user_name"
          },
          {
            label: "投诉用户ID",
            prop: "user_id"
          },
          {
            label: "被投诉公会",
            prop: "guild_name"
          },
          {
            label: "被投诉公会所属公会长",
            prop: "guild_user_name"
          },
          {
            label: "公会长ID",
            prop: "guild_user_id"
          },
          {
            label: "公会所属运营",
            render: (h, params) => {
              let data = MAPDATA.GUILDREPORTSTATUS.find((item) => {
                return item.value === params.row.status;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "投诉类型",
            minWidth: "180px",
            render: (h, params) => {
              return h(
                "span",
                params.row.create_time
                  ? timeFormat(
                      params.row.create_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : "无"
              );
            },
          },
          {
            label: "投诉原因",
            prop: "deal_user",
          },
          {
            label: "投诉证据",
            minWidth: "180px",
            render: (h, params) => {
              return h(
                "span",
                params.row.create_time
                  ? timeFormat(
                      params.row.create_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : "无"
              );
            },
          },
          {
            label: "受理操作人",
            prop: "deal_user",
          },
          {
            label: "受理时间",
            prop: "deal_user",
          },
          {
            label: "备注",
            prop: "deal_user",
          },
          {
            label: "操作",
            minWidth: "230px",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: {
                      type: params.row.accept_type === 0 ? "danger" : "info",
                    },
                    style: {
                      display:
                        params.row.status || params.row.status === 0
                          ? "unset"
                          : "none",
                    },
                    on: {
                      click: () => {
                        this.func(params.row);
                      },
                    },
                  },
                  `${params.row.accept_type === 0 ? "未受理" : "已受理"}`
                ),
              ]);
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      dateTimeParams: {},
    };
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        start_time: s.start_time
          ? Math.floor(s.start_time / 1000)
          : s.start_time,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
        guild_number: s.guild_number,
        status: s.status ? s.status : 1,
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
    },
    // 操作
    func(row) {
      this.showDialog(row)
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    showDialog(row) {
		// let params = {
        //   user_id: row.reported_user.user_number,
        //   guild_id: row.guild_number,
        // };
        this.isDestoryComp = true;
        setTimeout(() => {
          this.$refs.guildComplainComp.load(row);
        }, 50);
    },
  },
};
</script>
<style lang="scss">
</style>
