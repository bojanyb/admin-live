<!-- 充值组件 -->
<template>
    <div class="add-box">
        <el-dialog
        title="充值"
        :visible.sync="dialogVisible"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
				<el-form-item label="充值红钻：" prop="number">
                    <el-input v-model="ruleForm.number" @input="amountInput"></el-input>
                </el-form-item>
                <el-form-item label="原因：" prop="remark">
                    <el-input v-model="ruleForm.remark" :rows="4" type="textarea"></el-input>
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
import { userList } from '@/api/user'
import {
    recharge
} from '@/api/substitute'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                number: "",
                remark: ""
            },
            rules: {
                number: [
                    { required: true, message: '请输入充值红钻', trigger: 'blur' },
                ],
                remark: [
                    { required: true, message: '请输入原因', trigger: 'blur' },
                ]
            },
            source: {}
        };
    },
    mounted(){},
    methods: {
        // 限制输入金额
        amountInput() {
            this.ruleForm.number = this.ruleForm.number.replace(/[^\d]/g, '')
        },
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
                    this.handleRecharge();
                } else {
                    return false;
                }
            });
        },
        // 充值
        handleRecharge(){
            let params = {
                user_id : this.source.user_id,
                type : 1,
                number : this.ruleForm.number,
                remark : this.ruleForm.remark,
            }
            recharge(params).then(res=>{
                this.$message.success("操作成功");
                let params = {
                    type: "success"
                }
                this.$emit("handleRechargeFun",params);
            }).catch(err=>{})
        },
        // 取消
        cancel() {
            this.dialogVisible = false
            this.$emit('blockedCancel')
        },
        // 重置
        resetForm() {
            if(this.$refs["ruleForm"]){
                this.$refs["ruleForm"].resetFields();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.add-box {
    .numberBox {
        .el-input {
            width: 215px;
        }
    }
}
</style>