<template>
  <div class="app-container">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-export="true"
        @onReset="reset"
        @onSearch="onSearch"
        @export="handleExport"
        customType="danger"
      ></SearchPanel>
    </div>
    <tableList :cfgs="cfgs" ref="tableList"></tableList>
  </div>
</template>

<script>
import { getUserCancellationDeal, indexV2Export } from "@/api/videoRoom";
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
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  name: "user-not-logOut-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
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
        {
          name: "status",
          type: "select",
          value: 0,
          keyName: "value",
          optionLabel: "name",
          label: "注销状态",
          placeholder: "请选择",
          options: MAPDATA.LOGOUTSTATUS,
        },
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "时间选择",
          value: "",
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
        url: REQUEST.logout.listV2,
        columns: [
          {
            label: "注销时间",
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
            label: "用户ID",
            prop: "user_number",
          },
          {
            label: "用户昵称",
            prop: "nickname",
          },
          {
            label: "用户角色",
            prop: "role_name",
          },
          {
              label: '所属公会',
              minWidth: '100px',
              render: (h, params) => {
                  return h('div', [
                      h('div', params.row.guild_name),
                      h('div', params.row.guild_number || '-'),
                  ])
              }
          },
          {
            label: "等级",
            render: (h, params) => {
              return h("div", [
                h("span", `用户:${params.row.user_rank}`),
                h("span", `主播:${params.row.live_rank}`),
              ]);
            },
          },
          {
            label: "注销状态",
            render: (h, params) => {
              let data = MAPDATA.LOGOUTUNTREATEDSTATUSLIST.find((item) => {
                return params.row.status === item.value;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "操作",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    style: {
                      display: params.row.status === 0 ? "unset" : "none",
                    },
                    on: {
                      click: () => {
                        this.passFunc(params.row.id, 1);
                      },
                    },
                  },
                  "通过"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "danger" },
                    style: {
                      display: params.row.status === 0 ? "unset" : "none",
                    },
                    on: {
                      click: () => {
                        this.reject(params.row.id, 2);
                      },
                    },
                  },
                  "拒绝"
                ),
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
        status: 0,
        user_number: "",
        dateTimeParams: [],
      },
      dateTimeParams: {
        start_time: null,
        end_time: null,
      },
      searchParams: {
        status: 0
      }
    };
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        status: s.status,
        user_number: s.user_number,
        start_time: s.start_time
          ? Math.floor(s.start_time / 1000)
          : '',
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : '',
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {
        status: 0,
      };
      this.dateTimeParams = {}
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 通过
    passFunc(id, status) {
      this.$confirm("确定通过当前操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await getUserCancellationDeal({ id, status });
          if (res.code === 2000) {
            this.$message({
              type: "success",
              message: "处理成功",
            });
          }
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 拒绝
    async reject(id, status) {
      this.$confirm("确定拒绝当前操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await getUserCancellationDeal({ id, status });
          if (res.code === 2000) {
            this.$message({
              type: "success",
              message: "拒绝成功",
            });
          }
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
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
    async handleExport() {
      let s = this.beforeSearch();
      const search = this.$refs.tableList.search;
      s.page = search ? search.page : null;
      s.pagesize = search ? search.size : null;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let res = await indexV2Export(s);
      try {
        let URL = res.data.url;
        let link = document.createElement("a");
        link.href = URL;
        link.download = "用户注销"; //加上下载的文件名
        if (URL.indexOf("?") === -1) {
          URL += "?download";
        }
        link.click();
        link.remove();
        loading.close();
      } catch (error) {
        console.log(error);
        loading.close();
      }
    },
  },
};
</script>

<style></style>
