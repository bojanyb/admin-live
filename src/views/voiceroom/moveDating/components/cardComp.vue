<template>
    <div class="moveDating-cardComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="450px"
        top="5vh"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="音色分类名" prop="sound_tag">
                    <el-input v-model="ruleForm.sound_tag"></el-input>
                </el-form-item>
                <el-form-item label="音色分类图" prop="sound_img">
                    <uploadImg ref="uploadImg" v-model="ruleForm.sound_img" :imgUrl="ruleForm.sound_img" name="sound_img" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="权重排序" prop="sort">
                    <el-input v-model="ruleForm.sort" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item label="文件类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
                        <el-option label="封面" :value="1"></el-option>
                        <el-option label="声音签名" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传封面" prop="img" v-if="ruleForm.type === 1">
                    <uploadImg ref="uploadImg" v-model="ruleForm.img" :imgUrl="ruleForm.img" name="img" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="上传声音签名" :rules="verifyAudio" prop="audio" v-if="ruleForm.type === 2">
                    <uploadImg ref="uploadAudio" v-model="ruleForm.audio" :imgUrl="ruleForm.audio" name="audio" @validateField="validateField" @getFile="getFile" accept=".mp3"></uploadImg>
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
import { save } from '@/api/moveDating'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            ruleForm: {
                id: null,
                type: '',
                img: '',
                sound_tag: '',
                sound_img: '',
                audio: '',
                duration: null,
                sort: ''
            },
            rules: {
                sound_tag: [
                    { required: true, message: '请输入音色分类名', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                sound_img: [
                    { required: true, message: '请上传音色分类图', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请输入权重排序', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择文件类型', trigger: 'change' }
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
            }
        },
        verifyAudio() { // 校验音频

        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                console.log(params, 'params---------2020')
                if(params.audio) {
                    params.type = 2
                } else {
                    params.type = 1
                }
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    console.log(params, 'params---------2020')
                    if(params.type === 1) {
                        params.audio = ''
                    } else {
                        params.img = ''
                    }
                    params.duration = params.duration ? Math.floor(params.duration) : params.duration
                    delete params.type
                    let res = await save(params)
                    if(res.code === 2000) {
                        this.$message.success('新增成功')
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
.moveDating-cardComp-box {
    .el-select {
        width: 300px;
    }
}
</style>