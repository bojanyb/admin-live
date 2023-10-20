<script>
import _ from "lodash";
import moment from "moment";
import SearchPanel from "@/components/SearchPanel/final.vue";
import request from "@/utils/request2";
import { export_json_to_excel } from "@/vendor/Export2Excel";
import REQUEST from "@/request/index.js";
export default {
  name: "qualification-manage",
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
          label: "审核状态",
          placeholder: "请选择",
          options: [
            { key: 0, value: "待审核" },
            { key: 1, value: "已通过" },
            { key: 2, value: "已退回" },
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
          prop: "create_time",
          exportable: true,
          label: "申请时间",
          width: "150px",
          render: (h, row) => (
            <span>{moment(row.create_time * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
          ),
        },
        { prop: "guild_number", exportable: true, label: "公会ID" },
        { prop: "guild_name", exportable: true, label: "公会名称" },
        { prop: "company_name", exportable: true, label: "企业名称" },
        { prop: "company_code", exportable: true, label: "统一社会信用代码" },
        { prop: "company_address", exportable: true, label: "注册地址" },
        { prop: "bank_name", exportable: true, label: "开户银行" },
        { prop: "bank_address", exportable: true, label: "开户支行" },
        { prop: "bank_card", exportable: true, label: "银行账号" },
        {
          prop: "certificate_file",
          exportable: true,
          label: "营业执照",
          render: (h, row) => {
            if (row.certificate_file) {
              // const test = 'https://photo.aiyi.live/7643ffdc0d787709235b744e02250935.rar'
              return (
                <el-button type="text" onClick={() => window.open(row.certificate_file)}>
                  点击查看
                </el-button>
              );
            }
            return null;
          },
        },
        {
          prop: "bank_file",
          exportable: true,
          label: "公户资料",
          render: (h, row) => {
            if (row.bank_file) {
              // const test = 'https://photo.aiyi.live/7643ffdc0d787709235b744e02250935.rar'
              return (
                <el-button type="text" onClick={() => window.open(row.bank_file)}>
                  点击查看
                </el-button>
              );
            }
            return null;
          },
        },
        {
          prop: "status",
          exportable: true,
          label: "审核状态",
          render: (h, row) => (
            <span>{{ 0: "待审核", 1: "已通过", 2: "已退回" }[row.status]}</span>
          ),
        },
        { prop: "remark", exportable: true, label: "备注说明" },
        {
          prop: "",
          label: "操作",
          fixed: "right",
          render: (h, row) => {
            let onPass;
            let onReject;
            if (row.status === 0) {
              onPass = () => (this.showAuditPassDialog = [row]);
              onReject = () => (this.showAuditRejectDialog = [row]);
            }
            if (!onPass || !onReject) {
              return null;
            }
            return (
              <div>
                <el-button type="text" onClick={onReject}>
                  驳回
                </el-button>
                <el-button type="text" onClick={onPass}>
                  审核通过
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
    async audit(isPass, rows) {
      const res = await Promise.all(
        rows.map((row) =>
          request({
            url: REQUEST.finance.bankAudit,
            method: "post",
            data: {
              id: row.id,
              status: isPass ? 1 : 2,
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
    async fetchData() {
      try {
        this.loading = true;
        const res = await request({
          url: REQUEST.finance.getGuildCashBank,
          method: "post",
          data: this.fetchParams,
        });
        if (res.code === 2000) {
          this.page = res.data.page;
          this.pagesize = res.data.pagesize;
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
        <span> 确定审核通过? </span>
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
        <el-input
          v-model="reject_reason"
          placeholder="请输入驳回原因(必填)"
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
            确定驳回
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.reconciliation-records {
  padding: 24px;
}
.dialog_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .action-btns {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
