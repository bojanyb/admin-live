<template>
    <div class="finance-embodyApply-box">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
        <component :is="comp"></component>
    </div>
</template>

<script>
// 引入提现申请组件
import applyComp from './components/applyComp.vue'
// 引入提现商户配置
import depositList from './deposit-list.vue'
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
export default {
    components: {
        applyComp,
        depositList,
        menuComp
    },
    data() {
        return {
            menuList: [
                {
                    name: '提现申请'
                },
                {
                    name: '提现付款账户设置'
                }
            ],
            tabIndex: '0',
        };
    },
    computed: {
        comp() {
            return this.tabIndex === '0' ? 'applyComp' : 'depositList'
        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
.finance-embodyApply-box {
    padding: 0px 20px 20px 20px;
    box-sizing: border-box;
}
</style>