<template>
    <div class="bannerComp-box">
        <el-dialog
        :title="titie"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                <el-form-item label="banner标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="banner图片" prop="pic">
                    <uploadImg ref="uploadImg" v-model="ruleForm.pic" :imgUrl="ruleForm.pic" name="pic" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="轮播顺序" prop="sort">
                    <el-input v-model="ruleForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="banner外部链接" prop="url">
                    <el-input v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time" :rules="startTime">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="timestamp"
                    :picker-options="StartPicker">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time" :rules="endTime">
                    <el-date-picker
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择结束时间"
                    value-format="timestamp"
                    :picker-options="EndPicker">
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
import { getBannerChange } from '@/api/videoRoom'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    computed: {
        StartPicker() { // 开始时间限制
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        EndPicker() { // 结束时间限制
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        startTime() { // 开始时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start) {
                        if(start < now && this.status === 'add') {
                            cb(new Error('开始时间不可小于当前时间'))
                        } else {
                            cb()
                        }
                    } else {
                        cb(new Error('请选择开始时间'))
                    }
                }
            }
            return params
        },
        endTime() { // 结束时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start) {
                        if(start < now && this.status === 'add') {
                            cb(new Error('结束时间不可小于当前时间'))
                        } else {
                            cb()
                        }
                    } else {
                        cb(new Error('请选择结束时间'))
                    }
                }
            }
            return params
        },
        titie() {
            if(this.status === 'add') {
                return 'banner新增'
            } else if(this.status === 'update') {
                return 'banner修改'
            }
        }
    },
    data() {
        return {
            status: 'add', // 当前状态
            dialogVisible: false,
            ruleForm: {
                title: '',
                pic: '',
                sort: '',
                url: '',
                start_time: null,
                end_time: null
            },
            rules: {
                title: [
                    { required: true, message: '请输入banner标题', trigger: 'blur' }
                ],
                pic: [
                    { required: true, message: '请上传banner图片', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请输入轮播顺序', trigger: 'blur' }
                ],
                url: [
                    { required: false, message: '请输入banner外部链接', trigger: 'blur' }
                ],
                start_time: [
                    { required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                end_time: [
                    { required: true, message: '请选择结束时间', trigger: 'change' }
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
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = !params.start_time ? '' : params.start_time * 1000
                params.end_time = !params.endTime ? '' : params.endTime * 1000
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        id: s.id,
                        title: s.title,
                        pic: s.pic,
                        type: s.type,
                        status: s.status,
                        ps: s.ps,
                        sort: s.sort,
                        url: s.url,
                        start_time: Math.floor(s.start_time / 1000),
                        end_time: Math.floor(s.end_time / 1000)
                    }
                    let res = await getBannerChange(params)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$message.success('新增成功')
                        } else {
                            this.$message.success('修改成功')
                        }
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
.bannerComp-box {
    .el-date-editor {
        width: 280px;
    }
}
</style>