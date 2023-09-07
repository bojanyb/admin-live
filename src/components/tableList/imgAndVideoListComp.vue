<template>
  <div class="imgAndVideoListComp-box">
    <div class="imgBox">
      <el-image
        v-for="(item, index) in imgSrcList"
        :key="index"
        :src="item"
        :style="{ width: width, height: height }"
        :preview-src-list="imgSrcList"
        @click.stop="handleClickStop"
      >
        <div slot="error" class="image-slot">
          <img :src="imgUrl" />
        </div>
      </el-image>
    </div>

    <div
      class="videoBox"
      v-for="(item, index) in videoSrcList"
      :key="index"
      :style="{ width: width, height: height }"
      @click="zoomClick"
    >
      <videoPlayerComp
        class="videoPlayComp"
        ref="videoPlayerComp"
        :url="item"
      ></videoPlayerComp>
    </div>

    <!-- 视频放大组件 -->
    <videoComp
      v-if="isDestoryComp"
      ref="videoComp"
      :url="videoSrcList[0]"
      @destoryComp="destoryComp"
    ></videoComp>
  </div>
</template>

<script>
// 引入视频组件
import videoPlayerComp from "@/components/videoPlayer/index";
// 引入视频放大组件
import videoComp from "./videoComp.vue";
export default {
  components: {
    videoPlayerComp,
    videoComp,
  },
  props: {
    imgSrcList: {
      // 图片地址
      type: Array,
      default: [],
    },
    videoSrcList: {
      // 视频地址
      type: Array,
      default: [],
    },
    width: {
      // 宽度
      type: String,
      default: "",
    },
    height: {
      // 高度
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isDestoryComp: false,
      imgUrl: require("@/assets/error.png"),
    };
  },
  mounted() {},
  methods: {
    // 放大
    zoomClick() {
      this.isDestoryComp = true;
      setTimeout(() => {
        this.$refs.videoComp.dialogVisible = true;
      }, 50);
    },
    // 关闭特效弹窗
    destoryComp() {
      this.isDestoryComp = false;
    },
    // 点击遮罩层关闭
    handleClickStop() {
      this.$nextTick(() => {
        let domImageView = document.querySelector(".el-image-viewer__mask");
        if (!domImageView) {
          return;
        }
        domImageView.addEventListener("click", () => {
          // 点击遮罩层时调用关闭按钮
          document.querySelector(".el-image-viewer__close").click();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.imgAndVideoListComp-box {
  display: flex;
  justify-content: center;
  .imgBox {
    display: flex;
    flex-wrap: wrap;
  }
  .image-slot {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .videoBox {
    cursor: pointer;
    .videoPlayComp {
      pointer-events: none;
    }
  }
  .screenBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    > span {
      position: absolute;
      right: 30px;
      top: 30px;
      font-size: 40px;
      cursor: pointer;
    }
  }
}
</style>
