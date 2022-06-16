<template>
    <div class="paySystem-index-box">
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
                    <el-form-item label="应用名称" class="must">
                        <el-input :disabled="true" v-model="oldParams.title" placeholder="请输入应用名称"></el-input>
                    </el-form-item>
                    <el-form-item label="APPID" class="must">
                        <el-input v-model="oldParams.appid" :disabled="true" placeholder="请输入APPID"></el-input>
                    </el-form-item>
                    <el-form-item label="支付网关" class="must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.gateway_host" :disabled="true" placeholder="请输入支付网关"></el-input>
                    </el-form-item>
                    <el-form-item label="加密类型" class="must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.sign_type" :disabled="true" placeholder="请输入加密类型"></el-input>
                    </el-form-item>
                    <el-form-item label="私钥" class="must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.private_key" :disabled="true" placeholder="请输入私钥"></el-input>
                    </el-form-item>
                    <el-form-item label="公钥" class="cellBox must">
                        <el-input type="textarea" :rows="4" v-model="oldParams.public_key" :disabled="true" placeholder="请输入公钥"></el-input>
                    </el-form-item>
                    <el-form-item label="支付授权回调地址" class="cellBox must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.notify_url" :disabled="true" placeholder="请输入支付授权回调地址"></el-input>
                    </el-form-item>
                    <el-form-item label="AES密钥" class="cellBox must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.encrypt_key" :disabled="true" placeholder="请输入AES密钥"></el-input>
                    </el-form-item>
                </div>
                <div class="oldDeploy">
                    <div class="title">新配置</div>
                    <el-form-item label="应用名称" prop="title">
                        <el-input v-model="ruleForm.title" placeholder="请输入应用名称"></el-input>
                    </el-form-item>
                    <el-form-item label="APPID" prop="appid">
                        <el-input v-model="ruleForm.appid" placeholder="请输入APPID"></el-input>
                    </el-form-item>
                    <el-form-item label="支付网关" prop="gateway_host">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.gateway_host" placeholder="请输入支付网关"></el-input>
                    </el-form-item>
                    <el-form-item label="加密类型" prop="sign_type">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.sign_type" placeholder="请输入加密类型"></el-input>
                    </el-form-item>
                    <el-form-item label="私钥" prop="private_key">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.private_key" placeholder="请输入私钥"></el-input>
                    </el-form-item>
                    <el-form-item label="公钥" prop="public_key">
                        <el-input type="textarea" :rows="4" v-model="ruleForm.public_key" placeholder="请输入公钥"></el-input>
                    </el-form-item>
                    <el-form-item label="支付授权回调地址" prop="notify_url">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.notify_url" placeholder="请输入支付授权回调地址"></el-input>
                    </el-form-item>
                    <el-form-item label="AES密钥" prop="encrypt_key">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.encrypt_key" placeholder="请输入AES密钥"></el-input>
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
                gateway_host: '',
                sign_type: '',
                private_key: '',
                public_key: '',
                notify_url: '',
                encrypt_key: ''
            },
            mer_id: null,
            rules: {
                title: [
                    { required: true, message: '请输入应用名称', trigger: 'blur' },
                ],
                appid: [
                    { required: true, message: '请输入APPID', trigger: 'blur' },
                ],
                gateway_host: [
                    { required: true, message: '请输入支付网关', trigger: 'blur' },
                ],
                sign_type: [
                    { required: true, message: '请输入加密类型', trigger: 'blur' },
                ],
                private_key: [
                    { required: true, message: '请输入私钥', trigger: 'blur' },
                ],
                public_key: [
                    { required: true, message: '请输入公钥', trigger: 'blur' },
                ],
                notify_url: [
                    { required: true, message: '请输入支付授权回调地址', trigger: 'blur' },
                ],
                encrypt_key: [
                    { required: true, message: '请输入AES密钥', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        // 获取四方支付
        getWxPayFunc(id) {
            this.mer_id = id
            getWxPay({id: id}).then(res => {
                this.oldParams = res.data.row || {}
            })
        },
        // 设置四方支付
        setWxpayFunc() {
            let s = this.ruleForm
            let a = this.oldParams
            let params = {
                id: this.mer_id,
                // mer_id: a.mer_id,
                appid: s.appid,
                gateway_host: s.gateway_host,
                sign_type: s.sign_type,
                private_key: s.private_key,
                public_key: s.public_key,
                notify_url: s.notify_url,
                encrypt_key: s.encrypt_key
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
.paySystem-index-box {
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