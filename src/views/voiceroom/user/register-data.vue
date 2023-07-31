<template>
  <div class="app-container">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-export="true"
        :show-query="true"
        customType="danger"
        queryName="文件查询"
        @onReset="reset"
        @onSearch="onSearch"
        @export="handleExport"
        @query="handleQuery"
      ></SearchPanel>
    </div>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- Excel文件下载弹窗组件 -->
    <excelDownloadComp
      v-if="isDestoryComp"
      ref="excelDownloadComp"
      @destoryComp="destoryComp"
    ></excelDownloadComp>

    <!-- Excel文件查询弹窗组件 -->
    <excelQueryComp
      v-if="isDestoryComp"
      ref="excelQueryComp"
      @destoryComp="destoryComp"
    ></excelQueryComp>
  </div>
</template>

<script>
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入文件下载组件
import excelDownloadComp from "./components/excelDownloadComp.vue";
// 引入文件查询组件
import excelQueryComp from "./components/excelQueryComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "user-list",
  mixins: [mixins],
  components: {
    tableList,
    SearchPanel,
    excelDownloadComp,
    excelQueryComp,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      dateTimeParams: {
        start_time: null,
        end_time: null,
      },
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
          label: "时间选择",
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
      ];
    },
    cfgs() {
      const arr = [
        {
          label: "用户ID",
          width: "95px",
          prop: "user_number",
        },
        {
          label: "注册时间",
          width: "160px",
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
          label: "渠道ID",
          width: "110px",
          render: (h, params) => {
            return h("span", params.row.register_type || "无");
          },
        },
        {
          label: "性别",
          width: "95px",
          prop: "sex",
          render: (h, params) => {
            let data = MAPDATA.SEXLIST.find((item) => {
              return item.value === params.row.sex;
            });
            return h("span", data ? data.name : "无");
          },
        },
        {
          label: "充值金额",
          prop: "user_number",
        },
        {
          label: "消费金额",
          prop: "user_number",
        },
        {
          label: "进房次数",
          prop: "user_number",
        },
        {
          label: "收到私聊",
          prop: "user_number",
        },
        {
          label: "发送私聊",
          prop: "user_number",
        },
      ];
      return {
        vm: this,
        url: REQUEST.user.list,
        columns: this.permissionArr.includes("User@index") ? arr : [],
      };
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        start_time: s.start_time
          ? Math.floor(s.start_time / 1000)
          : s.start_time,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
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
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 导出Excel
    handleExport() {
      this.isDestoryComp = true;
      setTimeout(() => {
        let params = this.beforeSearch();
        const search = this.$refs.tableList.search;
        params.page = search ? search.page : null;
        params.pagesize = search ? search.size : null;
        this.$refs.excelDownloadComp.loadParams(params);
      }, 50);
    },
    // 文件查询
    handleQuery() {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.excelQueryComp.loadParams();
      }, 50);
    },
  },
};
</script>
<style>
.el-icon-circle-close {
  color: #ffffff;
}
</style>
