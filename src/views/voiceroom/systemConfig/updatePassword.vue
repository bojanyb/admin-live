<template>
    <div class="system-updatePassword">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="old_password">
                <el-input v-model="ruleForm.old_password" type="password" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password_one">
                <el-input v-model="ruleForm.new_password_one" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="new_password_tow">
                <el-input v-model="ruleForm.new_password_tow" type="password" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入api
import { refresh } from '@/api/videoRoom'
export default {
    data() {
        return {
            ruleForm: {
                old_password: '',
                new_password_one: '',
                new_password_tow: ''
            },
            rules: {
                old_password: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                new_password_one: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                new_password_tow: [
                    { required: true, message: '请再次输入原密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    refresh(params).then(res => {
                        console.log(res, 'res-----------')
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.system-updatePassword {
    padding: 20px;
    box-sizing: border-box;
    .el-form {
        .el-input {
            width: 300px;
        }
    }
}
</style>
