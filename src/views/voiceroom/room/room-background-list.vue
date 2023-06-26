<template>
  <div class="app-container">
    <!-- <div class="btnBox">
			<el-button type="success" @click="add">新增</el-button>
		</div> -->
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-add="true"
        @onReset="reset"
        @onSearch="onSearch"
        @add="add"
      ></SearchPanel>
    </div>

    <tableList :cfgs="cfgs" ref="tableList"></tableList>

    <roomBgEdit
      ref="roomBgEdit"
      v-if="isDestoryComp"
      @destoryComp="destoryComp"
      @getList="getList"
    ></roomBgEdit>
  </div>
</template>

<script>
import { getRoomBgDel } from "@/api/videoRoom";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入图片上传组件
import uploadImg from "@/components/uploadImg/index.vue";
// 编辑组件
import roomBgEdit from "./components/roomBgEdit.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";

export default {
  name: "room-background-list",
  mixins: [mixins],
  components: {
    SearchPanel,
    tableList,
    uploadImg,
    roomBgEdit,
  },
  data() {
    return {
      isDestoryComp: false,
      searchParams: {
        assign_status: 0,
      },
      roomTypeList: [
        {
          name: "派对",
          value: 0,
        },
        {
          name: "直播",
          value: 1,
        },
      ],
    };
  },
  computed: {
    forms() {
      return [
        {
          name: "room_business_type",
          type: "select",
          value: "",
          keyName: "value",
          optionLabel: "name",
          label: "业务类型",
          placeholder: "请选择",
          options: this.roomTypeList,
        },
        {
          name: "assign_status",
          type: "select",
          value: 2,
          keyName: "value",
          optionLabel: "name",
          label: "图片类型",
          placeholder: "请选择图片类型",
          options: MAPDATA.ROOMBACKGROUNDSELECTLIST,
        },
        {
          name: "name",
          type: "input",
          value: "",
          label: "图片名称",
          placeholder: "请输入图片名称",
        },
      ];
    },
    cfgs() {
      return {
        vm: this,
        url: REQUEST.room.roomBg,
        // isShowIndex: true,
        columns: [
          {
            label: "添加时间",
            prop: "create_time"
          },
          {
            label: "图片名称",
            render: (h, params) => {
              return h("span", params.row.name || "无");
            },
          },
          {
            label: "排序权重",
            prop: "sort",
          },
          {
            label: "业务类型",
            render: (h, params) => {
              let data = this.roomTypeList.find((item) => {
                return item.value === +params.row.room_business_type;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "图片类型",
            render: (h, params) => {
              let data = MAPDATA.ROOMBACKGROUNDSELECTLIST.find((item) => {
                return item.value === params.row.assign_status;
              });
              return h("span", data ? data.name : "无");
            },
          },
          {
            label: "图片",
            prop: "url",
            isimg: true,
            imgWidth: "50px",
            imgHeight: "50px",
          },
          // {
          // 	label: '是否默认',
          // 	render: (h, params) => {
          // 		let data = MAPDATA.USERINVITE.find(item => { return item.value === params.row.is_default })
          // 		return h('span', data ? data.name : '无')
          // 	}
          // },
          // {
          // 	label: '上传时间',
          // 	prop: 'create_time',

          // },
          // {
          // 	label: '默认配置房间',
          // 	render: (h, params) => {
          // 		let data = MAPDATA.ROOMTYPELIST.find(item => { return item.value === params.row.room_genre })
          // 		return h('span', data ? data.name : '无')
          // 	}
          // },
          {
            label: "操作",
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
                  "修改"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "danger" },
                    on: {
                      click: () => {
                        this.handleDel(params.row.id);
                      },
                    },
                  },
                  "删除"
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
      return {
        page: params.page,
        pagesize: params.size,
        name: s.name,
        assign_status: s.assign_status == -1 ? '' : s.assign_status,
        room_business_type: s.room_business_type,
      };
    },
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 重置
    reset() {
      this.searchParams = {
        assign_status: 2,
      };
      this.getList();
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 新增
    add() {
      this.load("add");
    },
    // 修改
    update(row) {
      this.load("update", row);
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.roomBgEdit.loadParams(status, row);
      }, 50);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 删除
    async handleDel(id) {
      this.$confirm("是否确定删除该房间背景图?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await getRoomBgDel({ id });
          if (res.code === 2000) {
            this.$message.success("删除成功");
          }
          this.getList();
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped="scoped" lang="scss">
.btnBox {
  margin-bottom: 20px;
}
</style>
