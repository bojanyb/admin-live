<template>
    <div class="uploadImg">
        <el-upload class="avatar-uploader" action="" :disabled="disabled" :accept="accept" :show-file-list="false"
            :before-upload="beforeUpload" :before-remove="beforeRemove" :http-request="upLoad">
            <img v-if="url && isSpecial === 'png'" :src="url" class="avatar">
            <svgComp v-if="url && isSpecial === 'svga' && isShowSvg" ref="svgComp" :src="url"
                :styleObj="{ width: '178px', height: '178px' }"></svgComp>
            <i v-if="!url" class="el-icon-plus avatar-uploader-icon"></i>
            <span class="fileName" v-if="url && isSpecial === 'zip'">已上传文件</span>
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
        isFileType: { // 是否验证文件类型
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
            default: function () {
                return true
            }
        },
        maxWidth: { // 最大宽度
            type: String,
            default: ''
        },
        maxHeight: { // 最大高度
            type: String,
            default: ''
        },
    },
    computed: {
        url() { // 返回地址
            if (this.imgUrl) {
                return this.imgUrl
            }
            return this.imageUrl
        },
        isSpecial() { // 判断是图片还是svga
            if (this.url) {
                if (this.url.indexOf('.png') !== -1 || this.url.indexOf('.webp') !== -1 || this.url.indexOf('.gif') !== -1 || this.url.indexOf('.jpg') !== -1 || this.url.indexOf('.jpeg') !== -1) {
                    return 'png'
                } else if (this.url.indexOf('.svga') !== -1) {
                    return 'svga'
                } else if (this.url.indexOf('.zip') !== -1 || this.url.indexOf('.mp3') !== -1 || this.url.indexOf('.m4a') !== -1) {
                    return 'zip'
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
            const isLtXM = file.file.size / 1024 / 1024 < 5;
            let fileType = file.file.type
            let accept = JSON.parse(JSON.stringify(this.accept))
            accept = accept.replace(".","")
            if (fileType.indexOf(accept) == -1  && this.isFileType == true) {
                this.$message.error("上传图片只能是" + accept + "格式!");
                return false;
            }
            // if (!isLtXM) {
            //     this.$message({
            //         message: '上传文件大小不能超过 5MB!',
            //         type: 'warning'
            //     });
            //     return
            // }
            this.uploadImg(file)
            // if(this.maxWidth == "" && this.isFileType == false){
            //     this.uploadImg(file)
            // }else{
            //     this.limitFileWH(this.maxWidth, this.maxHeight, file.file).then((res) => {
            //         file.isFlag = res
            //         if (file.isFlag) {
            //             this.uploadImg(file)
            //         }
            //     })
            // }
        },
        uploadImg(file){
            this.isShowSvg = false
            this.$store.commit('app/SET_LOADING', true)
            uploadOSS(file.file).then(res => {
                if (res.url) {
                    this.$emit('input', res.url)
                    this.$emit('getFile', file)
                    this.$store.commit('app/SET_LOADING', false)
                    this.isShowSvg = true
                    this.$emit('validateField', this.name)
                    this.imageUrl = res.url
                }
            }).catch(err => {
                this.$message.error(err)
            })
        },

        // 限制图片尺寸
        limitFileWH(E_width, E_height, file) {
            const _this = this
            let imgWidth = ''
            let imgHight = ''
            const isSize = new Promise(function (resolve, reject) {
                const width = Number(E_width)
                const height = Number(E_height)
                const _URL = window.URL || window.webkitURL
                const img = new Image()
                img.onload = function () {
                    imgWidth = img.width
                    imgHight = img.height
                    const valid = img.width === width && img.height === height
                    valid ? resolve() : reject()
                }
                img.src = _URL.createObjectURL(file)
            }).then(() => {
                return true
            }, () => {
                _this.$message.error({
                    message: '上传图片的尺寸应为' + E_width + '*' + E_height,
                    btn: false
                })
                return false
            })
            return isSize
        },
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
        height: 178px;
        position: relative;
    }

    span.fileName {
        width: 100%;
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        // padding-left: 50px;
        box-sizing: border-box;
    }
}
</style>