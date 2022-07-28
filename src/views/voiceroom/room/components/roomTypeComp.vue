<template>
    <div class="roomTypeComp-box">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="400px"
            :before-close="handleClose"
            :close-on-click-modal="false"
            @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="序号" prop="sort">
                    <el-input v-model="ruleForm.sort" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="输入序号范围: 1 ~ 65535" @input="sortInput"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="timestamp">
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
import { getRoomGenreSave } from '@/api/videoRoom'
export default {
    data() {
        return {
            dialogVisible: false,
            status: 'add',
            ruleForm: {
                id: null,
                name: '',
                sort: '',
                start_time: null
            },
            rules: {
                name: [
                    { required: true, message: '请输入类型名称', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]+$/gi, message: '请输入汉字', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入序号', trigger: 'blur' }
                ],
                start_time: [
                    { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增房间类型'
            } else if(this.status === 'update') {
                return '修改房间类型'
            }
        }
    },
    methods: {
        // 限制输入最大数字
        sortInput(v) {
            if(v > 65535) {
                this.ruleForm.sort = 65535
            }
        },
        // 弹窗关闭
        handleClose() {
            this.dialogVisible = false
        },
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.start_time = Math.floor(params.start_time / 1000)
                    let res = await getRoomGenreSave(params)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$message.success('新增成功')
                        } else {
                            this.$message.success('修改成功')
                        }
                    }
                    this.dialogVisible = false
                    this.$emit('getList')
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
        closed() {
            this.$emit('destoryComp')
        }
    },
}
</script>

<style lang="scss">
.roomTypeComp-box {
    .el-date-editor {
        width: 280px;
    }
}
</style>