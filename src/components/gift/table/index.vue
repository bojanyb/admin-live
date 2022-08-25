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
                    <!-- <img class="imgBox" :src="scope.row.gift_photo" alt=""> -->
                    <imgComp ref="imgComp" height="50px" :tagList="[]" :src="scope.row.gift_photo" :preview-src-list="scope.row.gift_photo"></imgComp>
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
                label="数量">
                <template slot-scope="scope">
                    <div class="numBox">
                        <el-input v-model="scope.row.gift_number" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" :disabled="disabled" @input="numberInput(scope.row)"></el-input>个
                    </div>
                    <div class="errorMsg" v-if="!scope.row.gift_number">请填写数量</div>
                </template>
            </el-table-column>
            <el-table-column label="礼物位置" v-if="isShowLocation">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.sort" clearable placeholder="请选择" :disabled="disabled">
                        <el-option
                        v-for="item in locationFunc"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <div class="errorMsg" v-if="!scope.row.sort">请选择</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" @click="deleteData(scope.row, scope.$index)" :disabled="disabled">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 引入图片组件
import imgComp from '@/components/tableList/imgComp.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        imgComp
    },
    props: {
        gifts: { // 选中礼物列表
            type: Array,
            default: []
        },
        isShowLocation: { // 是否需要展示指定地址
            type: Boolean,
            default: false
        },
        disabled: { // 是否禁止输入
            type: Boolean,
            default: false
        },
        max: { // 最大输入
            type: Number,
            default: null
        },
        locationList: { // 礼物位置列表
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            locationListCopy: MAPDATA.LOCATIONLIST
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
                num += a.gift_number ? Number(a.gift_number) : 0
            })
            return num
        },
        locationFunc() {
            if(this.locationList && this.locationList.length > 0) { // 传入位置列表
                return this.locationList
            } else { // 不传入
                let array = JSON.parse(JSON.stringify(this.locationListCopy))
                this.gifts.forEach(item => {
                    array.forEach(x => {
                        if(item.sort === x.value) {
                            x.disabled = true
                        }
                    })
                })
                return array
            }
        }
    },
    methods: {
        // 删除
        deleteData(row, index) {
            this.$emit('deleteData', {row, index})
        },
        // 输入
        numberInput(row) {
            if(this.max && Number(row.gift_number) > this.max) {
                row.gift_number = this.max
            }
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
    .errorMsg {
        color: #FF4949;
        font-size: 12px;
    }
    .el-select {
        width: 100px !important;
        .el-input {
            width: 100px !important;
        }
    }
    .imgComp-box {
        justify-content: flex-start;
    }
}
</style>