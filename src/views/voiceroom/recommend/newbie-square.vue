<template>
  <div class="recommend-box">

    <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>

  </div>
</template>

<script>
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
  components: {
    tableList,
  },
  mixins: [mixins],
  computed: {
    forms() {
      return [];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.userHistory.NewUserStat,
        columns: [
          {
            label: "注册时间",
            width: "180px",
            prop: "create_time"
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
            label: "充值金额",
            prop: "recharge",
          },
          {
            label: "消费金额",
            prop: "consume",
          },
        ],
      };
    },
  },
  data() {
    return {
      searchParams: {
        query_id: 0
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
      let s = { ...this.searchParams };
      return {
        page: params.page,
        pagesize: params.size,
        query_id: s.query_id,
      };
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
	  // table 返回数据
    saleAmunt(row) {
      if (+row.page === 1) {
        this.searchParams.query_id
        return false
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
