<template>
    <div class="roomEdit-box">
        <el-dialog
        title="房间编辑"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="修改名称" prop="room_name">
                    <el-input v-model="ruleForm.room_name"></el-input>
                </el-form-item>
                <el-form-item label="封禁房间" prop="banned_duration">
                    <el-select v-model="ruleForm.banned_duration" clearable placeholder="请选择">
                        <el-option v-for="item in roomStatusList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="封禁原因" v-if="ruleForm.banned_duration" prop="banned_remark">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.banned_remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { getRoomSave } from '@/api/videoRoom.js'
export default {
    data() {
        return {
            dialogVisible: false,
            roomStatusList: MAPDATA.DURATION,
            ruleForm: {
                room_name: '',
                banned_duration: '',
                banned_remark: ''
            },
            oldParams: {},
            rules: {
                room_name: [
                    { required: false, message: '请输入活动名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                banned_remark: [
                    { required: true, message: '请填写封禁原因', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        loadParams(row) {
            this.oldParams = row
            this.ruleForm.room_name = row.room_name
            this.dialogVisible = true
        },
        // 关闭弹窗
        handleClose() {
            this.resetForm()
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let a = this.oldParams
                    let res,back;
                    if(s.room_name !== a.room_name) {

                    }
                    if(s.banned_duration) {
                        let params = {
                            room_number: a.room_number,
                            status: 3,
                            banned_duration: s.banned_duration,
                            banned_remark: s.banned_remark
                        }
                        res = await getRoomSave(params)
                    }
                    if(res.code === 2000) {
                        this.$message.success('编辑成功')
                    } else {
                        this.$message.success('编辑失败')
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

<style lang="scss">
.roomEdit-box {
    .el-select {
        width: 380px;
    }
}
</style>