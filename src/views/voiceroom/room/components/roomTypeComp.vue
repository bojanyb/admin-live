<template>
    <div class="roomTypeComp-box">
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
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="序号" prop="sort">
                    <el-input v-model="ruleForm.sort" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="输入序号范围: 1 ~ 65535" @input="sortInput"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { getRoomGenreSave } from '@/api/videoRoom'
export default {
    components: {
        drawer
    },
    data() {
        return {
            status: 'add',
            ruleForm: {
                id: null,
                name: '',
                sort: '',
                start_time: null
            },
            oldParams: {}, // 老数据
            rules: {
                name: [
                    { required: true, message: '请输入类型名称', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]+$/gi, message: '请输入汉字', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入序号', trigger: 'blur' }
                ],
                start_time: [
                    { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增房间类型'
            } else if(this.status === 'update') {
                return '修改房间类型'
            }
        },
        disabled() { // 是否禁止输入
            return false
        }
    },
    methods: {
        // 限制输入最大数字
        sortInput(v) {
            if(v > 65535) {
                this.ruleForm.sort = 65535
            }
        },
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
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
                    params.start_time = Math.floor(params.start_time / 1000)
                    let res = await getRoomGenreSave(params)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$success('新增成功')
                        } else {
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        closed() {
            this.$emit('destoryComp')
        }
    },
}
</script>

<style lang="scss">
.roomTypeComp-box {
    .el-date-editor {
        width: 325px;
    }
}
</style>