<!-- // 对公转账列表 -->
<template>
  <div class="public-account-container">
    <el-card class="section-select" shadow="never">
      <el-form>
        <el-form-item label="结算状态：">
          <el-select v-model="sectionForm.sectionStatus">
            <el-option label="进程中" :value="0"></el-option>
            <el-option label="已完成" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="section-select" shadow="never">
      <div class="section-title">
        {{ sectionForm.sectionStatus ? "已完成结算单" : "进程中结算单" }}
      </div>
      <div class="searchParams">
        <SearchPanel
          v-model="searchParams"
          :forms="forms"
          :show-reset="true"
          :show-search-btn="true"
          :show-add="true"
          @onReset="reset"
          @onSearch="onSearch"
          @add="add"
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
          value: null,
          keyName: "value",
          optionLabel: "name",
          label: "状态",
          placeholder: "请选择",
          clearable: true,
          options: MAPDATA.RACKSATUS,
        },
        {
          name: "type",
          type: "select",
          value: null,
          keyName: "value",
          optionLabel: "name",
          label: "公会类型",
          placeholder: "请选择",
          clearable: true,
          options: MAPDATA.GOODNUMTYPE,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.CashHisity.apply,
        columns: [
          {
            label: "申请时间",
            render: (h, params) => {
              return h(
                "span",
                params.row.addtime
                  ? timeFormat(params.row.addtime, "YYYY-MM-DD HH:mm:ss", true)
                  : "--"
              );
            },
          },
          {
            label: "统计时间",
            render: (h, params) => {
              return h(
                "span",
                params.row.addtime
                  ? timeFormat(params.row.addtime, "YYYY-MM-DD HH:mm:ss", true)
                  : "--"
              );
            },
          },
          {
            label: "公会",
            minWidth: "100px",
            prop: "guild_number",
          },
          {
            label: "喵粮",
            minWidth: "100px",
            prop: "money",
          },
          {
            label: "提现金额",
            render: (h, params) => {
              return h("span", params.row.money / 100);
            },
          },
          {
            label: "异常扣除",
            render: (h, params) => {
              return h("span", params.row.money / 100);
            },
          },
          {
            label: "其他扣除",
            minWidth: "100px",
            prop: "guild_number",
          },
          {
            label: "实际金额",
            minWidth: "100px",
            prop: "guild_number",
          },
          {
            label: "手续费",
            prop: "cash_rate",
            render: (h, params) => {
              let money =
                Math.floor(
                  ((params.row.money / 10000) * params.row.cash_rate).toFixed(
                    5
                  ) * 100
                ) / 100;
              return h("span", money);
            },
          },
          {
            label: "实际收入",
            minWidth: "100px",
            prop: "guild_number",
          },
          {
            label: "状态",
            minWidth: "100px",
            prop: "guild_number",
          },
          {
            label: "操作",
            width: "260px",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    on: {
                      click: () => {
                        this.showEditor(params.row);
                      },
                    },
                  },
                  "编辑"
                )
              ]);
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      ruleForm: {
        alreadyMoney: null,
        deductMoney: null,
      },
      isDestoryComp: false, // 销毁组件
      sectionForm: {
        sectionStatus: 0,
      },
    };
  },
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        status: s.status,
        user_number: s.user_number,
        start_time: Math.floor(s.start_time / 1000),
        end_time: Math.floor(s.end_time / 1000),
        user_id: s.user_id,
        order_id: s.order_id,
        sort: s.sort,
        goods_type: s.goods_type,
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
      // this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
    },
    // 新增
    add() {
      this.load("add");
    },
    showEditor(row) {
      this.load("editor", row);
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
    margin-bottom: 20px;
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
