<template>
    <div class="roomBgEdit-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="closed">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="图片" prop="url">
                <uploadImg v-model="ruleForm.url" :imgUrl="ruleForm.url" name="url" ref="url" @validateField="validateField"></uploadImg>
            </el-form-item>
            <el-form-item label="默认配置房间类型" prop="room_genre">
                <el-select v-model="ruleForm.room_genre" placeholder="请选择默认配置房间类型">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
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

// 引入upload组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { getRoomBgAdd } from '@/api/videoRoom'
export default {
    components: {
        uploadImg
    },
    data() {
        return {
            dialogVisible: false,
            status: 'add',
            typeList: MAPDATA.ROOMTYPELIST,
            ruleForm: {
                room_genre: '',
                url: ''
            },
            rules: {
                url: [
                    { required: true, message: '请上传图片', trigger: 'change' }
                ],
                room_genre: [
                    { required: true, message: '请选择房间类型', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增房间背景图'
            } else if(this.status === 'update') {
                return '修改房间背景图'
            }
        }
    },
    methods: {
        // 获取数据
        loadParams(status, row) {
            this.dialogVisible = true
            this.status = status

            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        handleClose() {
            this.resetForm()
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let params = {
                        id: s.id || null,
                        room_genre: s.room_genre,
                        url: s.url
                    }
                    let res = await getRoomBgAdd(params)
                    if(res.code === 2000) {
                        this.$message.success('操作成功')
                    }
                    this.dialogVisible = false
                    this.$emit('getList')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.dialogVisible = false
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
    
</style>