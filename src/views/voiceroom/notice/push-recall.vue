<script>
import _ from "lodash";
import moment from "moment";
import SearchPanel from "@/components/SearchPanel/final.vue";
import request from "@/utils/request2";
import REQUEST from "@/request/index.js";
import RecallForm from "./components/RecallForm.vue";
export default {
  name: "push-recall",
  components: {
    SearchPanel,
    RecallForm,
    vnode: {
      functional: true,
      render(h, ctx) {
        return ctx.props.col.render(h, ctx.props.row, ctx.props.col);
      },
    },
  },
  data() {
    return {
      page: 1,
      pagesize: 10,
      total: 0,
      data: [],
      searchParams: {},
      forms: [
        {
          name: "dateTimeParams",
          type: "datePicker",
          dateType: "datetimerange",
          format: "yyyy-MM-dd HH:mm:ss",
          label: "创建时间",
          value: "",
        },
      ],
      columns: [
        { prop: "created_at", label: "创建时间", minWidth: "150" },
        {
          prop: "slumber_time",
          label: "沉睡时间",
          render: (h, row) => <span>{row.slumber_time}小时</span>,
        },
        {
          prop: "push_start_time-push_end_time",
          label: "推送时间",
          minWidth: "150",
          render: (h, row, col) => (
            <span>
              {row.push_start_time} ~ {row.push_end_time}
            </span>
          ),
        },
        { prop: "push_nums", label: "推送次数" },
        {
          prop: "push_time_interval",
          label: "推送间隔",
          render: (h, row, col) => <span>{row.push_time_interval}分钟</span>,
        },
        {
          label: "操作",
          render: (h, row, col) => (
            <div>
              <el-button
                type="text"
                onClick={() => {
                  this.editRow = row;
                  this.showEdit = true;
                }}
              >
                编辑
              </el-button>
              <el-popconfirm
                title="确定删除吗？"
                style="margin-left: 10px;"
                // @NOTE https://github.com/ElemeFE/element/blob/bf534d977eeecfe0de82397f2598f96f45b7885a/packages/popconfirm/src/main.vue#L90C23-L90C23
                onOnConfirm={() => {
                  this.delete(row);
                }}
              >
                <template slot="reference">
                  <el-button type="text">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          ),
        },
      ],
      showAdd: false,
      editRow: undefined,
      showEdit: false,
    };
  },
  computed: {
    fetchParams() {
      return {
        page: this.page,
        pagesize: this.pagesize,
        start_time:
          _.get(this.searchParams, "dateTimeParams[0]") &&
          moment(_.get(this.searchParams, "dateTimeParams[0]")).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        end_time:
          _.get(this.searchParams, "dateTimeParams[1]") &&
          moment(_.get(this.searchParams, "dateTimeParams[1]")).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
      };
    },
  },
  methods: {
    async add(data) {
      const res = await request({
        url: REQUEST.message.addRecallRule,
        method: "post",
        data,
      });
      if (res.code === 2000) {
        this.$notify.success("新增成功");
        this.showAdd = false;
        this.fetchData();
      }
    },
    async update(data) {
      const res = await request({
        url: REQUEST.message.updateRecallRule,
        method: "post",
        data,
      });
      if (res.code === 2000) {
        this.$notify.success("修改成功");
        this.editRow = undefined;
        this.showEdit = false;
        this.fetchData();
      }
    },
    async delete(data) {
      const res = await request({
        url: REQUEST.message.delRecallRule,
        method: "post",
        data,
      });
      if (res.code === 2000) {
        this.$notify.success("删除成功");
        this.fetchData();
      }
    },
    onSearch() {
      this.page = 1;
      this.fetchData();
    },
    async fetchData() {
      const res = await request({
        url: REQUEST.message.recallRuleList,
        method: "post",
        data: this.fetchParams,
      });
      if (res.code === 2000) {
        this.page = res.data.page;
        this.pagesize = res.data.pagesize;
        this.total = res.data.count;
        this.data = res.data.list;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<template>
  <div class="push-recall">
    <SearchPanel
      v-model="searchParams"
      :forms="forms"
      :show-add="true"
      :show-search-btn="true"
      @add="showAdd = true"
      @onSearch="onSearch"
    ></SearchPanel>
    <el-table :data="data">
      <el-table-column
        v-for="(item, i) in columns"
        align="center"
        :key="i"
        v-bind="item"
      >
        <template v-if="item.render" #default="slotProps">
          <vnode :row="slotProps.row" :col="item" />
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        v-model:page-size="pagesize"
        v-model:current-page="page"
        :page-sizes="[10, 20, 30]"
        :total="total"
        class="fr"
      >
      </el-pagination>
    </div>
    <el-dialog
      :width="'600px'"
      :visible.sync="showAdd"
      title="新增用户召回"
      destroy-on-close
    >
      <RecallForm @cancel="showAdd = false" @submit="add" />
    </el-dialog>
    <el-dialog
      :width="'600px'"
      :visible.sync="showEdit"
      title="编辑用户召回"
      destroy-on-close
    >
      <RecallForm
        v-if="showEdit"
        :row="editRow"
        @cancel="
          () => {
            showEdit = false;
            editRow = undefined;
          }
        "
        @submit="update"
      />
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped></style>
