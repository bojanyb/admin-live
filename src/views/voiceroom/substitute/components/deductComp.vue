<!-- 扣款组件 -->
<template>
    <div class="deduct-box">
        <el-dialog
        title="扣款"
        :visible.sync="dialogVisible"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
			<el-form :model="ruleDelForm" :rules="rules" ref="ruleDelForm" label-width="120px" class="demo-ruleForm">
				<el-form-item label="红钻余额：" :rules="[{ required: false }]">
                    <div>{{ source.red_diamond }}</div>
                </el-form-item>
                <el-form-item label="扣款金额：" prop="number" :rules="verifyAmount">
                    <el-input v-model="ruleDelForm.number" @input="amountInput"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input v-model="ruleDelForm.remark" :rows="4" type="textarea"></el-input>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleDelForm')">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
import { recharge } from '@/api/substitute'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleDelForm: {
                number: "",
                remark: ""
            },
            rules: {
                remark: [
                    { required: true, message: '请输入备注信息', trigger: 'blur' },
                ]
            },
            source: {}
        };
    },
    computed: {
        verifyAmount() { // 验证扣款金额
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(!this.ruleDelForm.number) {
                        cb(new Error('请输入扣款金额'))
                    } else {
                        if(Number(this.ruleDelForm.number) > this.source.red_diamond) {
                            cb(new Error('扣款金额最大值为：' + this.source.red_diamond))
                        }
                    }
                }
            }
            return params
        }
    },
    methods: {
        // 限制输入金额
        amountInput() {
            this.ruleDelForm.number = this.ruleDelForm.number.replace(/[^\d]/g, '')
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
                    this.handleDeduct();
                } else {
                    return false;
                }
            });
        },
        // 代充扣款
        handleDeduct(){
            let params = {
                user_id : this.source.user_id,
                type : 2,
                number : this.ruleDelForm.number,
                remark : this.ruleDelForm.remark,
            }
            recharge(params).then(res=>{
                this.$message.success("操作成功");
                let params = {
                    type: "success"
                }
                this.$emit("handleDeductFun",params);
            }).catch(err=>{})
        },
        // 取消
        cancel() {
            this.dialogVisible = false
            this.$emit('blockedCancel')
        },
        // 重置
        resetForm() {
            if(this.$refs["ruleDelForm"]){
                this.$refs["ruleDelForm"].resetFields();
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