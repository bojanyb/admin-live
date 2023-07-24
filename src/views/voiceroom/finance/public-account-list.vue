<!-- // 对公转账列表 -->
<template>
  <div class="public-account-container">
    <!-- <el-card class="section-select" shadow="never">
      <el-form>
        <el-form-item label="结算状态：">
          <el-select v-model="sectionForm.status" @change="handleAccountChange">
            <el-option v-for="item in accountMapOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card> -->

    <el-card class="section-select" shadow="never">
      <!-- <div class="section-title">
        {{ sectionForm.status | filterCheckAudit }}
      </div> -->
      <div class="model" v-if="sectionForm.status !== 3">
        <span>总计喵粮：{{ ruleForm.gain_total || 0 }}条</span>
        <span>总计提现金额：{{ ruleForm.apply_amount_total || 0 }}元</span>
        <span>总计实际金额：{{ ruleForm.cash_money_total || 0 }}元</span>
        <span>总计手续费：{{ ruleForm.cash_fee_total }}元</span>
        <span>总计实际收入：{{ ruleForm.real_money_total }}元</span>
      </div>
      <div class="model settled" v-if="sectionForm.status === 3">
        <span>总计喵粮：{{ ruleForm.gain_total || 0 }}条</span>
        <span>总计提现金额：{{ ruleForm.apply_amount_total || 0 }}元</span>
        <span>总计异常扣除：{{ ruleForm.abnormal_money_total || 0 }}元</span>
        <span>总计其它扣除：{{ ruleForm.other_money_total || 0 }}元</span>
        <span>总计实际金额：{{ ruleForm.cash_money_total || 0 }}元</span>
        <span>总计实际收入：{{ ruleForm.real_money_total }}元</span>
        <span>总计实际开票金额：{{ ruleForm.real_invoice_money_total }}元</span>
        <span>总计发票超额：{{ ruleForm.real_invoice_excess_total }}元</span>
      </div>
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
      <div class="tableList">
        <tableList
          :cfgs="cfgs"
          ref="tableList"
          @saleAmunt="saleAmunt"
        ></tableList>
      </div>
    </el-card>

    <editorComp
      ref="editorComp"
      v-if="isDestoryComp"
      @onSearch="onSearch"
      @destoryComp="destoryComp"
    ></editorComp>
  </div>
</template>

<script>
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import REQUEST from "@/request/index.js";
// 引入api
import { down } from "@/api/shopping.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入新增组件
import editorComp from "./components/editorComp.vue";

export default {
  components: {
    tableList,
    SearchPanel,
    editorComp,
  },
  mixins: [mixins],
  computed: {
    forms() {
      return [
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "申请时间",
          value: "",
          linkage: true,
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
        {
          name: "status",
          type: "select",
          value: 1,
          keyName: "value",
          optionLabel: "name",
          label: "状态",
          placeholder: "请选择",
          options: MAPDATA.CASHAUDITLIST,
          handler: {
            change: (status) => {
             this.sectionForm.status = status
            }
          },
        },
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          isNum: true,
          linkage: true,
          placeholder: "请输入公会ID",
        },
      ];
    },
    cfgs() {
        let arr =[
          {
            label: "申请时间",
            minWidth: "160px",
            prop: "create_time"
          },
          {
            label: "统计时间",
            minWidth: "160px",
            render: (h, params) => {
              return h("span", `${params.row.start_time}-${params.row.end_time}`);
            },
          },
          {
            label: "公会",
            minWidth: "120px",
            prop: "guild_name",
          },
          {
            label: "公会ID",
            minWidth: "90px",
            prop: "guild_id",
          },
          {
            label: "喵粮",
            minWidth: "100px",
            prop: "gain",
          },
          {
            label: "提现金额",
            minWidth: "120px",
            prop: "apply_amount",
          },
          {
            label: "异常扣除",
            minWidth: "100px",
            prop: "abnormal_money",
          },
          {
            label: "其他扣除",
            minWidth: "100px",
            prop: "other_money",
          },
          {
            label: "实际金额",
            minWidth: "100px",
            prop: "cash_money",
          },
          {
            label: "手续费",
            minWidth: "100px",
            prop: "cash_fee",
          },
          {
            label: "实际收入",
            minWidth: "100px",
            prop: "real_money",
          },
          {
            label: "状态",
            minWidth: "110px",
						render: (h, params) => {
							let data = MAPDATA.CASHAUDITLIST.find(item => { return item.value === params.row.status })
							return h('span', data ? data.name : '无')
						}
          },
          {
            label: "操作",
            width: "290px",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "info" },
                    on: {
                      click: () => {
                        this.handleLookDetail(params.row);
                      },
                    },
                  },
                  "账单明细"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    on: {
                      click: () => {
                        this.showEditor(params.row.status === 1 ? "editor" : "look", params.row);
                      },
                    },
                  },
                  params.row.status === 1 ? "编辑" : "查看"
                )
              ]);
            },
          },
        ]

        let arr1 =[
          {
            label: "申请时间",
            minWidth: "160px",
            prop: "create_time"
          },
          {
            label: "统计时间",
            minWidth: "160px",
            render: (h, params) => {
              return h("span", `${params.row.start_time}-${params.row.end_time}`);
            },
          },
          {
            label: "公会",
            minWidth: "120px",
            prop: "guild_name",
          },
          {
            label: "公会ID",
            minWidth: "90px",
            prop: "guild_id",
          },
          {
            label: "喵粮",
            minWidth: "100px",
            prop: "gain",
          },
          {
            label: "提现金额",
            minWidth: "120px",
            prop: "apply_amount",
          },
          {
            label: "异常扣除",
            minWidth: "100px",
            prop: "abnormal_money",
          },
          {
            label: "其他扣除",
            minWidth: "100px",
            prop: "other_money",
          },
          {
            label: "实际金额",
            minWidth: "100px",
            prop: "cash_money",
          },
          {
            label: "实际开票金额",
            minWidth: "150px",
            prop: "real_invoice_money_total",
          },
          {
            label: "发票超额",
            minWidth: "150px",
            prop: "real_invoice_excess_total",
          },
          {
            label: "手续费",
            minWidth: "100px",
            prop: "cash_fee",
          },
          {
            label: "实际收入",
            minWidth: "100px",
            prop: "real_money",
          },
          {
            label: "状态",
            minWidth: "100px",
						render: (h, params) => {
							let data = MAPDATA.CASHAUDITLIST.find(item => { return item.value === params.row.status })
							return h('span', data ? data.name : '无')
						}
          },
          {
            label: "操作",
            width: "260px",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "info" },
                    on: {
                      click: () => {
                        this.handleLookDetail(params.row);
                      },
                    },
                  },
                  "账单明细"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    on: {
                      click: () => {
                        this.showEditor(params.row.status === 1 ? "editor" : "look", params.row);
                      },
                    },
                  },
                  params.row.status === 1 ? "编辑" : "查看"
                )
              ]);
            },
          },
        ]
      return {
        vm: this,
        url: REQUEST.finance.getCashList,
        columns: this.sectionForm.status === 3 ? arr1 : arr
      };
    },
  },
  // filters: {
  //   filterCheckAudit(status) {
  //     let data = MAPDATA.CASHAUDITLIST.find((item) => {
  //       return item.value === status;
  //     });
  //     return data.name + '结算单';
  //   },
  // },
  data() {
    return {
      ruleForm: {},
      isDestoryComp: false, // 销毁组件
      sectionForm: {
        status: 1,
      },
      accountMapOptions: MAPDATA.CASHAUDITLIST
    };
  },
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams, ...this.sectionForm };
      return {
        page: params ? params.page : null,
        pagesize: params ? params.pagesize : null,
        guild_number: s.guild_number || '',
        status: s.status,
        start_time: Math.floor(s.start_time / 1000) || '',
        end_time: Math.floor(s.end_time / 1000) || ''
      };
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
    // 查询
    reset() {
      this.searchParams = {};
      this.dateTimeParams = {
        activity_type_id: 1,
      };
      this.getList();
    },
    // 重置
    onSearch() {
      this.getList();
    },
    // 列表返回数据
    saleAmunt(data) {
      this.ruleForm = {
        ...data.data,
      };
    },
    showEditor(status, row) {
      this.load(status, row);
    },
    down(row, status) {
      let params = {
        id: row.id,
        status: status,
      };
      down(params).then((res) => {
        if (res.code === 2000) {
          this.onSearch();
        }
      });
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.editorComp.dialogVisible = true;
        this.$refs.editorComp.load(status, row);
      }, 100);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 查看账单明细
    handleLookDetail(row) {
      this.$router.push({
        path: "/giveAway/public-transfer",
        query: {
          id: row.id,
        },
      });
    },
    // 切换结算状态
    handleAccountChange() {
      this.getList();
    }
  },
};
</script>

<style lang="scss">
.public-account-container {
  box-sizing: border-box;
  .section-select {
    margin-bottom: 20px;
    .section-title {
      font-weight: 700;
      padding: 20px 10px;
    }
  }
  .model {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    padding: 0px 30px;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    > span {
      font-size: 15px;
      color: #fff;
      margin-right: 100px;
    }
  }
  .settled {
    height: 80px;
    flex-wrap: wrap;
  }
  .bounce_fa {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .bounce {
      position: absolute;
      left: 0;
      font-size: 17px;
      color: #ff4949;
      font-weight: 600;
      transform: translateY(5px);
      animation: bounce 1s infinite;
    }

    @keyframes bounce {
      0% {
        transform: translateY(5px);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(5px);
      }
    }
  }
}
</style>
