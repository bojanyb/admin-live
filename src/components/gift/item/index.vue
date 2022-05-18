<template>
    <div class="share-gift-zItem-Box">
        <div class="giftBox" v-for="(item,index) in gifts" :key="index">
            <span>礼物名称：<span>{{ item.gift_name }}</span></span>
            <span>礼物图标：<img :src="item.gift_photo" alt=""></span>
            <span>砖石价格：<span>{{ item.gift_diamond }}砖石</span></span>
            <span>概率：<el-input v-model="item.probability"></el-input><span>%</span></span>
            <span>礼物位置：<el-select v-model="item.sort" placeholder="请选择">
                <el-option
                    v-for="item in locationFunc"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    :disabled="item.disabled">
                    </el-option>
                </el-select>
            </span>
            <span>礼物有效期：<span>永久</span></span>
            <el-button type="danger" @click="deleteData(item, index)">删 除</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        gifts: { // 选中礼物列表
            type: Array,
            default: []
        }
    },
    data() {
        return {
            input: '',
            locationList: [
                {
                    value: 1
                },
                {
                    value: 2
                },
                {
                    value: 3
                },
                {
                    value: 4
                },
                {
                    value: 5
                },
                {
                    value: 6
                },
                {
                    value: 7
                },
                {
                    value: 8
                },
                {
                    value: 9
                },
                {
                    value: 10
                }
            ]
        };
    },
    computed: {
        locationFunc() {
            let array = JSON.parse(JSON.stringify(this.locationList))
            this.gifts.forEach(item => {
                array.forEach(x => {
                    if(item.sort === x.value) {
                        x.disabled = true
                    }
                })
            })
            return array
        }
    },
    methods: {
        // 删除
        deleteData(row, index) {
            this.$emit('deleteData', {row, index})
        }
    }
}
</script>

<style lang="scss">
.share-gift-zItem-Box {
    .giftBox {
        display: flex;
        align-items: center;
        >span {
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 14px;
            color: #606266;
            margin-right: 20px;
            .el-input {
                width: 100px;
            }
            >img {
                width: 50px;
            }
            >span {
                font-weight: 400;
            }
        }
    }
}
</style>
