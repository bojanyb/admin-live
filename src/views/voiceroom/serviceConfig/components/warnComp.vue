<template>
    <div class="serviceConfig-warnComp-box">
        <el-dialog
        title="添加消息内容"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="消息内容" prop="content">
                    <el-input v-model="ruleForm.content" type="textarea" :rows="4" resize="none"></el-input>
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
import { addSysNotice } from '@/api/system.js'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                content: '',
                target_val: ''
            },
            rules: {
                content: [
                    { required: true, message: '请输入消息内容', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 打开弹窗
        loadParams(status, row) {
            this.dialogVisible = true
          if (status === 'warn') {
              let params = JSON.parse(JSON.stringify(row))
              this.$set(this.ruleForm, 'target_val', params.user_number)
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
              if (valid) {
                  console.log(this.ruleForm);
                    let res = await addSysNotice({ content: this.ruleForm.content, target_val: this.ruleForm.target_val })
                    if(res.code === 2000) {
                        this.dialogVisible = false
                        this.$success('添加成功')
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