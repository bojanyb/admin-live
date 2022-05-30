<template>
    <div class="givegoods-box">
        <div class="goods">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户ID" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="被赠送用户ID"></el-input>
                </el-form-item>
                <el-form-item label="赠送商品" prop="name">
                    <el-button type="primary" @click="selectClick">选择商品</el-button>
                </el-form-item>
                <el-form-item label="赠送时长" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择赠送时长">
                    <el-option v-for="(item,index) in durationList" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                </el-form-item>
            </el-form>
        </div>

        <goodsBank ref="goodsBank" :list="list"></goodsBank>
    </div>
</template>

<script>
// 引入商品库组件
import goodsBank from '@/components/goodsBank/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    components: {
        goodsBank
    },
    data() {
        return {
            list: [],
            durationList: MAPDATA.DURATION, // 时长列表
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
    methods: {
        // 选择商品
        selectClick() {
            this.$refs.goodsBank.drawer = true
            this.$refs.goodsBank.giftList()
        },
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss">
.givegoods-box {
    padding: 20px;
    box-sizing: border-box;
    .goods {
        padding: 30px;
        box-sizing: border-box;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
        .el-form {
            .el-input {
                width: 400px;
            }
            .el-textarea {
                width: 400px;
            }
        }
    }
}
</style>