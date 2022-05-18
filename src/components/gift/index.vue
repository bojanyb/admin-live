<template>
    <div class="share-gift-box">
        <div class="giftAllocation">
            <zItem ref="zItem" :gifts="gifts" @deleteData="deleteData"></zItem>
        </div>

        <drawer ref="drawer" :list="gifts"></drawer>
    </div>
</template>

<script>

// 表单礼物
import zItem from './item/index.vue'
// 礼物库
import drawer from './drawer/index.vue'

// 引入api
import { getActivetyGiftSource } from '@/api/videoRoom'

export default {
    components: {
        zItem,
        drawer
    },
    props: {
        list: {
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
        // 获取所有礼物
        giftList() {
            var params = {
                'page': this.giftPage.page,
                'pagesize': this.giftPage.limit
            }
            this.$refs.drawer.giftListArr = [];
            getActivetyGiftSource(params).then(res => {
                this.$refs.drawer.giftTotal = res.data.count;

                res.data.list.map(re=>{
                    switch (re.gift_genre) {
                        case 1:
                        re.gift_genreText = '基本礼物'
                            break;
                        case 2:
                        re.gift_genreText = '抽奖礼物'
                            break;
                        case 3:
                        re.gift_genreText = '抽奖包裹内礼物'
                            break;
                        case 4:
                        re.gift_genreText = '普通礼物'
                            break;
                        case 5:
                        re.gift_genreText = '免费礼物'
                            break;
                        case 6:
                        re.gift_genreText = '动效礼物'
                            break;
                        case 7:
                        re.gift_genreText = '全屏礼物'
                            break;
                    }
                })
                this.$refs.drawer.giftListArr = res.data.list;
                this.$refs.drawer.giftSelectSource();
            }).catch(err => {})
        },
        
        // 删除礼物
        deleteData({ row, index }) {
            this.$refs.drawer.giftListArr.forEach(item => {
                if(item.id === row.id) {
                    item.isSelect = false
                }
            })

            this.gifts.splice(index, 1)
        },
        handleAddGiftShow() {
            this.$refs.drawer.drawer = true
        }
    },
    mounted() {
        this.giftList()
    }
}
</script>

<style lang="scss" scoped>
.share-gift-box {

    
}
</style>
