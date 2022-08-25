<template>
    <div class="room-roomDetails-box">
        <drawer 
        size="470px"
        title="查看房间详情"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="115px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="房间ID" prop="room_number">
                    <el-input v-model="ruleForm.room_number" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="房间名称" prop="room_name">
                    <el-input v-model="ruleForm.room_name" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="房主ID" prop="live_user_number">
                    <el-input v-model="ruleForm.live_user_number" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="所属公会" prop="guild_number">
                    <el-input v-model="ruleForm.guild_number" :disabled="disabled"></el-input>
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
            statusList: MAPDATA.USERSTATUSLIST
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
.room-roomDetails-box {
    .el-select {
        width: 295px;
    }
}
</style>