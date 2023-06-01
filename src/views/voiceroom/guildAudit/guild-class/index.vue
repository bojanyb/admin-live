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
import rebateComp from './rebate.vue'
import weekComp from './week.vue'
import mouthComp from './mouth.vue'

// 引入时长奖励配置组件
import durationComp from './duration.vue'

// 引入24小时奖励组件
import awardComp from './components/awardComp.vue'

// 引入每周有效人数组件
import effective from './effective.vue'

// 引入拍一拍奖励组件
import coupling from './coupling.vue'
export default {
    components: {
        gradeComp,
        rebateComp,
        weekComp,
        mouthComp,
        durationComp,
        menuComp,
        awardComp,
        effective,
        coupling
    },
    data() {
        return {
            menuList: [
                {
                    name: '公会等级配置'
                },
                {
                    name: '实时返点配置'
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
                {
                    name: '直播公会每周有效人数奖励'
                },
                {
                    name: '拍一拍房间奖励配置'
                }
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
                    compText = "rebateComp"
                    break;
                case '2':
                    compText = "weekComp"
                    break;
                case '3':
                    compText = "mouthComp"
                    break;
                case '4':
                    compText = "effective"
                    break;
                case '5':
                    compText = "coupling"
                    break;
                // case '3':
                //     compText = "awardComp"
                //     break;
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
