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
      summary_data: undefined,
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
            {
              key: 5,
              value: "adapay提现失败",
            },
            {
              key: 6,
              value: "部分成功",
            },
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
        {
          prop: "status",
          label: "申请状态",
          render: (h, row) => {
            return (
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
            );
          },
        },
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
        this.summary_data = res.data.data;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<template>
  <div class="record-detail">
    <SearchPanel
      v-model="searchParams"
      :forms="forms"
      :show-search-btn="true"
      @onSearch="onSearch"
    ></SearchPanel>
    <el-table :data="data">
      <el-table-column v-for="(item, i) in columns" align="center" :key="i" v-bind="item">
        <template v-if="item.render" #default="slotProps">
          <vnode :row="slotProps.row" :col="item" />
        </template>
      </el-table-column>
    </el-table>
    <div v-if="summary_data" class="summary_data">
      查询期间：用户人数：{{ summary_data.total_user }}人；结算笔数：{{
        summary_data.total_count
      }}，结算总喵粮：{{ summary_data.total_gain }}；违规扣除：{{
        summary_data.total_deduct_money
      }}；结算总金额：{{ summary_data.total_money }}元
    </div>
  </div>
</template>
<style lang="scss">
.record-detail {
  .summary_data {
    margin: 20px auto;
    padding: 20px;
    background-color: #f6f8ff;
    width: fit-content;
    display: flex;
    justify-content: center;
  }
}
</style>
