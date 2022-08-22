<template>
    <div class="serviceConfig-audioComp-box">
        <drawer 
        size="450px"
        :title="title"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="用户ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" :disabled="disabled" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户角色" prop="user_role">
                    <el-select v-model="ruleForm.user_role" :disabled="disabled" multiple placeholder="请选择用户角色">
                        <el-option v-for="item in roleList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间ID" prop="room_number">
                    <el-input v-model="ruleForm.room_number" :disabled="disabled" placeholder="请输入房间ID"></el-input>
                </el-form-item>
                <el-form-item label="违规行为" prop="risk_type_desc">
                    <el-input v-model="ruleForm.risk_type_desc" :disabled="disabled" placeholder="请输入违规行为"></el-input>
                </el-form-item>
                <el-form-item label="时间" prop="start_time">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    :disabled="disabled"
                    placeholder="选择时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="音频" prop="url" class="audioBox">
                    <audio ref="audio" :src="ruleForm.url" controls="controls"></audio>
                </el-form-item>
                <el-form-item label="音转文" prop="content">
                    <el-input v-model="ruleForm.content" :disabled="disabled" placeholder="请输入音转文"></el-input>
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
    props: {
        tabIndex: { // 当前坐标
            type: String,
            default: ''
        }
    },
    components: {
        drawer
    },
    computed: {
        title() { // 标题
            if(this.tabIndex === '0') {
                return '查看派对间音频检测'
            } else {
                return '查看直播间音频检测'
            }
        },
        disabled() { // 禁止
            return true
        }
    },
    data() {
        return {
            status: 'see',
            tabIndex: '0',
            roleList: MAPDATA.RISKSYSTEMROLELIST, // 角色列表
            ruleForm: {},
            rules: {}
        };
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
        }
    }
}
</script>

<style lang="scss">
.serviceConfig-audioComp-box {
    .el-select {
        width: 305px;
    }
    .el-date-editor {
        width: 305px;
    }
    .audioBox {
        .el-form-item__label {
            line-height: 55px;
        }
    }
}
</style>