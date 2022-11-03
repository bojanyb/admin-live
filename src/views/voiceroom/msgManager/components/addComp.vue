<template>
    <div class="sysnotice-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" label-suffix=":" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="消息标题" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入靓号ID" clearable/>
                </el-form-item>
                <el-form-item label="发送时间" prop="time">
                    <el-date-picker
                    v-model="timer"
                    type="datetime"
                    placeholder="选择发送期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                    @change="timeChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="消息内容" prop="describe">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入消息内容"
                    maxlength="200"
                    v-model="ruleForm.describe">
                    </el-input>
                </el-form-item>
                <el-form-item label="消息图片" v-if="type == 'desdev'">
                    <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="消息类型" prop="msgType">
                    <el-select v-model="ruleForm.msgType" placeholder="请选择消息类型">
                        <el-option v-for="item in msgType" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户选择" prop="userType">
                    <el-select v-model="ruleForm.userType" placeholder="请选择用户">
                        <el-option v-for="item in userSelectType" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户ID" prop="userIds">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入指定用户ID用英文分号隔开"
                    maxlength="200"
                    v-model="ruleForm.userIds">
                    </el-input>
                </el-form-item>
                <el-form-item label="跳转类型" prop="goods_name">
                    <el-input placeholder="请输入内容" v-model="ruleForm.url" class="input-with-select">
                        <el-select v-model="ruleForm.jumpType" slot="prepend"  placeholder="链接选择">
                            <el-option v-for="item in pathType" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入公共map MSGTYPE  
import MAPDATA from '@/utils/jsonMap.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入api
import { add } from '@/api/shopping.js'
export default {
    components: {
        uploadImg
    },
    props: {
        type: {
            type: String,
            default: ''
        }
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增商品'
            } else if(this.status === 'update') {
                return '修改商品'
            } else {
                return '查看商品'
            }
        },
        StartPicker() { // 开始时间配置
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        EndPicker() { // 结束时间配置
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        startTime() { // 开始时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < now && this.status === 'add') {
                        cb(new Error('商品生效时间不可小于当前时间'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        endTime() { // 结束时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < now && this.status === 'add') {
                        cb(new Error('商品生效时间不可小于当前时间'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        limitRules() { // 商品出售期限 - 必填
            let array = this.ruleForm.time_limit
            let isStatus = false
            array.forEach((item,index) => {
                if(!item.day || !item.money) {
                    isStatus = true
                }
            })
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(isStatus) {
                        cb(new Error(`请填写所有数据`))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        limitUploadType() { // 限制上传文件格式
            if(this.ruleForm.play_type === 1) {
                return '.zip'
            } else if(this.ruleForm.play_type === 2) {
                return '.svg,.svga'
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            msgType: MAPDATA.MSGTYPE,
            userSelectType: MAPDATA.USERSLECTTYPE,
            pathType: MAPDATA.PATHTYPE,
            goodsType: 1,
            status: 'add',
            oldParams: {},
            timer: null,
            ruleForm: {
                name : "",
                describe : "",
                msgType : "",
                userType : "",
                userIds : "",
                url : "",
                jumpType : "",
            },
            rules: {
                name: [
                    { required: true, message: '请输入消息标题', trigger: 'blur' },
                    // { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
                ],
                describe: [
                    { required: true, message: '请输入消息内容', trigger: 'blur' },
                    // { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
                ],
                msgType: [
                    { required: true, message: '请选择靓号类型', trigger: 'change' }
                ],
                userType: [
                    { required: true, message: '请选择靓号类型', trigger: 'change' }
                ],
                userIds: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' },
                    // { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入跳转地址', trigger: 'blur' },
                    // { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
                ],
                jumpType: [
                    { required: true, message: '请选择跳转类型', trigger: 'change' }
                ],
            }
        };
    },
    methods: {
        handleClose() {
            this.close()
        },
        // 商品类型切换 - 删除图片
        goodsChange(v) {
            let s = this.oldParams
            if(v === 1) { // 这里用来做记忆用户操作
                if(JSON.stringify(s) === '{}' || !s.goods_animation_path) {
                    this.$refs.goods_animation_path.imageUrl = ''
                    this.ruleForm.goods_animation_path = ''
                }
            } else {
                if(JSON.stringify(s) === '{}' || !s.goods_image) {
                    this.$refs.goods_image.imageUrl = ''
                    this.ruleForm.goods_image = ''
                }
            }
        },
        load(status, row) {
            this.status = status
            if(status !== 'add') {
                this.oldParams = row
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                params.noble_level = params.noble_level ? params.noble_level : null
                if(params.goods_animation_path) {
                    this.goodsType = 1
                } else if(params.goods_image) {
                    this.goodsType = 2
                }
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.end_time = Math.floor(params.end_time / 1000)
                    if(this.goodsType === 1) { // 最终选择
                        params.goods_image = ''
                    } else if(this.goodsType === 2) {
                        params.goods_animation_path = ''
                    }
                    add(params).then(res => {
                        if(res.code === 2000) {
                            this.dialogVisible = false
                            this.$emit('onSearch')
                        }
                    }).catch(err => {
                        this.$message.error(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.close()
        },
        // 关闭弹窗
        close() {
            this.$confirm('关闭后数据不会保存，确定关闭吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dialogVisible = false
                this.$emit('onSearch')
            }).catch(() => {});
        },
        // 销毁组件
        destoryComp() {
            this.$emit('destoryComp')
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 系统通知 时间选择
        timeChange(row){
            console.log("系统通知 时间选择:",row)
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.sysnotice-add-box {
    .el-dialog{
        margin-top: 5vh !important;
    }
    .el-form {
        .el-form-item__label::before {
            margin-right: 0px !important;
        }
        .el-input {
            width: 300px;
        }
        .el-textarea {
            width: 300px;
        }
        .input-with-select{
            .el-input {
                width: 100px;
            }
        }
        .limit-content {
            .el-form-item__content {
                display: flex;
                // align-items: center;
                .el-button {
                    height: 36px;
                    margin-left: 10px;
                }
            }
        }
        .limit-fa {
            .limit {
                display: flex;
                align-items: center;
                .el-input {
                    width: 150px;
                }
            }
        }
        .goodsImg {
            .el-form-item__label::before {
                content: '*';
                color: #ff4949;
            }
        }
        
    }
}
</style>
