<template>
    <div class="recommend-promotion-system-add">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="推广商ID" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="推广单价" prop="region">
                    <el-input v-model="ruleForm.region"></el-input>
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
export default {
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            ruleForm: {
                name: '',
                region: ''
            },
            oldParams: {}, // 老数据
            rules: {
                name: [
                    { required: true, message: '请输入推广商ID', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请输入推广单价', trigger: 'blur' }
                ],
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增推广商'
            } else if(this.status === 'update') {
                return '编辑推广商'
            }
        }
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
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
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

<style lang="scss">
.recommend-promotion-system-add {

}
</style>