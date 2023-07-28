<template>
  <div class="user-excelQueryComp-box">
    <el-dialog
      title="文件下载列表"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @closed="closed"
    >
      <tableList :cfgs="cfgs" ref="excelTableList"></tableList>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
// import { updateLoginPwd } from "@/api/user.js";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";

export default {
  mixins: [mixins],
  components: {
    tableList,
  },
  data() {
    return {
      dialogVisible: false,
      fileStateList: [
        {
          id: 1,
          state : 0,
          name : "待导出"
        },
        {
          id: 2,
          state : 1,
          name : "导出中"
        },
        {
          id: 3,
          state : 2,
          name : "导出成功"
        },
        {
          id: 4,
          state : 3,
          name : "导出失败"
        }
      ],
      list: [],
    };
  },
  computed: {
    cfgs() {
      const columnsList = [
        {
          label: "文件名称",
          render: (h, params) => {
            return h("span", params.row.file_name || "无");
          },
        },
        {
          label: "状态",
          render: (h, params) => {
            let stateName = this.fileStateList.find((item) => { return item.state == params.row.export_status} )
            return h("span", stateName.name || "无");
          },
        },
        {
          label: "下载",
          render: (h, params) => {
            return h(
              "el-button",
              {
                props: { type: "primary", size: "mini" },
                style: {
                  display: params.row.export_url !== '' ? "unset" : "none",
                },
                on: {
                  click: () => {
                    this.download(params.row);
                  },
                },
              },
              "下载"
            );
          },
        },
      ];
      return {
        vm: this,
        url: REQUEST.user.getExportTask,
        columns: columnsList,
      };
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        export_type: 5, //导出类型，5-用户列表到处
      };
    },
    // 刷新列表
    getList() {
      this.$refs.excelTableList.getData();
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取数据
    loadParams() {
      this.dialogVisible = true;
    },
    // 下载
    download(row) {
      window.location.href = row.export_url;
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>
