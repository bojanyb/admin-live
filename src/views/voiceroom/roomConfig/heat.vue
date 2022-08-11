<template>
    <div class="roomConfig-heat-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>

        <!-- 组件 -->
        <component :is="comp"></component>
    </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入热度配置组件
import platform from './components/platform.vue'
// 引入列表组件
import list from './components/list.vue'
export default {
    components: {
        menuComp,
        platform,
        list
    },
    data() {
        return {
            tabIndex: '0',
            menuList: [
                {
                    name: '热度配置'
                },
                {
                    name: '热度列表'
                }
            ],
        };
    },
    computed: {
        comp() {
            return this.tabIndex === '0' ? 'platform' : 'list'
        }
    }
}
</script>

<style lang="scss">
.roomConfig-heat-box {
    padding: 10px 20px 20px 20px;
    box-sizing: border-box;
}
</style>