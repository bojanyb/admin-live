<template>
    <div class="jurisdiction-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        top="5vh"
        width="1050px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="closed">
            <div class="contentBox">
                <div class="formBox">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="操作员ID" prop="sort">
                            <el-input v-model="ruleForm.sort" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                        </el-form-item>
                        <el-form-item label="操作员部门" prop="department">
                            <el-input v-model="ruleForm.department"></el-input>
                        </el-form-item>
                        <el-form-item label="操作员名称" prop="nickname">
                            <el-input v-model="ruleForm.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="成员账号" prop="username">
                            <el-input v-model="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" class="sortBox">
                            <el-input v-model="ruleForm.password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="jurisdiction">
                    <ul v-for="(item,index) in jurisdictionList" :key="index">
                        <!-- 第一级树 -->
                        <el-checkbox v-model="item.checked" :disabled="disabled" @change="changeStatus(item,index, 1)">{{ item.title }}</el-checkbox>
                        <span class="add">新增</span>
                        <li>
                            <!-- 第二级树 -->
                            <div class="tree_two" :style="{'width': '100%'}" v-if="item.child" v-for="(a,b) in item.child" :key="b">
                                <el-checkbox v-model="a.checked" :disabled="disabled" @change="changeStatus(a, index, 2, b)">{{ a.title }}</el-checkbox>
                                <!-- 第三级树 -->
                                <div class="tree_three">
                                    <div v-if="a.child" v-for="(x,s) in a.child" :key="s">
                                        <el-checkbox v-model="x.checked" :disabled="disabled" @change="changeStatus(a, index, 3, b)">{{ x.title }}</el-checkbox>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" :disabled="disabled" @click="submitForm('ruleForm')">确 定</el-button>
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
                permission_ids: [],
                sort: null
            },
            jurisdictionList: [],
            rules: {
                department: [
                    { required: true, message: '请输入操作员部门', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入操作员名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入成员账号', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
            this.status = status

            // 递归初始化未选中状态
            let prv = (list, user_pids) => {
                list.forEach(item => {
                    item.checked = false
                    if(user_pids) {
                        if(user_pids.indexOf(item.id) !== -1) { // 当前角色的拥有的权限选中
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
            }

            this.jurisdictionList = row.list || []
        },
        // 权限 - 选择
        changeStatus(row, index, val, b) {

            let prv = (list) => { // 递归下面所有子级选中
                list.forEach(item => {
                    this.$set(item, 'checked', row.checked)
                    if(item.child && item.child.length > 0) {
                        prv(item.child)
                    }
                })
            }
            if(val === 1) { // 一级树选中
                if(row.child) {
                    prv(this.jurisdictionList[index].child)
                }
            } else if(val === 2) { // 二级树选中
                prv(this.jurisdictionList[index].child[b].child) // 递归下面所有子级选中
                let params = this.jurisdictionList[index].child.find(item => { return item.checked }) // 查找当前层级是不是所有都未选中
                if(params) {
                    this.$set(this.jurisdictionList[index], 'checked', true)
                } else {
                    this.$set(this.jurisdictionList[index], 'checked', false)
                }
            } else if(val === 3) { // 三级树选中
                let params = this.jurisdictionList[index].child[b].child.find(item => { return item.checked }) // 查找当前层级是不是所有都未选中
                if(params) {
                    this.$set(this.jurisdictionList[index].child[b], 'checked', true)
                    this.$set(this.jurisdictionList[index], 'checked', true)
                } else {
                    this.$set(this.jurisdictionList[index].child[b], 'checked', false)
                }
                let arr = []
                this.jurisdictionList[index].child.forEach(item => {
                    let data = item.child.find(a => { return a.checked })
                    arr.push(data)
                })
                let params2 = arr.find(item => { return item })
                if(!params2) {
                    this.$set(this.jurisdictionList[index], 'checked', false)
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
            }
            this.dialogVisible = false
            this.$emit('getList');
        },
        // 新增
        async addUser() {
            let params = this.returnParams()
            let res = await addUser(params)
            if(res.code === 2000) {
                this.$message.success('新增成功')
            }
            this.dialogVisible = false
            this.$emit('getList');
        },
        // 参数
        returnParams() {
            let s = this.ruleForm
            let params = {
                admin_id: s.id,
                department: s.department,
                nickname: s.nickname,
                username: s.username,
                password: s.password,
                sort: s.sort,
                permission_ids: []
            }
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
            if(this.status === 'add') {
                delete params.admin_id
            }
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
                width: 105px;
            }
            .el-form {
                display: flex;
                flex-wrap: wrap;
            }
            .sortBox {
                .el-form-item__label {
                    width: 65px !important;
                }
                .el-form-item__content {
                    margin-left: 65px !important;
                }
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

                >span.add {
                    visibility: hidden;
                }
                .funcBox:hover {
                    >span.add {
                        visibility: visible;
                    }
                }
                li {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 10px;
                    >div {
                        margin-right: 30px;
                        >div.tree_three {
                            display: flex;
                            margin-top: 5px;
                            >div {
                                margin: 12px;
                            }
                        }

                        .tree_two {
                            .el-checkbox__label {
                                font-weight: 1000;
                            }
                        }
                    }
                }
            }
        }
        // .jurisdiction::-webkit-scrollbar {
        //     display: none;
        // }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #606266 !important;
        }
    }
}
</style>
