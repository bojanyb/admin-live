<script>
import _ from "lodash";
import moment from "moment";
import SearchPanel from "@/components/SearchPanel/final.vue";
import request from "@/utils/request2";
import REQUEST from "@/request/index.js";
export default {
  name: "record-detail",
  components: {
    SearchPanel,
    vnode: {
      functional: true,
      render(h, ctx) {
        return ctx.props.col.render(h, ctx.props.row, ctx.props.col);
      },
    },
  },
  props: ["record"],
  data() {
    return {
      page: 1,
      pagesize: 10,
      total: 0,
      data: [],
      searchParams: {},
      forms: [
        {
          name: "user_id",
          type: "input",
          value: "",
          label: "用户ID",
          isNum: true,
          placeholder: "请输入用户ID",
        },
        {
          name: "status",
          type: "select",
          value: "",
          keyName: "key",
          optionLabel: "value",
          label: "申请状态",
          placeholder: "请选择",
          options: [
            // TODO
          ],
        },
        {
          name: "addtime_range",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "申请时间",
          value: "",
        },
      ],
      columns: [
        {
          prop: "addtime",
          label: "申请时间",
          render: (h, row) => {
            const d = moment(row.addtime * 1000)
              .utcOffset(8)
              .format("YYYY-MM-DD HH:mm:ss");
            return <span>{d}</span>;
          },
        },
        { prop: "user_id", label: "用户ID" },
        { prop: "nickname", label: "用户昵称" },
        { prop: "gain", label: "结算喵粮" },
        { prop: "real_money", label: "结算金额" },
        { prop: "status", label: "申请状态" /* TODO 渲染对应状态文案 */ },
        { prop: "remark", label: "备注" },
      ],
    };
  },
  computed: {
    fetchParams() {
      return {
        page: this.page,
        pagesize: this.pagesize,
        id: this.record.id,
        user_id: this.searchParams?.user_id,
        status: this.searchParams?.status,
        start_time:
          _.get(this.searchParams, "addtime_range[0]") &&
          moment(_.get(this.searchParams, "addtime_range[0]")).unix(),
        end_time:
          _.get(this.searchParams, "addtime_range[1]") &&
          moment(_.get(this.searchParams, "addtime_range[1]")).unix(),
      };
    },
  },
  methods: {
    onSearch() {
      this.page = 1;
      this.fetchData();
    },
    async fetchData() {
      const res = await request({
        url: REQUEST.finance.getGuildCashBill,
        method: "post",
        data: this.fetchParams,
      });
      if (res.code === 2000) {
        this.page = res.data.page;
        this.pagesize = res.data.pagesize;
        this.total = res.data.count;
        this.data = res.data.list;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<template>
  <div class="push-recall">
    <SearchPanel
      v-model="searchParams"
      :forms="forms"
      :show-search-btn="true"
      @onSearch="onSearch"
    ></SearchPanel>
    <el-table :data="data">
      <el-table-column
        v-for="(item, i) in columns"
        align="center"
        :key="i"
        v-bind="item"
      >
        <template v-if="item.render" #default="slotProps">
          <vnode :row="slotProps.row" :col="item" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
