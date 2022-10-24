<template>
    <div class="superAdmin-add-messageComp-box">
        <el-dialog
        title="修改超管处罚文案"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="文案" prop="kv_value">
                    <el-input type="textarea" v-model="ruleForm.kv_value" :rows="4"></el-input>
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
import { update } from '@/api/super.js'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                kv_id: null,
                kv_value: ''
            },
            rules: {
                kv_value: [
                    { required: true, message: '请输入文案', trigger: 'blur' },
                    { min: 1, max: 30, message: '文案最大限制输入30个字符', trigger: 'blur' }
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
            let params = JSON.parse(JSON.stringify(row))
            this.$set(this.$data, 'ruleForm', params)
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        kv_id: s.kv_id,
                        kv_value: s.kv_value
                    }
                    let res = await update(params)
                    if(res.code === 2000) {
                        this.dialogVisible = false
                        this.$success('修改成功')
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
.superAdmin-add-messageComp-box {

}
</style>