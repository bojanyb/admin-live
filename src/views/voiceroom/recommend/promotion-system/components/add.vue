<template>
    <div class="recommend-promotion-system-add">
        <el-dialog
            :title="status === 'add' ? '新增' + title : '修改' + title"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose"
            @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left" class="demo-ruleForm">
                <el-form-item :label="title + 'ID'" prop="user_number">
                    <el-input oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.user_number"></el-input>
                </el-form-item>
                <el-form-item label="推广单价1" prop="price1">
                    <el-input v-model="ruleForm.price1"></el-input>
                </el-form-item>
                <el-form-item label="推广单价2" prop="price2">
                    <el-input v-model="ruleForm.price2"></el-input>
                </el-form-item>
                <el-form-item label="推广单价3" prop="price3">
                    <el-input v-model="ruleForm.price3"></el-input>
                </el-form-item>
                <el-form-item label="邀请用户详情" prop="user_detail" label-width="140px">
                     <el-switch v-model="ruleForm.user_detail"></el-switch>
                </el-form-item>
                <el-form-item label="邀请充值用户权限" prop="recharge_detail" label-width="140px">
                    <el-switch v-model="ruleForm.recharge_detail"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { save } from '@/api/recommend'
export default {
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            type: null, // 类型
            form: {},
            ruleForm: {
                id: null,
                pid: 0,
                user_number: '',
                price1: '',
                price2: '',
                price3: '',
                user_detail: false,
                recharge_detail: false
            },
            oldParams: {}, // 老数据
            rules: {
                user_number: [
                    { required: true, message: '请输入推广商ID', trigger: 'blur' }
                ],
                price1: [
                    { required: true, message: '请输入推广单价1', trigger: 'blur' }
                ],
                price2: [
                    { required: true, message: '请输入推广单价2', trigger: 'blur' }
                ],
                price3: [
                    { required: true, message: '请输入推广单价3', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            let arr = ['推广商', '推广组', '推广员']
            let name = arr.find((a,b) => { return (b + 1) === this.type })
            return name || ''
        }
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row, type) {
            this.status = status
            this.dialogVisible = true
            this.type = type
            row.user_detail = !!(row.tab_auth.user_detail)
            row.recharge_detail = !!(row.tab_auth.recharge_detail)
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            } else {
                this.$set(this.$data, 'form', row)
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = { ...this.ruleForm }
                    let a = { ...this.form }
                    let params = {
                        id: s.id,
                        user_number: s.user_number,
                        price1: s.price1,
                        price2: s.price2,
                        price3: s.price3,
                        pid: s.pid
                    }
                    params.tab_auth = {
                      user_detail: s.user_detail ? 1 : 0,
                      recharge_detail: s.recharge_detail ? 1 : 0
                    }
                    if(this.type !== 1 && this.status === 'add') {
                        params.pid = a.id
                    }
                    let res = await save(params)
                    if(res.code === 2000) {
                        this.dialogVisible = false
                        this.$emit('getList')
                        if(this.status === 'add') {
                            this.$success('新增成功')
                        } else {
                            this.$success('修改成功')
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.recommend-promotion-system-add {

}
</style>
