<template>
    <div class="roomConfig-categoryComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="业务类型" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择业务类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品类名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="排序权重" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="品类图标" prop="name">
                    <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
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
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dialogVisible: false,
            status: 'add',
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
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增品类'
            } else if(this.status === 'update') {
                return '修改品类'
            }
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取参数
        loadParams(status, row) {
            this.dialogVisible = true
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        }
    }
}
</script>

<style lang="scss" scoped>
.roomConfig-categoryComp-box {
    .el-select {
        width: 260px;
    }
}
</style>