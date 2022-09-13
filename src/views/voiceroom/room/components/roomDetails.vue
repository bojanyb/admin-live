<template>
    <div class="room-roomDetails-box">
        <drawer 
        size="470px"
        title="修改房间信息"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="房间名称" prop="room_name">
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
                <el-form-item label="房间ID" prop="room_number">
                    <el-input v-model="form.room_number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="房主ID" prop="live_user_number">
                    <el-input v-model="form.live_user_number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所属公会" prop="guild_number">
                    <el-input v-model="form.guild_number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="form.status" placeholder="请选择" :disabled="true">
                        <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { getRoomSave } from '@/api/videoRoom.js'
export default {
    components: {
        drawer
    },
    data() {
        return {
            status: 'update',
            form: {},
            ruleForm: {
                room_name: '',
                banned_duration: '',
                banned_remark: ''
            },
            oldParams: {}, // 老数据 - 用来判断是否有修改
            oldData: {}, // 老数据 - 用来判断是否需要请求接口
            rules: {
                room_name: [
                    { required: false, message: '请输入活动名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                banned_remark: [
                    { required: true, message: '请填写封禁原因', trigger: 'blur' }
                ]
            },
            statusList: MAPDATA.USERSTATUSLIST,
            roomStatusList: MAPDATA.DURATION
        };
    },
    computed: {
        disabled() { // 是否禁止输入
            return false
        }
    },
    methods: {
        // 获取数据
        loadParams(row) {
            this.openComp()
            this.oldParams = row
            let params = JSON.parse(JSON.stringify(row))
            this.form = params
            this.ruleForm.name = params.name
            this.$set(this.$data, 'ruleForm', params)

            this.oldData = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let a = this.oldParams
                    let params = {
                        room_number: a.room_number,
                        status: 3,
                        banned_duration: s.banned_duration,
                        banned_remark: s.banned_remark,
                        room_name: s.room_name
                    }
                    if(!s.banned_duration) {
                        delete params.status
                        delete params.banned_duration
                        delete params.banned_remark
                    }
                    if(a.room_name === s.room_name) {
                        delete params.room_name
                    }
                    let n = JSON.stringify(this.oldData)
                    let o = JSON.stringify(this.ruleForm)
                    if(n !== o) {
                        let res = await getRoomSave(params)
                        if(res.code === 2000) {
                            this.$success('操作成功')
                        }
                    }
                    this.openComp(false)
                    this.$emit('getList')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消
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
        },
        // 修改
        update() {
            this.status = 'update'
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.room-roomDetails-box {
    .el-select {
        width: 325px;
    }
}
</style>