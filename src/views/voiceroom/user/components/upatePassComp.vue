<template>
    <div class="user-upatePassComp-box">
        <el-dialog
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose"
        :show-close="false"
        @closed="closed">
            <div class="mainBox">
                <div class="tit">更改ID密码</div>
                <div class="id">（用户ID：{{ form.user_number }}）</div>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="demo-ruleForm">
                <el-form-item label="ID登录密码" prop="password">
                    <el-input v-model="ruleForm.password" placeholder="请输入6-12位英文+数字组成的密码"></el-input>
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
import { updateLoginPwd } from '@/api/user.js'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {},
            ruleForm: {
                password: ''
            },
            rules: {
                password: [
                    { required: true, message: '请输入更改ID密码', trigger: 'blur' },
                    { pattern: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,20}$/, required: true, message: '密码只能输入数字和字母, 且只能6-20位之间', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(row) {
            this.dialogVisible = true
            this.form = row
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res = await updateLoginPwd({ user_id: this.form.id, password: this.ruleForm.password })
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
        // 重置
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
.user-upatePassComp-box {
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body {
        .mainBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
            .id {
                font-size: 14px;
                font-weight: 600;
            }
            .tit {
                font-weight: 600;
                font-size: 20px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>