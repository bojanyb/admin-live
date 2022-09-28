<template>
    <div class="app-container systemConfig-guild-class-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <component :ref="comp" :is="comp"></component>
    </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入公会等级配置管理组件
import classComp from './class.vue'
// 引入时长奖励配置组件
import durationComp from './duration.vue'
export default {
    components: {
        classComp,
        durationComp,
        menuComp
    },
    data() {
        return {
            menuList: [
                {
                    name: '公会等级配置管理'
                },
                // {
                //     name: '时长奖励配置'
                // }
            ],
            tabIndex: '0'
        };
    },
    computed: {
        comp() {
            return this.tabIndex === '0' ? 'classComp' : 'durationComp'
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
.systemConfig-guild-class-box {

}
</style>