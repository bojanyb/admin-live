<template>
    <div class="roomConfig-addHeat-box">
        <drawer 
        size="520px"
        :title="title"
        ref="drawer"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        @update="update"
        :isShowUpdate="true"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="房间ID" prop="room_number">
                    <el-input v-model="ruleForm.room_number" :disabled="disabled" oninput="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item label="增加热度" prop="hot_value">
                    <el-input v-model="ruleForm.hot_value" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="生效时间" prop="time" :rules="timeResult">
                    <el-date-picker
                    v-model="ruleForm.time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="timestamp"
                    :disabled="disabled"
                    @change="timeChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.remark" :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { addRoomHot } from '@/api/house.js'
export default {
    components: {
        drawer
    },
    data() {
        return {
            status: 'add', // 当前状态
            ruleForm: {
                room_number: '',
                hot_value: '',
                start_time: '',
                end_time: '',
                remark: '',
                time: []
            },
            oldParams: {}, // 老数据
            rules: {
                room_number: [
                    { required: true, message: '请输入房间ID', trigger: 'blur' },
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
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增房间热度'
            } else if(this.status === 'update') {
                return '修改房间热度'
            } else {
                return '查看房间热度'
            }
        },
        disabled() { // 禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        },
        timeResult() { // 生效时间限制
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    let time = this.ruleForm.time
                    if(!time) {
                        cb(new Error('请选择生效时间'))
                    } else {
                        if(time[1] < new Date().getTime()) {
                            cb(new Error('结束时间不可小于当前时间'))
                        } else {
                            cb()
                        }
                    }
                }
            }
            return params
        }
    },
    methods: {
        handleClose() {
            this.openComp(false)
        },
        // 更改时间
        timeChange(val) {
            this.ruleForm.start_time = val ? Math.floor(val[0] / 1000) : ''
            this.ruleForm.end_time = val ? Math.floor(val[1] / 1000) : ''
        },
        // 获取数据
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                let start_time = params.start_time * 1000
                let end_time = params.end_time * 1000
                params.time = [start_time, end_time]
                this.$set(this.$data, 'ruleForm', params)
            }
            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        id: s.id || null,
                        room_number: s.room_number,
                        hot_value: s.hot_value,
                        start_time: s.start_time,
                        end_time: s.end_time,
                        remark: s.remark
                    }
                    let res = await addRoomHot(params)
                    if(res.code === 2000) {
                        this.$success('新增成功')
                        this.openComp(false)
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
        // 修改
        update() {
            this.status = 'update'
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) { // 记录数据 - 有改动就提示
                this.$confirm('关闭弹窗将不会保留您的更改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.openComp(false)
                }).catch(() => {});
            } else {
                this.openComp(false)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.roomConfig-addHeat-box {
    .el-date-editor {
        width: 375px;
    }
}
</style>