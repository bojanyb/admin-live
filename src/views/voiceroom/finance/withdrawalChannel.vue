<template>
  <div class="room-livelist">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-add="true"
        :show-search-btn="true"
        :show-export="true"
        :show-batch-rurn="true"
        add-name="批量修改当前通道"
        export-name="批量输入ID修改"
        batch-rurn-name="导出Excel"
        @add="batch"
        @export="handleInputIdUpdate"
        @onSearch="onSearch"
        @BatchRurn="BatchRurn"
      ></SearchPanel>
    </div>

    <tableList
      :cfgs="cfgs"
      ref="tableList"
      @selectionChange="selectionChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></tableList>

    <!-- 修改组件 -->
    <editComp
      v-if="isDestoryComp"
      ref="editComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></editComp>

    <!-- 批量输入ID修改 -->
    <el-dialog
      :visible.sync="inputIdUpdateVisible"
      title="批量输入ID修改"
      width="30%"
      append-to-body
      @close="inputIdForm = {}"
    >
      <el-form
        ref="inputIdForm"
        :model="inputIdForm"
        label-suffix=":"
        label-width="90px"
      >
        <el-form-item label="用户ID">
          <el-input
            type="textarea"
            v-model="inputIdForm.user_number"
          ></el-input>
        </el-form-item>
        <el-row style="padding: 20px">
          <el-col :span="12">
            <el-form-item label="支付宝提现通道" label-width="80">
              <el-select
                v-model="inputIdForm.alipay_cash_channel"
                placeholder="请选择修改提现通道"
                style="width: 80%"
              >
                <el-option
                  v-for="item in alipayCashList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="银行卡提现通道" label-width="80">
              <el-select
                v-model="inputIdForm.cash_channel"
                placeholder="请选择修改提现通道"
                style="width: 80%"
              >
                <el-option
                  v-for="item in bankCashList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="inputIdForm = {}">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 批量修改返回 -->
    <el-dialog
      :visible.sync="respsoneDataVisible"
      title="批量修改执行结果"
      width="30%"
      append-to-body
      center
    >
      <div style="padding: 20px">
        <div style="padding: 10px">
          <span style="color: #f56c6c">{{
            respsoneData.error_user && respsoneData.error_user.split(",").length
              ? respsoneData.error_user.split(",").length
              : 0
          }}</span
          >条执行失败
        </div>
        <div style="padding: 10px">
          {{ `请排查：${respsoneData.error_user || "无"}` }}
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="handleCloseRespsone">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { updateCashChannel, cashChannel } from "@/api/videoRoom";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入修改组件
import editComp from "./components/batchUpdateComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat, exportTableData } from "@/utils/common.js";
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

      inputIdUpdateVisible: false, // 批量输入ID弹框
      respsoneDataVisible: false, // 批量输入ID返回弹框
      cashList: MAPDATA.CASHCHANNEL,
      alipayCashList: MAPDATA.ALIPAYCASHCHANNEL,
      bankCashList: MAPDATA.BANKCASHCHANNEL,
      inputIdForm: {}, // 批量输入ID表单
      respsoneData: {
        // 批量输入ID返回表单
        error_user: "",
      },
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "alipay_cash_channel",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "当前支付宝提现通道",
          placeholder: "请选择支付宝提现通道",
          clearable: true,
          options: MAPDATA.ALIPAYCASHCHANNEL,
        },
        {
          name: "cash_channel",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "当前银行卡提现通道",
          placeholder: "请选择银行卡提现通道",
          clearable: true,
          options: MAPDATA.BANKCASHCHANNEL,
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
        search: {
          sizes: [10, 30, 50, 100, 300, 500, 1000],
        },
        columns: [
          {
            label: "身份证",
            prop: "id_card",
            width: "170px",
          },
          {
            label: "姓名",
            prop: "name",
            width: "100px",
          },
          {
            label: "用户ID",
            prop: "user_number",
            width: "100px",
          },
          {
            label: "小猪通道余额",
            prop: "pig_quota",
            minWidth: "130px",
            sortable: "custom",
            render: (h, params) => {
              const result = params.row.pig_quota.map((item) => {
                return h("div", `${item.name}：${item.quota}`);
              });
              return h("div", result);
            },
          },
          {
            label: "工猫通道余额",
            prop: "cat_quota",
            minWidth: "130px",
            sortable: "custom",
            render: (h, params) => {
              const result = params.row.cat_quota.map((item) => {
                return h("div", `${item.name}：${item.quota}`);
              });
              return h("div", result);
            },
          },
          {
            label: "美事通通道余额",
            prop: "mst_quota",
            minWidth: "150px",
            sortable: "custom",
            render: (h, params) => {
              const result = params.row.mst_quota.map((item) => {
                return h("div", `${item.name}：${item.quota}`);
              });
              return h("div", result);
            },
          },
          {
            label: "福穗通道余额",
            prop: "fusui_quota",
            minWidth: "130px",
            sortable: "custom",
            render: (h, params) => {
              const result = params.row.fusui_quota.map((item) => {
                return h("div", `${item.name}：${item.quota}`);
              });
              return h("div", result);
            },
          },
          {
            label: "薪遇见通道余额",
            prop: "xin_quota",
            minWidth: "150px",
            sortable: "custom",
            render: (h, params) => {
              const result = params.row.xin_quota.map((item) => {
                return h("div", `${item.name}：${item.quota}`);
              });
              return h("div", result);
            },
          },
          {
            label: "支付宝提现通道",
            prop: "alipay_cash_channel",
            width: "120px",
            render: (h, params) => {
              let data = MAPDATA.CASHCHANNEL.find((item) => {
                return item.value === params.row.alipay_cash_channel;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "银行卡提现通道",
            prop: "cash_channel",
            width: "120px",
            render: (h, params) => {
              let data = MAPDATA.CASHCHANNEL.find((item) => {
                return item.value === params.row.cash_channel;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "公司-银行卡",
            prop: "aiyi_bank",
            width: "100px",
            render: (h, params) => {
              return h("span", params.row.aiyi_bank ? "已签署" : "未签署");
            },
          },
          {
            label: "公司-支付宝",
            prop: "aiyi_alipay",
            width: "100px",
            render: (h, params) => {
              return h("span", params.row.aiyi_alipay ? "已签署" : "未签署");
            },
          },
          {
            label: "小猪-支付宝",
            prop: "pig_alipay",
            width: "100px",
            render: (h, params) => {
              return h("span", params.row.pig_alipay ? "已签署" : "未签署");
            },
          },
          {
            label: "小猪-银行卡",
            prop: "pig_bank",
            width: "100px",
            render: (h, params) => {
              return h("span", params.row.pig_bank ? "已签署" : "未签署");
            },
          },
          {
            label: "工猫-银行卡",
            width: "100px",
            prop: "cat_bank",
            render: (h, params) => {
              return h("span", params.row.cat_bank ? "已签署" : "未签署");
            },
          },
          {
            label: "工猫-支付宝",
            prop: "cat_alipay",
            width: "100px",
            render: (h, params) => {
              return h("span", params.row.cat_alipay ? "已签署" : "未签署");
            },
          },
          {
            label: "美事通-银行卡",
            prop: "mst_bank",
            width: "110px",
            render: (h, params) => {
              return h("span", params.row.mst_bank ? "已签署" : "未签署");
            },
          },
          {
            label: "美事通-支付宝",
            prop: "mst_alipay",
            width: "110px",
            render: (h, params) => {
              return h("span", params.row.mst_alipay ? "已签署" : "未签署");
            },
          },
          {
            label: "福穗-银行卡",
            prop: "fusui_bank",
            width: "100px",
            render: (h, params) => {
              return h("span", params.row.fusui_bank ? "已签署" : "未签署");
            },
          },
          {
            label: "福穗-支付宝",
            prop: "fusui_alipay",
            width: "100px",
            render: (h, params) => {
              return h("span", params.row.fusui_alipay ? "已签署" : "未签署");
            },
          },
          {
            label: "薪遇见-银行卡",
            prop: "fusui_bank",
            width: "120px",
            render: (h, params) => {
              return h("span", params.row.xin_bank ? "已签署" : "未签署");
            },
          },
          {
            label: "薪遇见-支付宝",
            prop: "fusui_alipay",
            width: "120px",
            render: (h, params) => {
              return h("span", params.row.xin_alipay ? "已签署" : "未签署");
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
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        user_number: s.user_number,
        id_card: s.id_card,
        name: s.name,
        cash_channel: s.cash_channel,
        alipay_cash_channel: s.alipay_cash_channel
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 批量
    batch() {
      if (!(this.selectionList && this.selectionList.length)) {
        this.$message.error("至少要选择一个修改对象");
        return false;
      }
      const parma = this.selectionList || [];
      this.load("batch", parma);
    },
    // 批量输入ID修改
    handleInputIdUpdate() {
      this.inputIdUpdateVisible = true;
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
    // 批量输入ID修改提交表单
    submitForm() {
      this.$refs.inputIdForm.validate(async (valid) => {
        if (valid) {
          let temp = {
            user_number: this.inputIdForm.user_number,
            cash_channel: this.inputIdForm.cash_channel,
            alipay_cash_channel: this.inputIdForm.alipay_cash_channel,
          };
          const res = await updateCashChannel(temp);
          if (res.code + "" === "2000") {
            this.respsoneData = res.data;
            if (res.data && res.data.error_user) {
              this.respsoneDataVisible = true;
            } else {
              this.inputIdUpdateVisible = false;
              this.getList();
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async BatchRurn() {
      let s = this.beforeSearch();
      const search = this.$refs.tableList.search;
      s.page = search ? search.page : null;
      s.pagesize = search ? search.size : null;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let res = await cashChannel(s);
      try {
        let arr = JSON.parse(JSON.stringify(res.data.list));
        if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
        arr = arr.map((item, index) => {
          const pigResult = item.pig_quota.map((cur) => {
            return `${cur.name}：${cur.quota}`;
          });
          const catResult = item.cat_quota.map((cur) => {
            return `${cur.name}：${cur.quota}`;
          });
          const mstResult = item.mst_quota.map((cur) => {
            return `${cur.name}：${cur.quota}`;
          });
          const fusuiResult = item.fusui_quota.map((cur) => {
            return `${cur.name}：${cur.quota}`;
          });
          let params = {
            id_card: item.id_card,
            name: item.name,
            user_number: item.user_number,
            pig_quota: pigResult,
            cat_quota: catResult,
            mst_quota: mstResult,
            fusui_quota: fusuiResult,
          };
          return params;
        });
        let nameList = [
          "身份证",
          "姓名",
          "用户ID",
          "小猪通道余额",
          "工猫通道余额",
          "美事通通道余额",
          "福穗通道余额",
        ];
        exportTableData(arr, nameList, "公会房间列表");
        loading.close();
      } catch (error) {
        console.log(error);
        loading.close();
      }
    },
    handleCloseRespsone() {
      this.respsoneDataVisible = false;
      this.inputIdUpdateVisible = false;
      this.getList();
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
.el-table__fixed-body-wrapper {
  bottom: 0;
}
</style>
