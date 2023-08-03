<template>
    <div class="tabbarComp-box">
        <el-dialog
        :title="titie"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="文字" prop="name" v-if="ruleForm.id !== 5">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="文字选中色值" prop="color" v-if="ruleForm.id !== 5">
                    <el-input v-model="ruleForm.color">
                        <template slot="suffix">
                            <el-color-picker v-model="ruleForm.color"></el-color-picker>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="图片" prop="icon">
                    <uploadImg ref="uploadImg" v-model="ruleForm.icon" :imgUrl="ruleForm.icon" name="icon" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                    <div v-if="ruleForm.id === 4" class="el-upload__tip">强制覆盖（只会显示上传的图片）</div>
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
import { updateTabbarConfig } from '@/api/system'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    computed: {
        titie() {
            return '位置'
        }
    },
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                id: null,
                name: '',
                color: '',
                icon: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入文字', trigger: 'blur' }
                ],
                color: [
                    { required: true, message: '请输入文字选中后变色的色值', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请上传图片', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
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
                        id: s.id,
                        name: s.name,
                        color: s.color,
                        icon: s.icon,
                    }
                    let res = await updateTabbarConfig(params)
                    if(res.code === 2000) {
                        this.$message.success('操作成功！')
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
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        }
    }
}
</script>
<style lang="scss">
.tabbarComp-box {
    .el-color-picker__trigger {
        border: none;
    }
    .el-upload__tip {
        color: #f56c6c;
    }
}
</style>