<template>
    <div class="menus-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="上级菜单">
                    <el-cascader
                    v-model="value"
                    :options="options"
                    @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="菜单排序" prop="name">
                    <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="菜单状态" prop="name">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio v-for="item in statusList" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="路由地址" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
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

import data from './add.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    data() {
        return {
            dialogVisible: true,
            options: data.options,
            statusList: MAPDATA.MENUSTATUSLIST,
            status: 'add', // 当前操作状态
            num: 1,
            value: [],
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
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
        }
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        handleChange(value) {
            console.log(value);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
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