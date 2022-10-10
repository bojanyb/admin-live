<template>
    <div class="guild-editComp-box">
        <drawer 
        size="470px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="公会类型" prop="guild_type">
                    <el-select v-model="ruleForm.guild_type" placeholder="请选择公会等级">
                        <el-option v-for="item in guildTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公会头像" prop="face">
                    <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="公会名称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" placeholder="请输入公会名字"></el-input>
                </el-form-item>
                <el-form-item label="固定返点" prop="rebate">
                    <el-input v-model="ruleForm.rebate" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" @input="rebateInput" placeholder="请输入固定返点"></el-input>
                </el-form-item>
                <el-form-item label="公会长ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" placeholder="请输入公会长ID"></el-input>
                </el-form-item>
                <el-form-item label="公会等级" prop="rank">
                    <el-select v-model="ruleForm.rank" placeholder="请选择公会等级">
                        <el-option v-for="item in rankList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公会简介" prop="remark">
                    <el-input type="textarea" v-model="ruleForm.remark" :rows="4"></el-input>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { getGuildCreate, getGuildUpdate } from '@/api/videoRoom'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
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
            rankList: MAPDATA.CLASSLIST,
            guildTypeList: MAPDATA.GUILDCONFIGTYPELIST,
            ruleForm: {
                id: null,
                face: '',
                nickname: '',
                user_number: '',
                rank: '',
                remark: '',
                rebate: 0,
                guild_type: null
            },
            oldParams: {}, // 老数据
            rules: {
                face: [
                    { required: true, message: '请上传公会头像', trigger: 'change' }
                ],
                nickname: [
                    { required: true, message: '请输入公会昵称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                rebate: [
                    { required: true, message: '请输入固定返点', trigger: 'blur' }
                ],
                user_number: [
                    { required: true, message: '请输入公会长ID', trigger: 'blur' }
                ],
                rank: [
                    { required: true, message: '请选择公会等级', trigger: 'change' }
                ],
                guild_type: [
                    { required: true, message: '请选择公会类型', trigger: 'change' }
                ],
                remark: [
                    { required: false, message: '请输入公会简介', trigger: 'blur' },
                    { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增公会'
            } else if(this.status === 'update') {
                return '修改公会'
            }
        },
        disabled() { // 是否禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    methods: {
        // 公会返点限制
        rebateInput() {
            let num = this.ruleForm.rebate
            if(num && Number(num) > 10) {
                this.ruleForm.rebate = 10
            }
        },
        // 新增 - 修改
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.guild_type = params.guild_type ? params.guild_type : ''
                this.$set(this.$data, 'ruleForm', params)
            }

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
                    let params = { ...this.ruleForm }
                    if(this.status === 'add') {
                        let res = await getGuildCreate(params)
                        if(res.code === 2000) {
                            this.$success('新增成功')
                        }
                    } else {
                        let res = await getGuildUpdate(params)
                        if(res.code === 2000) {
                            this.$success('修改成功')
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
        // 重置
        resetForm() {
            this.openComp(false)
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss" scoped>
.guild-editComp-box {
    .el-select {
        width: 320px;
    }
}
</style>