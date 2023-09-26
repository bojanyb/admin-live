<template>
  <div class="link-data-monitor">
    <!-- 表单 -->
    <div class="link-data-monitor__form-container">
      <SearchPanel
        v-model="searchParams"
        :forms="searchFormFields"
        showReset
        showSearchBtn
        showAdd
        @onReset="resetForm"
        @onSearch="searchForm"
        @add="addForm"
      />
    </div>
    <div class="link-data-monitor__table-list">
      <TableList :cfgs="tableConfig" ref="tableList" />
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
import { timeFormat } from "@/utils/common.js";
import MAPDATA from "@/utils/jsonMap.js";

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
          name: "gift_type",
          type: "select",
          value: "全部",
          keyName: "id",
          optionLabel: "title",
          label: "检测链接",
          placeholder: "请选择",
          options: [],
		      clearable: true,
        },
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
      ];
    },
    tableConfig() {
      return {
        vm: this,
        url: REQUEST.system.sysList,
        columns: [
          {
            label: "发送时间",
            minWidth: "50px",
            render: (h, params) => {
              const createTime = params.row.create_time;
              const formattedTime = createTime
                ? timeFormat(createTime, "YYYY-MM-DD HH:mm:ss", true)
                : "--";

              return h("span", formattedTime);
            },
          },
          {
            label: "用户",
            minWidth: "50px",
            prop: "target_val",
          },
          {
            label: "消息标题",
            minWidth: "50px",
            render: (h, params) => {
              const title = params.row.title || "--";
              return h("span", title);
            },
          },
          {
            label: "消息内容",
            showOverFlow: true,
            render: (h, params) => {
              const content = params.row.content || "--";
              return h("span", { domProps: { innerHTML: content } });
            },
          },
          {
            label: "跳转类型",
            minWidth: "50px",
            render: (h, params) => {
              const pushType = params.row.push_type;
              const data = MAPDATA.PATHTYPE2.find(
                (item) => item.value === pushType
              );
              const typeName = data ? data.name : "--";
              return h("span", typeName);
            },
          },
        ],
      };
    },
  },
  data() {
    return {
      isDestroyedComponent: false, // 销毁组件
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
      return {
        page,
        user_number: searchParams.user_number,
        start_time: Math.floor(searchParams.start_time / 1000),
        end_time: Math.floor(searchParams.end_time / 1000),
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
    openDataEditorDialog(status, row) {
      this.isDestroyedComponent = true;
      this.$nextTick(() => {
        this.$refs.dataEditor.dialogVisible = true;
        this.$refs.dataEditor.load(status, row);
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
  },
};
</script>

<style lang="scss">
.link-data-monitor {
  padding: 20px;
  box-sizing: border-box;
}
</style>
