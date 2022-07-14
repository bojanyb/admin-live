<template>
    <div class="share-videoComp-box">
        <el-dialog
        :visible.sync="dialogVisible"
        width="600px"
        top="5vh"
        :before-close="handleClose">
            <div class="video">
                <videoPlayerComp v-if="url" :url="url" ref="videoPlayerComp"></videoPlayerComp>

                <videoPlayerComp2 v-if="url" :url="url" ref="videoPlayerComp2"></videoPlayerComp2>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 引入视频组件
import videoPlayerComp from '@/components/videoPlayer/index'
import videoPlayerComp2 from '@/components/videoPlayer/index2'
export default {
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    components: {
        videoPlayerComp,
        videoPlayerComp2
    },
    data() {
        return {
            dialogVisible: false,
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
            this.$emit('destoryComp')
        }
    },
    mounted() {
        // setTimeout(() => {
        //     this.$refs.videoPlayerComp.openVideo()
        // }, 100);
    }
}
</script>

<style lang="scss" scoped>
.video {

}
</style>