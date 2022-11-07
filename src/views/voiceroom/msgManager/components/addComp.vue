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
                <el-form-item label="用户ID" prop="target_val">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入指定用户ID用英文分号隔开"
                    maxlength="200"
                    v-model="ruleForm.target_val">
                    </el-input>
                </el-form-item>
                <el-form-item label="消息标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入消息标题" clearable/>
                </el-form-item>
                <el-form-item label="消息内容" prop="content">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入消息内容"
                    maxlength="200"
                    v-model="ruleForm.content">
                    </el-input>
                </el-form-item>
                <el-form-item label="消息图片" v-if="type == 'desdev'">
                    <uploadImg ref="uploadImg" v-model="ruleForm.img_path" :imgUrl="ruleForm.img_path" name="img_path" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="落地类型" prop="push_val">
                    <el-input placeholder="请输入内容" v-model="ruleForm.push_val" class="input-with-select">
                        <el-select v-model="ruleForm.push_type" slot="prepend"  placeholder="链接选择">
                            <el-option v-for="item in pathType" :label="item.name" :value="item.value" :key="item.value"></el-option>
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
import { addSysNotice ,addOfficialNotice } from '@/api/system.js'
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
                return this.type == 'desdev' ? '发送官方消息' : '发送系统通知'
            } else if(this.status === 'update') {
                return '修改商品'
            } else {
                return '查看商品'
            }
        },
    },
    data() {
        return {
            dialogVisible: false,
            msgType: MAPDATA.MSGTYPE,
            userSelectType: MAPDATA.USERSLECTTYPE,
            pathType: MAPDATA.PATHTYPE2,
            goodsType: 1,
            status: 'add',
            oldParams: {},
            timer: null,
            ruleForm: {
                title : "",
                content : "",
                target_val : "",
                push_val : "",
                push_type : "",
                img_path: ""
            },
            rules: {
                title: [
                    { required: true, message: '请输入消息标题', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: '请输入消息内容', trigger: 'blur' },
                ],
                target_val: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' },
                ],
                push_val: [
                    { required: true, message: '请输入跳转地址', trigger: 'blur' },
                ],
                push_type: [
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
                    params.push_type = JSON.stringify(params.push_type)
                    if(this.type !== 'desdev'){
                        delete params.img_path
                        addSysNotice(params).then(res => {
                            if(res.code === 2000) {
                                this.dialogVisible = false
                                this.$emit('onSearch')
                            }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    }else{
                        addOfficialNotice(params).then(res => {
                            if(res.code === 2000) {
                                this.dialogVisible = false
                                this.$emit('onSearch')
                            }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    }
                    
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
