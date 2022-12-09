<template>
  <div class="room-livelist">
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
    <div class="searchParams" v-if="tabIndex === '0'">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-add="true"
        :show-search-btn="true"
        @add="add"
        @onSearch="onSearch"
      ></SearchPanel>
    </div>

    <div
      class="share-filter-grid-box"
      shadow="always"
      v-else-if="tabIndex === '1'"
    >
      <el-form ref="form" :model="fromData" label-width="100px">
        <el-form-item label="每日直播时间">
          <el-row class="body_box-col" :gutter="20">
            <el-col :span="14">
              <el-input
                oninput="this.value=this.value.replace(/[^\d]/g,'');"
                v-model="fromData.bigCost"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                size="mini"
                @click="onSave(fromData, 'broadcast_big_for_room')"
                >设置</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>

    <tableList
      v-if="tabIndex === '0'"
      :cfgs="cfgs"
      ref="tableList"
      @saleAmunt="saleAmunt"
    ></tableList>

    <!-- 新增or修改组件 -->
    <editComp
      v-if="isDestoryComp"
      ref="editComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></editComp>
  </div>
</template>

<script>
// 引入api
import { setBroadcastPrice, getBroadcastPrice } from "@/api/videoRoom";
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入新增or修改组件
import editComp from "./components/editComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "BroadcastList",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    editComp,
    menuComp,
  },
  data() {
    return {
      tabIndex: "0",
      menuList: [{ name: "直播类型" }, { name: "有效直播天数" }],
      isDestoryComp: false, // 是否销毁组件
      ruleForm: {},
      resultCost: "",
      fromData: {
        cost: "",
        bigCost: "",
      },
    };
  },
  computed: {
    forms() {
      const BroadcastList = [
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "类型名称",
          isNum: true,
          placeholder: "请输入类型名称",
        },
      ];
      return this.tabIndex === "0" ? BroadcastList : [];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.broadcastList,
        columns: [
          {
            label: "房间类型",
            prop: "user_number",
          },
          {
            label: "类型名称",
            prop: "type",
            render: (h, params) => {
              let data = MAPDATA.BROADCASTTYPESTATUS.find((item) => {
                return item.value === params.row.type;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "类型图标",
            prop: "from_type",
            render: (h, params) => {
              let data = MAPDATA.FROMTYPESTATUS.find((item) => {
                return item.value === params.row.from_type;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "类型色值",
            minWidth: "220px",
            prop: "content",
          },
          {
            label: "类型色值",
            minWidth: "220px",
            prop: "content",
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
                      display: params.row.status === 2 ? "unset" : "none",
                    },
                    on: {
                      click: () => {
                        this.update(params.row, 2);
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "danger" },
                    on: {
                      click: () => {
                        this.down(params.row, 2);
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
      };
    },
  },
  created() {
    this.getResultPrice();
    let time = new Date();
    let date = timeFormat(time, "YYYY-MM-DD", false);
    let start = new Date(date + " 00:00:00").getTime();
    let end = new Date(date + " 23:59:59").getTime();
    this.searchParams.dateTimeParams = [start, end];
    this.dateTimeParams = {
      start_time: start,
      end_time: end,
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
        type: s.type,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
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
    // 新增
    add() {
      this.load("add");
    },
    // 修改
    update(row) {
      this.load("update", row);
    },

    down(row, status) {
      let params = {
        id: row.id,
        status: status,
      };
      console.log(params);
      // down(params).then((res) => {
      //   if (res.code === 2000) {
      //     this.onSearch();
      //   }
      // });
    },

    // 保存
    onSave(fromData, fromKey) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.$confirm("你确定要保存广播单价吗？", "保存提醒", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const tempData = {
            key: fromKey,
            value:
              fromKey === "broadcast_for_room"
                ? fromData.cost
                : fromData.Bigcost,
          };

          if (fromKey === "broadcast_for_room") {
            tempData.value = fromData.cost;
          } else {
            tempData.value = fromData.bigCost;
          }

          const response = await setBroadcastPrice(tempData);
          if (response.code === 2000) {
            loading.close();
            this.$message({
              message:
                Object.prototype.toString.call(response) ===
                  "[object Object]" && "保存成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          loading.close();
        });
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.editComp.loadParams(status, row);
      }, 50);
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 列表返回数据
    saleAmunt(data) {
      const { total_cost, user_count, count } = data;
      this.ruleForm = { total_cost, user_count, count };
    },
    // 获取广播单价
    async getResultPrice() {
      const response = await Promise.all([
        getBroadcastPrice({ key: "broadcast_for_room" }),
        getBroadcastPrice({ key: "broadcast_big_for_room" }),
      ]);

      if (
        response[0].code + "" !== "2000" ||
        response[1].code + "" !== "2000"
      ) {
        this.$Message.error("请求失败");
        return;
      }

      this.fromData.cost = response[0].data.value || "";
      this.fromData.bigCost = response[1].data.value || "";
    },
  },
};
</script>
<style lang="scss">
.room-livelist {
  padding: 20px;
  box-sizing: border-box;
  .share-filter-grid-box {
    .el-input {
      > input {
        background: #f5f7fa;
        border: none;
        border-radius: 0;
      }
    }
  }
}
</style>
