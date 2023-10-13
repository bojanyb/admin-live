<script>
import _ from "lodash";
import moment from "moment";
import SearchPanel from "@/components/SearchPanel/final.vue";
import request from "@/utils/request2";
import REQUEST from "@/request/index.js";
import Detail from "./components/recordDetail.vue";
export default {
  name: "push-recall",
  components: {
    SearchPanel,
    Detail,
    vnode: {
      functional: true,
      render(h, ctx) {
        return ctx.props.col.render(h, ctx.props.row, ctx.props.col);
      },
    },
  },
  data() {
    return {
      page: 1,
      pagesize: 10,
      total: 0,
      data: [],
      searchParams: {},
      selected_rows: [],
      forms: [
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          isNum: true,
          placeholder: "请输入公会ID",
        },
        {
          name: "order_id",
          type: "input",
          value: "",
          label: "交易单号",
          isNum: true,
          placeholder: "请输入交易单号",
        },
        {
          name: "status",
          type: "select",
          value: "",
          keyName: "key",
          optionLabel: "value",
          label: "结算状态",
          placeholder: "请选择",
          options: [
            // TODO
          ],
        },
        {
          name: "created_time_range",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "申请时间",
          value: "",
        },
      ],
      columns: [
        { prop: "create_time", label: "申请时间" },
        { prop: "guild_id", label: "公会ID" },
        { prop: "guild_name", label: "公会名称" },
        { prop: "", label: "企业名称" },
        { prop: "", label: "开户银行" },
        { prop: "", label: "开户支行" },
        { prop: "", label: "银行账号" },
        { prop: "gain", label: "结算喵粮" },
        { prop: "deduct_money", label: "违规扣除" },
        { prop: "real_money", label: "结算金额" },
        { prop: "status_desc", label: "结算状态" },
        {
          prop: "",
          label: "结算明细",
          render: (h, row) => (
            <el-button type="text" onClick={() => (this.showDetailRow = row)}>
              查看明细
            </el-button>
          ),
        },
        { prop: "", label: "发票" },
        { prop: "", label: "备注" },
        { prop: "", label: "操作" },
      ],
      showDetailRow: undefined,
    };
  },
  computed: {
    fetchParams() {
      return {
        page: this.page,
        pagesize: this.pagesize,
        guild_number: this.searchParams?.guild_number,
        order_id: this.searchParams?.order_id,
        status: this.searchParams?.status,
        start_time:
          _.get(this.searchParams, "created_time_range[0]") &&
          moment(_.get(this.searchParams, "created_time_range[0]")).unix(),
        end_time:
          _.get(this.searchParams, "created_time_range[1]") &&
          moment(_.get(this.searchParams, "created_time_range[1]")).unix(),
      };
    },
  },
  methods: {
    onSearch() {
      this.page = 1;
      this.fetchData();
    },
    onExportExcel() {
      // TODO
    },
    async fetchData() {
      const res = await request({
        url: REQUEST.finance.getGuildCashList,
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
  <div class="reconciliation-records">
    <SearchPanel
      v-model="searchParams"
      :forms="forms"
      :show-add="false"
      :show-search-btn="true"
      @onSearch="onSearch"
    >
      <template #bottom>
        <!-- TODO 批量操作，需要根据选中的行显示不同按钮 -->
        <el-button :disabled="selected_rows.length === 0" @click="onExportExcel"
          >导出Excel</el-button
        >
      </template>
    </SearchPanel>
    <el-table :data="data" @selection-change="(val) => (selected_rows = val)">
      <el-table-column type="selection" width="55"> </el-table-column>
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
    <div class="pagination">
      <el-pagination
        background
        :page-size="pagesize"
        :current-page="page"
        :page-sizes="[10, 20, 30]"
        :total="total"
        class="fr"
        @current-change="
          (p) => {
            page = p;
            fetchData();
          }
        "
      >
      </el-pagination>
    </div>
    <el-dialog
      :width="'1200px'"
      :visible.sync="showDetailRow"
      title="结算明细"
      destroy-on-close
    >
      <Detail v-if="showDetailRow" :record="showDetailRow" />
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.reconciliation-records {
  padding: 20px;
}
</style>
