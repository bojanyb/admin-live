<template>
  <div class="lookComp-box">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      @closed="closed"
    >
      <tableList
        :cfgs="cfgs"
        ref="tableList"
        layout="total, sizes, prev, pager, next, jumper"
      ></tableList>
    </el-dialog>
  </div>
</template>

<script>
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  mixins: [mixins],
  components: {
    tableList
  },
  data() {
    return {
      dialogVisible: false,
      searchParams: {},
      url: REQUEST.risk.NewUserPunishLog
    };
  },
  computed: {
    cfgs() {
      const arr = [
        {
          label: "事件编号",
          prop: "event_number",
          minWidth: "110px",
        },
        {
          label: "时间",
          prop: "create_time",
          minWidth: "160px",
        },
        {
          label: "来源",
          minWidth: "90px",
          prop: "from",
          render: (h, params) => {
            return h("span", params.row.from || params.row.source || "无");
          },
        },
        {
          label: "被举报用户",
          minWidth: "120px",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.feedback_name),
              h("div", params.row.feedback_number || "无"),
            ]);
          },
        },
        {
          label: "被举报用户身份",
          minWidth: "120px",
          render: (h, params) => {
            return h("span", params.row.feedback_identity || "无")
          },
        },
        {
          label: "举报类型",
          minWidth: "100px",
          render: (h, params) => {
            return h("span", params.row.feedback_type_str || params.row.feedback_type || "无");
          },
          showOverFlow: true,
        },
        {
          label: "举报证据",
          isImgAndVideoList: true,
          prop: "img_path",
          propCopy: "video_path",
          audio: "sound_path",
          imgWidth: "50px",
          imgHeight: "50px",
          width: "200px",
        },
        {
          label: "举报说明",
          minWidth: "100px",
          render: (h, params) => {
            return h("span", params.row.content || "无");
          },
          showOverFlow: true,
        },
        {
          label: "举报用户",
          minWidth: "120px",
          prop: "report_user_nickname",
          render: (h, params) => {
            return h("div", [
              h("div", params.row.report_name),
              h("div", params.row.report_number || "无"),
            ]);
          },
        },
        {
          label: "举报用户身份",
          minWidth: "120px",
          prop: "report_identity",
          render: (h, params) => {
            return h("span", params.row.report_identity || "无");
          },
        },
        {
          label: "处理状态",
          minWidth: "100px",
          render: (h, params) => {
            return h("span", params.row.state || "无");
          },
        },
        {
          label: "处罚类别",
          minWidth: "110px",
          prop: "punish_type",
          render: (h, params) => {
            return h("span", params.row.punish_type || "无");
          },
        },
        {
          label: "处罚结果",
          minWidth: "120px",
          render: (h, params) => {
            const vnode = params.row.result.length &&
              params.row.result.map((item) => {
                return h("span", `${item};` || "无");
              });
            return h("div", vnode || "无");
          },
          showOverFlow: true,
        },
        {
          label: "风险级别",
          minWidth: "80px",
          render: (h, params) => {
            let data = MAPDATA.RISKLEVELLIST.find((item) => {
              return item.value === params.row.risk_level;
            });
            return h("span", data ? data.name : "无");
          },
        },
        {
          label: "解除时间",
          minWidth: "160px",
          render: (h, params) => {
            return h("span", params.row.remove_time || "无");
          },
        },
        {
          label: "审核人",
          minWidth: "80px",
          prop: "operator",
          render: (h, params) => {
          return h("span", params.row.operator || "无");
          },
        },
        {
          label: "备注说明",
          minWidth: "130px",
          render: (h, params) => {
            return h("span", params.row.remark || "无");
          },
          showOverFlow: true,
        },
      ]

      return {
        vm: this,
        url: this.url,
        search: {
          sizes: [10, 30, 50, 100],
        },
        columns: arr,
      };
    }
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams };
      return {
        page: params ? params.page : 1,
        page_size: params ? params.size : 10,
        report_event_id: s.report_event_id,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    load(eventId, type) {
      if(type === 'guild') {
        this.url = REQUEST.risk.NewGuildPunishLog;
      } else {
        this.url = REQUEST.risk.NewUserPunishLog;
      }
      this.searchParams.report_event_id = eventId;
      this.dialogVisible = true;
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
</style>
