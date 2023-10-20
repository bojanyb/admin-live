<template>
  <div class="roomConfig-roomMessage-box">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-batch-pass="false"
        @batchPass="handleBatchPass"
        batchFuncName="批量修改房间类型"
        :show-batch-rurn="true"
        @onReset="reset"
        @onSearch="onSearch"
        @BatchRurn="handleBatchRurn"
        batchRurnName="批量停播"
      ></SearchPanel>
    </div>

    <tableList
      :cfgs="cfgs"
      ref="tableList"
      @selectionChange="selectionChange"
    ></tableList>

    <!-- 引入新增 - 修改组件 -->
    <roomComp
      v-if="isDestoryComp"
      ref="roomComp"
      @destoryComp="destoryComp"
      @getList="getList"
      :classifyList="classifyList"
    ></roomComp>

    <!-- 单个关闭直播和修改类型 -->
    <typeComp
      v-if="isDestoryComp"
      ref="typeComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></typeComp>

    <!-- 批量修改类型 -->
    <typeBatchComp
      v-if="isDestoryComp"
      ref="typeBatchComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></typeBatchComp>
  </div>
</template>

<script>
// 引入api
import { partyRoomTypes, closeRoomLives } from "@/api/house.js";
// 引入房间类型详情组件
import typeComp from "./components/typeNewComp.vue";
// 引入新增 - 修改组件
import roomComp from "./components/roomComp.vue";
// 引入typeBatchComp组件
import typeBatchComp from "./components/typeBatchComp.vue";
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
    typeComp,
    roomComp,
    typeBatchComp,
  },
  data() {
    return {
      isDestoryComp: false, // 是否销毁组件
      classifyList: [],
      liveStatusList: [
        //直播状态列表 -1-全部、0-关播、1-直播中
        {
          id: -1,
          name: "全部",
        },
        {
          id: 0,
          name: "关播",
        },
        {
          id: 1,
          name: "直播中",
        },
      ],
      searchParams: {
        // party_status: 2,
        // admin_recommend_status: -1
        room_number: "",
        user_number: "",
        guild_number: "",
        room_category_id: "",
        live_status: "",
        sort_field: "",
        sort: "",
      },
      // 选择的列表
      selectList: [],
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "room_number",
          type: "input",
          value: "",
          label: "房间ID",
          isNum: true,
          placeholder: "请输入单个房间ID",
        },
        {
          name: "user_number",
          type: "input",
          value: "",
          label: "房主ID",
          isNum: true,
          placeholder: "请输入单个房间ID",
        },
        {
          name: "guild_number",
          type: "input",
          value: "",
          label: "公会ID",
          isNum: true,
          placeholder: "请输入公会ID",
        },
        {
          name: "room_category_id",
          type: "select",
          value: "",
          keyName: "id",
          optionLabel: "name",
          label: "房间类型",
          placeholder: "请选择",
          options: this.classifyList,
        },
        {
          name: "is_live",
          type: "select",
          value: "",
          keyName: "id",
          optionLabel: "name",
          label: "直播状态",
          placeholder: "请选择",
          options: this.liveStatusList,
        },
        // {
        //     name: 'admin_recommend_status',
        //     type: 'select',
        //     value: -1,
        //     keyName: 'value',
        //     optionLabel: 'name',
        //     label: '热门推荐',
        //     placeholder: '请选择',
        //     options: MAPDATA.HOUSEMESSAGEHOTRECOMMENDLIST
        // }
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.house.partyRoomList,
        isShowCheckbox: true,
        columns: [
          {
            label: "房间",
            minWidth: "100px",
            render: (h, params) => {
              return h("div", [
                h("div", params.row.room_title || "无"),
                h("div", params.row.room_number || "无"),
              ]);
            },
          },
          {
            label: "房间封面",
            isimg: true,
            prop: "room_cover",
            imgHeight: "50px",
            minWidth: "100px",
          },
          {
            label: "房间类型",
            minWidth: "100px",
            render: (h, params) => {
              return h("span", params.row.room_category_name || "无");
            },
          },
          {
            label: "直播状态",
            minWidth: "100px",
            render: (h, params) => {
              return h(
                "span",
                this.liveStatusList[params.row.is_live + 1] &&
                  this.liveStatusList[params.row.is_live + 1].name
              );
            },
          },
          {
            label: "所属公会",
            minWidth: "100px",
            render: (h, params) => {
              return h("div", [
                h("div", params.row.guild_name),
                h("div", params.row.guild_number || "无"),
              ]);
            },
          },
          {
            label: "房主",
            minWidth: "100px",
            render: (h, params) => {
              return h("div", [
                h("div", params.row.nickname),
                h("div", params.row.user_number || "无"),
              ]);
            },
          },
          {
            label: "今日流水",
            minWidth: "100px",
            prop: "today_flow",
            sortable: true,
            render: (h, params) => {
              return h("div", params.row.today_flow + "钻石");
            },
          },
          {
            label: "昨日流水",
            minWidth: "100px",
            prop: "yestoday_flow",
            sortable: true,
            render: (h, params) => {
              return h("div", params.row.yestoday_flow + "钻石");
            },
          },
          {
            label: "本周流水",
            minWidth: "100px",
            prop: "week_flow",
            sortable: true,
            render: (h, params) => {
              return h("div", params.row.week_flow + "钻石");
            },
          },
          {
            label: "上周流水",
            minWidth: "100px",
            prop: "last_week_flow",
            sortable: true,
            render: (h, params) => {
              return h("div", params.row.last_week_flow + "钻石");
            },
          },
          {
            label: "房间人数",
            minWidth: "100px",
            render: (h, params) => {
              return h("span", params.row.numbers + "人");
            },
          },
          // {
          //     minWidth: '100px',
          //     label: '热门推荐',
          //     prop: 'admin_recommend_status',
          //     isSwitch: true,
          //     isTrueValue: 1,
          //     isFalseValue: 0,
          //     activeText: 'ON',
          //     inactiveText: 'OFF',
          //     change: (v, row) => {
          //         this.hotRecommend(row, v)
          //     },
          //     render: (h, params) => {
          //         return h('span', '')
          //     }
          // },
          {
            label: "操作",
            minWidth: "250px",
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "el-button",
                  {
                    props: { type: "primary" },
                    on: {
                      click: () => {
                        this.update(params.row);
                      },
                    },
                  },
                  "房间信息"
                ),
                h(
                  "el-button",
                  {
                    props: {
                      type: "primary",
                      disabled: !params.row.guild_number,
                    },
                    on: {
                      click: () => {
                        this.setHouseClassify(params.row);
                      },
                    },
                  },
                  "房间操作"
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
      let s = { ...this.searchParams };
      let data = {
        room_number: s.room_number,
        user_number: s.user_number,
        guild_number: s.guild_number,
        room_category_id: s.room_category_id,
        live_status: s.is_live,
        // room_category_id: s.room_category_id,
        // party_status: s.party_status,
      };
      // if(s.admin_recommend_status > -1){
      //     data.admin_recommend_status = s.admin_recommend_status
      // }
      return {
        page: params.page,
        pagesize: params.size,
        ...data,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {
        // party_status: 2,
        // admin_recommend_status: -1
      };
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 修改
    update(row) {
      this.load("update", row);
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.roomComp.loadParams(status, row, this.classifyList);
      }, 50);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 获取房间分类
    async getHouse() {
      let res = await partyRoomTypes({ belong: 2 });
      if (res.data.list && res.data.list.length > 0) {
        res.data.list.unshift({
          name: "全部",
          id: "",
        });
      }
      this.classifyList = res.data.list || [];
    },
    // 设置房间分类
    setHouseClassify(row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.typeComp.loadParams(row);
      }, 50);
    },
    // 批量设置房间分类
    setTypeBatch(list) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.typeBatchComp.loadParams(this.selectList);
      }, 50);
    },
    // // 热门推荐
    // async hotRecommend(row, v) {
    //     let params = {
    //         room_title: row.room_title,
    //         id: row.id,
    //         room_cover: row.room_cover,
    //         room_category_id: row.room_category_id,
    //         room_notice: row.room_notice,
    //         // admin_recommend_status: v
    //     }
    //     let res = await updateParty(params)
    //     if(res.code === 2000) {
    //         this.$success('操作成功')
    //         this.getList()
    //     }
    // }
    // 选中
    selectionChange(val) {
      this.selectList = val;
    },
    // 批量修改房间类型
    handleBatchPass() {
      this.setTypeBatch(1);
    },
    // 批量关停
    handleBatchRurn() {
      this.batchClose();
    },
    batchClose() {
      if (this.selectList.length <= 0) {
        this.$warning("请至少选择一条数据");
        return false;
      }
      this.$confirm("你确定要批量关停此批数据吗？", "操作提醒", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          let params = {
            user_ids: "",
            room_ids: "",
          };
          params.user_ids = this.selectList
            .map((item) => item.user_id)
            .join(",");
          params.room_ids = this.selectList
            .map((item) => item.room_id)
            .join(",");
          let res = await closeRoomLives(params);
          if (res.code === 2000) {
            this.$success("批量操作成功");
          }
          this.getList();
        })
        .catch(() => {});
    },
  },
  created() {
    this.getHouse();
  },
};
</script>

<style lang="scss">
.roomConfig-roomMessage-box {
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
