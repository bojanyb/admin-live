<template>
    <div class="messageComp-box">
        <el-dialog
        title="新增活动通知"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="活动标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="活动描述" prop="describe">
                    <el-input v-model="ruleForm.describe"></el-input>
                </el-form-item>
                <el-form-item label="活动配图" prop="image_url">
                    <uploadImg ref="uploadImg" v-model="ruleForm.image_url" :imgUrl="ruleForm.image_url" name="image_url" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="活动链接" prop="uri" :rules="navToUriParams">
                    <el-input v-model="ruleForm.nav_to.uri"></el-input>
                </el-form-item>
                <el-form-item label="开始推送时间" prop="start_time">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
                    placeholder="选择开始推送时间">
                    </el-date-picker>
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
import { messageAdd } from '@/api/videoRoom'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                title: '',
                image_url: '',
                nav_to: {
                    type: 'h5',
                    uri: ''
                },
                start_time: null
            },
            rules: {
                title: [
                    { required: true, message: '请输入活动标题', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                describe: [
                    { required: true, message: '请输入活动描述', trigger: 'blur' },
                ],
                image_url: [
                    { required: true, message: '请上传活动配图', trigger: 'change' }
                ],
                start_time: [
                    { type: 'date', required: true, message: '请选择开始推送时间', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        navToUriParams() { // 活动链接验证
            let params = {}
            params = {
                required: true,
                validator: (val, rules, cb) => {
                    let s = this.ruleForm.nav_to.uri
                    if(s) {
                        cb()
                    } else {
                        cb(new Error('请填写活动链接'))
                    }
                }
            }
            return params
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.nav_to = JSON.stringify(params.nav_to)
                    let res = await messageAdd(params)
                    if(res.code === 2000) {
                        this.$message.success('新增成功')
                    }
                    this.dialogVisible = false
                    this.$emit('getList')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置 - 验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.messageComp-box {
    .el-date-editor {
        width: 300px;
    }
}
</style>