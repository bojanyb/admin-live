<template>
    <div class="finance-commercialComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="610px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
                <div class="formBox">
                    <el-form-item label="商户平台" prop="channel">
                        <el-select v-model="ruleForm.channel" placeholder="请选择">
                            <el-option v-for="item in channelList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="主体名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </div>
                <div class="formBox">
                    <el-form-item label="商户名称" prop="merchant_name">
                        <el-input v-model="ruleForm.merchant_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商户号" prop="appid">
                        <el-input v-model="ruleForm.appid"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="配置信息" prop="config_json" class="allocationBox">
                    <el-input :rows="6" type="textarea" v-model="ruleForm.config_json"></el-input>
                </el-form-item>
                <el-form-item label="签名文件" prop="appid" class="allocationBox" v-if="ruleForm.channel && ruleForm.appid">
                    <el-upload
                    class="upload-demo"
                    action="#"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="5"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :http-request="upLoad">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <div class="formBox">
                    <el-form-item label="提现税率" prop="cash_rate" class="allocationBox">
                        <el-input onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.cash_rate"></el-input>
                    </el-form-item>
                    <el-form-item label="支付类型" prop="channel_ways">
                        <el-select v-model="ruleForm.channel_ways" placeholder="请选择" :disabled="!ruleForm.channel">
                            <el-option v-for="item in payList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
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
import { uploadFile, create } from '@/api/finance'
// 引入公共方法
import { formatJson } from '@/utils/common'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import REQUEST from '@/request/index.js'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            action: ENV_DOMAINHTTPS + REQUEST.pay.uploadFileZFB,
            status: 'add', // 当前状态
            dialogVisible: false,
            channelList: MAPDATA.PAYCONFIGURATIONPLATFORMLIST, // 商户平台
            // payList: MAPDATA.PAYCONFIGURATIONPLATFORMTYPELIST,
            fileList: [],
            ruleForm: {
                channel: '',
                name: '',
                config_json: '',
                cash_rate: '',
                channel_ways: null,
                type: 1,
                merchant_name: '',
                file: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入主体名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                channel: [
                    { required: true, message: '请选择商户平台', trigger: 'change' }
                ],
                channel_ways: [
                    { required: true, message: '请选择支付类型', trigger: 'change' }
                ],
                merchant_name: [
                    { required: true, message: '请输入商户名称', trigger: 'blur' }
                ],
                appid: [
                    { required: true, message: '请输入商户号', trigger: 'blur' }
                ],
                config_json: [
                    { required: true, message: '请输入配置信息', trigger: 'blur' }
                ],
                file: [
                    { required: true, message: '请输入签名文件', trigger: 'blur' }
                ],
                cash_rate: [
                    { required: true, message: '请输入提现税率', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '商户配置新增'
            } else if(this.status === 'update') {
                return '商户配置修改'
            }
        },
        payList() { // 支付类型
            let arr = JSON.parse(JSON.stringify(MAPDATA.PAYCONFIGURATIONPLATFORMTYPELIST))
            if(this.ruleForm.channel === 3) {
                return arr.filter((item, index) => { return index < 3 })
            } else {
                return arr
            }
        }
    },
    methods: {
        // 文件上传
        async upLoad(file) {
            let formData = new FormData()
            formData.append('file', file.file)
            formData.append('appid', this.ruleForm.appid)
            formData.append('channel', this.ruleForm.channel)
            let res = await uploadFile(formData)
            if(res.code === 2000) {
                this.ruleForm.file = '11'
                this.$refs.ruleForm.validateField(['file'])
            }
        },
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.config_json = JSON.stringify(JSON.parse(params.config_json))
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    let res = await create(params)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$success('新增成功')
                        } else {
                            this.$success('修改成功')
                        }
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
        },
        // 删除
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 预览
        handlePreview(file) {
            console.log(file);
        },
        // 超出个数
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        // 移除之前
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.finance-commercialComp-box {
    .formBox {
        display: flex;
        .el-input {
            width: 200px;
        }
        .el-select {
            width: 200px;
        }
    }
}
</style>