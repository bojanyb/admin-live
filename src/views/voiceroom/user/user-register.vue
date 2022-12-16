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
    <div class="tableList">
      <tableList :cfgs="cfgs" ref="tableList"></tableList>
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
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";

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
        {
          name: "phone_uuid",
          type: "input",
          value: "",
          label: "设备ID",
          placeholder: "请输入设备ID",
        },
        {
          name: "login_ip",
          type: "input",
          value: "",
          label: "登录IP",
          placeholder: "请输入登录IP",
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
        url: REQUEST.user.loginLog,
        columns: [
          {
            label: "登录时间",
            render: (h, params) => {
              return h(
                "span",
                params.row.login_time
                  ? timeFormat(
                      params.row.login_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : ""
              );
            },
          },
          {
            label: "用户",
            render: (h, params) => {
              return h(
                "span",
                `${params.row.nickname}(${params.row.user_number})`
              );
            },
          },
          {
            label: "登录设备",
            render: (h, params) => {
              let data = [
                { name: "安卓", value: 10 },
                { name: "苹果", value: 20 },
              ].find((item) => {
                return item.value === params.row.phone_type;
              });
              return h("span", data ? data.name : "--");
            },
          },
          {
            label: "登录设备ID",
            prop: "phone_uuid",
          },
          {
            label: "登录IP地址",
            prop: "login_ip",
          },
          {
            label: "登录IP属地",
            prop: "ip_addr",
          },
        ],
      };
    },
  },
  data() {
    return {
      searchParams: {
        user_number: "",
        phone_uuid: "",
        login_ip: "",
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
        pagesize: params.size,
        user_number: s.user_number,
        phone_uuid: s.phone_uuid,
        login_ip: s.login_ip,
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
}
</style>
