<template>
    <div class="moveDating-historyComp-box">
        <drawer 
        size="470px"
        title="查看心动记录"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="时间" prop="nickname">
                    <el-date-picker
                    v-model="ruleForm.create_time"
                    type="datetime"
                    :disabled="disabled"
                    placeholder="选择时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" :disabled="disabled" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="主播昵称" prop="live_nickname">
                    <el-input v-model="ruleForm.live_nickname" :disabled="disabled" placeholder="请输入主播昵称"></el-input>
                </el-form-item>
                <el-form-item label="主播ID" prop="live_user_number">
                    <el-input v-model="ruleForm.live_user_number" :disabled="disabled" placeholder="请输入主播ID"></el-input>
                </el-form-item>
                <el-form-item label="通话时长" prop="duration">
                    <el-input v-model="ruleForm.duration" :disabled="disabled" placeholder="请输入通话时长"></el-input>
                </el-form-item>
                <el-form-item label="收益金额" prop="order_dot">
                    <el-input v-model="ruleForm.order_dot" :disabled="disabled" placeholder="请输入收益金额"></el-input>
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
            status: 'see',
            ruleForm: {},
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
        // 取消
        cancel() {
            this.openComp(false)
        }
    }
}
</script>

<style lang="scss">
.moveDating-historyComp-box {
    .el-date-editor {
        width: 325px;
    }
}
</style>