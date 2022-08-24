<template>
    <div class="share-gift-box">
        <div class="giftAllocation">
            <!-- <zItem ref="zItem" :isShowProperty="isShowProperty" :status="status" :isShowLocation="isShowLocation" :gifts="gifts" @deleteData="deleteData"></zItem> -->
            <tableComp ref="tableComp" :status="status" :isShowLocation="isShowLocation" :gifts="gifts" @deleteData="deleteData" :disabled="disabled" :max="max" :locationList="locationList"></tableComp>
        </div>

        <drawer ref="drawer" v-if="isDestoryComp" :status="status" @distoryComp="distoryComp" :activityType="activityType" :list="gifts"></drawer>
    </div>
</template>

<script>

// 表单礼物
// import zItem from './item/index.vue'
import tableComp from './table/index.vue'
// 礼物库
import drawer from './drawer/index.vue'

export default {
    components: {
        tableComp,
        drawer
    },
    props: {
        list: { // 返回礼物数据列表
            type: Array,
            default: []
        },
        isShowLocation: { // 是否需要展示指定地址
            type: Boolean,
            default: false
        },
        activityType: { // 活动类型
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: ''
        },
        isShowProperty: {
            type: Boolean,
            default: false
        },
        disabled: { // 是否禁止输入
            type: Boolean,
            default: false
        },
        max: { // 最大输入天数
            type: Number,
            default: null
        },
        locationList: { // 礼物位置列表
            type: Array,
            default: []
        }
    },
    data() {
        return {
            giftPage: {
                page: 1,
                limit: 10
            },
            isDestoryComp: false
        };
    },
    computed: {
        gifts: {
            get() {
                return this.list
            },
            set(v) {
                return this.$emit('update: list', v)
            }
        }
    },
    methods: {
        handleAddGiftShow() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.drawer.drawer = true
                this.$refs.drawer.giftList()
            }, 100);
        },
        // 销毁组件
        distoryComp() {
            this.isDestoryComp = false
        },
        // 删除礼物
        deleteData({ row, index }) {
            this.gifts.splice(index, 1)
        },
    },
    
}
</script>

<style lang="scss">
.share-gift-box {
    padding-left: 30px;
}
</style>
