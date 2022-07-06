<template>
    <div class="guild-editComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="公会头像" prop="face">
                    <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="公会昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" placeholder="请输入公会名字"></el-input>
                </el-form-item>
                <el-form-item label="固定返点" prop="rebate">
                    <el-input v-model="ruleForm.rebate" :disabled="true" placeholder="请输入固定返点"></el-input>
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

// 引入api
import { getGuildCreate, getGuildUpdate } from '@/api/videoRoom'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dialogVisible: false,
            status: 'add',
            rankList: MAPDATA.CLASSLIST,
            ruleForm: {
                id: null,
                face: '',
                nickname: '',
                user_number: '',
                rank: '',
                remark: '',
                rebate: 10
            },
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
                remark: [
                    { required: false, message: '请输入公会简介', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增公会'
            } else if(this.status === 'update') {
                return '修改公会'
            }
        }
    },
    methods: {
        handleClose() {
            this.resetForm()
        },
        // 新增 - 修改
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
                    if(this.status === 'add') {
                        let res = await getGuildCreate(params)
                        if(res.code === 2000) {
                            this.$message.success('新增成功')
                        } else {
                            this.$message.error('新增失败')
                        }
                    } else {
                        let res = await getGuildUpdate(params)
                        if(res.code === 2000) {
                            this.$message.success('修改成功')
                        } else {
                            this.$message.error('修改失败')
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
        width: 380px;
    }
}
</style>