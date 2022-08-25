<template>
    <div class="usermusic-upMusic-box">
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
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="歌名" prop="name">
                    <el-input v-model="ruleForm.name" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer">
                    <el-input v-model="ruleForm.singer" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="语种" prop="language">
                    <el-select v-model="ruleForm.language" placeholder="请选择语种" :disabled="disabled">
                        <el-option v-for="item in languageList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="曲风" prop="melody">
                    <el-select v-model="ruleForm.melody" placeholder="请选择" :disabled="disabled">
                        <el-option v-for="item in melodyList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年代" prop="age">
                    <el-select v-model="ruleForm.age" placeholder="请选择" :disabled="disabled">
                        <el-option v-for="item in ageList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="铃声" prop="bells">
                    <el-select v-model="ruleForm.bells" placeholder="请选择" :disabled="disabled">
                        <el-option v-for="item in bellsList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { getUserMusicUpdate } from '@/api/videoRoom'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        drawer
    },
    data() {
        return {
            status: 'see',
            languageList: MAPDATA.USERLANGUAGELIST, // 语种
            melodyList: MAPDATA.USERMUSICSTYLELIST, // 曲风
            ageList: MAPDATA.USERMUSICAGELIST, // 年代
            bellsList: MAPDATA.USERMUSICBELLSLIST, // 铃声
            ruleForm: {
                name: '',
                singer: '',
                language: '',
                melody: '',
                age: '',
                bells: '',
            },
            oldParams: {}, // 老数据
            rules: {
                name: [
                    { required: true, message: '请输入歌名', trigger: 'blur' }
                ],
                singer: [
                    { required: true, message: '请输入歌手', trigger: 'blur' }
                ],
                // language: [
                //     { required: true, message: '请选择', trigger: 'change' }
                // ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'update') {
                return '修改用户音乐详情'
            } else if(this.status === 'see') {
                return '查看用户音乐详情'
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
        // 关闭
        handleClose() {
            this.openComp(false)
        },
        // 获取数据
        loadParams(status, row) {
            this.openComp()
            this.status = status
            let params = JSON.parse(JSON.stringify(row))
            this.$set(this.$data, 'ruleForm', params)

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
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
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let arr = [s.language, s.melody, s.age, s.bells]
                    let params = { 
                        id: s.id,
                        name: s.name,
                        singer: s.singer,
                        tags: arr.toString()
                    }
                    let res = await getUserMusicUpdate(params)
                    if(res.code === 2000) {
                        this.$success('修改成功')
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
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss" scoped>
.usermusic-upMusic-box {
    .el-select {
        width: 350px;
    }
}
</style>