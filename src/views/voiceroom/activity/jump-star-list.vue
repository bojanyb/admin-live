<template>
  <div class="app-container">
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
    <el-card class="box-card" shadow="always" v-if="tabIndex === '0'">
      <div class="box-card-inner">
        <div>抽奖人数：{{ sumSource.user_count || 0 }}人</div>
        <div>抽奖次数：{{ sumSource.lottery_count || 0 }}次</div>
        <div>消费金额：{{ sumSource.lottery_cost_count || 0 }}钻石</div>
        <div>产出金额：{{ sumSource.lottery_output_count || 0 }}钻石</div>
        <div>利润值：{{ sumSource.profit_value || 0 }}钻石</div>
        <div>产出比：{{ sumSource.profit_margin || 0 }}%</div>
      </div>
    </el-card>
    <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
  </div>
</template>

<script>
// 引入api
import { getPoolNameV5,getRoundV5 } from "@/api/activity";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
export default {
  mixins: [mixins],
  components: {
    tableList,
    SearchPanel,
  },
  data() {
    return {
      giftNameList: [
        {
          id : 0,
          title: "全部"
        },
        {
          id : 1,
          title: "礼物"
        },
        {
          id : 2,
          title: "抽奖道具"
        }
      ], // 奖品类型
      lotteryTypeList: [], // 奖池类型
      roundList: [], // 轮次
      sumSource: {},
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "用户ID",
          isNum: true,
          linkage: true,
          placeholder: "请输入用户ID",
        },
        {
          name: "remark",
          type: "input",
          value: "",
          label: "奖品名称",
          linkage: true,
          placeholder: "请输入奖品名称",
        },
        {
          name: "gift_type",
          type: "select",
          value: "全部",
          keyName: "id",
          optionLabel: "title",
          label: "奖品类型",
          placeholder: "请选择",
          options: this.giftNameList,
		      clearable: true,
        },
        {
          name: "type",
          type: "select",
          value: "",
          keyName: "key",
          optionLabel: "value",
          label: "奖池类型",
          placeholder: "请选择",
          options: this.lotteryTypeList,
		      clearable: true,
					linkage: true,
          handler: {
						change: v => {
							this.getRoundSource(v)
						},
					}
        },
        {
          name: "round",
          type: "select",
          value: "全部",
          keyName: "round_number",
          optionLabel: "title",
          label: "奖池轮次",
          placeholder: "请选择",
          options: this.roundList,
		      clearable: true,
        },
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "时间选择",
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
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.activity.poolDetailV5,
        columns: [
          {
            label: "时间",
            width: "180px",
            render: (h, params) => {
                let create_time = params.row.create_time !== "" ? timeFormat(params.row.create_time * 1000) : "--";
                return  h('span', create_time ? create_time : '--')
            }
          },
          {
            label: "用户ID",
            prop: "user_number",
          },
          {
            label: "用户昵称",
            prop: "nickname",
          },
          {
            label: "奖品类型",
            prop: "type_desc",
          },
          {
            label: "奖品ID",
            prop: "gift_id",
          },
          {
            label: "奖品名称",
            prop: "remark",
          },
          {
            label: "抽奖消耗",
            prop: "lottery_cost",
          },
          {
            label: "奖品价值",
            prop: "gift_diamond",
          },
          {
            label: "利润值",
            render: (h, params) => {
              return h("span", params.row.profit);
            },
          },
        ],
      };
    },
  },
  mounted() {
    this.getPoolNameSource();
    this.getRoundSource();
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : s.start_time,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
        user_number: s.user_number,
        remark: s.remark,
        gift_type: s.gift_type == 0 || s.gift_type == "全部" ? '' : s.gift_type,
        type: s.type == 0 || s.type == "全部"?  '' : s.type,
        round: s.round == 0 || s.round == "全部" ? '' : s.round,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 设置时间段
    setDateTime(arr) {
      const date = arr ? { start_time: arr[0],end_time: arr[1]} : {};
      this.$set(this, "dateTimeParams", date);
    },
    // 清空日期选择
    emptyDateTime() {
      this.dateTimeParams = {};
    },
    // 重置
    reset() {
      this.searchParams = {};
      this.dateTimeParams = {};
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // table 返回数据
    saleAmunt(row) {
      this.sumSource = row.data;
    },
    // 获取奖池类型
    async getPoolNameSource() {
      let res = await getPoolNameV5();
      if (res.code == 2000) {
        this.lotteryTypeList = res.data.pool;
        let all = { key: 0, value: "全部" };
        this.lotteryTypeList.unshift(all);
      }
    },
    // 获取奖池类型
    async getRoundSource(type) {
      let params = {}
      if(type){
        params.type = type;
      }
      let res = await getRoundV5(params);
      if (res.code == 2000) {
        this.roundList = res.data.round;
        if(!type){
          let all = { round_number: 0, title: "全部" };
          this.roundList.unshift(all);
        }
      }
    },
  },
};
</script>
<style lang="scss">
.el-icon-circle-close {
  color: #ffffff;
}
.box-card {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  padding: 0px 30px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .el-card__body {
    width: 100%;
    padding: 0;
    .box-card-inner {
      display: flex;
      justify-content: space-around;
      div {
        font-size: 15px;
        color: #ffffff;
      }
    }
  }
}
</style>
