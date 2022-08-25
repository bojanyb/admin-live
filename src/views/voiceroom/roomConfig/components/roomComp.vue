<template>
    <div class="roomConfig-roomComp-box">
        <drawer 
        size="600px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <div class="flexBox">
                    <el-form-item label="房间ID">
                        <el-input v-model="ruleForm.room_number" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="房主">
                        <!-- <span class="roomBox">{{ ruleForm.nickname }}（{{ ruleForm.user_number }}）</span> -->
                        <el-input v-model="returnName" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div class="flexBox">
                    <el-form-item label="所属公会">
                        <el-input v-model="ruleForm.guild_name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="房间状态">
                        <!-- <span class="roomBox">{{ ruleForm.nickname }}（{{ ruleForm.user_number }}）</span> -->
                        <el-select v-model="ruleForm.type" :disabled="true">
                            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="房间类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择业务类型" :disabled="true">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间封面" prop="cover">
                    <uploadImg ref="uploadImg" v-model="ruleForm.cover" :imgUrl="ruleForm.cover" name="cover" @validateField="validateField" accept=".png,.jpg,.jpeg" :disabled="disabled"></uploadImg>
                </el-form-item>
                <el-form-item label="房间标题" prop="title">
                    <el-input v-model="ruleForm.title" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="房间公告" prop="notice">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.notice" :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { updateParty } from '@/api/house.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg,
        drawer
    },
    data() {
        return {
            status: 'add',
            typeList: [],
            ruleForm: {
                room_number: '',
                title: '',
                back_recommend: '',
                type: null,
                cover: '',
                notice: ''
            },
            oldParams: {}, // 老数据
            rules: {
                title: [
                    { required: true, message: '请输入房间标题', trigger: 'blur' }
                ],
                notice: [
                    { required: false, message: '请输入房间公告', trigger: 'blur' }
                ],
                back_recommend: [
                    { required: true, message: '是否首页推荐', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择房间分类', trigger: 'change' }
                ],
                cover: [
                    { required: true, message: '请上传房间封面', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'see') {
                return '查看房间信息'
            } else if(this.status === 'update') {
                return '修改房间信息'
            }
        },
        disabled() { // 是否禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        },
        returnName() {
            return `${this.ruleForm.nickname}（${this.ruleForm.user_number}）`
        }
    },
    methods: {
        handleClose() {
            this.openComp(false)
        },
        // 获取参数
        loadParams(status, row, list) {
            this.openComp()
            this.typeList = list
            this.status = status
            let params = JSON.parse(JSON.stringify(row))
            this.$set(this.$data, 'ruleForm', params)

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
                        id: s.id,
                        title: s.title,
                        cover: s.cover,
                        back_recommend: s.back_recommend,
                        type: s.type,
                        notice: s.notice
                    }
                    let res = await updateParty(params)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$success('新增成功')
                        } else {
                            this.$success('修改成功')
                        }
                        this.openComp(false)
                        this.$emit('getList')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 修改
        update() {
            this.status = 'update'
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
        }
    }
}
</script>

<style lang="scss" scoped>
.roomConfig-roomComp-box {
    .el-select {
        width: 450px;
    }
    .roomBox {
        font-size: 16px;
        // font-weight: 600;
    }
    .flexBox {
        display: flex;
        .el-select {
            width: 180px;
        }
        .el-input {
            width: 180px;
        }
    }
}
</style>