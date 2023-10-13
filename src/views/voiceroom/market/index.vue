<template>
  <div class="link-data-monitor">
    <!-- 表单 -->
    <div class="link-data-monitor__form-container">
      <SearchPanel
        v-model="searchParams"
        :forms="searchFormFields"
        showReset
        showSearchBtn
        customName="监测链接管理"
        @onReset="resetForm"
        @onSearch="searchForm"
        @custom="addForm"
      />
    </div>
    <div class="link-data-monitor__table-list">
      <TableList :cfgs="cfgs" ref="tableList" />
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
import { getChannels } from "@/api/system";

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
          value: "",
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
    cfgs() {
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
            label: "区间付费人数/金额",
            prop: "range_people",
            minWidth: "100px",
            render: (h, params) => {
								return h('span', `${params.row.range_people}/${params.row.range_amount}`)
							}
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
      chainList: [],
    };
  },
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch(params) {
      const { ...searchParams } = {
        ...this.searchParams,
        ...this.dateTimeParams,
      };
      console.log(searchParams.chains, "searchParams.chains");
      searchParams.chains = searchParams.chains ? [searchParams.chains] : "";
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
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
    openDataEditorDialog() {
      this.isDestroyedComponent = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.linkMonitor.dialogVisible = true;
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
     * 获取监测链接数据并处理
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
