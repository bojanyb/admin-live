<template>
  <div class="app-container">
    <menuComp
      ref="menuComp"
      :menuList="menuList"
      v-model="tabIndex"
      @tabChange="tabChange"
    ></menuComp>
    <tableList :cfgs="cfgs" ref="tableList" :isHidePage="true"></tableList>
  </div>
</template>

<script>
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
    tableList,
    menuComp,
  },
  data() {
    return {
      menuList: [
        {
          name: "五一榜单排名",
        },
      ],
      tabIndex: "0",
    };
  },
  computed: {
    cfgs() {
      return {
        vm: this,
        url: REQUEST.activity.getLabourRankingList,
        columns: [
          {
            label: "排名",
			width: "180px",
            prop: "ranking",
          },
          {
            label: "派对ID",
			width: "180px",
            prop: "room_number",
          },
          {
            label: "公会ID",
			width: "180px",
            prop: "guild_number",
          },
          {
            label: "礼物总价值",
			width: "180px",
            render: (h, params) => {
              return h("span", params.row.value);
            },
          },
        ],
      };
    },
  },
  mounted() {},
  methods: {
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
.share-table-list-box{
	width: 720px;
}
</style>
