<template>
    <div class="user-recycle-box">
        <el-dialog
        :visible.sync="dialogVisible"
        width="600px"
        title="靓号回收"
        :before-close="handleClose"
        :show-close="false"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="demo-ruleForm">
                <el-form-item label="回收靓号:">
                  <div> {{recycleSource.number}} </div>
                </el-form-item>
                <el-form-item label="回收原因:" prop="reason">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.reason" placeholder="请输入回收原因"></el-input>
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
import { recycle } from '@/api/videoRoom.js'
import settings from '@/store/modules/settings';
export default {
    data() {
        return {
            dialogVisible: false,
            form: {},
            ruleForm: {
                reason: ''
            },
            rules: {
                reason: [
                    { required: true, message: '请输入回收原因', trigger: 'blur',
                      validator: (rules, value, cb) => {
                      if (!this.ruleForm.reason || this.ruleForm.reason == "") {
                        return cb(new Error('回收原因不能为空!'))
                      }
                      return cb()
                    }
                  },
                ]
            }
        };
    },
    props: {
     recycleSource:{
        type: Object,
        default: {}
    }
    },
    mounted(){},
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(row) {
            this.dialogVisible = true
            this.form = row
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                  let param = {
                    number: this.recycleSource.number,
                    reason: this.ruleForm.reason
                  }
                  let res = await recycle(param)
                  if(res.code === 2000) {
                      this.$success('回收成功')
                      let timer = setTimeout(() => {
                        this.$emit("getList")
                        clearTimeout(timer)
                      }, 1000);
                      this.dialogVisible = false
                  }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
</style>