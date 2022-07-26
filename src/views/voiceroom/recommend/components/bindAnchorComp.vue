<template>
    <div class="bindAnchorComp-box">
        <tableList ref="tableList" title="绑定主播数详情"></tableList>
    </div>
</template>

<script>
// 引入列表组件
import tableList from './list.vue'
export default {
    components: {
        tableList
    },
    methods: {
        loadParams() {
            this.$refs.tableList.dialogVisible = true
        }
    }
}
</script>

<style lang="scss" scoped>
.bindAnchorComp-box {
    padding: 20px;
    box-sizing: border-box;
    .btnBox {
        margin-bottom: 20px;
    }
}
</style>