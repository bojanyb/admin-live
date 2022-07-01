<template>
    <div class="imgComp-box">
        <el-image v-if="isSpecial === 'png'" :src="src || imgUrl" :style="{width: width,height: height}"
            :preview-src-list="[previewSrcList||imgUrl]">
            <div slot="error" class="image-slot">
              <img :src="imgUrl" />
            </div>
        </el-image>

        <div class="svgaBox" v-if="isSpecial === 'svga'" @click="zoomClick">
            <svgComp ref="svgComp" :src="src" :styleObj="{ width: width, height: height }" ></svgComp>
        </div>

        <div class="videoBox" v-if="isSpecial === 'mp4'">
            <videoPlayerComp ref="videoPlayerComp" :url="src"></videoPlayerComp>
        </div>


        <div class="screenBox" v-if="isShowZoom">
            <svgComp v-if="isSpecial === 'svga'" ref="svgComp" :src="src" :styleObj="{ height: '100%' }"></svgComp>
            <span class="el-icon-circle-close" @click="closeZoom"></span>
        </div>
    </div>
</template>

<script>
// 引入svg组件
import svgComp from '@/components/svgComp/index.vue'
// 引入视频组件
import videoPlayerComp from '@/components/videoPlayer/index'
export default {
    components: {
        svgComp,
        videoPlayerComp
    },
    props: {
        src: { // 图片地址
            type: String,
            default: ''
        },
        width: { // 宽度
            type: String,
            default: ''
        },
        height: { // 高度
            type: String,
            default: ''
        },
        previewSrcList: { // 预览
            type: String,
            default: ''
        }
    },
    computed: {
        isSpecial() { // 判断是图片还是svga
            if(this.src) {
                if(this.src.indexOf('png') !== -1 || this.src.indexOf('jpg') !== -1 || this.src.indexOf('jpeg') !== -1) {
                    return 'png'
                } else if(this.src.indexOf('svga') !== -1) {
                    return 'svga'
                } else if(this.src.indexOf('mp4') !== -1) {
                    return 'mp4'
                }
            }
        }
    },
    data() {
        return {
            isShowZoom: false,
            imgUrl: require('@/assets/error.png')
        };
    },
    methods: {
        // 放大
        zoomClick() {
            this.isShowZoom = true
        },
        // 关闭特效弹窗
        closeZoom() {
            this.isShowZoom = false
        }
    }
}
</script>

<style lang="scss" scoped>
.imgComp-box {
    display: flex;
    justify-content: center;
    .svgaBox {
        cursor: pointer;
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
        >span {
            position: absolute;
            right: 30px;
            top: 30px;
            font-size: 40px;
            cursor: pointer;
        }
    }
}
</style>