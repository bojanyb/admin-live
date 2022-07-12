<template>
    <div class="uploadImg">
        <el-upload
        class="avatar-uploader"
        action=""
        :disabled="disabled"
        :accept="accept"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :http-request="upLoad">
            <img v-if="url && isSpecial === 'png'" :src="url" class="avatar">
            <!-- <span class="fileName" v-if="url && isSpecial">已上传文件</span> -->
            <svgComp v-if="url && isSpecial === 'svga' && isShowSvg" ref="svgComp" :src="url" :styleObj="{ width: '178px', height: '178px' }"></svgComp>
            <i v-if="!url" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>

// 引入oss
import { uploadOSS } from '@/utils/oss.js'
// 引入svg组件
import svgComp from '@/components/svgComp/index.vue'

export default {
    components: {
        svgComp
    },
    props: {
        name: { // 字段名
            type: String,
            default: ''
        },
        disabled: { // 是否只能查看
            type: Boolean,
            default: false
        },
        accept: { // 限制上传文件格式
            type: String,
            default: ''
        },
        imgUrl: { // 图片地址
            type: String,
            default: ''
        },
        beforeUpload: { // 上传之前
            type: Function,
            default: function () {
                return true
            }
        },
        beforeRemove: { // 删除文件
            type: Function,
            default: function() {
                return true
            }
        }
    },
    computed: {
        url() { // 返回地址
            if(this.imgUrl) {
                return this.imgUrl
            }
            return this.imageUrl
        },
        isSpecial() { // 判断是图片还是svga
            if(this.url) {
                if(this.url.indexOf('png') !== -1 || this.url.indexOf('jpg') !== -1 || this.url.indexOf('jpeg') !== -1) {
                    return 'png'
                } else if(this.url.indexOf('svga') !== -1) {
                    return 'svga'
                }
            }
        }
    },
    data() {
        return {
            imageUrl: '',
            isShowSvg: true
        };
    },
    methods: {
        // 上传
        upLoad(file) {
            this.isShowSvg = false
            uploadOSS(file.file).then(res => {
                if(res.url) {
                    this.$emit('input', res.url)
                    this.isShowSvg = true
                    this.$emit('validateField', this.name)
                    this.imageUrl = res.url
                }
            }).catch(err => {
                this.$message.error(err)
            })
        }
    }
}
</script>

<style lang="scss">
.uploadImg {
    width: 178px;
    height: 178px;
    border-radius: 5px;
    border: 1px dashed #ccc;
    overflow: hidden;
    .el-form-item__content {
        width: 178px;
    }
    .avatar-uploader .el-upload {
        // border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        // height: 178px;
        display: block;
    }
    .el-upload--text {
        width: 178px;
        position: relative;
    }
    span.fileName {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 50px;
        box-sizing: border-box;
    }
}


</style>