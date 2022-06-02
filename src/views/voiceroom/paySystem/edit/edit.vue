<template>
    <div class="paySystem-edit-box">
        <el-dialog
        title="修改配置"
        :visible.sync="dialogVisible"
        width="1030px"
        top="5vh"
        :before-close="handleClose"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <div class="oldDeploy">
                    <div class="title">旧配置</div>
                    <el-form-item label="商户号" class="must">
                        <el-input :disabled="true" v-model="oldParams.title" placeholder="请输入商户号"></el-input>
                    </el-form-item>
                    <el-form-item label="APPID" class="must">
                        <el-input v-model="oldParams.appid" :disabled="true" placeholder="请输入APPID"></el-input>
                    </el-form-item>
                    <el-form-item label="秘钥" class="must">
                        <el-input v-model="oldParams.secret" :disabled="true" placeholder="请输入秘钥"></el-input>
                    </el-form-item>
                    <el-form-item label="支付key" class="must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.key" :disabled="true" placeholder="请输入支付key"></el-input>
                    </el-form-item>
                </div>
                <div class="oldDeploy">
                    <div class="title">新配置</div>
                    <el-form-item label="商户号" prop="title">
                        <el-input v-model="ruleForm.title" placeholder="请输入商户号"></el-input>
                    </el-form-item>
                    <el-form-item label="APPID" prop="appid">
                        <el-input v-model="ruleForm.appid" placeholder="请输入APPID"></el-input>
                    </el-form-item>
                    <el-form-item label="秘钥" prop="secret">
                        <el-input v-model="ruleForm.secret" placeholder="请输入秘钥"></el-input>
                    </el-form-item>
                    <el-form-item label="支付key" prop="key">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.key" placeholder="请输入支付key"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
// 引入api
import { getWxPay, setWxpay } from '@/api/pay.js'

export default {
    data() {
        return {
            dialogVisible: false,
            oldParams: {},
            ruleForm: {
                title: '',
                appid: '',
                secret: '',
                key: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入商户号', trigger: 'blur' },
                ],
                appid: [
                    { required: true, message: '请输入APPID', trigger: 'blur' },
                ],
                secret: [
                    { required: true, message: '请输入秘钥', trigger: 'blur' },
                ],
                key: [
                    { required: true, message: '请输入支付key', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        // 获取四方支付
        getWxPayFunc(id) {
            getWxPay({id: id}).then(res => {
                this.oldParams = res.data.row || {}
            })
        },
        // 设置四方支付
        setWxpayFunc() {
            let s = this.ruleForm
            let a = this.oldParams
            let params = {
                id: a.id,
                appid: s.appid,
                secret: s.secret,
                title: s.title,
                key: s.key
            }
            setWxpay(params).then(res => {
                if(res.code === 2000) {
                    this.dialogVisible = false
                    this.$emit('getPayFunc')
                }
            }).catch(err=> {
                this.$message.error('操作失败')
            })
        },
        // 设置非四方支付
        handleClose() {
            this.resetForm()
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.setWxpayFunc()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 
        resetForm(formName) {
            this.$confirm('关闭后数据不会保存，确定关闭吗？')
            .then(_ => {
                this.dialogVisible = false
            })
            .catch(_ => {});
        },
        // 销毁
        destoryComp() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.paySystem-edit-box {
    .el-form {
        display: flex;
        .oldDeploy {
            padding: 20px;
            box-sizing: border-box;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
            margin-right: 10px;
            .el-input {
                width: 300px;
            }
            >.title {
                font-weight: 600;
                font-size: 20px;
                margin-bottom: 20px;
            }
            .must {
                .el-form-item__label::before {
                    content: '*';
                    color: #ff4949;
                    margin-right: 4px;
                }
            }
            .cellBox {
                .el-form-item__label {
                    line-height: 18px;
                }
            }
        }
    }
}
</style>