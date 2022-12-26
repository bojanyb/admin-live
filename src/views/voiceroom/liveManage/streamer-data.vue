<!-- 售卖记录 -->
<template>
  <div class="sell-box">
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

export default {
  components: {
    tableList,
    SearchPanel,
  },
  mixins: [mixins],
  computed: {
    forms() {
      return [
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "主播ID",
          isNum: true,
          placeholder: "请输入主播ID",
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
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "时间选择",
          value: "",
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
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.live.anchorData,
        columns: [
          {
            label: "主播ID",
            render: (h, params) => {
              return h("span", params.row.user_number);
            },
          },
          {
            label: "主播昵称",
            render: (h, params) => {
              return h("span", params.row.user_nickname);
            },
          },
          {
            label: "所属公会",
            render: (h, params) => {
              return h("div", [
                h("div", `${params.row.guild_name || "--"}`),
                h("div", `${params.row.guild_number}`),
              ]);
            },
          },
          {
            label: "直播有效天数",
            render: (h, params) => {
              return h("span", params.row.e_times);
            },
          },
          {
            label: "直播时长",
            render: (h, params) => {
              return h("span", params.row.l_long);
            },
          },
          {
            label: "直播场次",
            render: (h, params) => {
              return h("span", params.row.l_times);
            },
          },
          {
            label: "主播流水",
            render: (h, params) => {
              return h("span", params.row.a_total);
            },
          },
          {
            label: "房间流水",
            render: (h, params) => {
              return h("span", params.row.r_total);
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
      searchParams: {
          guild_number: '',
          user_number: '',
      }
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
      let data = {
          guild_number: s.guild_number,
          user_number: s.user_number,
          start_time: Math.floor(s.start_time / 1000),
          end_time: Math.floor(s.end_time / 1000),
      }
      return {
        page: params.page,
        pagesize: params.size,
        ...data
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
    update(row) {
      this.load("update", row);
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
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
  },
};
</script>

<style lang="scss">
.sell-box {
  padding: 20px;
  box-sizing: border-box;
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
