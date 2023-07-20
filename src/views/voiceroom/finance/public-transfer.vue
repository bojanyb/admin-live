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
        :show-batch-rurn="true"
        batchRurnName="导出EXCEL"
        @BatchRurn="BatchRurn"
      ></SearchPanel>
    </div>
    <tableList :cfgs="cfgs" ref="tableList"></tableList>
  </div>
</template>

<script>
// 引入api
import { refuseApply, getBillDetail } from "@/api/finance.js";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入封禁组件
import blocked from "@/views/voiceroom/user/components/blocked.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat, exportTableData  } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "ReportList",
  components: {
    SearchPanel,
    tableList,
    blocked,
  },
  mixins: [mixins],
  data() {
    return {
      loadParams: {}, // 当前数据
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "申请时间",
          value: "",
          linkage: true,
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
          name: "user_number",
          type: "input",
          value: "",
          label: "用户ID",
          isNum: true,
          placeholder: "请输入用户ID",
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        isShowIndex: true,
        url: REQUEST.finance.getBillDetail,
        columns: [
          {
            label: "申请时间",
            prop: "addtime",
            minWidth: "120px",
          },
          {
            label: "用户",
            prop: "nickname",
            minWidth: "100px",
          },
          {
            label: "用户ID",
            prop: "user_number",
            minWidth: "100px",
          },
          {
            label: "用户角色",
            prop: "is_guild_account",
            minWidth: "100px",
            render: (h, params) => {
              return h(
                "span",
                params.row.is_guild_account === 1
                  ? "公会长"
                  : params.row.is_guild_account === 0
                  ? "公会成员"
                  : "无"
              );
            },
          },
          {
            label: "喵粮",
            prop: "gain",
            minWidth: "100px",
          },
          {
            label: "提现金额",
            prop: "money",
            minWidth: "100px",
          },
          {
            label: "状态",
            prop: "status",
            minWidth: "100px",
            render: (h, params) => {
              console.log(params.row.status);
              let data = MAPDATA.STATUSLIST.find((item) => {
                return item.value === params.row.status;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "备注",
            prop: "remark",
            minWidth: "120px",
            render: (h, params) => {
              return h("span", params.row.remark || "无");
            },
          },
          {
            label: "操作",
            width: "200px",
            fixed: "right",
            render: (h, params) => {
              let data = MAPDATA.STATUSLIST.find((item) => {
                return item.value === params.row.status;
              });
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    style: {
                      display: params.row.status === 1 ? "unset" : "none",
                    },
                    on: {
                      click: () => {
                        this.handleAuditReturn(params.row);
                      },
                    },
                  },
                  data ? data.name : "无"
                ),
                h("span", "--"),
              ]);
            },
          },
        ],
      };
    },
  },
  methods: {
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
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params ? params.page : null,
        pagesize: params ? params.pagesize : null,
        user_number: s.user_number,
        id: this.$route.query.id || "",
        start_time: Math.floor(s.start_time / 1000) || "",
        end_time: Math.floor(s.end_time / 1000) || "",
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 审核退回
    async handleAuditReturn(row) {
      const params = {
        id: row.id,
        apply_id: this.$route.query.id || "",
      };
      let res = await refuseApply(params);
      if (res.code === 2000) {
        this.$message.success("操作成功");
        this.getList();
      }
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
    // 导出excel
    async BatchRurn() {
      let s = this.beforeSearch();
      s.is_all = "1";
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let res = await getBillDetail(s);
      try {
        let arr = JSON.parse(JSON.stringify(res.data.list));
        if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
        arr = arr.map((item, index) => {
          let data = MAPDATA.STATUSLIST.find((a) => {
            return a.value === item.status;
          });
          let params = {
            addtime: item.addtime,
            nickname: item.nickname,
            user_number: item.user_number,
            is_guild_account:
              item.is_guild_account === 1
                ? "公会长"
                : item.is_guild_account === 0
                ? "公会成员"
                : "无",
            gain: item.gain,
            money: item.money,
            status: data.name,
            remark: item.remark,
          };
          return params;
        });
        let nameList = [
          "申请时间",
          "用户",
          "用户ID",
          "用户角色",
          "喵粮",
          "提现金额",

          "状态",
          "备注",
        ];
        exportTableData(arr, nameList, "对公转账明细列表");
        loading.close();
      } catch (error) {
        console.log(error);
        loading.close();
      }
    },
  },
};
</script>
