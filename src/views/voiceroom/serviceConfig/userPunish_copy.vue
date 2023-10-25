<template>
  <div class="app-container serviceConfig-userPunish-box">

    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-add="permissionArr.includes('UserPunishLog@add')"
        :show-batch-rurn="true"
        :show-custom="true"
        @onReset="reset"
        @onSearch="onSearch"
        @add="add"
        batchRurnName="导出EXCEL"
        @BatchRurn="BatchRurn"
        customName="风控文案库"
        @custom="handleCustom"
      ></SearchPanel>
    </div>
    <el-row :gutter="10" style="margin-bottom: 10px;">
      <el-col :span="10">
        <el-radio-group v-model="filterType" size="small">
          <el-radio-button label="user">用户/主播</el-radio-button>
          <el-radio-button label="guild">公会</el-radio-button>
        </el-radio-group>
      </el-col>
      <right-toolbar :columns="filterColumns" @refreshTable="refreshTable"></right-toolbar>
    </el-row>
    <tableList
      :cfgs="cfgs"
      ref="tableList"
      layout="total, sizes, prev, pager, next, jumper"
    ></tableList>
    <!-- 新增组件 -->
    <userComp
      v-if="isDestoryComp"
      ref="userComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></userComp>
    <!-- 修改证据弹窗 -->
    <uploadImg
      v-if="isDestoryComp"
      ref="uploadImg"
      @destoryComp="destoryComp"
      @getList="getList"
    ></uploadImg>
    <!-- 操作日志 -->
    <operationLogComp ref="operationLogComp"></operationLogComp>
    <!-- 风控文案库 -->
    <wordsComp ref="wordsComp"></wordsComp>
    <!-- 详情组件 -->
    <lookComp ref="lookComp"></lookComp>
    <!-- 相同事件编号列表 -->
    <eventListComp v-if="isEventListDestoryComp" ref="eventListComp" @destoryComp="destoryEventComp"></eventListComp>
    <!-- 解封弹窗 -->
    <unbanComp ref="unbanComp" @getList="getList"></unbanComp>
    <!-- 忽略弹窗 -->
    <ignoreComp ref="ignoreComp"></ignoreComp>
  </div>
</template>

<script>
// 引入api
import {
  removeUser,
  removeUserPunish,
  passUserPunish,
  UserPunishLog,
  acceptPunish,
  NewUserPunishLog,
  NewGuildPunishLog,
} from "@/api/risk";
// 引入api
import { getPunishTypeList } from "@/api/videoRoom";
// 引入新增组件
import userComp from "./components/userComp.vue";
// 引入修改证据弹窗
import uploadImg from "./components/uploadImg.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表工具组件
import RightToolbar from "@/components/RightToolbar/index.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入公共方法
import { exportTableData } from "@/utils/common.js";
import { mapState } from "vuex";
// 引入操作日志组件
import operationLogComp from "./components/operationLogComp.vue";
// 引入风控文案库组件
import wordsComp from "./components/wordsComp.vue"
// 引入详情组件
import lookComp from "./components/lookComp.vue";
// 相同事件编号列表
import eventListComp from "./components/eventListComp.vue";
// 解封弹窗
import unbanComp from "./components/unbanComp.vue";
// 忽略弹窗
import ignoreComp from "./components/ignoreComp.vue";
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    RightToolbar,
    tableList,
    userComp,
    uploadImg,
    operationLogComp,
    wordsComp,
    lookComp,
    eventListComp,
    unbanComp,
    ignoreComp
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      isEventListDestoryComp: false, // 是否销毁组件
      searchParams: {
        group: 'event_number'
      },
      punishTypeList: [],
      operateStatusOptions: [{
        name: '全部',
        value: ''
      },
      {
        name: '封禁中',
        value: 1
      },
      {
        name: '已解除',
        value: 2
      }],
      filterType: 'user',
      filterColumns: [{
        label: "事件编号",
        key: "event_number",
        visible: true,
      },{
        label: "创建时间",
        key: "create_time",
        visible: true,
      },{
        label: "提交渠道",
        key: "from",
        visible: true,
      },{
        label: "举报人身份",
        key: "report_user_role",
        visible: true,
      },{
        label: "举报账号",
        key: "report_user_nickname",
        visible: true,
      }],
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
          placeholder: "请输入用户ID",
        },
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          placeholder: "请输入公会ID",
        },
        {
          name: "guild_name",
          type: "input",
          value: "",
          label: "公会昵称",
          placeholder: "请输入公会昵称",
        },
        {
          name: "operator",
          type: "input",
          value: "",
          label: "操作人",
          placeholder: "请输入操作人",
        },
        // {
        //     name: 'type',
        //     type: 'select',
        //     value: '',
        //     keyName: 'value',
        //     optionLabel: 'name',
        //     label: '处罚类型',
        //     placeholder: '请选择',
        //     options: MAPDATA.USERPUNISHTYPELISTCOPY
        // },
        {
          name: "punish_type_id",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "处罚类别",
          placeholder: "请选择",
          options: this.punishTypeList,
        },
        {
          name: "status",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "处罚状态",
          placeholder: "请选择",
          options: MAPDATA.USERPUNISHSTATUSLISTCOPY,
        },
        {
          name: "risk_level",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "风险级别",
          placeholder: "请选择",
          options: MAPDATA.RISKLEVELLIST,
        },
        {
          name: "guild_operator",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "公会运营选择",
          placeholder: "请选择",
          options: this.operateStatusOptions,
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
      const arr = [
        {
          label: "事件编号",
          prop: "event_number",
          minWidth: "160px",
          render: (h, params) => {
            return h(
              "el-link",
              {
                props: { type: "primary" },
                on: {
                  click: () => {
                    this.viewRecord(params.row.report_event_id);
                  },
                },
              },
              params.row.event_number
            );
          }
        },
        {
          label: "时间",
          prop: "create_time",
          minWidth: "160px",
        },
        {
          label: "来源",
          minWidth: "100px",
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
            return h("div", 
              {
                on: {
                  click: ()=>{
                    const { report_event_id, feedback_number } = params.row;
                    this.handleLook({report_event_id, feedback_number, category: 'feedback' })
                  }
                }
              },
              [ 
                h("span", params.row.feedback_identity || "无"), 
                h("i",
                  {
                    class: {
                      "el-icon-question": true
                    },
                    style: {
                      "margin-left": '4px',
                    },
                  },
                ),
              ]
            )
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
            return h("div", 
              {
                on: {
                  click: ()=>{
                    const { report_event_id, report_number } = params.row;
                    // report_number字段为空，则不触发弹窗
                    if(!report_number) return;
                    this.handleLook({report_event_id, report_number, category: 'report' })
                  }
                }
              },
              [ 
                h("span", params.row.report_identity || "无"), 
                h("i",
                  {
                    class: {
                      "el-icon-question": true
                    },
                    style: {
                      "display":  params.row.report_number ? 'inline-block':'none',
                      "margin-left": '4px',
                    },
                  },
                ),
              ]
            )
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
        {
          label: "操作",
          minWidth: "300px",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: {
                    type: "danger",
                    size: 'mini'
                  },
                  style: {
                    display:
                    params.row.accept_type === 0 
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.handleControl(params.row);
                    },
                  },
                },
                "受理"
              ),
              h(
                "el-button",
                {
                  props: { type: "success",size: 'mini' },
                  style: {
                    display:
                      params.row.status === 1 &&
                      this.permissionArr.includes("UserPunishLog@remove")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.relieve(params.row);
                    },
                  },
                },
                "解除"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger",size: 'mini' },
                  style: {
                    display:
                      params.row.status === 0 &&
                      this.permissionArr.includes("UserPunishLog@save")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.blocked(params.row);
                    },
                  },
                },
                "处罚"
              ),
              h(
                "el-button",
                {
                  props: { type: "primary",size: 'mini' },
                  style: {
                    display:
                      params.row.status === 0 &&
                      this.permissionArr.includes("UserPunishLog@pass")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.neglect(params.row.id);
                    },
                  },
                },
                "忽略"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger",size: 'mini' },
                  style: {
                    display:
                      params.row.status === 1 &&
                      this.permissionArr.includes("UserPunishLog@save")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.reblocked(params.row);
                    },
                  },
                },
                "复审处罚"
              ),
              h(
                "el-button",
                {
                  props: { type: "primary",size: 'mini' },
                  style: {
                    display:
                      params.row.from === "后台处罚" &&
                      params.row.status === 1 &&
                      this.permissionArr.includes("UserPunishLog@updateSource")
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.update(params.row);
                    },
                  },
                },
                "补充/修改证据"
              ),
              h(
                "el-button",
                {
                  props: { type: "primary",size: 'mini' },
                  on: {
                    click: () => {
                      this.handleOperationLog(params.row);
                    },
                  },
                },
                "操作日志"
              ),
            ]);
          },
        },
      ];

      let columns = this.permissionArr.includes("UserPunishLog@index") ? arr : [];
      // 过滤不显示的账号
      const invisibleKeyArr = this.filterColumns.filter(item => !item.visible).map(item => item.key);
      columns = arr.filter(item => !invisibleKeyArr.includes(item.prop))

      // 请求url
      let url = REQUEST.risk.NewUserPunishLog
      if(this.filterType === 'guild') {
        url = REQUEST.risk.NewGuildPunishLog
      }

      return {
        vm: this,
        url,
        search: {
          sizes: [10, 30, 50, 100],
        },
        columns,
      };
    },
  },
  // mounted() {
  //   const { fullPath } = this.$route;
  //   this.$store.commit('permission/SET_CUR_BTN', fullPath)
  //   console.log(this.permissionArr, 'permissionArr');
  // },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params ? params.page : 1,
        page_size: params ? params.size : 10,
        group: s.group,
        user_number: s.user_number,
        guild_number: s.guild_number,
        guild_name: s.guild_name,
        operator: s.operator,
        punish_type_id: s.punish_type_id,
        status: s.status,
        risk_level: s.risk_level,
        guild_operator: s.guild_operator,
        start_time: s.start_time
          ? Math.floor(s.start_time / 1000)
          : s.start_time,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
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
    // 新增
    add() {
      this.load("add");
    },
    // 封禁
    blocked(row) {
      this.load("blocked", row);
    },
    // 再次封禁
    reblocked(row) {
      this.load("reblocked", row);
    },
    // 修改
    update(row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.uploadImg.loadParams(row);
      }, 50);
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.userComp.loadParams(status, row);
      }, 50);
    },
    // 解除
    async relieve(row) {
      const params = {
        id: row.id,
        result: row.result,
        remove_time: row.remove_time,
      };
      this.$refs.unbanComp.load(params)
    },
    // 忽略
    neglect(id) {
      this.$refs.ignoreComp.load(id)
    },
    // 导出excel
    async BatchRurn() {
      let s = this.beforeSearch();
      s.is_all = 1; // 导出数据时传1
      s.is_export = 1; // 导出数据时传1
      let res;
      if(this.filterType === 'guild') {
        res = await NewGuildPunishLog(s)
      } else {
        res = await NewUserPunishLog(s)
      }
      let arr = JSON.parse(JSON.stringify(res.data.list));
      if (arr.length <= 0) return this.$warning("当前没有数据可以导出");
      arr = arr.map((item, index) => {
        let riskLevelData = MAPDATA.RISKLEVELLIST.find((v) => {
          return v.value === item.risk_level;
        })
        let params = {
          event_number: item.event_number,
          create_time: item.create_time,
          from: item.from || item.source || "无",
          feedback_number: item.feedback_number,
          feedback_name: item.feedback_name,
          feedback_identity: item.feedback_identity,
          feedback_guild_name: item.feedback_user_guild?item.feedback_user_guild.guild_name : "--",
          feedback_add_time: item.feedback_user_guild?item.feedback_user_guild.add_time : "--",
          feedback_status: item.feedback_user_guild?item.feedback_user_guild.status : "--",
          feedback_type: item.feedback_type || "无",
          content: item.content || "无",
          report_number: item.report_number,
          report_name: item.report_name,
          report_identity: item.report_identity,
          state: item.state || "无",
          punish_type: item.punish_type || "无",
          result: Array.isArray(item.result)?item.result.join(";"):item.result,
          risk_level: riskLevelData ? riskLevelData.name : "无",
          remove_time: item.remove_time || "无",
          operator: item.operator || "无",
          remark: item.remark,
        };
        return params;
      });
      let nameList = [
        "事件编号",
        "时间",
        "来源",
        "被举报用户ID",
        "被举报用户昵称",
        "被举报用户身份",
        "被举报用户当前所属公会",
        "被举报用户加入公会时间",
        "被举报用户公会状态",
        "举报类型",
        "举报说明",
        "举报用户ID",
        "举报用户昵称",
        "举报用户身份",
        "处理状态",
        "处罚类别",
        "处罚结果",
        "风险级别",
        "解除时间",
        "审核人",
        "备注说明",
      ];
//       “被举报用户当前所属公会 / 加入公会时间 / 公会状态““被举报用户举报时所属公会 / 加入公会时间 / 公会状态”

// “举报用户当前所属公会 / 加入公会时间 / 公会状态““举报用户举报时所属公会 / 加入公会时间 / 公会状态”
      let tableName = this.filterType === 'user' ? '用户/主播处罚举报记录':'公会处罚举报记录' 
      exportTableData(arr, nameList, tableName);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 销毁组件
    destoryEventComp() {
      this.isEventListDestoryComp = false;
    },
    // 获取处罚类别
    async getPunishType(params) {
      const response = await getPunishTypeList(params);
      if (response.code == 2000) {
        const tempArr = Array.from(
          Array.isArray(response.data) ? response.data : []
        );
        this.punishTypeList =
          tempArr.reduce((prev, curr) => {
            prev.push({
              name: curr.name,
              value: curr.id,
            });
            return prev;
          }, []) || [];
        this.punishTypeList.unshift({ name: "全部", value: "" });
      }
    },
    // 操作日志
    handleOperationLog(row) {
      setTimeout(() => {
        this.$refs.operationLogComp.load(row);
      }, 100);
    },
    // 受理
    async handleControl(row) {
      const response = await acceptPunish({ id: row.report_event_id });
      if (response.code == 2000) {
        this.$success("受理成功");
        this.getList();
      }
    },
    // 风控文案库
    handleCustom() {
      setTimeout(() => {
        this.$refs.wordsComp.load();
      }, 100);
    },
    // 刷新table显示
    refreshTable(arr) {
      this.filterColumns = arr;
    },
    // 查看记录
    viewRecord(report_event_id) {
      this.isEventListDestoryComp = true;
      setTimeout(() => {
        this.$refs.eventListComp.load(report_event_id, this.filterType);
      }, 50);
    },
    // 查看详情
    handleLook(params) {
      setTimeout(() => {
        params.type = this.filterType;
        this.$refs.lookComp.load(params);
      }, 100);
    },
  },
  created() {
    this.getPunishType();
  },
};
</script>

<style lang="scss">
.user-punish-popper-wrap {
  background: #303133;
  color: #fff;
  .popper__arrow::after {
    border-bottom-color: #303133 !important;
  }
}
</style>
<style lang="scss" scoped>
.serviceConfig-userPunish-box {
  ::v-deep .share-table-list-box .el-table__body-wrapper {
    max-height: none !important;
    overflow-y: none !important;
  }
}
</style>
