<template>
    <div class="user-verifiedComp-box">
        <drawer
        size="470px"
        title="查看实名详情"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="用户ID" prop="user_id">
                    <el-input v-model="ruleForm.user_id" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="nickname">
                    <el-input v-model="ruleForm.phone" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="nickname">
                    <el-input v-model="ruleForm.id_card" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="认证时间" prop="create_time">
                    <el-date-picker
                    v-model="ruleForm.create_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
export default {
    components: {
        drawer
    },
    data() {
        return {
            status: 'see',
            ruleForm: {},
            rules: {}
        };
    },
    computed: {
        disabled() { // 是否禁止输入
            return true
        }
    },
    methods: {
        // 获取数据
        loadParams(row) {
            this.openComp()
            let params = JSON.parse(JSON.stringify(row))
            params.create_time = params.create_time * 1000
            this.$set(this.$data, 'ruleForm', params)
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 取消
        cancel() {
            this.openComp(false)
        }
    }
}
</script>

<style lang="scss">
.user-verifiedComp-box {
    .el-date-editor {
        width: 330px;
    }
}
</style>