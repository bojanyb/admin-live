<template>
  <div class="roomConfig-categoryComp-box">
    <drawer
      size="450px"
      :title="title"
      ref="drawer"
      :isShowUpdate="true"
      @cancel="cancel"
      @submitForm="submitForm"
      @closed="closed"
      :disabled="disabled"
      @update="update"
    >
      <el-form
        slot="body"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="90px"
        class="demo-ruleForm"
        label-suffix=":"
        :hide-required-asterisk="status === 'see'"
      >
        <el-form-item label="房间类型" prop="name">
          <el-input
            v-model="ruleForm.name"
            maxlength="6"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务类型" prop="belong">
          <el-select v-model="ruleForm.belong" placeholder="请选择">
            <el-option
              v-for="item in roomTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="麦位模式" prop="seat_model">
          <el-select
            v-model="ruleForm.seat_model"
            placeholder="请选择麦位模式"
            :disabled="disabled"
          >
            <el-option
              v-for="item in seatList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重排序" prop="sort">
          <el-input v-model="ruleForm.sort" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="类型色值" prop="color">
          <el-input v-model="ruleForm.color" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="分类图标" prop="icon">
          <uploadImg
            ref="uploadImg"
            v-model="ruleForm.icon"
            :imgUrl="ruleForm.icon"
            name="icon"
            @validateField="validateField"
            accept=".png,.jpg,.jpeg"
            :disabled="disabled"
          ></uploadImg>
        </el-form-item>
        <el-form-item label="分类图标1" prop="icon_1">
          <uploadImg
            ref="uploadImg"
            v-model="ruleForm.icon_1"
            :imgUrl="ruleForm.icon_1"
            name="icon_1"
            @validateField="validateField"
            accept=".png,.jpg,.jpeg"
            :disabled="disabled"
          ></uploadImg>
        </el-form-item>
        <el-form-item label="分类图标2" prop="icon_2">
          <uploadImg
            ref="uploadImg"
            v-model="ruleForm.icon_2"
            :imgUrl="ruleForm.icon_2"
            name="icon_2"
            @validateField="validateField"
            accept=".png,.jpg,.jpeg"
            :disabled="disabled"
          ></uploadImg>
        </el-form-item>
        <el-form-item label="类型图标" prop="img">
          <uploadImg
            ref="uploadImg"
            v-model="ruleForm.img"
            :imgUrl="ruleForm.img"
            name="img"
            @validateField="validateField"
            accept=".png,.jpg,.jpeg"
            :disabled="disabled"
          ></uploadImg>
        </el-form-item>
      </el-form>
    </drawer>
  </div>
</template>

<script>
// 引入抽屉组件
import drawer from "@/components/drawer/index";
// 引入api
import { saveGenre } from "@/api/house.js";
// 引入图片上传组件
import uploadImg from "@/components/uploadImg/index.vue";
// 引入公共map
import MAPDATA from "@/utils/jsonMap.js";
export default {
  components: {
    uploadImg,
    drawer,
  },
  data() {
    return {
      belongList: MAPDATA.CATEGORYBUSINESSTYPELIST, // 分类数组
      seatList: [
        {
          name: "普通模式(9麦位)",
          value: 1,
        },
      ],
      status: "add",
      ruleForm: {
        name: "",
        belong: null,
        sort: null,
        icon: "",
        icon_1: "",
        icon_2: "",
        color: null,
        img: "",
      },
      oldParams: {}, // 老数据
      rules: {
        name: [
          { required: true, message: "请输入房间类型", trigger: "blur" },
          {
            message: "仅限输入中英文、数字",
            trigger: "blur",
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
          },
        ],
        seat_model: [
          { required: true, message: "请选择麦位模式", trigger: "change" },
        ],
        sort: [
          { required: true, message: "请填写排序权重", trigger: "blur" },
          {
            message: "仅限输入非零正整数",
            trigger: "blur",
            pattern: /^([1-9][0-9]*){1,3}$/,
          },
        ],
        color: [{ required: true, message: "请输入色值", trigger: "blur" }],
        icon: [
          { required: true, message: "请上传分类图标", trigger: "change" },
        ],
        icon_1: [
          { required: true, message: "请上传分类图标1", trigger: "change" },
        ],
        icon_2: [
          { required: true, message: "请上传分类图标2", trigger: "change" },
        ],
        img: [{ required: true, message: "请上传类型图标", trigger: "change" }],
        belong: [{ required: true, message: "请选择业务类型", trigger: "change" }],
      },
      roomTypeList: [
        {
          name: "派对",
          value: 2,
        },
        {
          name: "直播",
          value: 1,
        },
      ],
    };
  },
  computed: {
    title() {
      // 标题
      if (this.status === "add") {
        return "新增房间类型";
      } else if (this.status === "update") {
        return "修改房间类型";
      } else {
        return "查看房间类型";
      }
    },
    disabled() {
      // 禁止输入
      if (this.status === "see") {
        return true;
      }
      return false;
    },
  },
  methods: {
    handleClose() {
      this.openComp(false);
    },
    // 获取参数
    loadParams(status, row) {
      this.openComp();
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        params.belong = params.belong
        this.$set(this.$data, "ruleForm", params);
      }

      this.oldParams = JSON.parse(JSON.stringify(this.ruleForm));
    },
    openComp(status = true) {
      this.$refs.drawer.loadParams(status);
    },
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          if (this.status === "update") {
            delete params.create_time;
          }
          let res = await saveGenre(params);
          if (res.code === 2000) {
            this.$success("新增成功");
            this.openComp(false);
            this.$emit("getList");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
    // 重置字段验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
    },
    // 取消
    cancel() {
      if (JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) {
        // 记录数据 - 有改动就提示
        this.$confirm("关闭弹窗将不会保留您的更改, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.openComp(false);
          })
          .catch(() => {});
      } else {
        this.openComp(false);
      }
    },
    // 修改
    update() {
      this.status = "update";
    },
  },
};
</script>

<style lang="scss" scoped>
.roomConfig-categoryComp-box {
  .el-select {
    width: 290px;
  }
}
</style>
