<template>
    <div class="serviceConfig-audioComp-box">
        <drawer 
        size="470px"
        :title="title"
        ref="drawer"
        @cancel="cancel"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="贵族名称" prop="noble_name">
                    <el-input v-model="ruleForm.noble_name" :disabled="disabled" placeholder="请输入贵族名称"></el-input>
                </el-form-item>
                <el-form-item label="拥有特权" prop="privilege_ids">
                    <el-select v-model="ruleForm.privilege_ids" :disabled="disabled" multiple placeholder="请选择特权">
                        <el-option v-for="item in privilegeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="growth_value">
                    <label slot="label">成&nbsp;&nbsp;长&nbsp;&nbsp;值</label>
                    <el-input v-model="ruleForm.growth_value" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入成长值"></el-input>
                </el-form-item>
                <el-form-item prop="hold_value">
                    <label slot="label">保&nbsp;&nbsp;级&nbsp;&nbsp;值</label>
                    <el-input v-model="ruleForm.hold_value" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入保级值"></el-input>
                </el-form-item>
                <el-form-item label="保级天数" prop="hold_day">
                    <el-input v-model="ruleForm.hold_day" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入保级天数"></el-input>
                </el-form-item>
                <el-form-item label="未保级衰减值" prop="reduce_value" class="dampingBox">
                    <el-input v-model="ruleForm.reduce_value" :disabled="disabled" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入未保级衰减值"></el-input>
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
            tabIndex: '0'
        };
    },
    methods: {
        // 获取数据
        loadParams(status, row) {},
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        cancel() {

        }
    }
}
</script>

<style lang="scss" scoped>
.serviceConfig-audioComp-box {

}
</style>