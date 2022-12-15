<template>
    <div class="app-version-config">
        <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex" @tabChange="tabChange"></menuComp>
        <versionConfig v-if="tabIndex == 0" />
        <checkSwitchConfig v-if="tabIndex == 1" />
    </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
import versionConfig from './AppVersion/versionConfig.vue'
import checkSwitchConfig from './AppVersion/checkSwitchConfig.vue';
export default {
    components: {
        menuComp,
        versionConfig,
        checkSwitchConfig
    },
    data() {
        return {
          tabIndex: 0,
          menuList: [
                {
                    name: '版本升级'
                },
                {
                    name: '审核开关'
                }
            ],
        };
    },
    computed: {},
    methods: {
      tabChange(){}
    },
    created() {},
    destroyed() {}
}
</script>

<style lang="scss">
.app-version-config{
  padding: 20px;
}
</style>
