<template>
    <div class="notReport-box">
        <el-dialog
        title="举报处理"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="封禁说明" prop="reply">
                    <el-input type="textarea" v-model="ruleForm.reply" placeholder="封禁说明必填,至少二十个字" :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="封禁时间" prop="ban_duration">
                    <el-select v-model="ruleForm.ban_duration" placeholder="请选择">
                        <el-option v-for="item in timeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
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
import { getUserReportDeal } from '@/api/videoRoom'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    data() {
        return {
            dialogVisible: false,
            timeList: MAPDATA.DURATION, // 封禁时间
            ruleForm: {
                id: null,
                reply: '',
                ban_duration: null
            },
            rules: {
                reply: [
                    { required: true, message: '请输入封禁说明', trigger: 'blur' },
                    { min: 20, max: 999, message: '至少二十个字', trigger: 'blur' }
                ],
                ban_duration: [
                    { required: true, message: '请选择封禁时间', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取参数
        loadParams(id) {
            this.ruleForm.id = id
            this.dialogVisible = true
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    if(params.ban_duration > 0) {
                        params.ban_duration = params.ban_duration * 24 * 60 * 60
                    }
                    let res = await getUserReportDeal(params)
                    if(res.code === 2000) {
                        this.$message.success('处理成功')
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
        }
    }
}
</script>

<style lang="scss">
.notReport-box {
    .el-select {
        width: 280px;
    }
}
</style>