<template>
  <div class="withdrawal-account-list">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-search-btn="true"
        @onSearch="onSearch"
      ></SearchPanel>
    </div>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>
  </div>
</template>

<script>
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";

export default {
  name: "channelRoom",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
  },
  computed: {
    forms() {
      return [
        {
          name: "id_card",
          type: "input",
          value: "",
          label: "身份证",
          placeholder: "请输入身份证",
        },
        {
          name: "name",
          type: "input",
          value: "",
          label: "姓名",
          placeholder: "请输入姓名",
        },
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "用户ID",
          isNum: true,
          placeholder: "请输入用户ID",
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.CashHisity.cashAccount,
        columns: [
          {
            label: "身份证",
            prop: "id_card",
            render: (h, params) => {
              return h("span", params.row.id_card || "--");
            },
          },
          {
            label: "姓名",
            prop: "name",
            render: (h, params) => {
              return h("span", params.row.name || "--");
            },
          },
          {
            label: "用户ID",
            prop: "user_number",
            render: (h, params) => {
              return h("span", params.row.user_number || "--");
            },
          },
          {
            label: "支付宝",
            prop: "user_alipay",
            render: (h, params) => {
              return h("span", params.row.user_alipay || "--");
            },
          },
          {
            label: "银行卡",
            prop: "user_pigsign",
            align: "left",
            render: (h, params) => {
              return h("div", [
                h("div", `账户:${params.row.user_pigsign.bank_card_id}`),
                h("div", `开户行:${params.row.user_pigsign.bank_name}`),
                h("div", `开户支行:${params.row.user_pigsign.bank_address}`),
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
        user_number: s.user_number,
        id_card: s.id_card,
        name: s.name,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 查询
    onSearch() {
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.withdrawal-account-list {
  padding: 20px;
  box-sizing: border-box;
  .box-card {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    padding: 0px 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .box-card-inner {
      > span {
        font-size: 15px;
        color: #ffffff;
        margin-right: 100px;
      }
    }
  }
}
</style>
