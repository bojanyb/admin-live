<template>
    <div class="promotion-system-orderComp-box">
        <el-dialog
        title="新增推广补单"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                <el-form-item label="推广员ID" prop="promoter_user_number">
                    <el-input oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.promoter_user_number"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="user_number">
                    <el-input oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.user_number"></el-input>
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
import { regPeplenishment } from '@/api/recommend'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                promoter_user_number: '',
                user_number: ''
            },
            rules: {
                promoter_user_number: [
                    { required: true, message: '请输入推广员ID', trigger: 'blur' }
                ],
                user_number: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 打开弹窗
        loadParams() {
            this.dialogVisible = true
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        promoter_user_number: s.promoter_user_number,
                        user_number: s.user_number
                    }
                    let res = await regPeplenishment(params)
                    if(res.code === 2000) {
                        this.$success('添加成功')
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
.promotion-system-orderComp-box {

}
</style>