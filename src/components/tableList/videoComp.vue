<template>
    <div class="share-videoComp-box">
        <el-dialog
        :visible.sync="dialogVisible"
        width="600px"
        top="5vh"
        :before-close="handleClose">
            <div class="video">
                <videoPlayerComp v-if="url" :url="url" ref="videoPlayerComp"></videoPlayerComp>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 引入视频组件
import videoPlayerComp from '@/components/videoPlayer/index'
export default {
    props: {
        url: {
            type: String,
            default: ''
        }
    },
    components: {
        videoPlayerComp
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