<template>
    <div class="user-punishComp-box">
        <el-dialog
        title="用户处罚"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="处罚类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value" :disabled="item.name == '封WIFI'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处罚时间" prop="ban_duration">
                    <el-select v-model="ruleForm.ban_duration" placeholder="请选择">
                        <el-option v-for="(item,index) in timeList" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处罚备注" prop="remark">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.remark"></el-input>
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
import { save } from '@/api/risk'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    data() {
        return {
            dialogVisible: false,
            timeList: MAPDATA.DURATION, // 处罚时长
            typeList: MAPDATA.USERPUNISHTYPELIST, // 处罚类型
            form: {},
            ruleForm: {
                type: null,
                ban_duration: '',
                remark: ''
            },
            rules: {
                type: [
                    { required: true, message: '请选择处罚类型', trigger: 'change' }
                ],
                ban_duration: [
                    { required: true, message: '请选择处罚时间', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入处罚备注', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(row) {
            this.dialogVisible = true
            this.form = row
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.form
                    let params = {
                        ...this.ruleForm,
                        user_number: s.user_number
                    }
                    let res = await save(params)
                    if(res.code === 2000) {
                        this.$success('操作成功')
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
        }
    }
}
</script>

<style lang="scss">
.user-punishComp-box {
    .el-select {
        width: 310px;
    }
}
</style>