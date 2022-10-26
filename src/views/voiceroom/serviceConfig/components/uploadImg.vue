<template>
    <div class="serviceConfig-uploadImg-box">
        <el-dialog
        title="修改违规证据"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":">
                <el-form-item label="违规证据">
                    <el-upload
                    class="upload-demo"
                    action="#"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :limit="1"
                    accept=".png,.jpg,.jpeg,.mp4"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :http-request="upLoad">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png/mp4文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { updateSource } from '@/api/risk.js'
// 引入oss
import { uploadOSS } from '@/utils/oss.js'
export default {
    data() {
        return {
            dialogVisible: false,
            fileList: [],
            form: {},
            ruleForm: {
                img: ''
            },
            rules: {
                img: [
                    { required: true, message: '请输入违规证据', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 移除之后
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.ruleForm.img = ''
        },
        // 预览
        handlePreview(file) {
            console.log(file);
        },
        // 超出文件数量最大上传
        handleExceed(files, fileList) {
            this.$warning(`最大上传一个文件`);
        },
        // 移除文件之前
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 上传
        upLoad(file) {
            uploadOSS(file.file).then(res => {
                if(res.url) {
                    this.ruleForm.img = res.url
                }
            }).catch(err => {
                this.$message.error(err)
            })
        },
        // 获取数据
        loadParams(row) {
            this.dialogVisible = true
            this.form = row
            if(row.video_path) {
                let name = row.video_path.split('.live/')[1]
                this.fileList = [ { name: name, url: row.video_path } ]
            } else if(row.img_path) {
                let name = row.img_path.split('.live/')[1]
                this.fileList = [ { name: name, url: row.img_path } ]
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = {
                        id: this.form.id
                    }
                    if(this.ruleForm.img) {
                        if(this.ruleForm.img.indexOf('.mp4') !== -1) {
                            params.video_path = this.ruleForm.img
                        } else {
                            params.img_path = this.ruleForm.img
                        }
                    }
                    let res = await updateSource(params)
                    if(res.code === 2000) {
                        this.$success('修改成功')
                        this.dialogVisible = false
                        this.$emit('getList')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.serviceConfig-uploadImg-box {

}
</style>