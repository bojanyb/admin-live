<template>
  <div class="app-container dynamic-list-box">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        @onReset="reset"
        @onSearch="onSearch"
        :showYesterday="true"
        :showRecentSeven="true"
        :showToday="true"
        :show-query="true"
        query-name="推荐动态"
        @yesterday="yesterday"
        @recentSeven="recentSeven"
        @today="today"
        @query="handleQuery"
      ></SearchPanel>
    </div>

    <tableList
      :cfgs="cfgs"
      ref="tableList"
      layout="total, sizes, prev, pager, next, jumper"
    ></tableList>

    <!-- 详情组件 -->
    <discussComp
      v-if="isDestoryComp"
      ref="discussComp"
      :msg_id="msg_id"
      @destoryComp="destoryComp"
    ></discussComp>
    <!-- 推荐设置弹窗 -->
    <top-comp ref="topComp"></top-comp>
    <!-- 推荐动态弹窗 -->
    <top-list-comp
      v-if="isDestoryComp"
      ref="topListComp"
      @destoryComp="destoryComp"
    ></top-list-comp>
  </div>
</template>

<script>
// 详情组件
import discussComp from "./components/discussComp.vue";
// 引入api
import { delMoments } from "@/api/dynamic";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 推荐组件
import TopComp from "../serviceConfig/components/topComp.vue";
// 推荐列表组件
import TopListComp from "../serviceConfig/components/topListComp.vue";
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    discussComp,
    TopComp,
    TopListComp,
  },
  data() {
    return {
      msg_id: null,
      isDestoryComp: false, // 是否销毁组件
      searchParams: {
        dateTimeParams: [],
        check_status: "",
        user_number: "",
      },
      dateTimeParams: {
        start_time: null,
        end_time: null,
      },
      checkStatusList: [
        {
          name: "全部",
          value: "",
        },
        {
          name: "未审核",
          value: "0",
        },
        {
          name: "拒绝",
          value: "1",
        },
        {
          name: "忽略",
          value: "2",
        },
        {
          name: "通过",
          value: "3",
        },
      ],
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "用户ID",
          isNum: true,
          placeholder: "请输入用户ID",
        },
        {
          name: "check_status",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "审核状态",
          placeholder: "请选择",
          options: this.checkStatusList,
        },
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
      return {
        vm: this,
        url: REQUEST.dynamic.getMoments,
        search: {
          sizes: [10, 30, 50, 100],
        },
        columns: [
          {
            label: "发送时间",
            prop: "create_time",
            minWidth: "100px",
          },
          {
            label: "审核时间",
            prop: "check_time",
            minWidth: "100px",
            render: (h, params) => {
              return h(
                "span",
                params.row.check_time
                  ? timeFormat(
                      params.row.check_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : "无"
              );
            },
          },
          {
            label: "用户ID",
            prop: "user_number",
          },
          {
            label: "用户昵称",
            prop: "user_nickname",
          },
          {
            label: "动态内容",
            minWidth: "120px",
            showOverFlow: true,
            render: (h, params) => {
              return h("span", params.row.content || "无");
            },
          },
          {
            label: "动态图片",
            isimgList: true,
            prop: "media_list",
            type: "media_type",
            imgWidth: "50px",
            imgHeight: "50px",
            minWidth: "180px",
          },
          {
            label: "评论数量",
            prop: "msg_number",
          },
          {
            label: "审核状态",
            prop: "check_status",
            render: (h, params) => {
              const item = this.checkStatusList.find(
                (item) => item.value == params.row.check_status
              );
              return h("span", item ? item.name : "无");
            },
          },
          {
            label: "操作",
            minWidth: "140px",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "success", size: "mini" },
                    on: {
                      click: () => {
                        this.recommend(params.row.id);
                      },
                    },
                  },
                  "推荐"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "primary", size: "mini" },
                    on: {
                      click: () => {
                        this.seeDetails(params.row.id);
                      },
                    },
                  },
                  "评论详情"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "danger", size: "mini" },
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
    // 今日
    today() {
      this.changeIndex(0);
      this.getList();
    },
    // 昨日
    yesterday() {
      this.changeIndex(1);
      this.getList();
    },
    // 最近七日
    recentSeven() {
      this.changeIndex(2);
      this.getList();
    },
    // 更改日期
    changeIndex(index) {
      let date = new Date();
      let now, now1, start, end;
      switch (index) {
        case 0:
          now1 = timeFormat(date, "YYYY-MM-DD", false);
          now = timeFormat(date, "YYYY-MM-DD", false);
          break;
        case 1:
          now1 = timeFormat(date - 3600 * 1000 * 24 * 1, "YYYY-MM-DD", false);
          now = timeFormat(date - 3600 * 1000 * 24 * 1, "YYYY-MM-DD", false);
          break;
        case 2:
          now1 = timeFormat(date, "YYYY-MM-DD", false);
          now = timeFormat(date - 3600 * 1000 * 24 * 6, "YYYY-MM-DD", false);
          break;
      }
      start = new Date(now + " 00:00:00");
      end = new Date(now1 + " 23:59:59");

      let time = [start.getTime(), end.getTime()];
      this.searchParams.dateTimeParams = time;
      this.dateTimeParams.start_time = time[0];
      this.dateTimeParams.end_time = time[1];
    },
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
        user_number: s.user_number,
        check_status: s.check_status,
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
      // this.dateTimeParams = {}
      this.changeIndex(0);
      this.getList();
    },
    // 删除
    async deleteParams(id) {
      this.$confirm("确认删除当前动态吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delMoments({ ids: id });
          if (res.code === 2000) {
            this.$success("删除成功");
            this.getList();
          }
        })
        .catch(() => {});
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 查看详情
    seeDetails(id) {
      this.msg_id = id;
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.discussComp.dialogVisible = true;
      }, 50);
    },
    // 推荐
    recommend(id) {
      setTimeout(() => {
        this.$refs.topComp.load(id);
      }, 100);
    },
    // 推荐动态
    handleQuery() {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.topListComp.load();
      }, 100);
    },
    destoryComp() {
      this.isDestoryComp = false;
    },
  },
  created() {
    this.changeIndex(0);
  },
};
</script>

<style lang="scss" scoped></style>
