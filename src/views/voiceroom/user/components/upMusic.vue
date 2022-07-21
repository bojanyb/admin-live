<template>
    <div class="usermusic-upMusic-box">
        <el-dialog
        title="编辑音频"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="歌名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer">
                    <el-input v-model="ruleForm.singer"></el-input>
                </el-form-item>
                <el-form-item label="语种" prop="language">
                    <el-select v-model="ruleForm.language" placeholder="请选择语种">
                        <el-option v-for="item in languageList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="曲风" prop="melody">
                    <el-select v-model="ruleForm.melody" placeholder="请选择">
                        <el-option v-for="item in melodyList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年代" prop="age">
                    <el-select v-model="ruleForm.age" placeholder="请选择">
                        <el-option v-for="item in ageList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="铃声" prop="bells">
                    <el-select v-model="ruleForm.bells" placeholder="请选择">
                        <el-option v-for="item in bellsList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { getUserMusicUpdate } from '@/api/videoRoom'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    data() {
        return {
            dialogVisible: false,
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
    methods: {
        // 关闭
        handleClose() {
            this.dialogVisible = false
        },
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
                    let arr = [s.language, s.melody, s.age, s.bells]
                    let params = { 
                        id: s.id,
                        name: s.name,
                        singer: s.singer,
                        tags: arr.toString()
                    }
                    return console.log(params, 'params--------1010')
                    let res = await getUserMusicUpdate(params)
                    if(res.code === 2000) {
                        this.$message.success('修改成功')
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
        }
    }
}
</script>

<style lang="scss" scoped>
.usermusic-upMusic-box {

}
</style>