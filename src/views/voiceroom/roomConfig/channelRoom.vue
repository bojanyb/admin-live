<template>
  <div class="room-livelist">
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-add="tabIndex === '0'"
        :show-search-btn="tabIndex === '0'"
        :show-save="tabIndex === '1'"
        @add="add"
        @onSearch="onSearch"
        @save="onSave"
      ></SearchPanel>
    </div>

    <tableList
      v-if="tabIndex === '0'"
      :cfgs="cfgs"
      ref="tableList"
      @saleAmunt="saleAmunt"
    ></tableList>

    <!-- 新增or修改组件 -->
    <editComp
      v-if="isDestoryComp"
      ref="editComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></editComp>
  </div>
</template>

<script>
// 引入api
import { setBroadcastPrice } from "@/api/videoRoom";
// 引入tab菜单组件
import menuComp from "@/components/menuComp/index.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入新增or修改组件
import editComp from "./components/editComp.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "BroadcastList",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    editComp,
    menuComp,
  },
  data() {
    return {
      tabIndex: "0",
      menuList: [{ name: "房间广播列表" }, { name: "房间广播配置" }],
      isDestoryComp: false, // 是否销毁组件
      ruleForm: {},
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "app渠道",
          isNum: true,
          placeholder: "请输入app渠道",
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.broadcastList,
        columns: [
          {
            label: "添加时间",
            minWidth: "180px",
            render: (h, params) => {
              return h(
                "span",
                params.row.create_time
                  ? timeFormat(
                      params.row.create_time,
                      "YYYY-MM-DD HH:mm:ss",
                      true
                    )
                  : "无"
              );
            },
          },
          {
            label: "渠道",
            prop: "content",
          },
          {
            label: "房间ID",
            prop: "user_number",
          },
          {
						label: '操作',
						minWidth: '120px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.add()}}}, '删除'),
							])
						}
					}
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
        user_number: s.user_number,
        start_time: s.start_time ? Math.floor(s.start_time / 1000) : 0,
        end_time: s.end_time ? Math.floor(s.end_time / 1000) : 0,
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
    // 新增
    add() {
      this.load("add");
    },
    // 保存
    onSave(fromData) {
      if (!fromData.cost) {
        return false;
      }
      this.$confirm("你确定要保存推广单价吗？", "保存提醒", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          let response = await setBroadcastPrice({ cost: +fromData.cost });
          if (response.code === 2000) {
            loading.close();
            this.$message({
              message:
                Object.prototype.toString.call(response) ===
                  "[object Object]" && "保存成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          loading.close();
        });
    },
    // 修改
    add() {
      this.load("add");
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.editComp.loadParams(status, row);
      }, 50);
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 列表返回数据
    saleAmunt(data) {
      const { total_cost, user_count, count } = data;
      this.ruleForm = { total_cost, user_count, count };
    },
  },
};
</script>
<style lang="scss">
.room-livelist {
  padding: 20px;
  box-sizing: border-box;
  .box-card {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    padding: 0px 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .box-card-inner {
      > span {
        font-size: 15px;
        color: #ffffff;
        margin-right: 100px;
      }
    }
  }
}
</style>
