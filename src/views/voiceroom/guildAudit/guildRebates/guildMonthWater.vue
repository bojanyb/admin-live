<template>
  <div class="guildMonth-list-box">
    <div class="model">
      <span>总条数：{{ ruleForm.count || 0 }}</span>
      <span
        >流水总计：{{ ruleForm.all_flow || ruleForm.total_flow || 0 }}
        <el-popover placement="bottom" width="400" trigger="hover">
          <el-table :data="gridData">
            <el-table-column
              property="date"
              label="参与统计的房间类型"
            ></el-table-column>
            <el-table-column
              property="name"
              label="不参与统计的房间类型"
            ></el-table-column>
          </el-table>
          <i class="icon-hover el-icon-question" slot="reference"></i>
        </el-popover>
      </span>
      <span
        >结算总计：{{
          ruleForm.all_settlement || ruleForm.total_settlement || 0
        }}</span
      >
    </div>

    <div class="searchParams">
      <div class="formBox">
        <div class="sunBox">
          <span>公会</span>
          <!-- <el-select v-model="form.guild_number" placeholder="请选择" @change="change">
						<el-option
						v-for="item in guildList"
						:key="item.guild_number"
						:label="item.nickname"
						:value="item.guild_number">
						</el-option>
					</el-select> -->
          <el-input
            v-model="form.guild_number"
            placeholder="请输入公会ID"
          ></el-input>
        </div>
        <div class="sunBox">
          <span>结算状态</span>
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in closeStatusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="sunBox" v-if="form.status !== 2">
          <span>时间</span>
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            @change="change"
          >
          </el-date-picker>
        </div>
        <div class="btnBox">
          <el-button class="seeBox" type="primary" @click="getList"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
          <el-button
            type="success"
            :loading="isBatchPassLoading"
            v-if="form.status === 1"
            @click="batchFunc(1)"
            >批量通过</el-button
          >
          <el-button
            type="danger"
            :loading="isBatchIgnoreLoading"
            v-if="form.status === 1"
            @click="batchFunc(2)"
            >批量忽略</el-button
          >
          <el-button type="danger" @click="BatchRurn()">导出EXCEL</el-button>
        </div>
      </div>
      <!-- <SearchPanel ref="SearchPanel" v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch" batch-func-name="批量返佣" :show-batch-pass="true" @batchPass="batchFunc"></SearchPanel> -->
    </div>

    <tableList
      :cfgs="cfgs"
      ref="tableList"
      layout="total, sizes, prev, pager, next, jumper"
      @saleAmunt="saleAmunt"
      @handleSizeChange="handleSizeChange"
    ></tableList>
    <!-- 详情组件 -->
    <lookComp ref="lookComp"></lookComp>
  </div>
</template>

<script>
// 引入公会列表接口
import { guildList } from "@/api/user";
// 引入api
import { doSettlement, settlementLog, guildWeekListV2 } from "@/api/videoRoom";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat, exportTableData } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入格式化时间包
import moment from "moment";
// 引入详情组件
import lookComp from "./components/lookComp.vue";

export default {
  name: "guildRebate-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    lookComp,
  },
  computed: {
    cfgs() {
      let name = this.form.status === 2 ? "guildWeekListV2" : "settlementLog";
      let arr = [
        {
          label: "时间",
          minWidth: "240px",
          render: (h, params) => {
            let start_time = params.row.time_start
              ? timeFormat(params.row.time_start, "YYYY-MM-DD HH:mm:ss", true)
              : "";
            let endTime =
              this.form.status === 2
                ? params.row.time_end
                : params.row.create_time;
            let end_time = endTime
              ? timeFormat(endTime, "YYYY-MM-DD HH:mm:ss", true)
              : "无";
            return h(
              "span",
              `${timeFormat(
                params.row.time_start,
                "YYYY",
                true
              )}年第${timeFormat(
                start_time,
                "MM"
              )}月（${start_time}至${end_time}）`
            );
          },
        },
        {
          label: "公会ID",
          minWidth: "100px",
          prop: "guild_number",
        },
        {
          label: "公会名称",
          minWidth: "100px",
          prop: "guild_name",
        },
        {
          label: "公会运营",
          minWidth: "100px",
          prop: "operator_name",
        },
        {
          label: "公会长昵称",
          minWidth: "120px",
          prop: "guild_owner_nickname",
        },
        {
          label: "公会类型",
          minWidth: "120px",
          prop: "guild_type",
          render: (h, params) => {
            let data = MAPDATA.GUILDCONFIGTYPELIST.find((item) => {
              return item.value === params.row.guild_type;
            });
            return h("span", data ? data.name : "无");
          },
        },
        {
          label: "实际流水",
          minWidth: "170px",
          render: (h, params) => {
            return h('div', [
                h(
                  "span",
                  this.form.status === 2
                    ? params.row.flow + "钻石"
                    : params.row.flow + "钻石"
                ),
                h("i",
                  {
                    class: {
                      "el-icon-question": true
                    },
                    style: {
                      "margin-left": '4px',
                      display: ((params.row.resettle !== undefined && params.row.resettle !== 1) || this.form.status === 1 || this.form.status === 4) ? "unset" : "none",
                    },
                    on: {
                      click:()=>{ this.handleLook(params.row, "dynamic") }
                    }
                  },
                ),
            ])
          }
        },
        {
          label: "收礼流水",
          minWidth: "170px",
          render: (h, params) => {
            return h("div", [
                h("span", params.row.t_flow + "钻石"),
                h("i",
                  {
                    class: {
                      "el-icon-question": true
                    },
                    style: {
                      "margin-left": "4px",
                      display: ((params.row.resettle !== undefined && params.row.resettle !== 1) || this.form.status === 1 || this.form.status === 4) ? "unset" : "none",
                    },
                    on: {
                      click:()=>{ this.handleLook(params.row, "dynamic") }
                    }
                  },
                ),
            ])
          }
        },
        {
          label: "月奖励金额",
          minWidth: "120px",
          render: (h, params) => {
            return h(
              "span",
              this.form.status === 2 ? "无" : params.row.settlement + "喵粮"
            );
          },
        },
        {
          label: "结算状态",
          minWidth: "120px",
          render: (h, params) => {
            let name;
            if (this.form.status === 1) {
              name = "待结算";
            } else if (this.form.status === 2) {
              name = "未结算";
            } else if (this.form.status === 3) {
              name = "已结算";
            } else {
              name = "已忽略";
            }
            return h("span", name);
          },
        },
        {
          label: "结算操作时间",
          width: "180px",
          render: (h, params) => {
            return h(
              "span",
              params.row.op_time
                ? timeFormat(params.row.op_time, "YYYY-MM-DD HH:mm:ss", true)
                : "-"
            );
          },
        },
        {
          label: "操作人",
          render: (h, params) => {
            return h("span", params.row.op_user ? params.row.op_user : "-");
          },
        },
      ];
      let arr1 = [
        {
          label: "操作",
          minWidth: "280px",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: { type: "primary" },
                  style: {
                    display: +params.row.resettle !== 1 ? "unset" : "none",
                  },
                  on: {
                    click: () => {
                      this.rebateFunc(params.row.id, 1);
                    },
                  },
                },
                "结算"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger" },
                  style: {
                    display: +params.row.resettle !== 1 ? "unset" : "none",
                  },
                  on: {
                    click: () => {
                      this.rebateFunc(params.row.id, 2);
                    },
                  },
                },
                "忽略"
              ),
              h(
                "el-button",
                {
                  props: { type: "primary" },
                  style: {
                    display: +params.row.resettle === 1 ? "unset" : "none",
                  },
                  on: {
                    click: () => {
                      this.rebateFunc(params.row.id, 1);
                    },
                  },
                },
                "再次结算"
              ),
              // h(
              //   "el-button",
              //   {
              //     props: { type: "info" },
              //     style: {
              //       display: +params.row.resettle !== 1 ? "unset" : "none",
              //     },
              //     on: {
              //       click: () => {
              //         this.handleLook(params.row, "guildMonthWater");
              //       },
              //     },
              //   },
              //   "详情"
              // ),
            ]);
          },
        },
      ];
      return {
        vm: this,
        url: REQUEST.guild[name],
        search: {
          sizes: [10, 30, 50, 100, 300]
        },
        isShowCheckbox: this.form.status === 1,
        isShowIndex: true,
        columns: (this.form.status === 1 || this.form.status === 4) ? [...arr, ...arr1] : [...arr],
      };
    },
  },
  watch: {
    "form.status": {
      handler(n, o) {
        if ((o === 1 || o === 3 || o == 4) && (n === 1 || n === 3 || n === 4)) {
          this.getList();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      guildList: [], // 公会列表
      closeStatusList: MAPDATA.GUILDCLOSEANACCOUNTSTATUSLIST, // 结算状态
      form: {
        // 表单数据
        guild_number: "",
        status: 1,
        time: [],
        start_time: null,
        end_time: null,
      },
      selectList: [], // 选中
      ruleForm: {},
      dateTimeParams: {
        start_time: null,
        end_time: null,
      },
      page: 1,
      gridData: [
        {
          date: "女神、男神、游戏、点唱、交友",
          name: "相守、拍拍、个播、相亲",
        },
      ],
      isBatchPassLoading: false,
      isBatchIgnoreLoading: false
    };
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.form, ...this.dateTimeParams };
      let data = {
        page: params ? params.page : 1,
        pagesize: params ? params.size : 10,
        guild_number: s.guild_number ? s.guild_number : "",
        type: 3,
        status: s.status,
        start_time:
          s.time && s.time.length > 0 ? Math.floor(s.time[0] / 1000) : 0,
        end_time:
          s.time && s.time.length > 0 ? Math.floor(s.time[1] / 1000) : 0,
        guild_type: 2,
      };
      if (this.form.status === 1) {
        data.status = 0;
      } else if (this.form.status === 3) {
        data.status = 1;
      } else if (this.form.status === 4) {
        data.status = 2;
      }
      if (s.status === 2) {
        delete data.status;
        delete data.start_time, delete data.end_time;
      }
      return data;
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.form = {
        guild_number: "",
        status: 1,
        time: [],
        start_time: null,
        end_time: null,
      };
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 更改
    change() {
      this.getList();
    },
    // 选中
    selectionChange(v) {
      this.selectList = v;
    },
    // 批量返佣
    async batchFunc(status) {
      if (this.selectList.length <= 0) {
        this.$warning("请至少选择一条数据");
        return false;
      }
      let text = status == 1 ? "通过" : "忽略";
      this.$confirm("你确定要批量" + text + "此次数据吗？", "操作提醒", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          let ids = [];
          this.selectList.forEach((item) => {
            ids.push(item.id);
          });

          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          status + "" === "1" ? this.isBatchPassLoading = true : (status + "" === "2" ? this.isBatchIgnoreLoading = true : "");
          let res = await doSettlement({ ids, type: 1, status, guild_type: 2 });
          try {
            if (res.code === 2000) {
               this.$success("批量操作成功");
            }
            status + "" === "1" ? this.isBatchPassLoading = false : (status + "" === "2" ? this.isBatchIgnoreLoading = false : "");
            this.getList();
            loading.close();
          } catch (error) {
            console.log(error);
            loading.close();
          }
        })
        .catch(() => {
          status + "" === "1" ? this.isBatchPassLoading = false : (status + "" === "2" ? this.isBatchIgnoreLoading = false : "");
        });
    },
    // 单个返点
    async rebateFunc(id, status) {
      let text = status == 1 ? "结算" : "忽略";
      this.$confirm(text + "此次数据吗？", "操作提醒", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          let ids = [id];
          let res = await doSettlement({ ids, type: 1, status, guild_type: 2 });
          if (res.code === 2000) {
            this.$success("操作成功");
          }
          this.getList();
        })
        .catch(() => {});
    },
    handleLook(row, status) {
      setTimeout(() => {
        this.$refs.lookComp.load(row, status);
      }, 100);
    },
    // 列表返回数据
    saleAmunt(row) {
      this.ruleForm = { ...row };
      this.page = this.ruleForm.page;
    },
    // 分页切换 当前页码
    handleSizeChange(val) {
      this.page = val;
    },
    // 获取公会列表
    async guildListFunc() {
      let res = await guildList();
      if (res.data.list && res.data.list.length > 0) {
        res.data.list.unshift({
          guild_number: 0,
          nickname: "全部公会",
        });
        this.guildList = res.data.list || [];
      }
    },
    // 导出excel
    async BatchRurn() {
      if (this.ruleForm.list.length == 0) {
        this.$warning("当前没有数据可以导出");
        return;
      }
      let s = this.beforeSearch();
      s.is_all = 1;
      if (this.page > 1) {
        s.page = this.page;
      }
      let res = {};
      if (this.form.status === 2) {
        res = await guildWeekListV2(s);
      } else {
        res = await settlementLog(s);
      }
      let arr = JSON.parse(JSON.stringify(res.data.list));
      if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
      arr = arr.map((item, index) => {
        let start_time = item.time_start
          ? timeFormat(item.time_start, "YYYY-MM-DD HH:mm:ss", true)
          : "";
        let endTime = this.form.status === 2 ? item.time_end : item.create_time;
        let end_time = endTime
          ? timeFormat(endTime, "YYYY-MM-DD HH:mm:ss", true)
          : "无";
        let timer =
          timeFormat(item.time_start, "YYYY", true) +
          "年第" +
          item.now +
          "周" +
          start_time +
          "至" +
          end_time;
        let guild_type = MAPDATA.GUILDCONFIGTYPELIST.find((it) => {
          return it.value === item.guild_type;
        });
        let status_name = "";
        if (this.form.status === 1) {
          status_name = "待结算";
        } else if (this.form.status === 2) {
          status_name = "未结算";
        } else if (this.form.status === 3) {
          status_name = "已结算";
        } else {
          status_name = "已忽略";
        }
        let params = {
          num: index + 1,
          timer: timer,
          guild_number: item.guild_number,
          guild_name: item.guild_name,
          guild_owner_nickname: item.guild_owner_nickname,
          guild_type: guild_type.name,
          flow: item.flow + "钻石",
          t_flow: item.t_flow + "钻石",
          settlement: this.form.status === 2 ? "无" : item.settlement + "喵粮",
          status: status_name,
          op_time: item.op_time
            ? timeFormat(item.op_time, "YYYY-MM-DD HH:mm:ss", true)
            : "-",
          op_user: item.op_user ? item.op_user : "-",
        };
        return params;
      });
      let nameList = [
        "序号",
        "时间",
        "公会ID",
        "公会名称",
        "公会长昵称",
        "公会类型",
        "实际流水",
        "收礼流水",
        "月奖励金额",
        "结算状态",
        "操作时间",
        "操作人",
      ];
      exportTableData(arr, nameList, "公会月奖励结算");
    },
  },
};
</script>
<style lang="scss">
.guildMonth-list-box {
  .model {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    padding: 0px 30px;
    box-sizing: border-box;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;

    > span {
      font-size: 15px;
      color: #fff;
      margin-right: 100px;
    }
  }

  .searchParams {
    .formBox {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .sunBox {
        margin-right: 12px;
        margin-bottom: 20px;

        > span {
          font-size: 14px;
          color: #606266;
          font-weight: 700;
          margin-right: 12px;
        }

        .el-input {
          width: 180px;

          input {
            border: none;
            background: #f5f7fa;
          }
        }

        .el-select {
          width: 180px;
          border: none;

          input {
            border: none;
            background: #f5f7fa;
          }
        }

        .el-date-editor {
          border: none;
          background: #f5f7fa;

          input {
            background: #f5f7fa;
          }
        }
      }

      .btnBox {
        margin-bottom: 20px;
      }
    }
  }
  .el-table__body-wrapper {
    max-height: none !important;
  }
}
</style>
