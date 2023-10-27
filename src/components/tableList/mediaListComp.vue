<template>
  <div class="imgAndVideoListComp-box">
    <div class="list-wrap" v-if="imgSrcList.length || videoSrcList.length || audioSrcList.length">
      <template v-if="audioSrcList.length">
        <div
          class="audio-box"
          v-for="(item, index) in audioSrcList"
          :key="'audio' + index"
        >
          <audio :src="item.src" controls="controls" @play="playAudio"></audio>
        </div>
      </template>
      <template v-if="imgSrcList.length">
        <el-image
          v-for="(item, index) in imgSrcList"
          :key="'img' + index"
          :src="item"
          :style="{ width: width, height: height }"
          :preview-src-list="imgSrcList"
          @click.stop="handleClickStop"
        >
          <div slot="error" class="image-slot">
            <img :src="imgUrl" />
          </div>
        </el-image>
      </template>
      <template v-if="videoSrcList.length">
        <div
          class="video-box"
          v-for="(item, index) in videoSrcList"
          :key="'video' + index"
          :alt="item"
          :style="{ width: width, height: height }"
          @click="zoomClick(item)"
        >
          <videoPlayerComp
            class="videoPlayComp"
            ref="videoPlayerComp"
            :url="item"
          ></videoPlayerComp>
        </div>
      </template>
    </div>
    <div v-else>无</div>

    <!-- 视频放大组件 -->
    <videoComp
      v-if="isDestoryComp"
      ref="videoComp"
      :url="currentVideoSrc"
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
      default: () => {
        return []
      },
    },
    videoSrcList: {
      // 视频地址
      type: Array,
      default: () => {
        return []
      },
    },
    audioSrcList: {
      // 音频地址
      type: Array,
      default: () => {
        return []
      },
    },
    // 宽度
    width: {
      type: String,
      default: "50px",
    },
    // 高度
    height: {
      type: String,
      default: "50px",
    },
  },
  data() {
    return {
      isDestoryComp: false,
      imgUrl: require("@/assets/error.png"),
      currentVideoSrc: "",
    };
  },
  mounted() {},
  methods: {
    // 放大
    zoomClick(item) {
      this.isDestoryComp = true;
      this.currentVideoSrc = item;
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
    playAudio(e) {
      this.pauseAll(e.target);
    },
    // 暂停音频播放
    pauseAll(target) {
      const audioList = document.getElementsByTagName("audio");
      [].forEach.call(audioList, (item) => {
          // 将audioList中其他的audio全部暂停
          item.src !== target.src && item.pause();
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.imgAndVideoListComp-box {
  display: flex;
  justify-content: center;
  .audio-box {
    padding: 0 10px;
  }
  .list-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .image-slot {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .video-box {
    cursor: pointer;
    overflow: hidden;
    .videoPlayComp {
      pointer-events: none;
    }
    ::v-deep .video-js .vjs-modal-dialog {
      overflow: hidden;
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
