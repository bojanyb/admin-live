<template>
  <div class="nobility-privilege-box">
    <SearchPanel
      v-model="searchParams"
      :forms="forms"
      :show-reset="true"
      :show-search-btn="true"
      @onReset="reset"
      @onSearch="onSearch"
    ></SearchPanel>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 用户详情组件 -->
    <userComp ref="userComp"></userComp>

    <!-- 贵族状态清单、成长值清单组件 -->
    <LogComp
      ref="LogComp"
      v-if="isDestoryComp"
      :dialogType="dialogType"
      @destoryComp="destoryComp"
    />
  </div>
</template>

<script>
// 引入详情组件
import userComp from "./components/userComp.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入贵族状态清单、成长值清单组件
import LogComp from "./components/LogComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    userComp,
    LogComp,
  },
  data() {
    return {
      searchParams: {
        sort_field: "id",
      },
      dialogType: 1, //1-成长值清单,2-贵族状态清单
      tableData: [],
      isDestoryComp: true, // 是否销毁组件
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
          placeholder: "请输入用户ID",
        },
        // {
        //   name: "sort_field",
        //   type: "select",
        //   value: "id",
        //   keyName: "value",
        //   optionLabel: "name",
        //   label: "排序",
        //   placeholder: "请选择",
        //   options: MAPDATA.NOBILITYUSERSORTLIST,
        // },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.nobility.nobleUser,
        columns: [
          {
            label: "用户昵称",
            prop: "nickname",
          },
          {
            label: "用户ID",
            prop: "user_number",
          },
          {
            label: "已累计成长值",
            prop: "heap_value",
          },
          {
            label: "魅力成长值",
            render: (h, params) => {
              return h(
                "span",
                params.row.gain_value
                  ? Number(params.row.gain_value)
                  : params.row.gain_value
              );
            },
          },
          {
            label: "财富成长值",
            render: (h, params) => {
              return h(
                "span",
                params.row.recharge_value
                  ? Number(params.row.recharge_value)
                  : params.row.recharge_value
              );
            },
          },
          {
            label: "开通时间",
            render: (h, params) => {
              return h(
                "span",
                params.row.last_create_time
                  ? timeFormat(
                      params.row.last_create_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : ""
              );
            },
          },
          {
            label: "到期时间",
            render: (h, params) => {
              return h("span", params.row.end_time || "无");
            },
          },
          {
            label: "当前成长值",
            prop: "growth_value",
            render: (h, params) => {
              return h(
                "span",
                {
                  style: { color: "#1890ff" },
                  on: {
                    click: () => {
                      this.openDialog(params.row),
                      this.dialogType = 1;
                    },
                  },
                },
                params.row.growth_value
                  ? Number(params.row.growth_value)
                  : params.row.growth_value
              );
            },
          },
          {
            label: "账号状态",
            prop: "user_status",
          },
          {
            label: "贵族状态",
            prop: "noble_status",
          },
          {
            label: "当前贵族等级",
            prop: "noble_grade_name",
            render: (h, params) => {
              return h(
                "span",
                {
                  style: { color: "#1890ff" },
                  on: {
                    click: () => {
                      this.openDialog(params.row),
                      this.dialogType = 2;
                    },
                  },
                },
                params.row.noble_grade_name
              );
            },
          },
          // {
          // 	label: '剩余保级天数',
          // 	prop: 'hold_day'
          // }
        ],
      };
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        sort_field: s.sort_field,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {
        sort_field: "id",
      };
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 设置房间分类
    openDialog(row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.LogComp.init(row);
      }, 50);
    },
  },
};
</script>
<style lang="scss">
.nobility-privilege-box {
  padding: 20px;
  box-sizing: border-box;
}
</style>
