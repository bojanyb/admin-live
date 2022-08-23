<template>
    <div class="shoppingComp-box">
        <!-- 列表组件 -->
        <tableComp ref="tableComp" :list="goods"></tableComp>

        <!-- 商品组件 -->
        <goodsBank ref="goodsBank" :isLimit="99999999" :list="goods" @validateField="validateField"></goodsBank>
    </div>
</template>

<script>
// 引入列表组件
import tableComp from './table/index.vue'
// 引入商品库组件
import goodsBank from '@/components/goodsBank/index.vue'
export default {
    components: {
        tableComp,
        goodsBank
    },
    props: {
        list: { // 数据列表
            type: Array,
            default: []
        }
    },
    computed: {
        goods: {
            get() {
                return this.list
            },
            set(v) {
                this.$emit('update:list', v);
            }
        }
    },
    data() {
        return {

        };
    },
    methods: {
        // 重置字段验证
        validateField() {
            // this.$refs.ruleForm.validateField(['goods_id'])
        },
        loadParams() {
            this.$refs.goodsBank.drawer = true
            this.$refs.goodsBank.giftList()
        }
    }
}
</script>

<style lang="scss">
.shoppingComp-box {

}
</style>