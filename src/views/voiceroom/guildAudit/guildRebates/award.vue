<template>
  <div class="guildAudit-award-box">
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
          <el-input
            v-model="form.guild_number"
            placeholder="请输入公会ID"
          ></el-input>
        </div>
        <div class="sunBox">
          <span>房间ID</span>
          <el-input
            v-model="form.room_number"
            oninput="this.value=this.value.replace(/[^\d]/g,'');"
            placeholder="请输入房间ID"
            clearable
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
          <el-button type="success" @click="addHome">添加24小时房间</el-button>
          <el-button type="danger" @click="BatchRurn()">导出EXCEL</el-button>
        </div>
      </div>
    </div>
    <tableList
      :cfgs="cfgs"
      ref="tableList"
      layout="total, sizes, prev, pager, next, jumper"
      @saleAmunt="saleAmunt"
      @handleSizeChange="handleSizeChange"
    ></tableList>
    <!-- 新增24小时房间组件 -->
    <homeComp
      v-if="isDestoryComp"
      ref="homeComp"
      @destoryComp="destoryComp"
    ></homeComp>
  </div>
</template>

<script>
// 引入api
import {
  doSettlement,
  settlementLog,
  getNowRoomOnlineReward,
} from "@/api/videoRoom";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import {
  formatTimeTwo,
  timeFormat,
  exportTableData,
} from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入新增24小时房间组件
import homeComp from "./components/homeComp.vue";
export default {
  name: "guildRebate-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    homeComp,
  },
  computed: {
    cfgs() {
      let name =
        this.form.status === 2 ? "getNowRoomOnlineReward" : "settlementLog";
      // let name = this.form.status === 2 ? 'getNowRoomOnlineReward' : 'getRoomOnlineRewardLog'
      let arr = [
        {
          label: "时间",
          minWidth: "240px",
          render: (h, params) => {
            let start_time =
              this.form.status === 2
                ? timeFormat(params.row.start, "YYYY-MM-DD HH:mm:ss", true)
                : timeFormat(
                    params.row.time_start,
                    "YYYY-MM-DD HH:mm:ss",
                    true
                  );
            let endTime =
              this.form.status === 2 ? params.row.end : params.row.create_time;
            let end_time = endTime
              ? timeFormat(endTime, "YYYY-MM-DD HH:mm:ss", true)
              : "无";
            return h(
              "span",
              `${timeFormat(
                this.form.status === 2
                  ? params.row.start
                  : params.row.time_start,
                "YYYY",
                true
              )}年第${params.row.now}周（${start_time}至${end_time}）`
            );
          },
        },
        {
          label: "房间ID",
          minWidth: "100px",
          prop: "room_number",
        },
        {
          label: "房间标题",
          minWidth: "100px",
          render: (h, params) => {
            let name =
              this.form.status === 2 ? params.row.title : params.row.room_title;
            return h("span", name);
          },
        },
        {
          label: "所属公会ID",
          minWidth: "100px",
          prop: "guild_number",
        },
        {
          label: "所属公会名称",
          minWidth: "120px",
          render: (h, params) => {
            let name =
              this.form.status === 2
                ? params.row.guild_nickname
                : params.row.guild_name;
            return h("span", name);
          },
        },
        {
          label: "本周营业时长",
          minWidth: "140px",
          prop: "online",
          render: (h, params) => {
            console.log(params.row.is_red, "row");
            let status = params.row.online
              ? formatTimeTwo(params.row.online)
              : "--";
            return h(
              "span",
              {
                style: {
                  color: params.row.is_red ? "#ff4949" : "",
                },
              },
              status
            );
          },
        },
        {
          label: "本周流水",
          minWidth: "120px",
          render: (h, params) => {
            return h("span", params.row.flow + "钻石");
          },
        },
        {
          label: "总流水（含冻结）",
          minWidth: "140px",
          render: (h, params) => {
            return h(
              "span",
              this.form.status === 2
                ? params.row.flow + "钻石"
                : params.row.t_flow + "钻石"
            );
          },
        },
        {
          label: "时长奖励",
          minWidth: "100px",
          render: (h, params) => {
            let name =
              this.form.status === 2
                ? "无"
                : (params.row.settlement || 0) + "喵粮";
            return h("span", name);
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
                    display :  +params.row.resettle !== 1 ? 'unset' : 'none',
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
                    display :  +params.row.resettle !== 1 ? 'unset' : 'none',
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
            ]);
          },
        },
      ];
      return {
        vm: this,
        url:
          this.form.status === 2
            ? REQUEST.system.guild[name]
            : REQUEST.guild[name],
        // url: REQUEST.system.guild[name],
        search: {
          sizes: [10, 30, 50]
        },
        isShowCheckbox: true,
        isShowIndex: true,
        columns: (this.form.status === 1 || this.form.status === 4) ? [...arr, ...arr1] : [...arr],
      };
    },
  },
  data() {
    return {
      closeStatusList: MAPDATA.GUILDCLOSEANACCOUNTSTATUSLISTCOPY, // 结算状态
      form: {
        // 表单数据
        guild_number: "",
        room_number: "",
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
      isDestoryComp: false, // 是否销毁组件
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
  watch: {
    "form.status": {
      handler(n, o) {
        if (
          (o === 3 || o === 1 || o === 4) &&
          (n === 1 || n === 3 || n === 4)
        ) {
          setTimeout(() => {
            this.getList();
          }, 50);
        }
      },
      deep: true,
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.form, ...this.dateTimeParams };
      let data = {
        page: params ? params.page : 1,
        pagesize: params ? params.size : 10,
        guild_number: s.guild_number ? s.guild_number : "",
        room_number: s.room_number ? s.room_number : "",
        type: 4,
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
        room_number: "",
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
          if (status + "" === "1") {
            this.isBatchPassLoading = true;
          } else if (status + "" === "2") {
            this.isBatchIgnoreLoading = true;
          }
          let res = await doSettlement({ ids, status, guild_type: 2 });
          if (res.code === 2000) {
            this.$success("批量操作成功");
          }
          if (status + "" === "1") {
          this.isBatchPassLoading = false;
          } else if (status + "" === "2") {
            this.isBatchIgnoreLoading = false;
          }
          this.getList();
        })
        .catch(() => {
          if (status + "" === "1") {
          this.isBatchPassLoading = false;
          } else if (status + "" === "2") {
            this.isBatchIgnoreLoading = false;
          }
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
          let res = await doSettlement({ ids, status, guild_type: 2 });
          if (res.code === 2000) {
            this.$success("操作成功");
          }
          this.getList();
        })
        .catch(() => {});
    },
    // 列表返回数据
    saleAmunt(row) {
      let ruleForm = { ...row };
      this.page = ruleForm.page;
      if (this.form.status !== 2) {
        ruleForm.all_flow = row.all_flow;
        ruleForm.all_settlement = row.all_settlement;
      } else {
        ruleForm.total_flow = ruleForm.total_flow;
        ruleForm.total_settlement = ruleForm.total_settlement;
      }
      let timer = setTimeout(() => {
        this.$set(this, "ruleForm", ruleForm);
        clearTimeout(timer);
      }, 50);
    },
    // 分页切换 当前页码
    handleSizeChange(val) {
      this.page = val;
    },
    // 添加24小时房间
    addHome() {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.homeComp.loadParams();
      }, 50);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
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
        res = await getNowRoomOnlineReward(s);
      } else {
        res = await settlementLog(s);
      }
      let arr = JSON.parse(JSON.stringify(res.data.list));
      if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
      arr = arr.map((item, index) => {
        let start_time =
          this.form.status === 2
            ? timeFormat(item.start, "YYYY-MM-DD HH:mm:ss", true)
            : timeFormat(item.time_start, "YYYY-MM-DD HH:mm:ss", true);
        let endTime = this.form.status === 2 ? item.end : item.create_time;
        let end_time = endTime
          ? timeFormat(endTime, "YYYY-MM-DD HH:mm:ss", true)
          : "无";
        let timer =
          timeFormat(
            this.form.status === 2 ? item.start : item.time_start,
            "YYYY",
            true
          ) +
          "年第" +
          item.now +
          "周" +
          start_time +
          "至" +
          end_time;
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
          room_number: item.room_number,
          title: this.form.status === 2 ? item.title : item.room_title,
          guild_number: item.guild_number,
          room_number: item.room_number,
          guild_nickname:
            this.form.status === 2 ? item.guild_nickname : item.guild_name,
          online: item.online ? formatTimeTwo(item.online) : "--",
          flow: item.flow + "钻石",
          t_flow:
            this.form.status === 2 ? item.flow + "钻石" : item.t_flow + "钻石",
          settlement:
            this.form.status === 2 ? "无" : (item.settlement || 0) + "喵粮",
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
        "房间ID",
        "房间标题",
        "所属公会ID",
        "所属公会名称",
        "本周营业时长",
        "本周流水",
        "总流水（含冻结）",
        "时长奖励",
        "结算状态",
        "操作时间",
        "操作人",
      ];
      exportTableData(arr, nameList, " 24小时房间奖励结算");
    },
  },
};
</script>
<style lang="scss">
.guildAudit-award-box {
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
    // margin-bottom: 20px;
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
