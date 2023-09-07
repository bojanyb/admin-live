<template>
  <div class="app-container serviceConfig-coverAudit-box">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-batch-pass="true"
        :show-batch-rurn="true"
        batch-rurn-name="批量删除"
        :show-custom="true"
        custom-name="批量忽略"
        :show-query="true"
        query-name="推荐动态"
        @batchPass="handleBatchPass"
        @BatchRurn="handleBatchDelete"
        @custom="handleBatchIgnore"
        @onReset="reset"
        @onSearch="onSearch"
        @query="handleQuery"
      ></SearchPanel>
    </div>

    <tableList
      :cfgs="cfgs"
      ref="tableList"
      @selectionChange="selectionChange"
    ></tableList>

    <!-- 推荐设置弹窗 -->
    <top-comp ref="topComp" @getList="getList"></top-comp>
    <!-- 推荐动态弹窗 -->
    <top-list-comp v-if="isDestoryComp" ref="topListComp" @destoryComp="destoryComp"></top-list-comp>
  </div>
</template>

<script>
// 引入api
import { check } from "@/api/dynamic";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 推荐组件
import TopComp from './components/topComp.vue';
// 推荐列表组件
import TopListComp from './components/topListComp.vue';
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    TopComp,
    TopListComp,
  },
  data() {
    return {
      searchParams: {
        user_number: "",
        id: "",
      },
      selectList: [],
      isDestoryComp: false, // 是否销毁组件
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
          name: "id",
          type: "input",
          value: "",
          label: "动态ID",
          isNum: true,
          placeholder: "请输入动态ID",
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
        isShowCheckbox: true,
        url: REQUEST.dynamic.checkList,
        columns: [
          {
            label: "动态ID",
            prop: "id",
            width: 80,
          },
          {
            label: "发送者昵称",
            prop: "user_nickname",
            width: 120,
          },
          {
            label: "发送者ID",
            prop: "user_number",
            width: 120,
          },
          {
            label: "标题",
            prop: "content",
            showOverFlow: true,
          },
          {
            label: "图片",
            isimgList: true,
            prop: "media_list",
            imgWidth: "50px",
            imgHeight: "50px",
          },
          {
            label: "话题",
            prop: "topic_title",
            width: 150,
          },
          {
            label: "发布时间",
            prop: "create_time",
            width: 180,
          },
          {
            label: "操作",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary", size: "mini" },
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
                    props: { type: "success", size: "mini" },
                    on: {
                      click: () => {
                        this.audit(params.row.id, 3);
                      },
                    },
                  },
                  "通过"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "warning", size: "mini" },
                    on: {
                      click: () => {
                        this.audit(params.row.id, 2);
                      },
                    },
                  },
                  "忽略"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "danger", size: "mini" },
                    on: {
                      click: () => {
                        this.audit(params.row.id, 1);
                      },
                    },
                  },
                  "违规删除"
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
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        start_time: s.start_time
          ? Math.floor(s.start_time / 1000)
          : s.start_time,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
        id: s.id,
        user_number: s.user_number,
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
      this.searchParams = {
        user_number: "",
        id: "",
      };
      this.dateTimeParams = {};
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 审核
    async audit(id, status) {
      let res = await check({ moments_ids: id, check_status: status });
      if (res.code === 2000) {
        this.$success("审核通过");
        this.getList();
      }
    },
    // 通过/删除/忽略操作
    async batchAudit(status, name) {
      if (!this.selectList.length) {
        this.$error("请先选择待审核数据");
        return;
      }
      this.$confirm(`是否确认${name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const ids = this.selectList.map((item) => item.id);
          const params = {
            moments_ids: ids.join(","),
            check_status: status,
          };
          let res = await check(params);
          if (res.code === 2000) {
            this.$success(name + "成功");
            this.getList();
          }
        })
        .catch(() => {});
    },
    // 推荐
    recommend(id) {
      setTimeout(() => {
        this.$refs.topComp.load(id);
      }, 100);
    },
    // 选中
    selectionChange(v) {
      this.selectList = v;
    },
    // 批量通过
    handleBatchPass() {
      this.batchAudit(3, "批量通过");
    },
    // 批量删除
    handleBatchDelete() {
      this.batchAudit(2, "批量删除");
    },
    // 批量忽略
    handleBatchIgnore() {
      this.batchAudit(1, "批量忽略");
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
};
</script>

<style lang="scss" scoped></style>
