<template>
    <div class="nobility-userComp-box">
        <drawer 
        size="470px"
        title="查看贵族用户"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm" label-suffix=":">
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" :disabled="disabled" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="已累计成长值" prop="heap_value">
                    <el-input v-model="ruleForm.heap_value" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="开通时间" prop="create_time">
                    <el-date-picker
                    v-model="ruleForm.create_time"
                    type="datetime"
                    placeholder="选择开通时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到期时间" prop="heap_value">
                    <el-date-picker
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择到期时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="当前成长值" prop="growth_value">
                    <el-input v-model="ruleForm.growth_value" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="当前贵族等级" prop="noble_level">
                    <el-input v-model="ruleForm.noble_level" :disabled="disabled"></el-input>
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
    computed: {
        disabled() {
            return true
        }
    },
    data() {
        return {
            ruleForm: {}, // 新数据
            status: 'see', // 当前状态
            rules: {}
        };
    },
    methods: {
        // 获取数据
        loadParams(row) {
            this.openComp()
            this.$set(this.$data, 'ruleForm', row)
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 关闭
        cancel() {
            this.openComp(false)
        }
    }
}
</script>

<style lang="scss">
.nobility-userComp-box {
    .el-date-editor {
        width: 295px;
    }
}
</style>