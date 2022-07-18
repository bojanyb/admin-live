<template>
    <div class="priceAdd-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm" label-suffix=":">
                <el-form-item label="套餐标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入套餐标题"></el-input>
                </el-form-item>
                <el-form-item label="（原）价格" prop="original_price">
                    <el-input v-model="ruleForm.original_price" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入（原）价格"></el-input>
                </el-form-item>
                <el-form-item label="折扣价格" prop="discount_price">
                    <el-input v-model="ruleForm.discount_price" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入折扣价格"></el-input>
                </el-form-item>
                <el-form-item label="活动" prop="activity_name">
                    <el-input v-model="ruleForm.activity_name" placeholder="请输入活动（选填）"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="activity_detail">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.activity_detail" placeholder="请输入活动说明（选填）"></el-input>
                </el-form-item>
                <el-form-item label="是否自动续订" prop="auto_renewal">
                    <el-radio v-model="ruleForm.auto_renewal" :label="1">是</el-radio>
                    <el-radio v-model="ruleForm.auto_renewal" :label="0">否</el-radio>
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
// 引入api
import { priceSave } from '@/api/nobility.js'

export default {
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增套餐'
            } else if(this.status === 'update') {
                return '修改套餐'
            }
        }
    },
    data() {
        return {
            radio: null,
            dialogVisible: false,
            ruleForm: {
                id: null,
                title: '',
                original_price: null,
                discount_price: null,
                activity_name: '',
                activity_detail: '',
                auto_renewal: null
            },
            rules: {
                title: [
                    { required: true, message: '请输入套餐标题', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                original_price: [
                    { required: true, message: '请输入（原）价格', trigger: 'blur' }
                ],
                discount_price: [
                    { required: true, message: '请输入折扣价格', trigger: 'blur' }
                ],
                activity_name: [
                    { required: false, message: '请输入活动', trigger: 'blur' }
                ],
                activity_detail: [
                    { required: false, message: '请输入说明', trigger: 'blur' }
                ],
                auto_renewal: [
                    { required: true, message: '请选择是否自动续订', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.toNumber(params)
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 转数字
        toNumber(params) {
            let arr = ['original_price', 'discount_price']
            arr.forEach(item => {
                params[item] = Number(params[item])
            })
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
            if (valid) {
                let s = this.ruleForm
                let params = {
                    id: s.id,
                    title: s.title,
                    original_price: s.original_price,
                    discount_price: s.discount_price,
                    activity_name: s.activity_name,
                    activity_detail: s.activity_detail,
                    auto_renewal: s.auto_renewal
                }
                this.toNumber(params)
                let res = await priceSave(params)
                if(res.code === 2000) {
                    if(this.status === 'add') {
                        this.$message.success('新增成功')
                    } else {
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
            this.handleClose()
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.priceAdd-box {
    .el-select {
        width: 360px;
    }
}
</style>