<template>
    <div class="consumeComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="等级" prop="user_rank" v-if="status === 'add'">
                    <el-input v-model="ruleForm.user_rank" v-input-limit="0"></el-input>
                </el-form-item>
                <el-form-item label="总财富贡献" prop="spending">
                    <el-input v-model="ruleForm.spending" v-input-limit="0"></el-input>
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
import { getUserRankConfig } from '@/api/videoRoom'
export default {
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            ruleForm: {
                spending: '',
                user_rank: ''
            },
            rules: {
                spending: [
                    { required: true, message: '请填写总财富贡献', trigger: 'blur' }
                ],
                user_rank: [
                    { required: true, message: '请输入等级', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增财富等级'
            } else if(this.status === 'update') {
                return '修改财富等级'
            }
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.dialogVisible = true
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        user_rank: s.user_rank,
                        diamond_total: s.spending,
                        spending: s.spending
                    }
                    let res = await getUserRankConfig(params)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$message.success('新增成功')
                        } else {
                            this.$message.success('修改成功')
                        }
                        this.dialogVisible = false
                        this.$emit('getList')
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

<style lang="scss" scoped>
    
</style>