<!-- 设置超管 -->
<template>
    <div class="superAdmin-add-box">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose"
            :close-on-click-modal="false"
            @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="65px" class="demo-ruleForm">
                <el-form-item label="用户ID" prop="user_number">
                    <el-input oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.user_number"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="resetForm">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

// 引入api
import { setSuperUser, add } from '@/api/super'
export default {
    props: {
        tabIndex: { // 当前菜单
            type: String,
            default: ''
        }
    },
    computed: {
        title() { // 标题
            if(this.tabIndex === '0') {
                return '新增超管'
            } else {
                return '新增官方'
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                user_number: null,
                status: ''
            },
            rules: {
                user_number: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        handleClose() {
            this.resetForm()
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    if(this.tabIndex === '0') {
                        let params = {
                            user_number: s.user_number,
                            status: 1
                        }
                        let res = await setSuperUser(params)
                        if(res.code === 2000) {
                            this.$success('添加成功')
                        }
                    } else {
                        let params = {
                            user_number: s.user_number
                        }
                        let res = await add(params)
                        if(res.code === 2000) {
                            this.$success('添加成功')
                        }
                    }

                    this.resetForm()
                    this.$emit('getList')
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.dialogVisible = false
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.superAdmin-add-box {
    .el-dialog__body {
        padding: 30px 20px 10px 20px;
    }
    .footer {
        .el-form-item__content {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
