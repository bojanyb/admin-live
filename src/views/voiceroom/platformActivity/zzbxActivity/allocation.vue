<template>
    <div class="zzbxActivity-allocation">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-button type="primary" @click="$refs.gift.handleAddGiftShow()">添 加</el-button>
            </el-form-item>
            <gift ref="gift"></gift>
        </el-form>
    </div>
</template>

<script>
import gift from '@/components/gift/index.vue'
export default {
    components: {
        gift
    },
    data() {
        return {
            ruleForm: {},
            rules: {}
        };
    },
}
</script>

<style lang="scss" scoped>
.zzbxActivity-allocation {

}
</style>
