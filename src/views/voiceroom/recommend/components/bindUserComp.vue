<template>
    <div class="bindUserComp-box">
        <tableList ref="tableList" title="绑定用户数详情" :pid="id" :setting_flg="setting_flg"></tableList>
    </div>
</template>

<script>
// 引入列表组件
import tableList from './list.vue'
export default {
    components: {
        tableList
    },
    data() {
        return {
            id: null, // 上级id
            setting_flg: null // 推荐人类型
        };
    },
    methods: {
        loadParams(id, flag) {
            this.id = id
            this.setting_flg = flag
            this.$refs.tableList.dialogVisible = true
        }
    }
}
</script>

<style lang="scss" scoped>
.bindUserComp-box {
    padding: 20px;
    box-sizing: border-box;
    .btnBox {
        margin-bottom: 20px;
    }
}
</style>