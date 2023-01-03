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
import gradeComp from './grade.vue'
import weekComp from './week.vue'
import mouthComp from './mouth.vue'

// 引入时长奖励配置组件
import durationComp from './duration.vue'

// 引入24小时奖励组件
import awardComp from './components/awardComp.vue'
export default {
    components: {
        gradeComp,
        weekComp,
        mouthComp,
        durationComp,
        menuComp,
        awardComp
    },
    data() {
        return {
            menuList: [
                {
                    name: '公会等级配置'
                },
                {
                    name: '公会周奖励配置'
                },
                {
                    name: '公会月奖励配置'
                },
                // {
                //     name: '24小时房间配置'
                // }
            ],
            tabIndex: '0'
        };
    },
    computed: {
        comp() {
            let compText = ""
            switch (this.tabIndex) {
                case '0':
                    compText = "gradeComp"
                    break;
                case '1':
                    compText = "weekComp"
                    break;
                case '2':
                    compText = "mouthComp"
                    break;
                case '3':
                    compText = "awardComp"
                    break;
            }
            return compText
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
