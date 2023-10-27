<template>
  <div>
    <el-dialog
      :title="dialogType === 1 ? '成长值清单' : '贵族状态清单'"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
      @closed="closed"
    >
      <tableList :cfgs="cfgs" ref="tableList"></tableList>
    </el-dialog>
  </div>
</template>

<script>
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
export default {
  props: {
    dialogType: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      row: {},
    };
  },
  computed: {
    cfgs() {
      const columnsList = [
        {
          label: "时间",
          width: 160,
          render: (h, params) => {
            return h(
              "span",
              params.row.create_time
                ? timeFormat(params.row.create_time, "YYYY-MM-DD HH:mm:ss")
                : "无"
            );
          },
        },
        {
          label: "变更前成长值",
          prop: "from",
          render: (h, params) => {
            return h("span", params.row.before_total || "无");
          },
        },
        {
          label: "本次变更成长值",
          prop: "from",
          render: (h, params) => {
            return h("span", params.row.amount || "无");
          },
        },
        {
          label: "变更后成长值",
          prop: "from",
          render: (h, params) => {
            return h(
              "span",
              params.row.total
            );
          },
        },
        {
          label: "变更原因",
          prop: "remark",
          render: (h, params) => {
            return h("span", params.row.remark || "无");
          },
        },
      ];

      const columnsList2 = [
        {
          label: "时间",
          width: 160,
          render: (h, params) => {
            return h(
              "span",
              params.row.create_time
                ? timeFormat(params.row.create_time, "YYYY-MM-DD HH:mm:ss")
                : "无"
            );
          },
        },
        {
          label: "变更前等级",
          prop: "from",
          render: (h, params) => {
            return h("span", params.row.old_noble_name || "无");
          },
        },
        {
          label: "变化后等级",
          prop: "from",
          render: (h, params) => {
            return h("span", params.row.current_noble_name || "无");
          },
        },
        {
          label: "变动内容",
          prop: "remark",
          render: (h, params) => {
            return h("span", params.row.remark || "无");
          },
        },
      ];

      return {
        vm: this,
        url:
          this.dialogType === 1
            ? REQUEST.nobility.getUserGrowthValueLog
            : REQUEST.nobility.getUserNobleLog,
        columns: this.dialogType === 1
            ? columnsList
            : columnsList2,
      };
    },
  },
  components: {
    tableList,
  },
  mixins: [mixins],
  created() {},
  mounted() {},
  methods: {
    init(row) {
      this.row = row;
      this.dialogVisible = true;
    },
    // 配置参数
    beforeSearch(params) {
      return {
        page: params.page,
        user_id: this.row.user_id,
        pagesize: params.size,
        ...params,
      };
    },
    // 获取数据
    getList() {
      this.$refs.tableList.getData();
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
