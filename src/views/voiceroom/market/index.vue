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
        showCustom
        customName="监测链接管理"
        @onReset="resetForm"
        @onSearch="searchForm"
        @custom="addForm"
      />
    </div>
    <div class="link-data-monitor__table-list">
      <TableList :cfgs="tableConfig" ref="tableList" />
    </div>
    <!-- 检测链接管理 -->
    <LinkMonitor
      ref="linkMonitor"
      v-if="isDestroyedComponent"
      @onSearch="searchForm"
      @destoryComp="handleComponentDestroyed"
    />
  </div>
</template>

<script>
import mixins from "@/utils/mixins.js";
import REQUEST from "@/request/index.js";
import { getChain } from "@/api/market";

export default {
  components: {
    TableList: () => import("@/components/tableList/TableList.vue"),
    SearchPanel: () => import("@/components/SearchPanel/final.vue"),
    LinkMonitor: () => import("./components/linkMonitor.vue"),
  },
  mixins: [mixins],
  computed: {
    searchFormFields() {
      return [
        {
          name: "chains",
          type: "select",
          value: "全部",
          keyName: "value",
          optionLabel: "name",
          label: "检测链接",
          placeholder: "请选择",
          options: this.chainList,
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
        url: REQUEST.market.monitorChainData,
        columns: [
          {
            label: "日期",
            prop: "register_date",
          },
          {
            label: "注册",
            prop: "register_people",
          },
          {
            label: "当日付费人数",
            prop: "first_day_people",
          },
          {
            label: "当日付费金额",
            prop: "first_day_amount",
          },
          {
            label: "次日付费人数/金额",
            prop: "second_day",
          },
          {
            label: "三日付费人数/金额",
            prop: "third_day",
          },
          {
            label: "七日付费人数/金额",
            prop: "seven_day",
          },
          {
            label: "三十日付费人数/金额",
            prop: "thirty_day",
          },
          {
            label: "日活用户",
            prop: "use_app",
          },
          {
            label: "渠道总付费人数",
            prop: "channel_people",
          },
          {
            label: "渠道总付费金额",
            prop: "channel_amount",
          },
          {
            label: "区间付费人数",
            prop: "range_people",
          },
          {
            label: "总付费人数/金额",
            prop: "total",
          },
        ],
      };
    },
  },
  data() {
    return {
      isDestroyedComponent: false, // 销毁组件
      chainList: []
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
        chains: searchParams.chains,
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
        this.$refs.linkMonitor.dialogVisible = true;
        this.$refs.linkMonitor.load(status, row);
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
     * 获取监测链接数据并处理
     */
     async fetchChainData() {
      try {
        const response = await getChain();
        if (response.code === 2000) {
          this.chainList = response.data.map((curr) => ({
            value: curr.ad_type,
            name: curr.channel,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchChainData();
  },
};
</script>

<style lang="scss">
.link-data-monitor {
  padding: 20px;
  box-sizing: border-box;
}
</style>
