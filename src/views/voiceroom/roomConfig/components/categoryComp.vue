<template>
    <div class="roomConfig-categoryComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="业务类型" prop="belong">
                    <el-select v-model="ruleForm.belong" placeholder="请选择">
                        <el-option v-for="item in belongList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品类名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="排序权重" prop="sort">
                    <el-input v-model="ruleForm.sort"></el-input>
                </el-form-item>
                <el-form-item label="品类图标" prop="icon">
                    <uploadImg ref="uploadImg" v-model="ruleForm.icon" :imgUrl="ruleForm.icon" name="icon" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
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
import { saveGenre } from '@/api/house.js'
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
            belongList: MAPDATA.CATEGORYBUSINESSTYPELIST, // 分类数组
            dialogVisible: false,
            status: 'add',
            ruleForm: {
                name: '',
                belong: null,
                sort: null,
                icon: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入品类名', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                belong: [
                    { required: true, message: '请选择业务类型', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请填写排序权重', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请上传品类图标', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增品类'
            } else if(this.status === 'update') {
                return '修改品类'
            }
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取参数
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
                    if(this.status === 'update') {
                        delete params.create_time
                    }
                    let res = await saveGenre(params)
                    if(res.code === 2000) {
                        this.$message.success('新增成功')
                        this.dialogVisible = false
                        this.$emit('getList');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
.roomConfig-categoryComp-box {
    .el-select {
        width: 260px;
    }
}
</style>