<template>
  <div class="topListComp-box">
    <el-dialog
      title="推荐动态"
      :visible.sync="dialogVisible"
      width="1300px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
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

      <tableList :cfgs="cfgs" ref="topTableList"></tableList>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
import { delTopList } from "@/api/dynamic";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入公共方法
import { timeFormat } from "@/utils/common";
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
  },
  data() {
    return {
      dialogVisible: false,
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
        {
          name: "status",
          type: "select",
          value: 0,
          keyName: "value",
          optionLabel: "name",
          label: "推荐状态",
          placeholder: "请选择",
          options: MAPDATA.RECOMMENDSTATUSLIST,
        },
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "发布时间",
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
      const columnsList = [
        {
          label: "推荐时间",
          width: 160,
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
          prop: "user_id",
        },
        {
          label: "用户昵称",
          prop: "nickname",
        },
        {
          label: "动态内容",
          prop: "content",
          showOverFlow: true,
        },
        {
          label: "动态图片",
          isimgList: true,
          prop: "media_list",
          imgWidth: "50px",
          imgHeight: "50px",
        },
        {
          label: "推荐状态",
          prop: "status",
          render: (h, params) => {
            let data = MAPDATA.RECOMMENDSTATUSLIST.find((item) => {
              return item.value === params.row.status;
            });
            return h("span", data ? data.name : "无");
          },
        },
        {
          label: "推荐人",
          prop: "push_user_name",
        },
        {
          label: "推荐时长",
          prop: "start_time",
          render: (h, params) => {
            return h("span", params.row.start_time + "小时");
          },
        },
        {
          label: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: { type: "danger", size: "mini" },
                  on: {
                    click: () => {
                      this.delRecommend(params.row.id);
                    },
                  },
                },
                "取消推荐"
              ),
            ]);
          },
        },
      ];
      return {
        vm: this,
        url: REQUEST.dynamic.topMomentList,
        columns: columnsList,
      };
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    load() {
      this.dialogVisible = true;
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
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        user_number: s.user_number,
        status: s.status,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : "",
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : "",
      };
    },
    // 获取数据
    getList() {
      this.$refs.topTableList.getData();
    },
    // 取消推荐
    delRecommend(id) {
      this.$confirm(`是否确认取消推荐?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await delTopList({ id });
        if (res.code === 2000) {
          this.$success("已取消推荐");
          this.getList();
        }
      });
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss">
.topListComp-box {
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
