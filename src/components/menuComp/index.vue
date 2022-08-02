<template>
    <div class="menuComp-box">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item v-for="(item,index) in menuList" :key="index" :index="String(index)">{{ item.name }}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    props: {
        menuList: { // 菜单列表
            type: Array,
            default: []
        }
    },
    data() {
        return {
            activeIndex: '0',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$emit('input', key)
        }
    }
}
</script>

<style lang="scss">
.menuComp-box {
    padding-bottom: 20px;
    box-sizing: border-box;
}
</style>