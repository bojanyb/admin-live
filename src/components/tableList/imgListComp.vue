<template>
    <div class="imgListComp-box">
        
        <div class="imgBox" v-if="type === 1">
            <el-image v-for="(item,index) in srcList" :key="index" :src="item || item"
            :preview-src-list="[item||imgUrl]">
                <div slot="error" class="image-slot">
                    <img :src="imgUrl" />
                </div>
            </el-image>
        </div>

        <div class="videoBox" v-else-if="type === 2" @click="zoomClick">
            <videoPlayerComp class="videoPlayComp" ref="videoPlayerComp" :style="{width: width,height: height}" :url="srcList[0]"></videoPlayerComp>
        </div>


        <!-- 视频放大组件 -->
        <videoComp v-if="isDestoryComp" ref="videoComp" :url="srcList[0]" @destoryComp="destoryComp"></videoComp>
    </div>
</template>

<script>

// 引入视频组件
import videoPlayerComp from '@/components/videoPlayer/index'
// 引入视频放大组件
import videoComp from './videoComp.vue'
export default {
    components: {
        videoPlayerComp,
        videoComp
    },
    props: {
        srcList: { // 图片地址
            type: Array,
            default: []
        },
        type: { // 媒体类型
            type: Number,
            default: null
        },
        width: { // 宽度
            type: String,
            default: ''
        },
        height: { // 高度
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isDestoryComp: false,
            imgUrl: require('@/assets/error.png')
        };
    },
    methods: {
        // 放大
        zoomClick() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.videoComp.dialogVisible = true
            }, 50);
        },
        // 关闭特效弹窗
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss" scoped>
.imgListComp-box {
    display: flex;
    justify-content: center;
    .imgBox {
        display: flex;
        flex-wrap: wrap;
    }
    .el-image {
        width: 50px;
        height: 50px;
        .image-slot {
            img {
                width: 100%;
                height: 100%;
            }
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