<template>
    <div class="bindUserComp-box">
        <tableList ref="tableList" title="绑定用户数详情"></tableList>
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
.bindUserComp-box {
    padding: 20px;
    box-sizing: border-box;
    .btnBox {
        margin-bottom: 20px;
    }
}
</style>