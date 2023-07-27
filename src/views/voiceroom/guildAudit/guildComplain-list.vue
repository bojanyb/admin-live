<template>
  <div class="app-container">
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

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <!-- 详情组件 -->
    <guildComplainComp
      v-if="isDestoryComp"
      ref="guildComplainComp"
      @onSearch="onSearch"
      @destoryComp="destoryComp"
    ></guildComplainComp>
  </div>
</template>

<script>
// 引入详情组件
import guildComplainComp from "./components/guildComplainComp.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import { getUserComplainOptions } from "@/api/videoRoom";
export default {
  name: "guildComplain-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    guildComplainComp,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      dateTimeParams: {},
      statusOptions: [
        {
          value: '',
          name: '全部'
        },
        {
          value: 1,
          name: '已受理'
        },
        {
          value: 0,
          name: '未受理'
        }
      ],
      typeOption:{}
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "投诉时间",
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
        {
          name: "user_id",
          type: "input",
          value: "",
          label: "投诉用户ID",
          isNum: true,
          placeholder: "请输入投诉用户ID",
        },
        {
          name: "guild_user_id",
          type: "input",
          value: "",
          label: "公会长ID",
          isNum: true,
          placeholder: "请输入公会长ID",
        },
        {
          name: "status",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "状态",
          placeholder: "请选择",
          options: this.statusOptions,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.guild.getUserComplainList,
        columns: [
          {
            label: "投诉时间",
            minWidth: 120,
            prop: "create_time",
          },
          {
            label: "投诉用户",
            prop: "user_name",
          },
          {
            label: "投诉用户ID",
            prop: "user_id",
          },
          {
            label: "被投诉公会",
            prop: "guild_name",
          },
          {
            label: "被投诉公会所属公会长",
            prop: "guild_user_name",
          },
          {
            label: "公会长ID",
            prop: "guild_user_id",
          },
          {
            label: "公会所属运营",
            prop: "operator",
          },
          {
            label: "投诉类型",
            showOverFlow: true,
            render: (h, params) => {
              const arr = params.row.complaint_ids;
              let data = []
              arr.forEach(item => {
                data.push(this.typeOption[item]);
              })
              return h("span", data.join(','));
            },
          },
          {
            label: "投诉原因",
            showOverFlow: true,
            render: (h, params) => {
              return h("span", params.row.content || "无");
            },
          },
          {
            label: "投诉证据",
            isimgList: true,
            prop: "pics",
            // propCopy: 'video_path',
            imgWidth: '70px',
            imgHeight: '70px',
            width: '200px'
          },
          {
            label: "受理操作人",
            render: (h, params) => {
              return h("span", params.row.admin || "无");
            },
          },
          {
            label: "受理时间",
            minWidth: 120,
            render: (h, params) => {
              return h("span", params.row.update_time || "无");
            },
          },
          {
            label: "备注",
            render: (h, params) => {
              return h("span", params.row.remark || "无");
            },
          },
          {
            label: "操作",
            width: 100,
            fixed: 'right',
            render: (h, params) => {
              return h(
                "el-button",
                {
                  props: {
                    type: params.row.status === 0 ? "danger" : "info",
                    size: 'mini'
                  },
                  style: {
                    display:
                      params.row.status || params.row.status === 0
                        ? "unset"
                        : "none",
                  },
                  on: {
                    click: () => {
                      this.func(params.row);
                    },
                  },
                },
                `${params.row.status === 0 ? "未受理" : "已受理"}`
              );
            },
          },
        ],
      };
    },
  },
  created() {
    this.getOptions();
  },
  methods: {
    // 配置参数
    beforeSearch(params) {
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        pagesize: params.size,
        start_time: s.start_time
          ? Math.floor(s.start_time / 1000)
          : s.start_time,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : s.end_time,
        user_id: s.user_id,
        guild_user_id: s.guild_user_id,
        status: s.status,
      };
    },
    getOptions() {
      getUserComplainOptions().then((res) => {
        if (res.code === 2000) {
          const data = res.data;
          console.log(data);
          this.typeOption = data.complaint_type
        }
      })
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
    // 操作
    func(row) {
      if(row.status === 1) return;
      this.showDialog(row);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    showDialog(row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.guildComplainComp.load(row);
      }, 50);
    },
  },
};
</script>
<style lang="scss"></style>
