<template>
    <div class="share-gift-table-box">
        <div class="preview">
            <span><span class="name">总价值：</span><span class="num">{{ totalMoney }} 喵粮</span></span>
            <span><span class="name">总数量：</span><span class="num">{{ totalNum }} 个</span></span>
        </div>
        <el-table
            :data="gifts"
            style="width: 100%">
            <el-table-column
                label="礼物图标">
                <template slot-scope="scope">
                    <img class="imgBox" :src="scope.row.gift_photo" alt="">
                </template>
            </el-table-column>
            <el-table-column
                prop="gift_name"
                label="礼物名称">
            </el-table-column>
            <el-table-column
                label="单价">
                <template slot-scope="scope">
                    <span>{{ scope.row.gift_diamond }}喵粮</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="num"
                label="数量">
                <template slot-scope="scope">
                    <div class="numBox">
                        <el-input v-model="scope.row.num" onkeydown="this.value=this.value.replace(/^0+/,'');" @input="numInput(scope.row)"></el-input>个
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="礼物位置" v-if="isShowLocation">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.sort" placeholder="请选择">
                        <el-option
                            v-for="item in locationFunc"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="deleteData(scope.row, scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        }
    },
    data() {
        return {
            locationList: MAPDATA.LOCATIONLIST
        };
    },
    computed: {
        totalMoney() {
            let num = 0
            this.gifts.forEach((a) => {
                num += a.gift_diamond
            })
            return num
        },
        totalNum() {
            let num = 0
            this.gifts.forEach((a) => {
                num += a.num ? Number(a.num) : 0
            })
            return num
        },
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
    },
    methods: {
        numInput(row) {
            row.num = row.num.replace(/[^\d]/g,'')
        },
        // 删除
        deleteData(row, index) {
            this.$emit('deleteData', {row, index})
        }
    }
}
</script>

<style lang="scss">
.share-gift-table-box {
    padding-bottom: 40px;
    box-sizing: border-box;
    .preview {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
        padding: 20px;
        box-sizing: border-box;
        margin-bottom: 10px;
        >span {
            margin-right: 50px;
            >span.name {
                font-size: 16px;
            }
            >span.num {
                color: #FF4949;
                font-size: 16px;
            }
        }
    }
    .imgBox {
        width: 50px;
        max-height: 50px;
    }
    .numBox {
        display: flex;
        align-items: center;
        .el-input {
            width: 100px !important;
            input {
                width: 100px;
                // border: none;
                // border-bottom: 1px solid #ccc;
                // border-radius: 0px !important;
                background: none;
            }
        }
    }
    .el-select {
        width: 100px !important;
        .el-input {
            width: 100px !important;
        }
    }
}
</style>