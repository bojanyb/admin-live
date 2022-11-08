<template>
  <div class="room-livelist">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-add="true"
        :show-search-btn="true"
        @add="add"
        @onSearch="onSearch"
      ></SearchPanel>
    </div>

    <tableList
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
import { delAutoJoinConfig } from "@/api/videoRoom";
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

export default {
  name: "channelRoom",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    editComp,
    menuComp,
  },
  data() {
    return {
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
        url: REQUEST.room.getAutoJoinConfig,
        columns: [
          {
            label: "添加时间",
            minWidth: "180px",
            prop: "create_time"
          },
          {
            label: "渠道",
            prop: "channel",
          },
          {
            label: "房间ID",
            prop: "room_id",
          },
          {
						label: '操作',
						minWidth: '120px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除'),
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
    // 删除
    async deleteParams(id) {
        this.$confirm('确认删除当前动态吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            let res = await delAutoJoinConfig({ id })
            if(res.code === 2000) {
                this.$success('删除成功')
                this.getList()
            }
        }).catch(() => {});
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
