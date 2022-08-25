<template>
    <div class="blocked-roomComp-box">
        <drawer 
        size="470px"
        title="查看房间封禁详情"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="房间ID" prop="room_number">
                    <el-input v-model="ruleForm.room_number" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="房主ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="房主名称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="封禁时间" prop="create_time">
                    <el-date-picker
                    v-model="ruleForm.create_time"
                    type="datetime"
                    placeholder="选择封禁时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="封禁时长" prop="duration">
                    <el-input v-model="ruleForm.duration" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="封禁原因" prop="remark">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.remark" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择" :disabled="disabled">
                        <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间" prop="create_time">
                    <el-date-picker
                    v-model="ruleForm.create_time"
                    type="datetime"
                    placeholder="选择封禁时间"
                    :disabled="disabled">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="操作人" prop="admin_nickname">
                    <div>{{ ruleForm.admin_nickname }}</div>
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
            status: 'see',
            ruleForm: {},
            rules: {},
            statusList: MAPDATA.USERBLOCKEDSTATUSLIST
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
.blocked-roomComp-box {
    .el-date-editor {
        width: 330px;
    }
    .el-select {
        width: 330px;
    }
}
</style>