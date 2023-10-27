<template>
  <div>
    <!-- 表单 -->
    <div class="link-data-monitor__form-container">
      <SearchPanel
        v-model="searchParams"
        :forms="searchFormFields"
        showReset
        showSearchBtn
        showBatchPass
        batchFuncName="创建广告活动"
        @onReset="resetForm"
        @onSearch="searchForm"
        @batchPass="addForm"
      />
    </div>
    <TableList ref="tableList" :cfgs="cfgs" />
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
import { getAdSelect, handleAdConf } from "@/api/market";
import SearchPanel from "@/components/SearchPanel/final.vue"
import TableList from "@/components/tableList/TableList.vue"
import LinkMonitor from "./linkMonitor"
export default {
  name: 'LinkConfigComp',
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
      searchParams: {}
    };
  },
  mounted() {
    this.fetchChainData();
  },
  computed: {
    searchFormFields() {
      return [
        {
          name: "category_id",
          type: "select",
          value: "",
          keyName: "id",
          optionLabel: "name",
          label: "媒体",
          placeholder: "请选择",
          options: this.chainList,
          clearable: true,
        },
        {
          name: "name",
          type: "input",
          value: "",
          label: "推广活动名称",
          placeholder: "请输入",
          clearable: true,
        },
        {
          name: "remark",
          type: "input",
          value: "",
          label: "代理名称",
          placeholder: "请输入",
          clearable: true,
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.market.adConfList,
        columns: [
          {
            label: "创建时间",
            width: "160px",
            prop: "create_time",
          },
          {
            label: "推广活动名称",
            width: "180px",
            prop: "name",
          },
          {
            label: "代理名称",
            width: "180px",
            prop: "remark",
          },
          {
            label: "媒体",
            width: "150px",
            prop: "category_id",
            render: (h, params) => {
              const data = this.chainList.find(item => item.id === params.row.category_id)
              return h('span', data ? data.name : '--')
            }
          },
          {
            label: "监测链接",
            showOverFlow: true,
            prop: "link",
          },
          {
            label: "关联用户",
            prop: "user_name",
            width: "150px",
            render: (h, params) => {
              return h('span', params.row.user_name ? params.row.user_name : '--')
            }
          },
          {
            label: "操作",
            width: '150px',
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary", size: 'mini' },
                    on: {
                      click: () => {
                        this.updateForm(params.row);
                      },
                    },
                  },
                  "修改"
                ),
                h(
                  "el-button",
                  {
                    props: { type: params.row.status === 1 ? "danger":"success", size: 'mini' },
                    on: {
                      click: () => {
                        this.handleStatus(params.row);
                      },
                    },
                  },
                  params.row.status === 1 ?"停用":"启用"
                ),
              ])
            }
          }
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
      let s = { ...this.searchParams }
      return {
        page: params ? params.page : null,
        pagesize: params ? params.size : null,
        category_id: s.category_id,
        name: s.name,
        remark: s.remark,
      };
    },
    // 设置时间段
    // 重置表单逻辑
    resetForm() {
      this.searchParams = {};
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
          this.chainList.unshift({ id: "", name: "全部" });
          console.log(this.chainList, "this.chainList");
        }
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * 处理状态
     */
    async handleStatus(row) {
      this.$confirm(`确定${row.status === 1 ? '停用':'启用'}当前链接吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const params = {
          id: row.id,
          status: row.status === 1 ? 0 : 1
        }
        const res = await handleAdConf(params);
        if (res.code === 2000) {
          console.log('[ res ] >', res)
          this.$message({
            type: "success",
            message: "操作成功",
          });
          this.getList();
        }
      });
    }
  }
};
</script>