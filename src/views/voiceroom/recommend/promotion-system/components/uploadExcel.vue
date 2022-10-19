<template>
    <div class="finance-uploadExcel-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose"
        @closed="closed">
            <el-upload
            class="avatar-uploader"
            action="#"
            accept=".csv,.CSV"
            :show-file-list="false"
            :http-request="upLoad">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
        </el-dialog>
    </div>
</template>

<script>
// 引入公共方法
import { exportTableData } from '@/utils/common.js'
// 引入api
import { regReplenishmentByCsv } from '@/api/finance.js'
export default {
    props: {
        title: { // 标题
            type: String,
            default: ''
        }
    },
    data() {
        return {
            imageUrl: '',
            dialogVisible: false
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams() {
            this.dialogVisible = true
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        // 
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 上传
        async upLoad(file) {
            let formData = new FormData();
            formData.append('file', file.file);
            let res = await regReplenishmentByCsv(formData)
            if(res.code === 2000) {
                this.dialogVisible = false
                this.$emit('getList')

                let arr = res.data.error || []
                if(arr.length <= 0) {
                    return this.$warning('导入成功，没有错误数据')
                } else {
                    arr = arr.map((item,index) => {
                        let params = {
                            user_number: item.user_number,
                            promoter_user_number: item.promoter_user_number,
                            error: item.error
                        }
                        return params
                    })
                    let nameList = [ '用户ID', '推广ID', '成功/错误原因' ]
                    exportTableData(arr, nameList, '推广补单记录')
                }
            }
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.finance-uploadExcel-box {
    .el-dialog__body {
        padding-bottom: 50px;
    }
    .avatar-uploader {
        display: flex;
        justify-content: center;
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
        height: 178px;
        display: block;
    }
}
</style>
