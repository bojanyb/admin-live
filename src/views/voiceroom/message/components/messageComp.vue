<template>
    <div class="messageComp-box">
        <drawer 
        size="470px"
        :title="title"
        ref="drawer"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="活动标题" prop="title">
                    <el-input v-model="ruleForm.title" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="活动描述" prop="describe">
                    <el-input v-model="ruleForm.describe" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="活动配图" prop="image_url">
                    <uploadImg ref="uploadImg" :disabled="disabled" v-model="ruleForm.image_url" :imgUrl="ruleForm.image_url" name="image_url" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="活动链接" prop="uri" :rules="navToUriParams">
                    <el-input v-model="ruleForm.nav_to.uri" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="开始推送时间" prop="start_time">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
                    :disabled="disabled"
                    placeholder="选择开始推送时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { messageAdd } from '@/api/videoRoom'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg,
        drawer
    },
    data() {
        return {
            status: 'add',
            ruleForm: {
                title: '',
                image_url: '',
                nav_to: {
                    type: 'h5',
                    uri: ''
                },
                start_time: null
            },
            oldParams: {}, // 老数据
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
        disabled() {
            if(this.status === 'see') {
                return true
            }
            return false
        },
        title() {
            if(this.status === 'add') {
                return '新增活动通知'
            } else if(this.status === 'see') {
                return '查看活动通知'
            }
        },
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
        // 获取参数
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                this.$set(this.$data, 'ruleForm', params)
            }
            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm)) // 复制数据
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 取消
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) { // 记录数据 - 有改动就提示
                this.$confirm('关闭弹窗将不会保留您的更改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.openComp(false)
                }).catch(() => {});
            } else {
                this.openComp(false)
            }
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
                        this.$success('新增成功')
                    }
                    this.openComp(false)
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