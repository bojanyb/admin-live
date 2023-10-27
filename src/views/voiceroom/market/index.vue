<template>
  <div class="link-data-monitor">
    <menuComp ref="menuComp" :menuList="menuList" v-model="tabIndex"></menuComp>
    <component :ref="comp" :is="comp"></component>
  </div>
</template>

<script>
// 引入tab菜单组件
import menuComp from '@/components/menuComp/index.vue'
// 引入监测数据组件
import monitorDataComp from './components/monitorDataComp.vue'
// 引入监测链接配置组件
import linkConfigComp from './components/linkConfigComp.vue'

export default {
  components: {
    menuComp,
    monitorDataComp,
    linkConfigComp
  },
  data() {
    return {
      menuList: [
        {
          name: '监测数据'
        },
        {
          name: '监测链接配置'
        }
      ],
      tabIndex: '0'
    };
  },
  computed: {
    comp() {
        return this.tabIndex === '0' ? 'monitorDataComp' : 'linkConfigComp'
    }
  },
};
</script>

<style lang="scss">
.link-data-monitor {
  padding: 20px;
  box-sizing: border-box;
}
</style>
