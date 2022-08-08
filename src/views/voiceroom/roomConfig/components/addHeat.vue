<template>
    <div class="roomConfig-addHeat-box">
        <el-dialog
        title="增加热度"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="房间ID" prop="room_number">
                    <el-input v-model="ruleForm.room_number"></el-input>
                </el-form-item>
                <el-form-item label="增加热度" prop="hot_value">
                    <el-input v-model="ruleForm.hot_value"></el-input>
                </el-form-item>
                <el-form-item label="生效时间" prop="time">
                    <el-date-picker
                    v-model="ruleForm.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="timestamp"
                    @change="timeChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.remark"></el-input>
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
import { addRoomHot } from '@/api/house.js'
export default {
    data() {
        return {
            dialogVisible: false,
            status: 'add', // 当前状态
            ruleForm: {
                room_number: '',
                hot_value: '',
                start_time: '',
                end_time: '',
                remark: '',
                time: []
            },
            rules: {
                room_number: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                hot_value: [
                    { required: true, message: '请输入热度', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请选择生效时间', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 更改时间
        timeChange(val) {
            this.ruleForm.start_time = val ? Math.floor(val[0] / 1000) : ''
            this.ruleForm.end_time = val ? Math.floor(val[1] / 1000) : ''
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
                    let params = { ...this.ruleForm }
                    delete params.time
                    let res = await addRoomHot(params)
                    if(res.code === 2000) {
                        this.$message.success('新增成功')
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
.roomConfig-addHeat-box {
    .el-date-editor {
        width: 330px;
    }
}
</style>