<template>
    <div class="jurisdiction-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        top="5vh"
        width="1050px"
        :before-close="handleClose"
        @closed="closed">
            <div class="contentBox">
                <div class="formBox">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="操作员部门" prop="department">
                            <el-input v-model="ruleForm.department" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="操作员名称" prop="nickname">
                            <el-input v-model="ruleForm.nickname" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="成员账号" prop="username">
                            <el-input v-model="ruleForm.username" :disabled="disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="jurisdiction">
                    <ul v-for="(item,index) in jurisdictionList" :key="index">
                        <el-checkbox v-model="item.checked" :disabled="disabled" @change="changeStatus(item,index, 1)">{{ item.title }}</el-checkbox>
                        <li>
                            <div v-if="item.child" v-for="(a,b) in item.child" :key="b">
                                <el-checkbox v-model="a.checked" :disabled="disabled" @change="changeStatus(a, index, 2)">{{ a.title }}</el-checkbox>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

// 引入api
import { addUser, edit } from '@/api/admin.js'
export default {
    data() {
        return {
            dialogVisible: false,
            status: 'add',
            ruleForm: {
                admin_id: '',
                nickname: '',
                department: '',
                username: '',
                password: '',
                permission_ids: []
            },
            jurisdictionList: [],
            rules: {
                department: [
                    { required: true, message: '请输入操作员部门', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入操作员名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入成员账号', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增角色'
            } else if(this.status === 'update') {
                return '修改角色'
            } else {
                return '查看角色'
            }
        },
        disabled() {
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    methods: {
        // 赋值
        load(status, row) {
            console.log(row, 'row')
            this.status = status

            // 递归初始化未选中状态
            let prv = (list, user_pids) => {
                list.forEach(item => {
                    item.checked = false
                    if(user_pids) {
                        let data = user_pids.toString()
                        if(data.indexOf(item.id) !== -1) {
                            item.checked = true
                        }
                    }
                    if(item.child) {
                        prv(item.child, user_pids)
                    }
                })
            }
            prv(row.list, row.user_pids)

            
            
            if(status !== 'add') {
                row.user.password = row.user.password_word
                this.$set(this.$data, 'ruleForm', row.user)
                row.list.forEach(item => {
                    if(item.child) {
                        let params = item.child.find(a => { return !a.checked })
                        if(params) {
                            item.checked = false
                        }
                    }
                })
            }

            this.jurisdictionList = row.list || []
        },
        // 权限 - 选择
        changeStatus(row, index, val) {
            if(val === 1) {
                if(row.child) {
                    this.jurisdictionList[index].child.forEach(item => {
                        this.$set(item, 'checked', row.checked)
                    })
                }
            } else if(val === 2) {
                let params = this.jurisdictionList[index].child.find(item => { return !item.checked })
                if(params) {
                    this.$set(this.jurisdictionList[index], 'checked', false)
                } else {
                    this.$set(this.jurisdictionList[index], 'checked', true)
                }
            }
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.status === 'add') {
                        this.addUser()
                    } else {
                        this.updateUser()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 修改
        async updateUser() {
            let params = this.returnParams()
            let res = await edit(params)
            if(res.code === 2000) {
                this.$message.success('修改成功')
            } else {
                this.$message.error('修改失败')
            }
            this.dialogVisible = false
        },
        // 新增
        async addUser() {
            let params = this.returnParams()
            let res = await addUser(params)
            if(res.code === 2000) {
                this.$message.success('新增成功')
            } else {
                this.$message.error('新增失败')
            }
            this.dialogVisible = false
            this.$emit('getList');
        },
        // 参数
        returnParams() {
            let params = { ... this.ruleForm }
            let array = []
            let prv = (list) => {
                list.forEach(item => {
                    if(item.checked) {
                        array.push(item.id)
                    }
                    if(item.child) {
                        prv(item.child)
                    }
                })
            }
            prv(this.jurisdictionList)
            params.permission_ids = array
            return params
        },
        // 关闭弹窗
        handleClose() {
            this.resetForm()
        },
        // 关闭弹窗
        resetForm() {
            if(this.status !== 'see') {
                this.$confirm('关闭后数据不会保存，确定关闭吗？')
                .then(_ => {
                    this.dialogVisible = false
                })
                .catch(_ => {});
            } else {
                this.dialogVisible = false
            }
        },
        // 销毁当前组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.jurisdiction-add-box {
    .contentBox {
        .formBox {
            .el-input {
                width: 150px;
            }
            .el-form {
                display: flex;
                flex-wrap: wrap;
            }
        }
        .jurisdiction {
            max-height: 500px;
            overflow-y: scroll;
            // box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
            border: 1px dashed rgba(0,0,0,0.15);
            padding: 15px;
            box-sizing: border-box;
            ul {
                padding-left: 0px;
                margin-bottom: 30px;
                >.el-checkbox {
                    display: flex;
                    align-items: center;
                    .el-checkbox__label {
                        font-weight: 600;
                        font-size: 18px;
                    }
                }
                li {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 10px;
                    >div {
                        margin-right: 30px;
                    }
                }
            }
        }
        // .jurisdiction::-webkit-scrollbar {
        //     display: none;
        // }
    }
}
</style>