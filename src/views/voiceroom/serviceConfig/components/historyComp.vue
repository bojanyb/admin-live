<template>
    <div class="serviceConfig-historyComp-box">
        <el-dialog
        title="添加敏感词"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm">
                <el-form-item label="敏感词" prop="val">
                    <el-input v-model="ruleForm.val"></el-input>
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
import { add } from '@/api/risk.js'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                val: ''
            },
            rules: {
                val: [
                    { required: true, message: '请输入敏感词', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
                    let res = await add({ val: this.ruleForm.val })
                    if(res.code === 2000) {
                        this.dialogVisible = false
                        this.$success('添加成功')
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
.serviceConfig-historyComp-box {

}
</style>