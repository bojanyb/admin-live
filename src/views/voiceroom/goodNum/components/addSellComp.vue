<template>
    <div class="depot-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" label-suffix=":" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="用户ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" placeholder="请输入用户ID" clearable/>
                </el-form-item>
                <el-form-item label="赠送商品" prop="id">
                    <el-input v-model="ruleForm.id" placeholder="请输入靓号ID" clearable/>
                </el-form-item>
                <el-form-item label="赠送时长" prop="day">
                    <el-input v-model="ruleForm.day" placeholder="请输入赠送时长" clearable/>
                </el-form-item>
                <el-form-item label="赠送原因" prop="remark">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入备注说明"
                    maxlength="300"
                    v-model="ruleForm.remark">
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
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { givePrettyNumber } from '@/api/videoRoom.js'

export default {
    components: {},
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
    },
    data() {
        return {
            dialogVisible: false,
            goodsNumTypeList: MAPDATA.GOODNUMTYPE,
            goodsType: 1,
            status: 'add',
            oldParams: {},
            ruleForm: {
                id: null,
                day: '',
                user_number: '',
                remark: ''
            },
            rules: {
                id: [
                    { required: true, message: '请输入用户ID', trigger: 'change' }
                ],
                day: [
                    { required: true, message: '请输入靓号ID', trigger: 'blur' }
                ],
                user_number: [
                    { required: true, message: '请输入赠送时长', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '请输入备注说明', trigger: 'blur' },
                    { min: 1, max: 300, message: '长度在 1 到 300 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.close()
        },
        load(status, row) {
            this.status = status
            if(status !== 'add') {
                this.oldParams = row
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        ...this.ruleForm,
                        'admin-token': this.$store.getters.token,
                        uid: Number(localStorage.getItem('admin_id'))
                    }
                    givePrettyNumber(params).then(res => {
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
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.depot-add-box {
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
