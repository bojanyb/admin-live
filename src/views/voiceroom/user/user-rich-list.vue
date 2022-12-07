<template>
  <div class="app-container">
    <div class="doc-card">
      <div class="doc-card-inner">
        <div
          class="doc-card-info"
          v-infinite-scroll="onLoad"
          infinite-scroll-disabled="disabled"
          infinite-scroll-distance="20"
        >
          <el-card v-for="item in list" style="margin-bottom: 10px">
            <div class="info-inner">
              <el-avatar :src="item.face"></el-avatar>
              <div class="info-detail">
                <div class="info-title">{{ item.nickname }}</div>
                <div class="info-dec">
                  在{{ item.create_time | timeFormatMethod }}财富等级升级到{{
                    item.level
                  }}级
                </div>
              </div>
            </div>
          </el-card>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
        <div class="doc-card-table">
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
          <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supperUList } from "@/api/user.js";
import { throttle } from "lodash";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
import moment from "moment";

export default {
  name: "user-not-logOut-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
  },
  filters: {
    timeFormatMethod(val) {
      const timeVal = val * 1000;
      return moment(timeVal).format("YYYY-MM-DD HH:mm:ss");
    },
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
          placeholder: "请输入用户ID",
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.user.supperUList,
        columns: [
          {
            label: "成为大R时间",
            render: (h, params) => {
              return h(
                "span",
                params.row.create_time
                  ? timeFormat(
                      params.row.create_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : "无"
              );
            },
          },
          {
            label: "用户",
            render: (h, params) => {
              return h("div", [
                h("span", `${params.row.nickname}`),
                h("span", `(${params.row.user_number})`),
              ]);
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
        dateTimeParams: [],
      },
      dateTimeParams: {
        start_time: null,
        end_time: null,
      },
      list: [],
      loading: false,
      noMore: false,
      disabled: false,
      infoParams: {
        size: 10,
        page: 1,
      },
    };
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : "",
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : "",
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
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
    onLoad() {
      this.getInfoList();
    },
    // 获取大R用户列表
    getInfoList: throttle(async function () {
      if (this.loading || this.noMore) {
        return false;
      }

      this.disabled = true;
      const res = await supperUList({ ...this.infoParams, level: 20 });
      this.loading = false;

      if (+res.code !== 2000) {
        this.$message.error("请求失败");
        this.infoParams.page = 1;
        this.noMore = false;
        this.list = [];
        return false;
      }

      if (res.data.list.length > 0) {
        this.noMore = false;
        this.disabled = false;
        const list = (res.data && res.data.list) || [];
        this.list = [...this.list, ...list];

        if (this.list.length < res.data.count) {
          this.infoParams.page++;
        } else {
          this.noMore = true;
          this.disabled = true;
        }
      } else {
        this.noMore = true;
        this.disabled = true;
      }
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
.doc-card {
  height: 100%;
  .doc-card-inner {
    display: flex;
    .doc-card-info {
      height: calc(100vh - 130px);
      min-width: 436px;
      flex: 1;
      border: 1px solid #eff2f5;
      border-radius: 10px;
      padding: 24px;
      margin-right: 10px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        height: 10px;
        width: 10px;
        background: #e8e8e8;
      }

      &::-webkit-scrollbar-thumb {
        background: #c7c7c7;
        border-radius: 5px;
      }

      .info-inner {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
      .info-detail {
        .info-title {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 10px;
          color: #58727e;
        }
        .info-dec {
          color: #969799;
          font-size: 14px;
        }
      }
      p {
        text-align: center;
        color: #969799;
      }
    }
    .doc-card-table {
      height: calc(100vh - 130px);
      width: 100%;
      flex: 2;
      border: 1px solid #eff2f5;
      border-radius: 10px;
      padding: 24px;
      overflow-x: auto;
      &::-webkit-scrollbar {
        height: 10px;
        width: 10px;
        background: #e8e8e8;
      }

      &::-webkit-scrollbar-thumb {
        background: #c7c7c7;
        border-radius: 5px;
      }
    }
  }
}
</style>
