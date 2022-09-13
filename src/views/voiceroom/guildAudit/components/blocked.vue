// 封禁弹窗
<template>
    <div class="blocked-box">
        <el-dialog 
        title="封禁" 
        :visible.sync="dialogVisible" 
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
				<el-form-item label="封禁时间" prop="kill_time">
					<el-select v-model="ruleForm.kill_time" placeholder="请选择">
						<el-option v-for="item in timerList" :key="item.value" :label="item.name" :value="item.value" />
					</el-select>
				</el-form-item>
				<el-form-item label="封禁说明" prop="remark">
					<el-input v-model="ruleForm.remark" type="textarea" :rows="5" placeholder="正常状态可不填" clearable />
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>

// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    data() {
        return {
            dialogVisible: false,
            timerList: MAPDATA.DURATION,
            ruleForm: {
                kill_time: null,
                remark: ''
            },
            rules: {
                kill_time: [
                    { required: true, message: '请选择封禁时间', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请填写封禁说明', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        loadParams() {
            this.dialogVisible = true
        },
        handleClose() {
            this.dialogVisible = false
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.dialogVisible = false
                    this.$emit('evaluationFunc', this.ruleForm)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消
        cancel() {
            this.dialogVisible = false
            this.$emit('blockedCancel')
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
.blocked-box {
    .el-select {
        width: 380px;
    }
}
</style>