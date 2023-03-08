<template>
  <div class="recommend-box">
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

    <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
  </div>
</template>

<script>
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  components: {
    SearchPanel,
    tableList,
  },
  mixins: [mixins],
  computed: {
    forms() {
      return [
        {
          name: "is_online",
          type: "select",
          value: 1,
          keyName: "value",
          optionLabel: "name",
          label: "在线状态",
          placeholder: "请选择在线状态",
          options: this.onlineList,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.userHistory.NewUserStat,
        columns: [
          {
            label: "注册时间",
            width: "180px",
            prop: "create_time",
          },
          {
            label: "ID",
            render: (h, params) => {
              return h("span", params.row.user_number || "无");
            },
          },
          {
            label: "用户名字",
            render: (h, params) => {
              return h("span", params.row.nickname || "无");
            },
          },
          {
            label: "性别",
            prop: "sex",
            render: (h, params) => {
              let data = MAPDATA.SEXLIST.find((item) => {
                return item.value === params.row.sex;
              });
              return h("span", data ? data.name : "未知");
            },
          },
          {
            label: "地区",
            prop: "addr",
          },
          {
            label: "在线状态",
            prop: "is_online",
            render: (h, params) => {
              let data = this.onlineList.find((item) => {
                return item.value === params.row.is_online;
              });
              return h("span", data ? data.name : "未知");
            },
          },
          {
            label: "充值金额",
            prop: "recharge",
            sortable: true,
          },
          {
            label: "消费金额",
            prop: "consume",
            sortable: true,
          },
        ],
      };
    },
  },
  data() {
    return {
      onlineList: [
        {
          name: "在线",
          value: 1
        },
        {
          name: "离线",
          value: 0
        }
      ],
      searchParams: {
        query_id: 0,
        is_online: 1,
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
      let s = { ...this.searchParams };
      return {
        page: params.page,
        pagesize: params.size,
        query_id: s.query_id,
        is_online: s.is_online
      };
    },
    // 重置
    reset() {
      this.searchParams = {
        is_online: 1,
      };
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // table 返回数据
    saleAmunt(row) {
      if (+row.page === 1) {
        this.searchParams.query_id;
        return false;
      }
      this.searchParams.query_id = row.query_id;
    },
  },
};
</script>

<style lang="scss">
.recommend-box {
  padding: 20px;
  box-sizing: border-box;
  .btnBox {
    margin-bottom: 20px;
  }
}
</style>
