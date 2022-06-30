<template>
    <div class="liveEdit-box">
        <el-dialog
        title="房间直播编辑"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="隐藏房间" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="开启"></el-radio>
                        <el-radio label="隐藏"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="修改名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                name: '',
                resource: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.resetForm()
        },
        loadParams(row) {
            this.dialogVisible = true
            // 防止数据同源
            let params = JSON.parse(JSON.stringify(row))
            this.$set(this.$data, 'ruleForm', params)
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm() {
            this.dialogVisible = false
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss" scoped>
.liveEdit-box {

}
</style>