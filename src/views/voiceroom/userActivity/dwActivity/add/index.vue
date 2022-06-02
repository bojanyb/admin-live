<template>
    <div class="zzbxActivity-add">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose"
            @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="108px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input :disabled="true" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动图片" prop="icon">
                    <Upload v-model="ruleForm.icon" :imgUrl="ruleForm.icon"  @validateField="validateField" :disabled="disabled" ref="Upload"></Upload>
                </el-form-item>
                <el-form-item label="活动类型" prop="type">
                    <el-select v-model="ruleForm.type" :disabled="disabled" placeholder="请选择活动类别">
                        <el-option v-for="(item,index) in dwActivityList" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动链接" prop="url">
                    <el-input :disabled="disabled" v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker
                    :disabled="disabled"
                    v-model="ruleForm.start_time"
                    value-format="timestamp"
                    type="datetime"
                    :picker-options="StartPicker"
                    placeholder="请选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time" :rules="EndRules">
                    <el-date-picker
                    :disabled="disabled"
                    v-model="ruleForm.end_time"
                    :picker-options="EndPicker"
                    value-format="timestamp"
                    type="datetime"
                    placeholder="请选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="resetForm">取 消</el-button>
                    <el-button :disabled="disabled" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { configDW } from '@/api/userActivity'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入上传图片组件
import Upload from '@/components/uploadImg/index.vue'

export default {
    components: {
        Upload
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增'
            } else if(this.status === 'update') {
                return '修改'
            }
            return '查看'
        },
        StartRules() {
            let params = {}
            let start = this.ruleForm.start_time
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < new Date().getTime() && this.status !== 'update') {
                        cb(new Error('开始时间不能小于当前时间!'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        EndRules() {
            let params = {}
            let start = this.ruleForm.start_time
            let end = this.ruleForm.end_time
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(end < new Date().getTime() && this.status !== 'update') {
                        cb(new Error('结束时间不能小于当前时间!'))
                    } if(start && end <= start && this.status !== 'update') {
                        cb(new Error('结束时间不能小于开始时间!'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        StartPicker() {
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        EndPicker() {
            return {
                disabledDate: (time) => {
                    if(!this.ruleForm.start_time) {
                        return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                    }
                    return time.getTime() < this.ruleForm.start_time  - 24 * 60 * 60 * 1000;
                }
            }
        },
        disabled() {
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    data() {
        return {
            status: 'add',
            code: 'dw',
            dialogVisible: false,
            dwActivityList: MAPDATA.DWACTIVITYTYPE,
            ruleForm: {
                id: null,
                name: '2022端午活动',
                icon: '',
                type: '',
                url: '',
                start_time: null,
                end_time: null,
                animation: '11'
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请输入活动图片', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择活动类型', trigger: 'change' }
                ],
                url: [
                    { required: true, message: '请输入活动链接', trigger: 'blur' }
                ],
                start_time: [
                    { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                end_time: [
                    { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.resetForm()
        },
        async loadParams(status, row) {
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                this.ruleForm = params
            }
            this.dialogVisible = true
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.code = 'dw'
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.end_time = Math.floor(params.end_time / 1000)
                    configDW(params).then(res => {
                        this.dialogVisible = false
                        this.$message.success('创建成功!')
                        this.$emit('getList')
                    }).catch(err => {
                        this.$message.error(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            if(this.status !== 'see') {
                this.$confirm('关闭后数据不会保存，确定关闭吗？')
                .then(_ => {
                    this.dialogVisible = false
                })
                .catch(_ => {});
            } else {
                this.dialogVisible = false
            }
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
.zzbxActivity-add {
    .el-dialog__body {
        padding: 30px 20px 10px 20px;
    }
    .footer {
        .el-form-item__content {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
