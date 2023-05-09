<template>
    <div class="add-bind-box">
        <el-dialog
        title="CP绑定"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户1 ID:" prop="user_number">
                    <el-input v-model="ruleForm.user_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="用户2 ID:" prop="user_number2">
                    <el-input v-model="ruleForm.user_number2" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入用户ID"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">绑 定</el-button>
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
                user_number: '',
                user_number2: '',
            },
            rules: {
                user_number: [
                    { required: true, message: '请输入用户1 ID', trigger: 'blur' }
                ],
                user_number2: [
                    { required: true, message: '请输入用户2 ID', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams() {
            if(this.$refs['ruleForm']){
                this.$refs['ruleForm'].resetFields();
            }
            this.dialogVisible = true
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>