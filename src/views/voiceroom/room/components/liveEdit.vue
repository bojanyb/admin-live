<template>
    <div class="liveEdit-box">
        <el-dialog
        title="房间直播编辑"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="隐藏房间" prop="is_hide">
                    <el-radio-group v-model="ruleForm.is_hide">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="修改名称" prop="room_name">
                    <el-input v-model="ruleForm.room_name"></el-input>
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
import { roomHide, getRoomSave } from '@/api/videoRoom'
export default {
    data() {
        return {
            dialogVisible: false,
            ruleForm: {
                room_name: '',
                is_hide: ''
            },
            oldParams: {}, // 老数据
            rules: {
                room_name: [
                    { required: false, message: '请输入名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                is_hide: [
                    { required: false, message: '请选择活动资源', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.resetForm()
        },
        loadParams(row) {
            this.dialogVisible = true
            // 防止数据同源
            this.oldParams = row
            let params = JSON.parse(JSON.stringify(row))
            this.$set(this.$data, 'ruleForm', params)
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let a = this.oldParams
                    let params = {
                        id: s.id,
                        is_hide: s.is_hide
                    }
                    if(s.room_name !== a.room_name) {
                        await getRoomSave({ room_name: s.room_name, room_number: s.room_number })
                    }
                    if(s.is_hide !== a.is_hide) {
                        let res = await roomHide(params)
                        if(res.code === 2000) {
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error('操作失败')
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
            this.dialogVisible = false
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss" scoped>
.liveEdit-box {

}
</style>