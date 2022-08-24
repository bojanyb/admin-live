<template>
    <div class="activity-userComp-box">
        <drawer 
        size="470px"
        title="查看首充用户详情"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="用户ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="首充时间" prop="first_charge_time">
                    <el-date-picker
                    v-model="ruleForm.first_charge_time"
                    type="datetime"
                    placeholder="选择首充时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择性别" :disabled="disabled">
                        <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册时间" prop="register_time">
                    <el-date-picker
                    v-model="ruleForm.register_time"
                    type="datetime"
                    placeholder="选择注册时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="间隔时间" prop="interval_time">
                    <el-input v-model="ruleForm.interval_time" :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        drawer
    },
    data() {
        return {
            status: 'see', // 当前状态
            sexList: MAPDATA.SEXLIST,
            ruleForm: {},
            rules: {}
        };
    },
    computed: {
        disabled() { // 禁止修改
            return true
        }
    },
    methods: {
        handleClose() {
            this.openComp(false)
        },
        // 获取数据
        loadParams(row) {
            this.openComp()
            let params = JSON.parse(JSON.stringify(row))
            params.first_charge_time = params.first_charge_time * 1000
            params.register_time = params.register_time * 1000
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
.activity-userComp-box {
    .el-select {
        width: 300px;
    }
    .el-date-editor {
        width: 300px;
    }
}
</style>