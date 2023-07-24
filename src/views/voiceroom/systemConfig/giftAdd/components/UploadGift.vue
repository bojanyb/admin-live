<template>
  <div class="upload-img-wrap">
    <ul v-if="fileList.length" class="el-upload-list el-upload-list--picture">
      <li v-for="(item, index) in fileList" :key="item.src" class="el-upload-list__item">
        <img class="el-upload-list__item-thumbnail" :src="item.src" alt=""/>
        <div class="el-upload-list__item-info">
          <div class="button-box">
            <el-button type="primary" round size="small" @click="reUpload(index)"
              >更改</el-button
            >
            <el-button type="danger" round size="small" @click="remove(index)"
              >删除</el-button
            >
          </div>
          <div class="input-box">
            <el-input
              placeholder="请输入内容"
              v-model="item.val"
              class="input-with-select"
              size="small"
              :disabled="item.type == 4"
            >
              <el-select class="type-select" v-model="item.type" slot="prepend" placeholder="请选择">
                <el-option label="半屏H5" value="5"></el-option>
                <el-option label="全屏H5" value="1"></el-option>
                <el-option label="房间ID" value="2"></el-option>
                <el-option label="用户ID" value="3"></el-option>
                <el-option label="无跳转" value="4"></el-option>
              </el-select>
            </el-input>
            <el-input class="height-input" v-show="item.type == 5" placeholder="请输入屏幕高度" v-model="item.high">
              <template slot="append">dp</template>
            </el-input>
          </div>
        </div>
      </li>
    </ul>
    <div v-show="this.fileList.length < 5" :style="uploadStyle">
      <ImageUpload
        ref="uploadImg"
        v-model="imgUrl"
        :imgUrl="imgUrl"
        name="gift_banner"
        accept=".jpg,.jpeg"
        :isShowImg="false"
        @uploadSuccess="uploadSuccess"
      ></ImageUpload>
    </div>
  </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";

export default {
  components: {
    ImageUpload,
  },
  props: {
    value: {
      // 字段名
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      curIndex: -1,
      imgUrl: "",
      fileList: [],
      select: "",
      selectInput: "",
      heightInput: "",
      isShow: false,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list;
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // 是否显示提示
    uploadStyle() {
      if(this.fileList.length) {
        return {'margin-top': '10px'}
      }
      return;
    },
  },
  methods: {
    // 重置 - 验证
    validateField(name) {
      this.$refs.ruleForm.validateField([name]);
      // this.$emit("input", this.listToString(this.fileList));
    },
    remove(index) {
      this.fileList.splice(index, 1);
    },
    // 重新上传图片
    reUpload(index) {
      this.curIndex = index;
      this.$refs.uploadImg.reUpload();
    },
    uploadSuccess(url) {
      this.imgUrl = "";
      this.$refs.uploadImg.clear();
      if (this.curIndex > -1 && this.fileList.length) {
        const item = Object.assign({}, this.fileList[this.curIndex], {'src': url});
        this.fileList.splice(this.curIndex, 1, item);
        this.curIndex = -1;
      } else {
        this.fileList.push({
          src: url,
        });
      }
    }
  },
};
</script>

<style lang="scss">
.upload-img-wrap {
  .el-upload-list__item {
    display: flex;
    height: auto;
  }
  .el-upload-list__item-thumbnail {
    width: 120px;
    height: 120px;
    margin-right: 10px;
  }
  .el-upload-list__item-info {
    flex: 1;
  }
  .input-box {
    width: 100%;
    margin-top: 10px;
  }
  .input-with-select {
    width: 100%;
  }
  .type-select {
    width: 90px !important;
  }
  .height-input {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
