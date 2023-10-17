<template>
  <div>
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-add="true"
        @onReset="reset"
        @onSearch="onSearch"
        @add="add"
      ></SearchPanel>
    </div>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 新增 - 编辑组件 -->
    <editComp
      ref="editComp"
      v-if="isDestoryComp"
      @destoryComp="destoryComp"
      :type="2"
      @getList="getList"
    ></editComp>
  </div>
</template>

<script>
// 引入冻结组件
import blocked from "./blocked.vue";
// 引入api
import {
  updatePartyFreeze,
  updatePartyReplace,
  updatePartyDisband,
  getGuildType,
  adminUserList,
} from "@/api/videoRoom";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入详情组件
import editComp from "./editComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "guild-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    editComp,
    blocked,
  },
  data() {
    return {
      isDestoryComp: false,
      guildParams: {},
      status: null,
      ruleForm: {},
      guildTypeList: [],
      operatorList: [],
      isAuth: 0,
    };
  },
  computed: {
    forms() {
      let arr = [
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          isNum: true,
          placeholder: "请输入公会ID",
        },
        {
          name: "status",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "公会状态",
          placeholder: "请选择",
          options: MAPDATA.GUILDSTATUS,
        },
        {
          name: "operator",
          type: "select",
          value: "",
          keyName: "id",
          optionLabel: "username",
          label: "公会运营",
          placeholder: "请选择",
          options: this.operatorList,
        },
      ];

      let arr1 = [
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          isNum: true,
          placeholder: "请输入公会ID",
        },
        {
          name: "status",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "公会状态",
          placeholder: "请选择",
          options: MAPDATA.GUILDSTATUS,
        },
      ];
      return this.isAuth ? arr : arr1;
    },
    cfgs() {
      //  存在公司主体
      const isMainArr = [
        {
          label: "创建时间",
          width: "160px",
          render: (h, params) => {
            return h(
              "span",
              params.row.create_time
                ? timeFormat(params.row.create_time, "YYYY-MM-DD HH:mm:ss", true)
                : "无"
            );
          },
        },
        {
          label: "公会ID",
          width: "100px",
          prop: "guild_number",
        },
        {
          label: "公会名称",
          width: "100px",
          prop: "name",
        },
        {
          label: "公会长",
          width: "130px",
          prop: "guild_user_nickname",
        },
        {
          label: "公会运营",
          render: (h, params) => {
            let data = this.operatorList.find((item) => {
              return item.id === params.row.operator;
            });
            return h("span", data ? data.username : "未知");
          },
        },
        {
          label: "公司主体",
          width: "120px",
          prop: "company",
          render: (h, params) => {
            return h("span", params.row.company ? params.row.company : "--");
          },
        },
        {
          label: "主播人数",
          width: "100px",
          prop: "user_count",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [h("span", params.row.user_count + "人")]);
          },
        },
        {
          label: "昨日流水",
          width: "130px",
          prop: "yestoday_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                (params.row.yestoday_flow ? params.row.yestoday_flow : 0) + "钻石"
              ),
            ]);
          },
        },
        {
          label: "今日流水",
          width: "130px",
          prop: "today_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.today_flow + "钻石"),
              h(
                "div",
                {
                  class: `${
                    params.row.day_growth < 0 ? "el-icon-bottom" : "el-icon-top"
                  }`,
                  style: {
                    display: params.row.day_growth > 0 ? "unset" : "none",
                    color: `${params.row.day_growth > 0 ? "#F56C6C" : "#67C23A"}`,
                  },
                },
                `${params.row.day_growth}%`
              ),
            ]);
          },
        },
        {
          label: "上周流水",
          width: "130px",
          prop: "last_week",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [h("span", `${params.row.last_week + "钻石"}`)]);
          },
        },
        {
          label: "本周流水",
          width: "130px",
          prop: "week_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.week_flow + "钻石"),
              h(
                "div",
                {
                  class: `${
                    params.row.week_growth < 0 ? "el-icon-bottom" : "el-icon-top"
                  }`,
                  style: {
                    display: params.row.week_growth > 0 ? "unset" : "none",
                    color: `${params.row.week_growth > 0 ? "#F56C6C" : "#67C23A"}`,
                  },
                },
                `${params.row.week_growth}%`
              ),
            ]);
          },
        },
        {
          label: "上月流水",
          width: "130px",
          prop: "last_month",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [h("span", `${params.row.last_month + "钻石"}`)]);
          },
        },
        {
          label: "本月流水",
          width: "130px",
          prop: "month_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.month_flow + "钻石"),
              h(
                "div",
                {
                  class: `${
                    params.row.month_growth < 0 ? "el-icon-bottom" : "el-icon-top"
                  }`,
                  style: {
                    display: params.row.month_growth > 0 ? "unset" : "none",
                    color: `${params.row.month_growth > 0 ? "#F56C6C" : "#67C23A"}`,
                  },
                },
                `${params.row.month_growth}%`
              ),
            ]);
          },
        },
        {
          label: "公会状态",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: params.row.status == 1 ? "unset" : "none",
                    color: params.row.status == 1 ? "#67C23A" : "",
                  },
                },
                params.row.status == 1 ? "正常" : ""
              ),
              h(
                "span",
                {
                  style: {
                    display: params.row.status == 2 ? "unset" : "none",
                    color: params.row.status == 2 ? "#E6A23C" : "",
                  },
                },
                params.row.status == 1 ? "" : "已冻结"
              ),
              h(
                "span",
                {
                  style: {
                    display: params.row.status == 3 ? "unset" : "none",
                    color: params.row.status == 3 ? "#F56C6C" : "",
                  },
                },
                params.row.status == 1 ? "" : "已解散"
              ),
            ]);
          },
        },
        {
          label: "操作",
          width: "300px",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: { type: "primary", size: "small" },
                  style: {
                    display:
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyReplace")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.change(params.row);
                    },
                  },
                },
                "更换会长"
              ),
              h(
                "el-button",
                {
                  props: { type: "primary", size: "small" },
                  style: {
                    display:
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyInfo")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.update(params.row);
                    },
                  },
                },
                "修改"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger", size: "small" },
                  style: {
                    display:
                      params.row.status === 1 &&
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyFreeze")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.freezeFunc(2, params.row);
                    },
                  },
                },
                "冻结"
              ),
              h(
                "el-button",
                {
                  props: { type: "success", size: "small" },
                  style: {
                    display:
                      params.row.status === 2 &&
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyFreeze")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.freezeFunc(1, params.row);
                    },
                  },
                },
                "解冻"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger", size: "small" },
                  style: {
                    display:
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyDisband")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.deleteParams(params.row);
                    },
                  },
                },
                "解散"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger", size: "small" },
                  style: { display: params.row.status == 3 ? "unset" : "none" },
                },
                "已解散"
              ),
            ]);
          },
        },
      ];

      const arr = [
        {
          label: "创建时间",
          width: "160px",
          render: (h, params) => {
            return h(
              "span",
              params.row.create_time
                ? timeFormat(params.row.create_time, "YYYY-MM-DD HH:mm:ss", true)
                : "无"
            );
          },
        },
        {
          label: "公会ID",
          width: "100px",
          prop: "guild_number",
        },
        {
          label: "公会名称",
          width: "100px",
          prop: "name",
        },
        {
          label: "公会长",
          width: "130px",
          prop: "guild_user_nickname",
        },
        {
          label: "公会运营",
          render: (h, params) => {
            let data = this.operatorList.find((item) => {
              return item.id === params.row.operator;
            });
            return h("span", data ? data.username : "未知");
          },
        },
        {
          label: "主播人数",
          width: "100px",
          prop: "user_count",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [h("span", params.row.user_count + "人")]);
          },
        },
        {
          label: "昨日流水",
          width: "130px",
          prop: "yestoday_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                (params.row.yestoday_flow ? params.row.yestoday_flow : 0) + "钻石"
              ),
            ]);
          },
        },
        {
          label: "今日流水",
          width: "130px",
          prop: "today_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.today_flow + "钻石"),
              h(
                "div",
                {
                  class: `${
                    params.row.day_growth < 0 ? "el-icon-bottom" : "el-icon-top"
                  }`,
                  style: {
                    marginLeft: "2px",
                    display: params.row.day_growth > 0 ? "unset" : "none",
                    color: `${params.row.day_growth > 0 ? "#F56C6C" : "#67C23A"}`,
                  },
                },
                `${params.row.day_growth}%`
              ),
            ]);
          },
        },
        {
          label: "上周流水",
          width: "130px",
          prop: "last_week",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [h("span", `${params.row.last_week + "钻石"}`)]);
          },
        },
        {
          label: "本周流水",
          width: "130px",
          prop: "week_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.week_flow + "钻石"),
              h(
                "div",
                {
                  class: `${
                    params.row.week_growth < 0 ? "el-icon-bottom" : "el-icon-top"
                  }`,
                  style: {
                    marginLeft: "2px",
                    display: params.row.week_growth > 0 ? "unset" : "none",
                    color: `${params.row.week_growth > 0 ? "#F56C6C" : "#67C23A"}`,
                  },
                },
                `${params.row.week_growth}%`
              ),
            ]);
          },
        },
        {
          label: "上月流水",
          width: "130px",
          prop: "last_month",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [h("span", `${params.row.last_month + "钻石"}`)]);
          },
        },
        {
          label: "本月流水",
          width: "130px",
          prop: "month_flow",
          sortable: "custom",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.month_flow + "钻石"),
              h(
                "div",
                {
                  class: `${
                    params.row.month_growth < 0 ? "el-icon-bottom" : "el-icon-top"
                  }`,
                  style: {
                    marginLeft: "2px",
                    display: params.row.month_growth > 0 ? "unset" : "none",
                    color: `${params.row.month_growth > 0 ? "#F56C6C" : "#67C23A"}`,
                  },
                },
                `${params.row.month_growth}%`
              ),
            ]);
          },
        },
        {
          label: "公会状态",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: params.row.status == 1 ? "unset" : "none",
                    color: params.row.status == 1 ? "#67C23A" : "",
                  },
                },
                params.row.status == 1 ? "正常" : ""
              ),
              h(
                "span",
                {
                  style: {
                    display: params.row.status == 2 ? "unset" : "none",
                    color: params.row.status == 2 ? "#E6A23C" : "",
                  },
                },
                params.row.status == 1 ? "" : "已冻结"
              ),
              h(
                "span",
                {
                  style: {
                    display: params.row.status == 3 ? "unset" : "none",
                    color: params.row.status == 3 ? "#F56C6C" : "",
                  },
                },
                params.row.status == 1 ? "" : "已解散"
              ),
            ]);
          },
        },
        {
          label: "操作",
          width: "300px",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: { type: "primary", size: "small" },
                  style: {
                    display:
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyReplace")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.change(params.row);
                    },
                  },
                },
                "更换会长"
              ),
              h(
                "el-button",
                {
                  props: { type: "primary", size: "small" },
                  style: {
                    display:
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyInfo")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.update(params.row);
                    },
                  },
                },
                "修改"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger", size: "small" },
                  style: {
                    display:
                      params.row.status === 1 &&
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyFreeze")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.freezeFunc(2, params.row);
                    },
                  },
                },
                "冻结"
              ),
              h(
                "el-button",
                {
                  props: { type: "success", size: "small" },
                  style: {
                    display:
                      params.row.status === 2 &&
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyFreeze")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.freezeFunc(1, params.row);
                    },
                  },
                },
                "解冻"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger", size: "small" },
                  style: {
                    display:
                      params.row.status !== 3 &&
                      this.permissionArr.includes("Guild@updatePartyDisband")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.deleteParams(params.row);
                    },
                  },
                },
                "解散"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger", size: "small" },
                  style: { display: params.row.status == 3 ? "unset" : "none" },
                },
                "已解散"
              ),
            ]);
          },
        },
      ];

      return {
        vm: this,
        url: REQUEST.guild.list,
        columns: this.permissionArr.includes("Guild@updatePartyReplace")
          ? isMainArr
          : arr,
      };
    },
  },
  created() {
    this.getTypeList();
    this.getAdminUserList();
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        guild_number: s.guild_number,
        status: s.status,
        operator: s.operator,
        guild_type: 2,
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
    // 新增
    add() {
      this.load("add");
    },
    // 修改
    update(row) {
      this.load("update", row);
    },
    load(status, row) {
      // 模拟数据 区分新增修改弹框类型
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.editComp.loadParams(status, row);
      }, 50);
    },
    // 更换会长
    change(row) {
      this.$prompt("会长ID", "更换会长", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // inputPattern: /^d+$/,
        inputErrorMessage: "会长ID格式不正确",
      })
        .then(({ value }) => {
          let params = {
            id: row.id,
            guild_number: value,
            name: row.name,
            guild_type: row.guild_type,
            status: row.status,
            rebate: row.rebate,
          };
          this.methodUpdatePartyReplace(params, "更换会长");
        })
        .catch(() => {});
    },
    // 解散公会
    async deleteParams(row) {
      let title = "确认解散 [ " + row.name + " ] 吗？";
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
            guild_number: row.guild_number,
            name: row.name,
            guild_type: row.guild_type,
            status: 3,
            rebate: row.rebate,
          };
          this.methodUpdatePartyDisband(params, "解散公会");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 冻结 - 解除冻结操作
    async freezeFunc(status, row) {
      this.status = status;
      this.ruleForm = row;
      if (status === 2) {
        // 冻结
        let title = "确认冻结 [ " + row.name + " ] 吗？";
        this.$confirm(title, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let params = {
              id: row.id,
              guild_number: row.guild_number,
              name: row.name,
              guild_type: row.guild_type,
              status: status,
              rebate: row.rebate,
            };
            this.methodUpdatePartyFreeze(params, "冻结公会");
          })
          .catch(() => {});
      } else {
        // 解冻
        let params = {
          id: row.id,
          guild_number: row.guild_number,
          name: row.name,
          guild_type: row.guild_type,
          status: status,
          rebate: row.rebate,
        };
        this.methodUpdatePartyFreeze(params, "解冻公会");
      }
    },

    // 冻结/解冻
    async methodUpdatePartyFreeze(params, text) {
      let res = await updatePartyFreeze(params);
      if (res.code === 2000) {
        this.$success(text + "成功");
        this.getList();
      }
    },

    // 更换公会长
    async methodUpdatePartyReplace(params, text) {
      let res = await updatePartyReplace(params);
      if (res.code === 2000) {
        this.$success(text + "成功");
        this.getList();
      }
    },

    // 解散
    async methodUpdatePartyDisband(params, text) {
      let res = await updatePartyDisband(params);
      if (res.code === 2000) {
        this.$success(text + "成功");
        this.getList();
      }
    },

    // 获取公会类型
    async getTypeList() {
      const response = await getGuildType();
      if (response.code === 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data.list) ? response.data.list : []
        );
        this.guildTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.remark,
              value: curr.type,
            });
            return prev;
          }, []) || [];
      }
    },
    // 公会运营
    async getAdminUserList() {
      let res = await adminUserList();
      if (res.code === 2000) {
        this.operatorList = res.data.list;
        this.isAuth = res.data.is_auth;
        let all = { username: "全部", id: "" };
        this.operatorList.unshift(all);
      }
    },
  },
};
</script>

<style lang="scss" scoped="scoped"></style>
