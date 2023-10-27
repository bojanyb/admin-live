<template>
  <div>
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
      <TableList ref="tableList" :cfgs="cfgs" layout="sizes, total, prev, pager, next, jumper" />
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
import { getAdSelect, getAdTypeSelect } from "@/api/market";
import SearchPanel from "@/components/SearchPanel/final.vue"
import TableList from "@/components/tableList/TableList.vue"
import LinkMonitor from "./linkMonitor"
export default {
  name: 'MonitorDataComp',
  mixins: [mixins],
  components: {
    SearchPanel,
    TableList,
    LinkMonitor,
  },
  data() {
    return {
      isDestroyedComponent: false, // 销毁组件
      chainList: [],
      activeNameList: [],
    };
  },
  mounted() {
    this.fetchChainData();
    this.fetchAdTypeData();
  },
  computed: {
    searchFormFields() {
      return [
        // {
        //   name: "category_id",
        //   type: "select",
        //   value: "",
        //   keyName: "id",
        //   optionLabel: "name",
        //   label: "媒体",
        //   placeholder: "请选择",
        //   options: this.chainList,
        //   clearable: true,
        // },
        {
          name: "chains",
          type: "cascader",
          value: "",
          keyName: "value",
          optionLabel: "label",
          label: "推广活动",
          placeholder: "请选择",
          options: this.activeNameList,
          clearable: true,
          multiple: true,
          collapse: true,
          filterable: true,
          props: { multiple: true }
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
              return h('span', `${params.row.range_people}/${params.row.range_amount.toFixed(2)}`)
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
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch(params) {
      const s = {
        ...this.searchParams,
        ...this.dateTimeParams,
      };
      let data = s.chains ? JSON.parse(JSON.stringify(s.chains)) : []
      const result = data.reduce((prev, curr) => {
        curr.map((item, index) => {
          if (index !== 0) {
            prev.push(item)
          }
        })
        return prev
      }, [])
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        chains: (result && result.length) ? result : [],
        start_time: Math.floor(s.start_time / 1000),
        end_time: Math.floor(s.end_time / 1000),
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
        setTimeout(() => {
          this.$refs.linkMonitor.load(status, row);
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
        const response = await getAdSelect();
        if (response.code === 2000) {
          this.chainList = response.data;
          this.chainList.unshift({ id: -1, name: "全部" });
          console.log(this.chainList, "this.chainList");
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 获取监测链接数据并处理
     */
    async fetchAdTypeData() {
      try {
        const response = await getAdTypeSelect();
        if (response.code === 2000) {
          console.log('[ response.data ] >', )
          const result = response.data.reduce((prev, curr) => {
            const temp = {
              value: curr.category_id + '',
              label: curr.name,
              children: curr.select.map(item => {
                return {
                  value: item.ad_type + '',
                  label: item.remark,
                }
              })
            }
            prev.push(temp)
            return prev;
          }, [])
          this.activeNameList = result;
          console.log(this.activeNameList, "this.activeNameList");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>