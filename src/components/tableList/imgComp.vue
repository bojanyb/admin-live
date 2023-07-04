<template>
    <div class="imgComp-box">
        <el-image v-if="isSpecial === 'png'" :src="src || imgUrl" :style="{width: width,height: height}"
            :preview-src-list="[previewSrcList||imgUrl]">
            <div slot="error" class="image-slot">
              <img :src="imgUrl" />
            </div>
        </el-image>

        <div class="svgaBox" v-else-if="isSpecial === 'svga'" @click="zoomClick">
            <svgComp ref="svgComp" :src="src" :styleObj="{ width: width, height: height }" ></svgComp>
        </div>
        <div class="audioBox" v-else-if="isSpecial === 'mp3'">
            <div class="audio-name" v-if="name" :title="name">{{ name }}<span v-if="subName"> - {{ subName }}</span></div>
            <audio ref="audio" :src="src" controls="controls"></audio>
            <div v-if="tagList.length > 0">
                <span v-for="(item,index) in tagList" :key="index">{{ item }}</span>
            </div>
        </div>

        <div class="videoBox" v-else-if="isSpecial === 'mp4'">
            <videoPlayerComp ref="videoPlayerComp" :url="src"></videoPlayerComp>
        </div>

        <!-- <div v-else>无</div> -->


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
        },
        name: { // 音乐名称 - 音乐专用
            type: String,
            default: ''
        },
        subName: { // 音乐名称 - 音乐专用
            type: String,
            default: ''
        },
        tagList: { // 标签 - 音乐专用
            type: Array,
            default: function() {
                return []
            }
        }
    },
    computed: {
        isSpecial() { // 判断是图片还是svga
            if(this.src) {
                if(this.src.indexOf('png') !== -1 || this.src.indexOf('jpg') !== -1 || this.src.indexOf('jpeg') !== -1) {
                    if(this.src.indexOf("https://music.aiyi.love/") > -1){
                        this.src = 'http://music-aiyi.oss-cn-shenzhen.aliyuncs.com' + this.src.split('https://music.aiyi.love')[1];
                    }
                    return 'png'
                } else if(this.src.indexOf('svga') !== -1) {
                    return 'svga'
                } else if(this.src.indexOf('mp4') !== -1) {
                    return 'mp4'
                }  else if(this.src.indexOf('mp3') !== -1 || this.src.indexOf('MP3') !== -1 || this.src.indexOf('m4a') !== -1) {
                    return 'mp3'
                } else {
                    return 'png'
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
    .el-image {
        .image-slot {
            img {
                width: 50px;
                height: 50px;
            }
        }
    }
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

    .audioBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        .audio-name {
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
