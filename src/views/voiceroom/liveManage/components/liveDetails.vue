<template>
    <div class="room-liveDetails-box">
        <drawer 
        size="660px"
        title="修改房间直播信息"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="95px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <div class="flexBox selectBox">
                    <el-form-item label="隐藏房间" prop="is_hide">
                        <el-radio-group v-model="ruleForm.is_hide">
                            <el-radio :label="1">开启</el-radio>
                            <el-radio :label="2">隐藏</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="修改名称" prop="room_name">
                        <el-input v-model="ruleForm.room_name"></el-input>
                    </el-form-item>
                </div>
                <div class="flexBox">
                    <el-form-item label="直播场次ID" prop="room_number">
                        <el-input v-model="ruleForm.room_number" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="房间类型" prop="room_genre_name">
                        <el-input v-model="ruleForm.room_genre_name" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div class="flexBox">
                    <el-form-item label="房间ID" prop="room_number">
                        <el-input v-model="ruleForm.room_number" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="房间名称" prop="room_name">
                        <el-input v-model="ruleForm.room_name" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div class="flexBox">
                    <el-form-item label="房主ID" prop="live_user_number">
                        <el-input v-model="ruleForm.live_user_number" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="所属公会" prop="returnGuild">
                        <el-input v-model="returnGuild" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div class="flexBox">
                    <el-form-item label="开播时间" prop="start_time">
                        <el-date-picker
                        v-model="ruleForm.start_time"
                        type="datetime"
                        placeholder="选择开播时间"
                        :disabled="true">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="开播时长" prop="returnLiveTime">
                        <el-input v-model="returnLiveTime" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div class="flexBox">
                    <el-form-item label="流水" prop="now_flow">
                        <el-input v-model="ruleForm.now_flow" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="在线人数" prop="people">
                        <el-input v-model="ruleForm.people" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入api
import { roomHide, getRoomSave } from '@/api/videoRoom'
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入公共方法
import { formatTime } from '@/utils/common.js'
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
    computed: {
        disabled() { // 是否禁止输入
            return false
        },
        returnLiveTime() { // 开播时长
            let s = this.ruleForm
            return s.live_time ? formatTime(s.live_time) : ''
        },
        returnGuild() { // 返回公会名称加公会id
            let s = this.ruleForm
            return s.guild_number ? `${s.guild_number}（${s.guild_number}）` : ''
        }
    },
    methods: {
        // 获取数据
        loadParams(row) {
            this.openComp()
            let params = JSON.parse(JSON.stringify(row))
            params.start_time = params.start_time * 1000
            this.$set(this.$data, 'ruleForm', params)

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 取消
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) {  // 记录数据 - 有改动就提示
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
                        let res = await getRoomSave({ room_name: s.room_name, room_number: s.room_number })
                        if(res.code === 2000) {
                            this.$success('修改成功')
                        }
                    }
                    if(s.is_hide !== a.is_hide) {
                        let res = await roomHide(params)
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
        // 销毁组件
        closed() {
            this.$emit('destoryComp');
        }
    }
}
</script>

<style lang="scss">
.room-liveDetails-box {
    .flexBox {
        display: flex;
        .el-date-editor {
            width: 200px;
        }
        .el-input {
            width: 200px;
        }
    }
    .selectBox {
        .el-form-item__content {
            width: 200px;
        }
    }
}
</style>