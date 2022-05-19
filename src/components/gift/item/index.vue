<template>
    <div class="share-gift-zItem-Box">
        <div class="giftBox" v-for="(item,index) in gifts" :key="index">
            <div class="sunBox">
                <div class="Box">
                    <span>礼物名称：<span>{{ item.gift_name }}</span></span>
                    <span>礼物图标：<img :src="item.gift_photo" alt=""></span>
                    <span>砖石价格：<span>{{ item.gift_diamond }}砖石</span></span>
                    <span>概率：<el-input :disabled="disabled" v-input-limit="5" v-model="item.probability"></el-input><span>%</span></span>
                    <span v-if="isShowLocation">礼物位置：<el-select v-model="item.sort" :disabled="disabled" placeholder="请选择">
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
                </div>
                <div class="property" v-if="isShowProperty">
                    <span>礼物属性：<el-radio-group v-model="item.type" :disabled="disabled">
                        <el-radio :label="1">大礼物</el-radio>
                        <el-radio :label="0">小礼物</el-radio>
                        </el-radio-group>
                    </span>
                </div>
            </div>
            <el-button type="danger" v-if="!disabled" @click="deleteData(item, index)">删 除</el-button>
        </div>
    </div>
</template>

<script>
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    props: {
        gifts: { // 选中礼物列表
            type: Array,
            default: []
        },
        isShowLocation: { // 是否需要展示指定地址
            type: Boolean,
            default: false
        },
        status: { // 当前状态
            type: String,
            default: ''
        },
        isShowProperty: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            input: '',
            locationList: MAPDATA.LOCATIONLIST
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
        },
        // 显示隐藏
        disabled() {
            if(this.status === 'see') {
                return true
            }
            return false
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
        margin-bottom: 20px;
        .sunBox {
            .Box,.property {
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
            .property {
                margin-top: 20px;
            }
        }
        .el-button {
            height: 40px;
        }
    }
}
</style>
