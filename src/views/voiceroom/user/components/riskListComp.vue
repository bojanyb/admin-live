<template>
  <div class="risk-list-dialog">
    <el-dialog
      title="风险列表"
      :visible.sync="dialogVisible"
      width="800px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >

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

      <tableList :cfgs="cfgs" ref="riskTableList"></tableList>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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

export default {
  components: {
    SearchPanel,
    tableList,
  },
  mixins: [mixins],
  data() {
    return {
      dialogVisible: false,
      searchParams: {
        id: ''
      },
      list: [],
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
          label: "时间",
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
      const columnsList = [
      {
          label: "时间",
          width: 160,
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
          label: "来源",
          prop: "from",
        },
        {
          label: "用户",
          prop: "punished_user_nickname",
        },
        {
          label: "处罚类别",
          prop: "punish_type_str",
        },
        {
          label: "处罚结果",
          prop: "res",
          render: (h, params) => {
            return h("span", params.row.res.join(',') || "无");
          },
        },
        {
          label: "备注",
          prop: "remark",
        },
      ];
      return {
        vm: this,
        url: REQUEST.user.riskList,
        columns: columnsList,
      };
    },
  },
  methods: {
    show(row) {
        console.log(row);
        this.searchParams.id = row.id;
        this.emptyDateTime();
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.setDateTime([start, end]);
        this.dialogVisible = true;
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
    //   this.searchParams = {};
      this.dateTimeParams = {};
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : "",
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : "",
        id: s.id,
      };
    },
    // 获取数据
    getList() {
        this.$refs.riskTableList.getData();
    },
  },
};
</script>

<style lang="scss"></style>
