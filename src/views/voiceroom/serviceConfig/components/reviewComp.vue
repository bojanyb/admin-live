<template>
    <div class="serviceConfig-historyComp-box">
        <el-dialog
        title="修改审核状态"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="修改审核状态">
                <el-select v-model="ruleForm.type" placeholder="请选择审核状态">
                  <el-option label="通过" :value="2"></el-option>
                  <el-option label="误杀" :value="3"></el-option>
                </el-select>
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
import { checkAudioStreamDefyList } from '@/api/videoRoom.js';
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                type: '',
            },
            rules: {
                type: [
                    { required: true, message: '请选择审核状态', trigger: 'change' },
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
          if (status === 'review') {
            let params = JSON.parse(JSON.stringify(row))
            const ids = [];
            ids.push(params.id)
            this.$set(this.ruleForm, 'ids', ids)
          } else if (status === 'batchReview') {
            let params = JSON.parse(JSON.stringify(row))
            const ids = params.reduce((prev, curr) => {
                prev.push(curr.id)
                return prev;
            }, [])
            this.$set(this.ruleForm, 'ids', ids)
          }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
              if (valid) {
                  console.log(this.ruleForm);
                    let res = await checkAudioStreamDefyList({ type: this.ruleForm.type, id: this.ruleForm.ids })
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

<style lang="scss">
.serviceConfig-historyComp-box {

}
</style>
