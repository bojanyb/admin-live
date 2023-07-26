<template>
  <div class="user-excelQueryComp-box">
    <el-dialog
      title="文件下载列表"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      @closed="closed"
    >
      <tableList :cfgs="cfgs" ref="excelTableList"></tableList>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入api
// import { updateLoginPwd } from "@/api/user.js";
// 引入列表组件
import tableList from "@/components/tableList/TableList.vue";
// 引入api
import REQUEST from "@/request/index.js";
// 引入公共方法
import { timeFormat } from "@/utils/common.js";
// 引入公共参数
import mixins from "@/utils/mixins.js";

export default {
  mixins: [mixins],
  components: {
    tableList,
  },
  data() {
    return {
      dialogVisible: false,
      list: [],
    };
  },
  computed: {
    cfgs() {
      const columnsList = [
        {
          label: "文件名称",
          prop: "from",
        },
        {
          label: "状态",
          prop: "punished_user_nickname",
        },
        {
          label: "下载",
          render: (h, params) => {
            return h("el-button", {
                  props: { type: "danger",size: "mini" },
                  style: {
                    display: params.row.status
                      ? "unset"
                      : "none",
                  },
                  on: {
                    click: () => {
                      this.updatePass(params.row);
                    },
                  },
                },"下载");
          },
        },
      ];
      return {
        vm: this,
        url: REQUEST.user.riskList,
        columns: columnsList,
      };
    },
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取数据
    loadParams() {
      this.dialogVisible = true;
    },
    // 提交
    // async submitForm(formName) {
    //   this.$refs[formName].validate(async (valid) => {
    //     if (valid) {
    //       let res = await updateLoginPwd({
    //         user_id: this.form.id,
    //         password: this.ruleForm.password,
    //       });
    //       if (res.code === 2000) {
    //         this.$success("修改成功");
    //         this.dialogVisible = false;
    //         this.$emit("getList");
    //       }
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>
