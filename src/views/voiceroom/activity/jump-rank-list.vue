<template>
  <div class="app-container">
    <div class="searchParams" v-if="tabIndex == '0'">
      <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset"
        @onSearch="onSearch"></SearchPanel>
    </div>
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
    <tableList :cfgs="cfgs" ref="tableList" :isHidePage="true"></tableList>
  </div>
</template>

<script>
// 引入api
import { luckyConfigV5 } from "@/api/activity";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";

export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    menuComp,
  },
  data() {
    return {
      menuList: [
        {
          id: 1,
          name: "周榜单排名",
        },
        {
          id: 2,
          name: "总榜单排名",
        },
      ],
      roundList: [],
      tabIndex: "0",
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "round",
          type: "select",
          value: "第一周",
          keyName: "round",
          optionLabel: "title",
          label: "周排名筛选",
          placeholder: "请选择",
          options: this.roundList,
        },
      ];
    },
    cfgs() {
      let columnsList = [];
      let arr1 = [
        {
          label: "时间",
          prop: "create_time",
        }];
      let arr2 = [{
        label: "轮次",
        prop: "round",
      }];
      let arr3 = [
        {
          label: "榜单",
          prop: "title",
        },
        {
          label: "排名",
          prop: "no",
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
          label: "礼物数量(>= 9900钻石)",
          prop: "big_number",
        },
        {
          label: "礼物总价值",
          render: (h, params) => {
            return h("span", params.row.big_value);
          },
        }];
      if (Number(this.tabIndex) == 0) {
        columnsList = arr1.concat(arr2).concat(arr3);
      } else {
        columnsList = arr1.concat(arr3);
      }
      return {
        vm: this,
        url: REQUEST.activity.luckyListV5,
        columns: columnsList,
      };
    },
  },
  mounted() {
    this.getLuckyConfig();
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      let source = {
        page: params.page,
        pagesize: params.size,
      }
      if (Number(this.tabIndex) == 0) {
        source.round = s.round ? s.round : 1;
      }
      return source;
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {};
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 菜单切换
    tabChange() {
      if (this.$refs.tableList) {
        this.$refs.tableList.getData();
      }
    },
    // 获取奖池类型
    async getLuckyConfig() {
      let res = await luckyConfigV5();
      if (res.code == 2000) {
        this.roundList = res.data.list;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
