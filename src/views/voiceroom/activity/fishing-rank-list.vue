<template>
  <div class="app-container">
    <div class="searchParams" v-if="tabIndex == '0'">
      <SearchPanel v-model="searchParams" :show-reset="true" :show-search-btn="true" @onReset="reset"
        @onSearch="onSearch"></SearchPanel>
    </div>
    <tableList :cfgs="cfgs" ref="tableList" :isHidePage="true"></tableList>
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
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
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
      tabIndex: "0",
    };
  },
  computed: {
    cfgs() {
      const columnsList = [{
          label: "时间",
          prop: "create_time",
        },{
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
      return {
        vm: this,
        url: REQUEST.activity.luckyListV5,
        columns: columnsList,
      };
    },
  },
  mounted() {
    this.getList();
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
