<template>
    <div class="add-bind-box">
        <el-dialog
        title="CP绑定"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="发起方ID:" prop="user_number">
                    <el-input v-model="ruleForm.user_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入发起方ID"></el-input>
                </el-form-item>
                <el-form-item label="接收方ID:" prop="to_user_number">
                    <el-input v-model="ruleForm.to_user_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入接收方ID"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">邀请绑定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { getBindCpV520 } from '@/api/activity'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                user_number: '',
                to_user_number: '',
            },
            rules: {
                user_number: [
                    { required: true, message: '请输入发起方ID', trigger: 'blur' }
                ],
                to_user_number: [
                    { required: true, message: '请输入接收方ID', trigger: 'blur' }
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
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res = await getBindCpV520(this.ruleForm);
                    if(res.code === 2000){
                        this.$success("绑定CP成功");
                    }
                    this.dialogVisible = false;
                    this.$emit("handleBind");
                } else {
                    this.dialogVisible = false;
                    return false;
                }
            });
        },
    }
}
</script>