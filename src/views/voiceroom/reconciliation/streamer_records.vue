<script>
import _ from "lodash";
import moment from "moment";
import SearchPanel from "@/components/SearchPanel/final.vue";
import { export_json_to_excel } from "@/vendor/Export2Excel";
import request from "@/utils/request2";
import REQUEST from "@/request/index.js";
export default {
  name: "push-recall",
  components: {
    SearchPanel,
    vnode: {
      functional: true,
      render(h, ctx) {
        return ctx.props.col.render(h, ctx.props.row, ctx.props.col);
      },
    },
  },
  data() {
    return {
      loading: false,
      page: 1,
      pagesize: 10,
      total: 0,
      data: [],
      searchParams: {},
      selected_rows: [],
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
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          isNum: true,
          placeholder: "请输入公会ID",
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
              key: 1,
              value: "待审核",
            },
            {
              key: 2,
              value: "提现处理中",
            },
            {
              key: 3,
              value: "自动退回",
            },
            {
              key: 4,
              value: "提现到账",
            },
            // {
            //   key: 5,
            //   value: "adapay提现失败",
            // },
            // {
            //   key: 6,
            //   value: "部分成功",
            // },
            {
              key: 7,
              value: "用户取消",
            },
            {
              key: 8,
              value: "公会长通过",
            },
            {
              key: 9,
              value: "公会长退回",
            },
            {
              key: 10,
              value: "系统通过",
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
        {
          prop: "addtime",
          label: "申请时间",
          exportable: true,
          export_format: (row) =>
            moment(row.addtime * 1000).format("YYYY-MM-DD HH:mm:ss"),
          render: (h, row) => (
            <span>{moment(row.addtime * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
          ),
        },
        { prop: "user_id", exportable: true, label: "用户ID" },
        { prop: "nickname", exportable: true, label: "用户昵称" },
        { prop: "guild_name", exportable: true, label: "公会名称" },
        { prop: "gain", exportable: true, label: "结算喵粮" },
        {
          prop: "real_money",
          exportable: true,
          export_format: (row) => {
            return row.real_money / 100;
          },
          label: "结算金额",
          render: (h, row) => <span>{row.real_money / 100}元</span>,
        },
        {
          prop: "status",
          label: "申请状态",
          exportable: true,
          export_format: (row) => {
            return {
              1: "待审核",
              2: "提现处理中",
              3: "自动退回",
              4: "提现到账",
              5: "adapay提现失败",
              6: "部分成功",
              7: "用户取消",
              8: "公会长通过",
              9: "公会长退回",
              10: "系统通过",
            }[row.status];
          },
          render: (h, row) => (
            <span>
              {
                {
                  1: "待审核",
                  2: "提现处理中",
                  3: "自动退回",
                  4: "提现到账",
                  5: "adapay提现失败",
                  6: "部分成功",
                  7: "用户取消",
                  8: "公会长通过",
                  9: "公会长退回",
                  10: "系统通过",
                }[row.status]
              }
            </span>
          ),
        },
        { prop: "remark", exportable: true, label: "备注" },
        {
          prop: "",
          label: "操作",
          fixed: "right",
          render: (h, row) => {
            let onPass;
            let onReject;
            if (row.status === 1) {
              onPass = () => (this.showAuditPassDialog = [row]);
              onReject = () => (this.showAuditRejectDialog = [row]);
            }
            if (!onPass || !onReject) {
              return null;
            }
            return (
              <div>
                <el-button type="text" onClick={onReject}>
                  退回
                </el-button>
                <el-button type="text" onClick={onPass}>
                  通过
                </el-button>
              </div>
            );
          },
        },
      ],
      showAuditPassDialog: false,
      showAuditRejectDialog: false,
      reject_reason: "",
    };
  },
  computed: {
    fetchParams() {
      return {
        page: this.page,
        pagesize: this.pagesize,
        user_id: this.searchParams?.user_id,
        guild_number: this.searchParams?.guild_number,
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
    batchAction(isPass) {
      const uniq_statuses = _.uniq(this.selected_rows.map((row) => row.status));
      if (uniq_statuses.length !== 1) {
        this.$notify.warning({ message: "订单状态不一致，无法进行批量操作" });
        return;
      }
      const uniq_status = _.first(uniq_statuses);
      if (uniq_status === 1) {
        if (isPass) {
          this.showAuditPassDialog = this.selected_rows;
        } else {
          this.showAuditRejectDialog = this.selected_rows;
        }
      } else {
        this.$notify.warning({ message: "订单不支持操作" });
      }
    },
    async audit(isPass, rows) {
      const res = await Promise.all(
        rows.map((row) =>
          request({
            url: REQUEST.finance.doCash,
            method: "post",
            data: {
              id: row.id,
              status: isPass ? 2 : 3,
              remark: isPass ? "" : this.reject_reason,
            },
          })
        )
      );
      if (_.every(res, (r) => r.code === 2000)) {
        this.reject_reason = "";
        this.showAuditPassDialog = false;
        this.showAuditRejectDialog = false;
      }
      this.fetchData();
    },
    onExportExcel() {
      const keys = this.columns
        .filter((c) => c.exportable === true)
        .map((c) =>
          c.export_format ? (row) => c.export_format(row) : _.property(c.prop)
        );
      const header = this.columns
        .filter((c) => c.exportable === true)
        .map((c) => c.label);
      const preset_data = this.selected_rows.map((row) => keys.map((k) => k(row)));
      export_json_to_excel({
        data: preset_data,
        header,
        filename: "主播对公结算记录",
      });
    },
    async fetchData() {
      try {
        this.loading = true;
        const res = await request({
          url: REQUEST.finance.getAnchorCash,
          method: "post",
          data: this.fetchParams,
        });
        if (res.code === 2000) {
          // this.page = res.data.page;
          // this.pagesize = res.data.pagesize;
          this.total = res.data.count;
          this.data = res.data.list;
        }
      } catch (e) {
        this.data = []
        console.error(e.message);
      } finally {
        this.loading = false;
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
        <el-button :disabled="selected_rows.length === 0" @click="batchAction(true)">
          批量通过
        </el-button>
        <el-button :disabled="selected_rows.length === 0" @click="batchAction(false)">
          批量拒绝
        </el-button>
        <el-button :disabled="selected_rows.length === 0" @click="onExportExcel"
          >导出Excel</el-button
        >
      </template>
    </SearchPanel>
    <el-table
      :data="data"
      @selection-change="(val) => (selected_rows = val)"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column v-for="(item, i) in columns" align="center" :key="i" v-bind="item">
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
      :width="'300px'"
      :visible.sync="showAuditPassDialog"
      title="提示"
      destroy-on-close
    >
      <div class="dialog_content">
        <span>{{
          `确定${
            showAuditPassDialog && showAuditPassDialog.length > 1 ? "批量" : ""
          }通过?`
        }}</span>
        <div class="action-btns">
          <el-button
            @click="
              () => {
                showAuditPassDialog = false;
              }
            "
          >
            取消
          </el-button>
          <el-button type="primary" @click="audit(true, showAuditPassDialog)">
            确定通过</el-button
          >
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :width="'300px'"
      :visible.sync="showAuditRejectDialog"
      title="提示"
      destroy-on-close
    >
      <div class="dialog_content">
        {{
          `确定${
            showAuditRejectDialog && showAuditRejectDialog.length > 1 ? "批量" : ""
          }拒绝?`
        }}
        <el-input
          v-model="reject_reason"
          placeholder="请输入拒绝原因(必填)"
          style="margin-bottom: 20px"
        ></el-input>
        <div class="action-btns">
          <el-button
            @click="
              () => {
                reject_reason = '';
                showAuditRejectDialog = false;
              }
            "
          >
            取消
          </el-button>
          <el-button type="primary" :disabled="!reject_reason" @click="audit(false, showAuditRejectDialog)">
            确定退回
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.dialog_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .action-btns {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
