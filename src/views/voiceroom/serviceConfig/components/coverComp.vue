<template>
    <div class="serviceConfig-coverComp-box">
        <el-dialog
        title="拒绝原因"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="拒绝原因" prop="remark">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.remark"></el-input>
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
import { coverCheck } from '@/api/risk'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                id: null,
                status: '',
                remark: ''
            },
            rules: {
                remark: [
                    { required: true, message: '请填写拒绝原因', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(id, status) {
            this.ruleForm.status = status
            this.ruleForm.id = id
            this.dialogVisible = true
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    let res = await coverCheck(params)
                    if(res.code === 2000) {
                        this.$success('拒绝成功')
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
.serviceConfig-coverComp-box {

}
</style>