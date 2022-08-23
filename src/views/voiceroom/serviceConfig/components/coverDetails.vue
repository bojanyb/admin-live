<template>
    <div class="serviceConfig-coverDetails-box">
        <drawer 
        size="450px"
        title="查看封面审核"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="true">
                <el-form-item label="用户ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" :disabled="disabled" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="房间ID" prop="room_number">
                    <el-input v-model="ruleForm.room_number" :disabled="disabled" placeholder="请输入房间ID"></el-input>
                </el-form-item>
                <el-form-item label="封面图" prop="cover_url">
                    <uploadImg ref="uploadImg" v-model="ruleForm.cover_url" :imgUrl="ruleForm.cover_url" name="cover_url" @validateField="validateField" accept=".png,.jpg,.jpeg" :disabled="disabled"></uploadImg>
                </el-form-item>
                <el-form-item label="封面类型" prop="type">
                    <el-select v-model="ruleForm.type" :disabled="disabled" placeholder="请选择封面类型">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" prop="status">
                    <el-select v-model="ruleForm.status" :disabled="disabled" placeholder="请选择审核状态">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="create_time">
                    <el-date-picker
                    v-model="ruleForm.create_time"
                    type="datetime"
                    :disabled="disabled"
                    placeholder="选择时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="room_number">
                    <div>{{ ruleForm.remark || '无' }}</div>
                </el-form-item>
                <el-form-item label="处理人" prop="room_number">
                    <div>{{ ruleForm.admin_nickname || '无' }}</div>
                </el-form-item>
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        drawer,
        uploadImg
    },
    data() {
        return {
            ruleForm: {},
            rules: {},
            typeList: MAPDATA.SERVICEAUDITTYPELIST, // 封面类型
            statusList: MAPDATA.SERVICEAUDITSTATUSLIST // 审核状态
        };
    },
    computed: {
        disabled() { // 禁止输入
            return true
        }
    },
    methods: {
        // 获取数据
        loadParams(row) {
            this.openComp()
            let params = JSON.parse(JSON.stringify(row))
            params.start_time = params.start_time * 1000
            this.$set(this.$data, 'ruleForm', params)
            // this.ruleForm = row
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        cancel() {
            this.openComp(false)
        },
        // 重置 - 验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        }
    }
}
</script>

<style lang="scss">
.serviceConfig-coverDetails-box {
    .el-select {
        width: 305px;
    }
    .el-date-editor {
        width: 305px;
    }
}
</style>