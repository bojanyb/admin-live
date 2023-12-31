<template>
  <div class="moveDating-cardComp-box">
    <drawer
      size="470px"
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
        label-width="115px"
        class="demo-ruleForm"
        label-suffix=":"
        :hide-required-asterisk="status === 'see'"
      >
        <el-form-item label="音色分类名" prop="sound_tag">
          <el-input
            v-model="ruleForm.sound_tag"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="权重排序" prop="sort">
          <el-input
            v-model="ruleForm.sort"
            onkeydown="this.value=this.value.replace(/^0+/,'');"
            oninput="this.value=this.value.replace(/[^\d]/g,'');"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" clearable placeholder="请选择">
              <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="上传封面" prop="img">
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
        <el-form-item label="上传声音签名" prop="audio">
          <uploadImg
            ref="uploadAudio"
            v-model="ruleForm.audio"
            :imgUrl="ruleForm.audio"
            name="audio"
            @validateField="validateField"
            @getFile="getFile"
            accept=".mp3"
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
import { save } from "@/api/moveDating";
// 引入上传组件
import uploadImg from "@/components/uploadImg/index.vue";
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
  components: {
    uploadImg,
    drawer,
  },
  data() {
    return {
      status: "add", // 当前状态
      oldParams: {}, // 老数据
      ruleForm: {
        id: null,
        img: "",
        sound_tag: "",
        audio: "",
        duration: null,
        sort: "",
        sex: null, // 1: 男 2：女
      },
      rules: {
        sound_tag: [{ required: true, message: "请输入音色分类名", trigger: "change" }],
        sort: [{ required: true, message: "请输入权重排序", trigger: "blur" }],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
            validator: (rules, value, cb) => {
              if (value == 0) {
                return cb(new Error("请选择性别!"));
              }
              return cb();
            },
          },
        ],
        img: [{ required: true, message: "请上传封面", trigger: "change" }],
        audio: [
          { required: true, message: "请上传声音签名", trigger: "change" },
        ],
      },
      sexList: MAPDATA.SEXLIST
    };
  },
  computed: {
    title() {
      // 标题
      if (this.status === "add") {
        return "新增心动卡片";
      } else if (this.status === "update") {
        return "修改心动卡片";
      } else {
        return "查看心动卡片";
      }
    },
    disabled() {
      // 禁止修改
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
    // 获取数据
    loadParams(status, row) {
      this.openComp();
      this.status = status;
      if (status !== "add") {
        let params = JSON.parse(JSON.stringify(row));
        this.$set(this.$data, "ruleForm", params);
      }
      this.oldParams = JSON.parse(JSON.stringify(this.ruleForm));
    },
    openComp(status = true) {
      this.$refs.drawer.loadParams(status);
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
    // 提交
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = { ...this.ruleForm };
          params.duration = params.duration
            ? Math.floor(params.duration)
            : params.duration;
          params.sound_img = "";
          let res = await save(params);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 重置 - 验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
    },
    // 获取音频
    async getFile(file) {
      let time = await this.getMp4Time(file.file);
      this.ruleForm.duration = time;
    },
    getMp4Time(file) {
      let that = this;
      return new Promise((resolve, reject) => {
        //把element上传组件传给我们的file转成url
        let url = URL.createObjectURL(file);
        //获取对象
        var audioElement = new Audio(url);
        //监听事件
        audioElement.addEventListener("loadedmetadata", () => {
          const time = Math.round(audioElement.duration * 100) / 100;
          resolve(time);
        });
        audioElement.addEventListener("error", () => {
          resolve(0);
        });
      });
    },
    // 销毁组件
    closed() {
      this.$emit("destoryComp");
    },
  },
};
</script>

<style lang="scss">
.moveDating-cardComp-box {
  .el-select {
    width: 300px;
  }
}
</style>
