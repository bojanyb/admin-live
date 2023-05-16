<template>
  <div class="room-livelist">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-add="true"
        :show-search-btn="true"
        add-name="批量修改当前通道"
        @add="batch"
        @onSearch="onSearch"
      ></SearchPanel>
    </div>

    <tableList
      :cfgs="cfgs"
      ref="tableList"
      @selectionChange="selectionChange"
    ></tableList>

    <!-- 修改组件 -->
    <editComp
      v-if="isDestoryComp"
      ref="editComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></editComp>
  </div>
</template>

<script>
// 引入api
import { delAutoJoinRule, delChannels } from "@/api/videoRoom";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入修改组件
import editComp from "./components/batchUpdateComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "channelRoom",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    editComp,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      ruleForm: {},
      selectionList: [],
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "cash_channel",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "当前提现通道",
          placeholder: "请选择当前提现通道",
          clearable: true,
          options: MAPDATA.CASHCHANNEL,
        },
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
        isShowCheckbox: true,
        url: REQUEST.CashHisity.cashChannel,
        columns: [
          {
            label: "身份证",
            prop: "id_card",
          },
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "用户ID",
            prop: "user_number",
          },
          {
            label: "当前提现通道",
            prop: "cash_channel",
            render: (h, params) => {
              let data = MAPDATA.CASHCHANNEL.find((item) => {
                return item.value === params.row.cash_channel;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "爱意-银行卡",
            prop: "aiyi_bank",
            render: (h, params) => {
              let data = MAPDATA.CASHCHANNEL.find((item) => {
                return item.value === params.row.aiyi_bank;
              });
              return h("span", data ? "已签署" : "未签署");
            },
          },
          {
            label: "爱意-支付宝",
            prop: "aiyi_alipay",
            render: (h, params) => {
              let data = MAPDATA.CASHCHANNEL.find((item) => {
                return item.value === params.row.aiyi_alipay;
              });
              return h("span", data ? "已签署" : "未签署");
            },
          },
          {
            label: "小猪-支付宝",
            prop: "pig_alipay",
            render: (h, params) => {
              let data = MAPDATA.CASHCHANNEL.find((item) => {
                return item.value === params.row.pig_alipay;
              });
              return h("span", data ? "已签署" : "未签署");
            },
          },
          {
            label: "小猪通道-银行卡",
            prop: "pig_bank",
            render: (h, params) => {
              let data = MAPDATA.CASHCHANNEL.find((item) => {
                return item.value === params.row.pig_bank;
              });
              return h("span", data ? "已签署" : "未签署");
            },
          },
          {
            label: "操作",
            minWidth: "120px",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    on: {
                      click: () => {
                        this.update(params.row);
                      },
                    },
                  },
                  "修改"
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
        user_number: s.user_number,
        id_card: s.id_card,
        name: s.name,
        cash_channel: s.cash_channel,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 批量
    batch() {
      if (!(this.selectionList && this.selectionList.length)) {
        this.$message.error('至少要选择一个修改对象')
        return false
      }
      const parma = this.selectionList || [];
      this.load("batch", parma);
    },
    // 修改
    update(row) {
      this.load("single", row);
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.editComp.loadParams(status, row);
      }, 50);
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 选择
    selectionChange(callbackList) {
      const res = callbackList.reduce((prev, curr) => {
        prev.push(curr);
        return prev;
      }, []);

      this.selectionList = res;
    },
  },
};
</script>
<style lang="scss">
.room-livelist {
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
