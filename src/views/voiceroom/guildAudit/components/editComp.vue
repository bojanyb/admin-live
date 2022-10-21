<template>
    <div class="guild-editComp-box">
        <el-dialog
        :title="title"
        :width="'600px'"
        @closed="closed"
        :visible.sync="isEditComp">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="公会名称" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入公会名字"></el-input>
                </el-form-item>
                <el-form-item label="公会类型" prop="guild_type">
                    <el-select v-model="ruleForm.guild_type" placeholder="请选择公会等级">
                        <el-option v-for="item in guildTypeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公会长ID" prop="guild_number">
                    <el-input v-model="ruleForm.guild_number" placeholder="请输入公会长ID"></el-input>
                </el-form-item>
                <el-form-item label="实时返点" prop="rebate">
                    <el-input v-model="ruleForm.rebate" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" @input="rebateInput" placeholder="请输入实时返点">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { getGuildCreateV2, getGuildUpdateV2 } from '@/api/videoRoom'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {},
    data() {
        return {
            status: 'add',
            isEditComp: false,
            rankList: MAPDATA.CLASSLIST,
            guildTypeList: MAPDATA.GUILDCONFIGTYPELIST,
            ruleForm: {
                id: null,
                name: '',
                guild_number: '',
                rebate: 0,
                guild_type: null
            },
            oldParams: {}, // 老数据
            rules: {
                name: [
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
                // operator: [
                //     { required: true, message: '请选择公会运营', trigger: 'change' }
                // ],
                guild_type: [
                    { required: true, message: '请选择公会类型', trigger: 'change' }
                ],
                remark: [
                    { required: false, message: '请输入公会简介', trigger: 'blur' }
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
                let para = {}
                para.guild_type = params.guild_type ? params.guild_type : ''
                para.id = params.id ? params.id : "";
                para.name = params.name ? params.name : "";
                para.guild_number = params.guild_number ? params.guild_number : "" ;
                para.status = params.status;
                para.rebate = params.rebate;
                this.$set(this.$data, 'ruleForm', para)
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.isEditComp = status
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
        async submitForm() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    if(this.status === 'add') {
                        let res = await getGuildCreateV2(params)
                        if(res.code === 2000) {
                            this.$success('新增成功')
                        }
                    } else {
                        let res = await getGuildUpdateV2(params)
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
    .el-select,
    .el-input {
        width: 320px;
    }
}
</style>