<template>
    <div class="activity-userComp-box">
        <drawer 
        size="470px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="用户昵称" prop="sound_tag">
                    <el-input v-model="ruleForm.sound_tag" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="sound_tag">
                    <el-input v-model="ruleForm.sound_tag" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="首充时间" prop="sound_tag">
                    <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择首充时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="guild_type">
                    <el-select v-model="ruleForm.guild_type" placeholder="请选择公会等级" :disabled="disabled">
                        <el-option v-for="item in guildTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册时间" prop="sound_tag">
                    <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择注册时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="间隔时间" prop="sound_tag">
                    <el-date-picker
                    v-model="value1"
                    type="datetime"
                    placeholder="选择间隔时间"
                    :disabled="disabled">
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
import { save } from '@/api/moveDating'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg,
        drawer
    },
    data() {
        return {
            status: 'add', // 当前状态
            oldParams: {}, // 老数据
            ruleForm: {
                id: null,
                img: '',
                sound_tag: '',
                audio: '',
                duration: null,
                sort: ''
            },
            rules: {
                sound_tag: [
                    { required: true, message: '请输入音色分类名', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入权重排序', trigger: 'blur' }
                ],
                img: [
                    { required: true, message: '请上传封面', trigger: 'change' }
                ],
                audio: [
                    { required: true, message: '请上传声音签名', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增心动卡片'
            } else if(this.status === 'update') {
                return '修改心动卡片'
            } else {
                return '查看心动卡片'
            }
        },
        disabled() { // 禁止修改
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }
            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
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
        // 修改
        update() {
            this.status = 'update'
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.duration = params.duration ? Math.floor(params.duration) : params.duration
                    params.sound_img = ''
                    let res = await save(params)
                    if(res.code === 2000) {
                        this.$success('新增成功')
                        this.openComp(false)
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
        // 重置 - 验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 获取音频
        async getFile(file) {
            let time = await this.getMp4Time(file.file)
            this.ruleForm.duration = time
        },
        getMp4Time(file) {
            let that = this
            return new Promise((resolve,reject) => {
                //把element上传组件传给我们的file转成url
                let url = URL.createObjectURL(file)
                //获取对象
                var audioElement = new Audio(url)
                //监听事件
                audioElement.addEventListener('loadedmetadata', () => { 
                    const time = Math.round(audioElement.duration * 100) / 100
                    resolve(time)  
                })
                audioElement.addEventListener('error', () => { 
                    resolve(0)
                })
            })       
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.activity-userComp-box {
    .el-select {
        width: 300px;
    }
    .el-date-editor {
        width: 300px;
    }
}
</style>