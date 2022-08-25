<template>
    <div class="priceAdd-box">
        <drawer 
        size="470px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="套餐标题" prop="title">
                    <el-input v-model="ruleForm.title" :disabled="disabled" placeholder="请输入套餐标题"></el-input>
                </el-form-item>
                <el-form-item label="（原）价格" prop="original_price">
                    <el-input v-model="ruleForm.original_price" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入（原）价格"></el-input>
                </el-form-item>
                <el-form-item label="折扣价格" prop="discount_price">
                    <el-input v-model="ruleForm.discount_price" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入折扣价格"></el-input>
                </el-form-item>
                <el-form-item label="活动" prop="activity_name">
                    <el-input v-model="ruleForm.activity_name" :disabled="disabled" placeholder="请输入活动（选填）"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="activity_detail">
                    <el-input type="textarea" :disabled="disabled" :rows="4" v-model="ruleForm.activity_detail" placeholder="请输入活动说明（选填）"></el-input>
                </el-form-item>
                <el-form-item label="是否自动续订" v-if="ruleForm.id === 1" prop="auto_renewal">
                    <el-radio v-model="ruleForm.auto_renewal" :disabled="disabled" :label="1">是</el-radio>
                    <!-- <el-radio v-if="ruleForm.id === 1" v-model="ruleForm.auto_renewal" :label="0">否</el-radio> -->
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { priceSave } from '@/api/nobility.js'

export default {
    components: {
        drawer
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增套餐'
            } else if(this.status === 'update') {
                return '修改套餐'
            } else {
                return '查看套餐'
            }
        },
        disabled() {
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    data() {
        return {
            radio: null,
            status: 'add', // 当前状态
            ruleForm: {
                id: null,
                title: '',
                original_price: null,
                discount_price: null,
                activity_name: '',
                activity_detail: '',
                auto_renewal: 1
            },
            oldParams: {}, // 老数据
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
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.toNumber(params)
                this.$set(this.$data, 'ruleForm', params)
            }
            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 转数字
        toNumber(params) {
            let arr = ['original_price', 'discount_price']
            arr.forEach(item => {
                params[item] = Number(params[item])
            })
        },
        // 取消
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) { // 记录数据 - 有改动就提示
                this.$confirm('关闭弹窗将不会保留您的更改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.openComp(false)
                }).catch(() => {});
            } else {
                this.openComp(false)
            }
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
                    this.$success('修改成功')
                }
                this.openComp(false)
                this.$emit('getList')
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        // 修改
        update() {
            this.status = 'update'
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