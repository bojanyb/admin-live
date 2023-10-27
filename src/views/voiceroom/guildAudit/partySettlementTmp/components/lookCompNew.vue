<template>
  <div class="guildReportComp-box">
    <el-dialog
      :title="editTitle"
      :visible.sync="dialogVisible"
      width="1100px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
      <div class="wrap" v-if="dialogVisible">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>详情</span>
            <div class="topFilter">
              <div class="status-label">达标状态:</div>
              <el-select
                v-model="isStandard"
                placeholder="请选择"
                @change="change"
              >
                <el-option
                  v-for="item in standardList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <el-table
            :data="tableData.list"
            style="width: 100%"
            v-loading="tableLoading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column
              prop="room_title"
              label="房间名"
              align="center"
              width="120px"
            >
            </el-table-column>
            <el-table-column
              prop="room_type_name"
              label="房间类型"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="is_standard" label="达标状态" align="center">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.is_standard == 1 ? "已达标" : "未达标" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="flow" label="实际流水" align="center">
            </el-table-column>
            <el-table-column
              prop="t_flow"
              label="收礼流水"
              align="center"
              width="120px"
            >
            </el-table-column>
            <template
              v-if="
                status === 'guildWeekWater' || (status === 'dynamic' && false)
              "
            >
              <el-table-column
                prop="Mon"
                label="周一"
                align="left"
                width="210px"
              >
                <template slot-scope="scope">
                  <div>时间： {{ scope.row.Mon.time || "--" }}</div>
                  <div>
                    时长： {{ scope.row.Mon.long | filtersFormatTimeTwo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="Tue"
                label="周二"
                align="left"
                width="210px"
              >
                <template slot-scope="scope">
                  <div>时间： {{ scope.row.Tue.time || "--" }}</div>
                  <div>
                    时长： {{ scope.row.Tue.long | filtersFormatTimeTwo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="Wed"
                label="周三"
                align="left"
                width="210px"
              >
                <template slot-scope="scope">
                  <div>时间： {{ scope.row.Wed.time || "--" }}</div>
                  <div>
                    时长： {{ scope.row.Wed.long | filtersFormatTimeTwo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="Thu"
                label="周四"
                align="left"
                width="210px"
              >
                <template slot-scope="scope">
                  <div>时间： {{ scope.row.Thu.time || "--" }}</div>
                  <div>
                    时长： {{ scope.row.Thu.long | filtersFormatTimeTwo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="Fri"
                label="周五"
                align="left"
                width="210px"
              >
                <template slot-scope="scope">
                  <div>时间： {{ scope.row.Fri.time || "--" }}</div>
                  <div>
                    时长： {{ scope.row.Fri.long | filtersFormatTimeTwo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="Sat"
                label="周六"
                align="left"
                width="210px"
              >
                <template slot-scope="scope">
                  <div>时间： {{ scope.row.Sat.time || "--" }}</div>
                  <div>
                    时长： {{ scope.row.Sat.long | filtersFormatTimeTwo }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="Sun"
                label="周日"
                align="left"
                width="210px"
              >
                <template slot-scope="scope">
                  <div>时间： {{ scope.row.Sun.time || "--" }}</div>
                  <div>
                    时长： {{ scope.row.Sun.long | filtersFormatTimeTwo }}
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <!--工具条-->
          <!-- <pagination
        v-show="lookTotal > 0"
        :total="lookTotal"
        :page.sync="lookPage.page"
        :limit.sync="lookPage.limit"
        @pagination="load"
      /> -->
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>统计</span>
          </div>
          <el-table
            :data="reward_list"
            style="width: 100%"
            v-loading="tableLoading"
            element-loading-text="数据加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column prop="type_name" label="房间类型" align="center">
            </el-table-column>
            <el-table-column
              prop="flow"
              :label="is_standard === 0 ? '未达标流水' : '达标流水'"
              align="center"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.flow + "钻石" }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="point"
              :label="status | statusFilters"
              align="center"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.point + "喵粮" }}</div>
              </template>
            </el-table-column>
          </el-table>
          <!--工具条-->
          <!-- <pagination
        v-show="lookTotal > 0"
        :total="lookTotal"
        :page.sync="lookPage.page"
        :limit.sync="lookPage.limit"
        @pagination="load"
      /> -->
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { roomFlowNew } from "@/api/videoRoom";
// 分页
import Pagination from "@/components/Pagination";
// 引入公共方法
import { formatTimeTwo } from "@/utils/common.js";
let that;
export default {
  components: {
    Pagination,
  },
  filters: {
    statusFilters(val) {
      let msg = "";
      switch (val) {
        case "guildWeekWater":
          if (that.is_standard === 0) {
            msg = "未达标周结算";
          } else {
            msg = "达标周结算";
          }
          break;
        case "dynamic":
          msg = "周奖励结算";
          break;
        case "guildMonthWater":
          msg = "月奖励结算";
          break;
      }
      return msg;
    },
    filtersFormatTimeTwo(status) {
      const res = formatTimeTwo(status);
      return res;
    },
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      lookTotal: 0,
      lookPage: {
        page: 1,
        pagesize: 10,
      },
      editTitle: "",
      status: "",
      is_standard: 1,
      isStandard: null,
      tableLoading: false,
      reward_list: [],
      standardList: [
        {
          name: "全部",
          value: null,
        },
        {
          name: "已达标",
          value: 1,
        },
        {
          name: "未达标",
          value: 0,
        },
      ],
    };
  },
  beforeCreate: function () {
    that = this;
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    change() {
      this.load(this.row, this.status);
    },
    async load(row, status) {
      this.status = status;
      console.log("row", row);
      this.row = row;
      this.is_standard = row.is_standard;
      console.log(this.status, "this.status");
      this.dialogVisible = true;
      this.editTitle = `${row.guild_name}公会流水详情`;
      this.tableLoading = true;
      let res = await roomFlowNew({
        ...this.lookPage,
        settle_id: row.id || "",
        is_standard: this.isStandard,
      });
      if (res.code + "" === "2000") {
        this.tableData = res.data || [];
      }
      let data = {
        type_name: null,
        flow: null,
        point: null,
      };
      data.type_name = row.room_type_name;
      data.flow = row.flow;
      data.point = row.settlement;
      this.$set(this, "reward_list", [data]);
      this.$set(this, "row", row);
      this.tableLoading = false;
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
      this.tableData = [];
    },
  },
};
</script>

<style lang="scss">
.guildReportComp-box {
  .wrap {
    padding: 10px;
    margin-bottom: 20px;

    .text {
      font-size: 16px;
      font-weight: 700;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }

    .box-card {
      width: 100%;
      margin-bottom: 10px;
    }

    .topFilter {
      .status-label {
        margin-right: 20px;
      }
      display: flex;
      align-items: center;
    }
  }
  .el-dialog__body {
    max-height: 70vh;
    overflow-y: scroll;
    padding: 10px;
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
</style>
