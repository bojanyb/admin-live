// 商品列表
<template>
  <div class="shopping-box">
    <div class="searchParams">
      <SearchPanel
        v-model="searchParams"
        :forms="forms"
        :show-reset="true"
        :show-search-btn="true"
        :show-add="permissionArr.includes('Goods@save')"
        @onReset="reset"
        @onSearch="onSearch"
        @add="add"
      ></SearchPanel>
    </div>
    <div class="tableList">
      <tableList
        :cfgs="cfgs"
        ref="tableList"
        @saleAmunt="saleAmunt"
      ></tableList>
    </div>

    <addCom
      ref="add"
      v-if="isDestoryComp"
      @onSearch="onSearch"
      @destoryComp="destoryComp"
    ></addCom>
  </div>
</template>

<script>
// 引入api
import { add } from "@/api/shopping.js";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入菜单组件
import SearchPanel from "@/components/SearchPanel/final.vue";
// 引入公共参数
import mixins from "@/utils/mixins.js";
// 引入api
import REQUEST from "@/request/index.js";
// 引入api
import { down } from "@/api/shopping.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
// 引入新增组件
import addCom from "./components/index.vue";

export default {
  components: {
    tableList,
    SearchPanel,
    addCom,
  },
  mixins: [mixins],
  computed: {
    cfgs() {
      const arr = [
        {
          label: "商品类型",
          render: (h, params) => {
            let data = MAPDATA.SHOPPING.find((item) => {
              return item.value === params.row.goods_type;
            });
            return h("div", { class: { bounce_fa: true } }, [
              h("span", {
                class: { "el-icon-top bounce": true },
                style: {
                  display: params.row.is_first === 1 ? "unset" : "none",
                },
              }),
              h("span", data ? data.name : "--"),
            ]);
          },
        },
        {
          label: "序号",
          prop: "id",
        },
        {
          label: "礼物名称",
          prop: "gift_name",
        },
        {
          label: "礼物id",
          prop: "gift_id",
        },
        {
          label: "礼物图片",
          isimg: true,
          prop: "gift_photo",
          imgWidth: "50px",
          imgHeight: "50px",
        },
        {
          label: "礼物价值",
          prop: "gift_diamond",
        },
        {
          label: "PK类型",
          prop: "pk_type",
        },
        {
          label: "PK值",
          prop: "pk_value",
        },
        {
          label: "是否跨屏",
          prop: "accross_screen",
        },
        {
          label: "说明",
          prop: "remark",
        },
        {
          label: "状态",
          prop: "status",
        },
        {
          label: "更新时间",
          prop: "created_at",
          render: (h, params) => {
            return h("span", params.row.created_at ? params.row.created_at : "--");
          },
        },
        {
          label: "上架时间",
          minWidth: "160px",
          render: (h, params) => {
            return h(
              "span",
              params.row.up_time
                ? timeFormat(params.row.up_time, "YYYY-MM-DD HH:mm:ss", true)
                : "--"
            );
          },
        },
        {
          label: "修改时间",
          minWidth: "160px",
          render: (h, params) => {
            return h(
              "span",
              params.row.update_time
                ? timeFormat(
                    params.row.update_time,
                    "YYYY-MM-DD HH:mm:ss",
                    true
                  )
                : "--"
            );
          },
        },
        {
          label: "操作",
          minWidth: "180px",
          render: (h, params) => {
            return h("div", [
              h(
                "el-button",
                {
                  props: { type: "primary" },
                  style: {
                    display: !this.permissionArr.includes("Goods@save")
                      ? "none"
                      : "unset",
                  },
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
                  style: {
                    display:
                      params.row.status === 1 &&
                      !this.permissionArr.includes("Goods@down")
                        ? "none"
                        : "unset",
                  },
                  on: {
                    click: () => {
                      this.down(params.row, 1);
                    },
                  },
                },
                "上架"
              ),
              h(
                "el-button",
                {
                  props: { type: "danger" },
                  style: {
                    display:
                      params.row.status === 2 &&
                      !this.permissionArr.includes("Goods@down")
                        ? "none"
                        : "unset",
                  },
                  on: {
                    click: () => {
                      this.down(params.row, 2);
                    },
                  },
                },
                "下架"
              ),
            ]);
          },
        },
      ];
      return {
        vm: this,
        url: REQUEST.userActivity.pkActivity.list,
        columns: this.permissionArr.includes("Goods@index") ? arr : [],
      };
    },
    forms() {
      return [
        {
          name: "gift_name",
          type: "input",
          value: "",
          label: "商品名称",
          placeholder: "请输入商品名称",
        },
        {
          name: "gift_id",
          type: "input",
          value: "",
          label: "礼物ID",
          isNum: true,
          placeholder: "请输入商品ID",
        },
        {
          name: "status",
          type: "select",
          value: null,
          keyName: "value",
          optionLabel: "name",
          label: "礼物状态",
          placeholder: "请选择",
          clearable: true,
          options: MAPDATA.GIFTSTATUS,
        },
      ];
    },
  },
  data() {
    return {
      ruleForm: {
        alreadyMoney: null,
        deductMoney: null,
      },
      isDestoryComp: false, // 销毁组件
    };
  },
  methods: {
    // 刷新列表
    getList() {
      this.$refs.tableList.getData();
    },
    // 配置参数
    beforeSearch(params) {
      console.log(this.searchParams); 
      let s = { ...this.searchParams, ...this.dateTimeParams };
      return {
        page: params.page,
        status: s.status,
        user_number: s.user_number,
        start_time: Math.floor(s.start_time / 1000),
        end_time: Math.floor(s.end_time / 1000),
        user_id: s.user_id,
        order_id: s.order_id,
        sort: s.sort,

        gift_name: s.gift_name,
        gift_id: s.gift_id,
        status: s.status,
      };
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
    // 查询
    reset() {
      this.searchParams = {};
      this.dateTimeParams = {
        activity_type_id: 1,
      };
      this.getList();
    },
    // 重置
    onSearch() {
      this.getList();
    },
    // 列表返回数据
    saleAmunt(data) {
      // this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
    },
    // 新增
    add() {
      this.load("add");
    },
    update(row) {
      this.load("update", row);
    },
    down(row, status) {
      let params = {
        id: row.id,
        status: status,
      };
      down(params).then((res) => {
        if (res.code === 2000) {
          this.onSearch();
        }
      });
    },
    load(status, row) {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.add.dialogVisible = true;
        this.$refs.add.load(status, row);
      }, 100);
    },
    // 销毁组件
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 更改
    async changeSwitch(show_special, row) {
      let params = {
        ...row,
        show_special,
        noble_level: row.noble_level ? row.noble_level : null,
      };
      let res = await add(params);
      if (res.code === 2000) {
        if (show_special === 2) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss">
.shopping-box {
  padding: 20px;
  box-sizing: border-box;
  .model {
    margin-bottom: 20px;
  }
  .bounce_fa {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .bounce {
      position: absolute;
      left: 0;
      font-size: 17px;
      color: #ff4949;
      font-weight: 600;
      transform: translateY(5px);
      animation: bounce 1s infinite;
    }

    @keyframes bounce {
      0% {
        transform: translateY(5px);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(5px);
      }
    }
  }
}
</style>
