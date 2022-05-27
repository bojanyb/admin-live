<template>
    <div class="uploadImg">
        <el-upload
        class="avatar-uploader"
        action=""
        :accept="accept"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :http-request="upLoad">
            <img v-if="url && !isSpecial" :src="url" class="avatar">
            <span class="fileName" v-if="url && isSpecial">已上传文件</span>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>

// 引入oss
import { uploadOSS } from '@/utils/oss.js'

export default {
    props: {
        name: { // 字段名
            type: String,
            default: ''
        },
        isSpecial: { // 是否为特效商品
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
        url() {
            if(this.imgUrl) {
                return this.imgUrl
            }
            return this.imageUrl
        }
    },
    data() {
        return {
            imageUrl: '',
        };
    },
    methods: {
        // 上传
        upLoad(file) {
            uploadOSS(file.file).then(res => {
                if(res.url) {
                    this.$emit('input', res.url)
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

<style lang="scss" scoped>
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
        border: 1px dashed #d9d9d9;
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