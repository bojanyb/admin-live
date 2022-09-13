<template>
    <div class="recommend-promotion-system-add">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose"
            @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="推广商ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number"></el-input>
                </el-form-item>
                <el-form-item label="推广单价" prop="price">
                    <el-input v-model="ruleForm.price"></el-input>
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
    props: {
        pid: { // 父级id
            type: Number,
            default: null
        },
        type: { // 类型
            type: Number,
            default: null
        }
    },
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            ruleForm: {
                id: null,
                pid: 0,
                user_number: '',
                price: ''
            },
            oldParams: {}, // 老数据
            rules: {
                user_number: [
                    { required: true, message: '请输入推广商ID', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入推广单价', trigger: 'blur' }
                ],
            }
        };
    },
    computed: {
        title() { // 标题
            let arr = ['推广商', '推广组', '推广成员']
            let name = arr.find((a,b) => { return (b + 1) === this.type })
            if(this.status === 'add') {
                return '新增' + name
            } else if(this.status === 'update') {
                return '编辑' + name
            }
        }
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = { ...this.ruleForm }
                    let params = {
                        id: s.id,
                        user_number: s.user_number,
                        price: s.price,
                        pid: s.pid
                    }
                    if(!s.pid && this.pid) {
                        params.pid = this.pid
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