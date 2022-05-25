<template>
    <div class="">
        <lottie :options="defaultOptions" :height="380" :width="200" v-on:animCreated="handleAnimation" />
    </div>
</template>

<script>
import lottie from 'vue-lottie';

import * as animationData from "@/assets/happiness/data.json";
animationData.default.assets.forEach((item) => {
  item.u = "";
  if (item.w && item.h) {
    item.p = require(`@/assets/happiness/images/${item.p}`);
  }
}); // 获取静态资源

export default {
    components: { lottie },
    data() {
        return {
            defaultOptions: { animationData: animationData.default },
            animationSpeed: 1,
            anim: {},
        };
    },
    methods: {
        handleAnimation: function (anim) {
            this.anim = anim;
            console.log(anim, ''); //这里可以看到 lottie 对象的全部属性
        },
    },
    mounted() {
        console.log(animationData.default, 'animationData--------')
    }
}
</script>

<style lang="scss" scoped>
    
</style>
