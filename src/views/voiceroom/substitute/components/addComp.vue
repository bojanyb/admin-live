<!-- 新增代充组件 -->
<template>
    <div class="add-box">
        <el-dialog
        title="新增代充"
        :visible.sync="dialogVisible"
        width="500px"
        :close-on-click-modal="false"
        :before-close="handleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
				<el-form-item label="添加代充ID：" prop="user_number" class="numberBox">
                    <el-input v-model="ruleForm.user_number" @blur="seeUser"></el-input>
                </el-form-item>
                <el-form-item label="代充用户昵称：" class="numberBox" v-if="userInfo.id">
                    <div class="nickname">{{ userInfo.nickname }}</div>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
import { userList } from '@/api/user'
import {
    createFun
} from '@/api/substitute'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                user_number: ''
            },
            rules: {
                user_number: [
                    { required: true, message: '请输入添加代充用户ID', trigger: 'blur' },
                ]
            },
            userInfo: {}
        };
    },
    methods: {
        loadParams() {
            this.dialogVisible = true
        },
        handleClose() {
            this.dialogVisible = false
        },
        // 查询用户
        seeUser() {
            if(!this.ruleForm.user_number) {
                this.$warning('请输入添加代充用户ID')
                this.userInfo = {}
                return false
            }
            userList({ user_number: this.ruleForm.user_number }).then(res=>{
                if(res.data.list.length <= 0) {
                    this.$warning('查询不到数据')
                    this.userInfo = {}
                } else {
                    this.userInfo = res.data.list[0] || {}
                }
            }).catch(err=>{
                this.userInfo = {}
            })
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if(this.userInfo.id){
                        this.handleCreateFun(this.userInfo.id);
                    }
                } else {
                    return false;
                }
            });
        },
        // 新增代充
        handleCreateFun(id){
            createFun({user_id: id}).then(res=>{
                if(res.code === 2000){
                    this.$message.success("新增代充用户成功");
                    let params = {
                        type: "success"
                    }
                    this.$emit("handleAddFun",params);
                    this.dialogVisible = false;
                }
            }).catch(err=>{})
        },
        // 取消
        cancel() {
            this.dialogVisible = false
            this.$emit('blockedCancel')
        },
        // 重置
        resetForm(formName) {
            if(this.$refs[formName]){
                this.$refs[formName].resetFields();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.add-box {
    .numberBox {
        .el-input {
            width: 215px;
        }
    }
}
</style>