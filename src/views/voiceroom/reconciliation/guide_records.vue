<script>
import _ from "lodash";
import moment from "moment";
import SearchPanel from "@/components/SearchPanel/final.vue";
import request from "@/utils/request2";
import { export_json_to_excel } from "@/vendor/Export2Excel";
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
            {
              key: 10,
              value: "待财务审核",
            },
            {
              key: 30,
              value: "待银行发放",
            },
            {
              key: 40,
              value: "待上传发票",
            },
            {
              key: 60,
              value: "待审核发票",
            },
            {
              key: 70,
              value: "财务已退回",
            },
            {
              key: 80,
              value: "结算已完成",
            },
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
        { prop: "create_time", exportable: true, label: "申请时间" },
        { prop: "guild_id", exportable: true, label: "公会ID" },
        { prop: "guild_name", exportable: true, label: "公会名称" },
        { prop: "company_name", exportable: true, label: "企业名称" },
        { prop: "owner_name", exportable: true, label: "开户银行" },
        { prop: "bank_name", exportable: true, label: "开户支行" },
        { prop: "bank_card", exportable: true, label: "银行账号" },
        { prop: "gain", exportable: true, label: "结算喵粮" },
        { prop: "deduct_money", exportable: true, label: "违规扣除" },
        { prop: "real_money", exportable: true, label: "结算金额" },
        { prop: "status_desc", exportable: true, label: "结算状态" },
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
        { prop: "remark", exportable: true, label: "备注" },
        {
          prop: "",
          label: "操作",
          render: (h, row) => {
            let onClick;
            if (row.status === 10) {
              onClick = () => (this.showApplyAuditDialog = [row]);
            } else if (row.status === 30) {
              onClick = () => (this.showSettlementAuditDialog = [row]);
            } else if (row.status === 60) {
              onClick = () => (this.showInvoiceAuditDialog = [row]);
            }
            if (!onClick) {
              return null;
            }
            return (
              <el-link type="primary" onClick={onClick}>
                选择操作
              </el-link>
            );
          },
        },
      ],
      showDetailRow: undefined,
      showApplyAuditDialog: false,
      showSettlementAuditDialog: false,
      showInvoiceAuditDialog: false,
      showInvoiceAuditFailDialog: false,
      invoiceAuditFailReason: "",
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
      const keys = this.columns
        .filter((c) => c.exportable === true)
        .map((c) => c.prop);
      const header = this.columns
        .filter((c) => c.exportable === true)
        .map((c) => c.label);
      const preset_data = this.selected_rows.map((row) =>
        keys.map((k) => _.get(row, k))
      );
      export_json_to_excel({ data: preset_data, header, filename: '公会对公结算记录' });
    },
    batchAction() {
      const uniq_statuses = _.uniq(this.selected_rows.map((row) => row.status));
      if (uniq_statuses.length !== 1) {
        this.$notify.warning({ message: "订单状态不一致，无法进行批量操作" });
        return;
      }
      const uniq_status = _.first(uniq_statuses);
      if (uniq_status === 10) {
        this.showApplyAuditDialog = this.selected_rows;
      } else if (uniq_status === 30) {
        this.showSettlementAuditDialog = this.selected_rows;
      } else if (uniq_status === 60) {
        this.showInvoiceAuditDialog = this.selected_rows;
      } else {
        this.$notify.warning({ message: "订单不支持操作" });
      }
    },
    async applyAudit(isPass, rows) {
      const res = await Promise.all(
        rows.map((row) =>
          request({
            url: REQUEST.finance.applyAudit,
            method: "post",
            data: { id: row.id, status: isPass ? 30 : 20 },
          })
        )
      );
      if (_.every(res, (r) => r.code === 2000)) {
        this.showApplyAuditDialog = false;
      }
    },
    async settlementAudit(isPass, rows) {
      const res = await Promise.all(
        rows.map((row) =>
          request({
            url: REQUEST.finance.settlementAudit,
            method: "post",
            data: {
              id: row.id,
              status: isPass ? 40 : 50,
            },
          })
        )
      );
      if (_.every(res, (r) => r.code === 2000)) {
        this.showSettlementAuditDialog = false;
      }
    },
    async invoiceAudit(isPass, rows) {
      const res = await Promise.all(
        rows.map((row) =>
          request({
            url: REQUEST.finance.invoiceAudit,
            method: "post",
            data: {
              id: row.id,
              status: isPass ? 80 : 70,
              remark: this.invoiceAuditFailReason,
            },
          })
        )
      );
      if (_.every(res, (r) => r.code === 2000)) {
        this.invoiceAuditFailReason = "";
        this.showInvoiceAuditDialog = false;
      }
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
        <el-button :disabled="selected_rows.length === 0" @click="batchAction"
          >批量操作</el-button
        >
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
    <el-dialog
      :width="'300px'"
      :visible.sync="showApplyAuditDialog"
      title="请选择操作"
      destroy-on-close
    >
      <div class="action-btns">
        <el-button @click="applyAudit(false, showApplyAuditDialog)"
          >退回</el-button
        >
        <el-button
          type="primary"
          @click="applyAudit(true, showApplyAuditDialog)"
          >审核通过</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :width="'300px'"
      :visible.sync="showSettlementAuditDialog"
      title="请选择操作"
      destroy-on-close
    >
      <div class="action-btns">
        <el-button @click="settlementAudit(false, showSettlementAuditDialog)"
          >发放失败</el-button
        >
        <el-button
          type="primary"
          @click="settlementAudit(true, showSettlementAuditDialog)"
          >发放成功</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :width="'300px'"
      :visible.sync="showInvoiceAuditDialog"
      title="请选择操作"
      destroy-on-close
    >
      <div class="action-btns">
        <el-button
          @click="
            () => {
              showInvoiceAuditFailDialog = true;
              invoiceAuditFailReason = '';
            }
          "
          >发票审核失败</el-button
        >
        <el-button
          type="primary"
          @click="invoiceAudit(true, showInvoiceAuditDialog)"
          >发票审核通过</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :width="'300px'"
      :visible.sync="showInvoiceAuditFailDialog"
      title="提示"
      destroy-on-close
    >
      <el-input
        v-model="invoiceAuditFailReason"
        placeholder="请输入发票审核失败原因"
        style="margin-bottom: 20px"
      ></el-input>
      <div class="action-btns">
        <el-button
          @click="
            () => {
              showInvoiceAuditFailDialog = false;
              invoiceAuditFailReason = '';
            }
          "
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="invoiceAudit(false, showInvoiceAuditDialog)"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.action-btns {
  display: flex;
  justify-content: space-between;
}
</style>
