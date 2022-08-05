<template>
    <div class="roomConfig-roomComp-box">
        <el-dialog
        title="修改房间信息"
        :visible.sync="dialogVisible"
        width="450px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-suffix=":">
                <el-form-item label="房间ID">
                    <span class="roomBox">{{ ruleForm.room_number }}</span>
                </el-form-item>
                <el-form-item label="房间标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="首页推荐" prop="back_recommend">
                    <el-radio-group v-model="ruleForm.back_recommend">
                        <el-radio :label="1">开</el-radio>
                        <el-radio :label="0">关</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="房间分类" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择业务类型">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间封面" prop="cover">
                    <uploadImg ref="uploadImg" v-model="ruleForm.cover" :imgUrl="ruleForm.cover" name="cover" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
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
import { updateParty } from '@/api/house.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dialogVisible: false,
            status: 'add',
            typeList: MAPDATA.HOUSEMESSAGECLASSIFYLIST,
            ruleForm: {
                room_number: '',
                title: '',
                back_recommend: '',
                type: '',
                cover: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入房间标题', trigger: 'blur' }
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
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取参数
        loadParams(row) {
            this.dialogVisible = true
            let params = JSON.parse(JSON.stringify(row))
            this.$set(this.$data, 'ruleForm', params)
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
                        type: s.type
                    }
                    let res = await updateParty(params)
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
        }
    }
}
</script>

<style lang="scss" scoped>
.roomConfig-roomComp-box {
    .el-select {
        width: 310px;
    }
    .roomBox {
        font-size: 16px;
        // font-weight: 600;
    }
}
</style>