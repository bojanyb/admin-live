<template>
    <div class="finance-paymentComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <div class="formBox">
                    <el-form-item label="支付平台" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商户号" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="商户名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="配置参数" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="签名文件" prop="name" class="fileBox">
                    <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="支付类型" prop="name">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="复选框 A"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                    </el-checkbox-group>
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
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增支付配置'
            } else if(this.status === 'update') {
                return '修改支付配置'
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
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
        loadParams(status, row) {
            this.status = status
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
        },
        // 重置 - 验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        }
    }
}
</script>

<style lang="scss">
.finance-paymentComp-box {
    .formBox {
        display: flex;
    }
}
</style>