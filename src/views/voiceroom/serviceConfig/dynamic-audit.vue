<template>
  <div class="app-container serviceConfig-coverAudit-box">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-batch-pass="true"
        :show-batch-rurn="true"
        batch-rurn-name="批量删除"
        :show-custom="true"
        custom-name="批量忽略"
        @batchPass="handleBatchPass"
        @BatchRurn="handleBatchDelete"
        @custom="handleBatchIgnore"
        @onReset="reset"
        @onSearch="onSearch"
      ></SearchPanel>
    </div>

    <tableList :cfgs="cfgs" ref="tableList" @selectionChange="selectionChange"></tableList>

    <!-- 审核组件 -->
    <coverComp
      v-if="isDestoryComp"
      ref="coverComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></coverComp>

    <!-- 详情组件 -->
    <coverDetails ref="coverDetails"></coverDetails>
  </div>
</template>

<script>
// 引入api
import { coverCheck, review } from "@/api/risk";
// 引入审核组件
import coverComp from "./components/coverComp.vue";
// 引入详情组件
import coverDetails from "./components/coverDetails.vue";
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
export default {
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    coverComp,
    coverDetails,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      searchParams: {
        status: 1,
      },
      selectList : [],
      ids: []
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
          isNum: true,
          placeholder: "请输入用户ID",
        },
        {
          name: "dynamic_number",
          type: "input",
          value: "",
          label: "动态ID",
          isNum: true,
          placeholder: "请输入动态ID",
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
        isShowCheckbox: true,
        url: REQUEST.risk.roomCoverCheckList,
        columns: [
            {
                label: '动态ID',
                prop: "user_number"
            },
            {
                label: '发送者昵称',
                prop: "nickname"
            },
          {
            label: "标题",
            prop: "create_time",
          },
          {
            label: "图片",
            isimg: true,
            prop: "cover_url",
            imgWidth: "50px",
            imgHeight: "50px",
          },
          {
            label: "话题",
            prop: "create_time",
          },
          {
            label: "发布时间",
            prop: "create_time",
            minWidth: "100px",
          },
          {
            label: "操作",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    style: {
                      display: params.row.status === 0 ? "unset" : "none",
                    },
                    on: {
                      click: () => {
                        this.audit(params.row.id, 1);
                      },
                    },
                  },
                  "通过"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "warning" },
                    style: {
                      display: params.row.status === 0 ? "unset" : "none",
                    },
                    on: {
                      click: () => {
                        this.audit(params.row.id, 2);
                      },
                    },
                  },
                  "忽略"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "danger" },
                    style: {
                      marginLeft: "0px",
                      display: params.row.status === 2 ? "unset" : "none",
                    },
                    on: { click: () => {} },
                  },
                  "违规删除"
                ),
              ]);
            },
          },
        ],
      };
    },
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
        status: s.status,
        room_number: s.room_number,
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
    // 审核
    async audit(id, status) {
      if (status === 1) {
        let res = await coverCheck({ id, status });
        if (res.code === 2000) {
          this.$success("审核通过");
          this.getList();
        }
      } else {
        this.isDestoryComp = true;
        setTimeout(() => {
          this.$refs.coverComp.loadParams(id, status);
        }, 50);
      }
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 通过/删除/忽略操作
    async func(id, status, name,type) {
        this.$confirm(`是否确认${name}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            let params = {
                ids : type == 1 ? [id] : id,
                status
            }
            let res = await review(params)
            if(res.code === 2000) {
                this.$success(name + '成功')
                this.getList()
            }
        }).catch(() => {});
    },
    // 选中
    selectionChange(v){
      this.selectList = v;
      let ids = [];
      this.selectList.forEach(res=>{ if(res.status == 0){ids.push(res.id)}}); // 过滤待审核数据
      this.ids = ids;
    },
    // 批量通过
    handleBatchPass() {
      if(this.selectList.length == 0 || this.ids.length == 0){
        this.$error("请先选择待审核数据");
        return
      }
      this.func(this.ids,1,"批量通过",2)
    },
    // 批量删除
    handleBatchDelete() {
      if(this.selectList.length == 0 || this.ids.length == 0){
        this.$error("请先选择待审核数据");
        return
      }
      this.func(this.ids,-1,"批量删除",2)
    },
    // 批量忽略
    handleBatchIgnore() {
      if(this.selectList.length == 0 || this.ids.length == 0){
        this.$error("请先选择待审核数据");
        return
      }
      this.func(this.ids,-1,"批量忽略",2)
    }
  },
};
</script>

<style lang="scss" scoped></style>
