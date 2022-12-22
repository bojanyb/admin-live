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
          <el-row :gutter="20">
            <el-col :span="14" class="body_box-col">
              <el-input
                oninput="this.value=this.value.replace(/[^\d]/g,'');"
                v-model="fromData.kv_value"
              ></el-input>
              <div class="col-unit">小时</div>
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                size="mini"
                @click="onSave(fromData)"
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
    <!-- <editComp
      v-if="isDestoryComp"
      ref="editComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></editComp> -->
    <!-- 新增组件 -->
    <categoryComp
      v-if="isDestoryComp"
      ref="categoryComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></categoryComp>
  </div>
</template>

<script>
// 引入api
import { saveEff, effective } from "@/api/videoRoom";
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// // 引入新增or修改组件
// import editComp from "./components/editComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入新增组件
import categoryComp from "./components/categoryComp.vue";

export default {
  name: "BroadcastList",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    // editComp,
    menuComp,
    categoryComp,
  },
  data() {
    return {
      tabIndex: "0",
      menuList: [{ name: "直播类型" }, { name: "有效直播天数" }],
      isDestoryComp: false, // 是否销毁组件
      ruleForm: {},
      resultCost: "",
      fromData: {
        kv_value: "",
      },
    };
  },
  computed: {
    forms() {
      const BroadcastList = [
        {
          name: "name",
          type: "input",
          value: "",
          label: "房间类型",
          placeholder: "请输入房间类型",
        },
      ];
      return this.tabIndex === "0" ? BroadcastList : [];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.house.genreList,
        columns: [
          {
            label: "房间类型",
            prop: "name",
          },
          {
            label: "类型图片",
            isimg: true,
            prop: "icon",
            // imgWidth: '50px',
            imgHeight: "50px",
          },
          {
            label: "类型色值",
            prop: "color",
          },
          {
            label: "权重排序",
            prop: "sort",
          },
          {
            label: "描述",
            render: (h, params) => {
              let data = MAPDATA.CATEGORYBUSINESSTYPELIST.find((item) => {
                return item.value === params.row.belong;
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
                    props: { type: "danger" },
                    style: {
                      display: params.row.id === 1 ? "none" : "unset",
                    },
                    on: {
                      click: () => {
                        this.deleteParams(params.row.id);
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
        name: s.name,
        belong: 1,
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
    onSave(fromData) {
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
            kv_value: fromData.kv_value
          };
          const response = await saveEff(tempData);
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
        this.$refs.categoryComp.loadParams(status, row);
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
      const response = await effective()

      if (
        response.code + "" !== "2000"
      ) {
        this.$Message.error("请求失败");
        return;
      }

      this.fromData.kv_value = response.data.kv_value || "";
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
  .body_box-col {
    position: relative;
    .col-unit {
      position: absolute;
      top: 0;
      right: 20px;
    }
  }
}
</style>
