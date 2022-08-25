<template>
    <div class="roomConfig-categoryComp-box">
        <drawer 
        size="450px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <!-- <el-form-item label="业务类型" prop="belong">
                    <el-select v-model="ruleForm.belong" placeholder="请选择" :disabled="disabled">
                        <el-option v-for="item in belongList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="ruleForm.name" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="权重排序" prop="sort">
                    <el-input v-model="ruleForm.sort" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="类型色值" prop="color">
                    <el-input v-model="ruleForm.color" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="分类图标" prop="icon">
                    <uploadImg ref="uploadImg" v-model="ruleForm.icon" :imgUrl="ruleForm.icon" name="icon" @validateField="validateField" accept=".png,.jpg,.jpeg" :disabled="disabled"></uploadImg>
                </el-form-item>
                <el-form-item label="类型图标" prop="img">
                    <uploadImg ref="uploadImg" v-model="ruleForm.img" :imgUrl="ruleForm.img" name="img" @validateField="validateField" accept=".png,.jpg,.jpeg" :disabled="disabled"></uploadImg>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { saveGenre } from '@/api/house.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        uploadImg,
        drawer
    },
    data() {
        return {
            belongList: MAPDATA.CATEGORYBUSINESSTYPELIST, // 分类数组
            status: 'add',
            ruleForm: {
                name: '',
                belong: null,
                sort: null,
                icon: '',
                color: null,
                img: ''
            },
            oldParams: {}, // 老数据
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
                color: [
                    { required: true, message: '请输入色值', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请上传品类图标', trigger: 'change' }
                ],
                img: [
                    { required: true, message: '请上传类型图标', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增品类'
            } else if(this.status === 'update') {
                return '修改品类'
            } else {
                return '查看品类'
            }
        },
        disabled() { // 禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    methods: {
        handleClose() {
            this.openComp(false)
        },
        // 获取参数
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
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
                    let params = { ...this.ruleForm }
                    if(this.status === 'update') {
                        delete params.create_time
                    }
                    let res = await saveGenre(params)
                    if(res.code === 2000) {
                        this.$success('新增成功')
                        this.openComp(false)
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
        }
    }
}
</script>

<style lang="scss" scoped>
.roomConfig-categoryComp-box {
    .el-select {
        width: 290px;
    }
}
</style>