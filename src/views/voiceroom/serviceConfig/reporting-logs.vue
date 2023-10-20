<template>
  <div class="app-container serviceConfig-userPunish-box">
    <div class="searchParams">
      <menuComp
        ref="menuComp"
        :menuList="menuList"
        v-model="tabIndex"
      ></menuComp>
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-add="true"
        @onReset="reset"
        @onSearch="onSearch"
        @add="add"
      ></SearchPanel>
    </div>
    <tableList :cfgs="cfgs" ref="tableList" v-if="tabIndex === '0'"></tableList>
    <tableList
      :cfgs="cfgs2"
      ref="tableList"
      v-if="tabIndex === '1'"
    ></tableList>

    <!-- 新增组件 -->
    <userComp
      v-if="isDestoryComp"
      ref="userComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></userComp>
  </div>
</template>

<script>
// 引入api
import { removeUser, reportGuildOrUser } from "@/api/risk";
// 引入新增组件
import userComp from "./components/userComp.vue";
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
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    userComp,
    menuComp,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      searchParams: {
        // status: 1,
      },
      menuList: [
        {
          name: "用户",
        },
        {
          name: "公会",
        },
      ],
      tabIndex: "0",
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "object_number",
          type: "input",
          value: "",
          label: "举报用户ID",
          isNum: true,
          placeholder: "请输入用户ID",
        },
        {
          name: "type",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "反馈类型",
          placeholder: "请选择",
          options: MAPDATA.USERPUNISHTYPELISTCOPY,
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
      return {
        vm: this,
        url: REQUEST.risk.getReportingUserList,
        columns: [
          {
            label: "举报时间",
            prop: "create_time",
            minWidth: "100px",
          },
          {
            label: "举报对象账号",
            minWidth: "100px",
            render: (h, params) => {
              return h("div", [
                h("div", params.row.feedback_number),
                h("div", params.row.feedback_name || "无"),
              ]);
            },
          },
          {
            label: "举报对象身份",
            render: (h, params) => {
              return h("div", [h("div", params.row.feedback_identity)]);
            },
          },
          {
            label: "举报类型",
            render: (h, params) => {
              let data = MAPDATA.USERPUNISHTYPELIST.find((item) => {
                return item.value === params.row.type;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "举报内容",
            prop: "feedback_content",
            minWidth: "100px",
            render: (h, params) => {
              return h("span", params.row.feedback_content || "无");
            },
          },
          {
            label: "图片证据",
            isImgAndVideoList: true,
            prop: "img_path",
            type: 1,
            imgWidth: "50px",
            imgHeight: "50px",
            minWidth: "150px",
          },
          {
            label: "视频证据",
            isImgAndVideoList: true,
            prop: "video_path",
            type: 1,
            imgWidth: "50px",
            imgHeight: "50px",
            minWidth: "150px",
          },
          {
            label: "音频证据",
            isImgAndVideoList: true,
            prop: "sound_path",
            type: 1,
            imgWidth: "50px",
            imgHeight: "50px",
            minWidth: "150px",
          },
          // {
          //               label: '声音签名',
          //               isimg: true,
          //               prop: 'audio',
          //               imgWidth: '50px',
          //               imgHeight: '50px',
          //               minWidth: '170px'
          //           },
          // {
          // 		label: '音乐',
          // 		isimg: true,
          // 		prop: 'url',
          // 		nameProp: 'name',
          //     				subNameProp: 'singer',
          // 		tagProp: 'tags',
          // 		width: '300px'
          // 	},
          // 视频
          // {
          //   label: "图片",
          //   isimgList: true,
          //   prop: "media_list",
          //   imgWidth: "50px",
          //   imgHeight: "50px",
          // },
          {
            label: "处理状态",
            render: (h, params) => {
              return h("span", params.row.state || "无");
            },
          },
          {
            label: "处罚结果",
            render: (h, params) => {
              return h("span", params.row.result || "无");
            },
          },
          {
            label: "风险级别",
            render: (h, params) => {
              let data = MAPDATA.USERPUNISHRISKLIST.find((item) => {
                return item.value === params.row.risk_level;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "解除时间",
            render: (h, params) => {
              return h("span", params.row.remove_time || "无");
            },
          },
          {
            label: "审核人",
            render: (h, params) => {
              return h("span", params.row.operator || "无");
            },
          },
          {
            label: "备注说明",
            render: (h, params) => {
              return h("span", params.row.remark || "无");
            },
          },
        ],
      };
    },
    cfgs2() {
      return { ...this.cfgs, url: REQUEST.risk.getReportingGuildList };
    },
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        page_size: params.size,
        // user_number: s.user_number,
        type: s.type,
        // status: s.status,
        object_number: s.object_number,
        // guild_name: s.guild_name,
        // report_user_number: s.report_user_number,
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
      this.searchParams = {
        status: 1,
      };
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
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.userComp.loadParams(status, row);
      }, 50);
    },
    // 解除
    async deleteParams(id) {
      let res = await removeUser({ id });
      if (res.code === 2000) {
        this.$success("解除成功");
        this.getList();
      }
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
  },
  watch: {
    tabIndex(newVal, oldVal) {
      this.reset();
    },
  },
};
</script>

<style lang="scss" scoped></style>
