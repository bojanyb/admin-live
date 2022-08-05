<template>
    <div class="menus-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="上级菜单">
                    <el-cascader
                    ref="cascader"
                    v-model="ruleForm.pid"
                    :options="menuList"
                    :props="props"
                    :disabled="disabled"
                    :show-all-levels="false"
                    @change="cascaderChange"></el-cascader>
                </el-form-item>
                <el-form-item label="菜单名称" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="菜单排序" prop="sort">
                    <el-input-number v-model="ruleForm.sort" controls-position="right" @change="handleChange" :min="0" :max="999"></el-input-number>
                </el-form-item>
                <el-form-item label="菜单状态" prop="status">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio v-for="item in statusList" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="路由地址" prop="path">
                    <el-input v-model="ruleForm.path"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { addRule, editRule } from '@/api/admin.js'
export default {
    props: {
        menuList: { // 所有菜单列表
            type: Array,
            default: []
        }
    },
    data() {
        return {
            dialogVisible: false,
            statusList: MAPDATA.MENUSTATUSLIST,
            status: 'add', // 当前操作状态
            ruleForm: {
                id: null,
                pid: null,
                title: '',
                sort: null,
                status: 1,
                path: ''
            },
            props: {
                checkStrictly: true,
                label: 'title',
                value: 'id',
                children: 'child'
            },
            rules: {
                title: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                ],
                sort: [
                    { required: true, message: '请输入菜单排序', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请选择菜单状态', trigger: 'change' }
                ],
                path: [
                    { required: true, message: '请输入路由地址', trigger: 'blur' },
                ],
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增菜单'
            } else if(this.status === 'update') {
                return '修改菜单'
            }
        },
        disabled() {
            if(this.status === 'add' && this.ruleForm.pid) {
                return true
            }
            return false
        }
    },
    methods: {
        cascaderChange(v) {
            this.$refs.cascader.toggleDropDownVisible(false);
            this.ruleForm.pid = v[v.length - 1]
        },
        handleChange(value) {
            console.log(value);
        },
        handleClose() {
            this.resetForm()
        },
        loadParams(status, row) {
            this.dialogVisible = true
            this.status = status
            
            if(row) {
                let params = JSON.parse(JSON.stringify(row))
                if(status === 'add') {
                    this.$set(this.ruleForm, 'pid', params.id)
                } else if(this.status === 'update') {
                    params.path = params.h5_path
                    this.$set(this.$data, 'ruleForm', params)
                }
            }

            console.log(this.ruleForm, 'ruleForm---------------')
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = {
                        ...this.ruleForm
                    }
                    if(this.status === 'add') {
                        let res = await addRule(params)
                        if(res.code === 2000) {
                            this.$message.success('新增成功')
                        }
                    } else {
                        let res = await editRule(params)
                        if(res.code === 2000) {
                            this.$message.success('修改成功')
                        }
                    }

                    this.dialogVisible = false
                    this.$emit('getList')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
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

<style lang="scss" scoped>
.menus-add-box {
    .el-cascader {
        width: 380px;
    }
}
</style>