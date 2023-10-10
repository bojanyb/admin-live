<template>
  <div class="online-users-list">
    <!-- 表单 -->
    <div class="online-users-list__form-container">
      <SearchPanel
        v-model="searchParams"
        :forms="searchFormFields"
        showReset
        showSearchBtn
        showExport
        @onReset="resetForm"
        @onSearch="searchForm"
        @add="addForm"
        @export="exportForm"
      />
    </div>
    <!-- 表格 -->
    <div class="online-users-list__table-list">
      <TableList
        :cfgs="cfgs"
        ref="tableList"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </div>
    <!-- 新增/修改 -->
    <DataEditor
      ref="dataEditor"
      v-if="isDestroyedComponent"
      :type="'sysnotice'"
      @onSearch="searchForm"
      @destoryComp="handleComponentDestroyed"
    />
  </div>
</template>

<script>
import mixins from "@/utils/mixins.js";
import REQUEST from "@/request/index.js";
import MAPDATA from "@/utils/jsonMap.js";
import { exportOnlineUserData } from "@/api/market";
import { getChannels } from "@/api/system";
import { timeFormat, exportTableData } from "@/utils/common.js";

export default {
  components: {
    TableList: () => import("@/components/tableList/TableList.vue"),
    SearchPanel: () => import("@/components/SearchPanel/final.vue"),
    DataEditor: () => import("./components/dataEditor.vue"),
  },
  mixins: [mixins],
  computed: {
    searchFormFields() {
      return [
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "时间选择",
          value: "",
          handler: {
            change: this.handleDateTimeChange,
            selectChange: this.handleDateTimeSelectChange,
          },
        },
        {
          name: "channel",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "注册渠道",
          placeholder: "请选择",
          options: this.chainList,
          clearable: true,
        },
        {
          name: "sex",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "性别",
          placeholder: "请选择",
          options: [
            {
              name: "全部",
              value: "",
            },
            {
              name: "男",
              value: 1,
            },
            {
              name: "女",
              value: 2,
            },
          ],
          clearable: true,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.market.onlineUserData,
        search: {
          sizes: [10, 30, 50, 100],
        },
        columns: [
          {
            label: "注册时间",
            minWidth: "50px",
            prop: "create_time",
          },
          {
            label: "注册渠道",
            minWidth: "50px",
            prop: "channel",
          },
          {
            label: "用户ID",
            minWidth: "50px",
            render: (h, params) => {
              const userNumber = params.row.user_number || "--";
              return h("span", userNumber);
            },
          },
          {
            label: "用户昵称",
            minWidth: "50px",
            render: (h, params) => {
              const nickname = params.row.nickname || "--";
              return h("span", nickname);
            },
          },
          {
            label: "性别",
            minWidth: "50px",
            render: (h, params) => {
              const sexValue = params.row.sex;
              const data = MAPDATA.SEXLIST.find(
                (item) => item.value === sexValue
              );
              const sexName = data ? data.name : "未知";
              return h("span", sexName);
            },
          },
          {
            label: "最后一次登录时间",
            minWidth: "50px",
            prop: "last_login",
          },
          {
            label: "充值金额",
            minWidth: "50px",
            render: (h, params) => {
              const recharge = params.row.recharge;
              return h("span", recharge);
            },
          },
          {
            label: "消费金额",
            minWidth: "50px",
            render: (h, params) => {
              const consume = params.row.consume;
              return h("span", consume);
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      isDestroyedComponent: false, // 销毁组件
      chainList: [],
    };
  },
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch() {
      const { page, ...searchParams } = {
        ...this.searchParams,
        ...this.dateTimeParams,
      };
      searchParams.channel = searchParams.channel ? [searchParams.channel] : "";
      searchParams.sex = searchParams.sex ? [searchParams.sex] : "";
      return {
        page,
        channel: searchParams.channel,
        sex: searchParams.sex,
        start_time: Math.floor(searchParams.start_time / 1000) || 1693497600,
        end_time: Math.floor(searchParams.end_time / 1000) || 1696089599,
      };
    },
    // 设置时间段
    setDateTime(arr) {
      const date = arr ? { start_time: arr[0], end_time: arr[1] } : {};
      this.$set(this, "dateTimeParams", date);
    },
    // 重置表单逻辑
    resetForm() {
      this.searchParams = {};
      this.dateTimeParams = {};
      this.getList();
    },
    // 搜索表单逻辑
    searchForm() {
      this.getList();
    },
    // 添加表单逻辑
    addForm() {
      this.openDataEditorDialog("add");
    },
    updateForm(row) {
      this.openDataEditorDialog("update", row);
    },
    openDataEditorDialog() {
      this.isDestroyedComponent = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.dataEditor.dialogVisible = true;
        }, 50);
      });
    },
    // 处理组件销毁逻辑
    handleComponentDestroyed() {
      this.isDestroyedComponent = false;
    },
    handleDateTimeChange(v) {
      this.dateTimeParams = {};
      this.setDateTime(v);
    },
    handleDateTimeSelectChange() {
      this.dateTimeParams = {};
    },
    /**
     * 获取注册渠道数据并处理
     */
    async fetchChainData() {
      try {
        const response = await getChannels();
        if (response.code === 2000) {
          this.chainList = response.data.list.map((curr) => ({
            value: curr.channel,
            name: curr.channel,
          }));
          this.chainList.unshift({ value: "", name: "全部" });
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 导出表格数据
    async exportForm() {
      const searchParams = this.beforeSearch();

      const exportData = {
        ...searchParams,
      };

      const response = await exportOnlineUserData(exportData);
      const type = "xls";
      const fileName = "主播数据";
      this.downloadExportFile(response, fileName, type);
    },
    // 下载导出文件
    downloadExportFile(blob, tagFileName, fileType) {
      tagFileName =
        tagFileName +
        timeFormat(new Date(), "yyyyMMDDHHmmss", false) +
        "." +
        fileType;
      if (window.navigator.msSaveOrOpenBlob) {
        // IE浏览器下
        navigator.msSaveBlob(blob, tagFileName);
      } else {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = tagFileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      }
    },
  },
  created() {
    this.fetchChainData();
  },
};
</script>

<style lang="scss">
.online-users-list {
  padding: 20px;
  box-sizing: border-box;
}
</style>
