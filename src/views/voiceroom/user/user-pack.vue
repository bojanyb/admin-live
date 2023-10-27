<!-- 使用记录 -->
<template>
  <div class="shop-box">
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
    <el-row :gutter="4">
      <el-col :span="8">
        <el-card>
          <div class="tableList">
            <div class="title">礼物背包</div>
            <tableList :cfgs="cfgs" isSmall ref="tableList"></tableList>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="tableList">
            <div class="title">特效背包</div>
            <tableList :cfgs="cfgs1" isSmall ref="tableList1"></tableList>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="tableList">
            <div class="title">靓号背包</div>
            <tableList :cfgs="cfgs2" isSmall ref="tableList2"></tableList>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
          label: "用户ID",
          placeholder: "请输入用户ID",
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.user.userGiftBag,
        columns: [
          {
            label: "礼物",
            render: (h, params) => {
              return h(
                "span",
                `${params.row.gift_name}(${params.row.gift_id})`
              );
            },
          },
          {
            label: "单价",
            prop: "gift_diamond",
          },
          {
            label: "数量",
            prop: "number",
          },
        ],
      };
    },
    cfgs1() {
      return {
        vm: this,
        url: REQUEST.user.userGoods,
        columns: [
          {
            label: "特效",
            render: (h, params) => {
              return h(
                "span",
                `${params.row.goods_name}(${params.row.goods_id})`
              );
            },
          },
          {
            label: "时间",
            prop: "goods_leftTime",
            render: (h, params) => {
              let last_day;
              if (params.row.goods_leftTime) {
                last_day = `剩余${params.row.goods_leftTime}天`;
              } else {
                last_day = "--";
              }
              if (params.row.goods_leftTime + "" === "-1") {
                last_day = "永久";
              }
              return h("span", last_day ? last_day : "--");
            },
          },
        ],
      };
    },
    cfgs2() {
      return {
        vm: this,
        url: REQUEST.prettyNumber.usingLog,
        columns: [
          {
            label: "靓号",
            render: (h, params) => {
              return h("span", `${params.row.cate}(${params.row.number})`);
            },
          },
          {
            label: "时间",
            prop: "last_day",
            render: (h, params) => {
              let last_day =
                params.row.last_day !== ""
                  ? `剩余${params.row.last_day}天`
                  : "--";
              return h("span", last_day ? last_day : "--");
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      searchParams: {
        user_number: "",
        number: "",
        use_status: "",
      },
    };
  },
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
      this.$refs.tableList1.getData();
      this.$refs.tableList2.getData();
    },
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        number: s.number,
        use_status: s.use_status,
        start_time: Math.floor(s.start_time / 1000),
        end_time: Math.floor(s.end_time / 1000),
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
      this.searchParams = {
        category: 0,
        name: "",
      };
      this.dateTimeParams = {
        activity_type_id: 1,
      };
      this.getList();
    },
    // 重置
    onSearch() {
      this.getList();
    },
  },
};
</script>

<style lang="scss">
.shop-box {
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
  .tableList {
    min-height: calc(100vh - 230px);
    display: flex;
    flex-direction: column;
    .title {
      font-weight: 700;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
}
</style>
