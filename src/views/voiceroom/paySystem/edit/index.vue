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
                    <el-form-item label="prod模式API_KEY" class="must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.api_key_live" :disabled="true" placeholder="请输入prod模式API_KEY"></el-input>
                    </el-form-item>
                    <el-form-item label="商户RSA公钥" class="must">
                        <el-input type="textarea" :rows="4" v-model="oldParams.rsa_public_key" :disabled="true" placeholder="请输入商户RSA公钥"></el-input>
                    </el-form-item>
                    <el-form-item label="mock模式API_KEY" class="must">
                        <el-input type="textarea" :rows="2" v-model="oldParams.api_key_test" :disabled="true" placeholder="请输入mock模式API_KEY"></el-input>
                    </el-form-item>
                    <el-form-item label="汇付的私钥rsa_private_key" class="cellBox must">
                        <el-input type="textarea" :rows="4" v-model="oldParams.rsa_private_key" :disabled="true" placeholder="请输入汇付的私钥rsa_private_key"></el-input>
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
                    <el-form-item label="prod模式API_KEY" prop="api_key_live">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.api_key_live" placeholder="请输入prod模式API_KEY"></el-input>
                    </el-form-item>
                    <el-form-item label="商户RSA公钥" prop="rsa_public_key">
                        <el-input type="textarea" :rows="4" v-model="ruleForm.rsa_public_key" placeholder="请输入商户RSA公钥"></el-input>
                    </el-form-item>
                    <el-form-item label="mock模式API_KEY" prop="api_key_test">
                        <el-input type="textarea" :rows="2" v-model="ruleForm.api_key_test" placeholder="请输入mock模式API_KEY"></el-input>
                    </el-form-item>
                    <el-form-item label="汇付的私钥rsa_private_key" prop="rsa_private_key" class="cellBox">
                        <el-input type="textarea" :rows="4" v-model="ruleForm.rsa_private_key" placeholder="请输入汇付的私钥rsa_private_key"></el-input>
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
import { getAdaPayConfig, setAdaPayConfig } from '@/api/pay.js'

export default {
    data() {
        return {
            dialogVisible: false,
            oldParams: {},
            ruleForm: {
                title: '',
                appid: '',
                api_key_live: '',
                rsa_public_key: '',
                api_key_test: '',
                rsa_private_key: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入应用名称', trigger: 'blur' },
                ],
                appid: [
                    { required: true, message: '请输入APPID', trigger: 'blur' },
                ],
                api_key_live: [
                    { required: true, message: '请输入prod模式API_KEY', trigger: 'blur' },
                ],
                rsa_public_key: [
                    { required: true, message: '请输入商户RSA公钥', trigger: 'blur' },
                ],
                api_key_test: [
                    { required: true, message: '请输入mock模式API_KEY', trigger: 'blur' },
                ],
                rsa_private_key: [
                    { required: true, message: '请输入汇付的私钥rsa_private_key', trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        // 获取四方支付
        getAdaPayConfigFunc(id) {
            getAdaPayConfig({id: id}).then(res => {
                this.oldParams = res.data.row || {}
            })
        },
        // 设置四方支付
        setAdaPayConfigFunc() {
            let s = this.ruleForm
            let a = this.oldParams
            let params = {
                pid: a.id,
                appid: s.appid,
                api_key_live: s.api_key_live,
                title: s.title,
                rsa_public_key: s.rsa_public_key,
                api_key_test: s.api_key_test,
                rsa_private_key: s.rsa_private_key
            }
            setAdaPayConfig(params).then(res => {
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
                    this.setAdaPayConfigFunc()
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