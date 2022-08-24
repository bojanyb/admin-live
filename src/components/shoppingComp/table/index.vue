<template>
    <div class="shoppingComp-table-box">
        <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
        prop="date"
        align="center"
        label="商品图标">
            <template slot-scope="scope">
                <imgComp ref="imgComp" height="50px" :tagList="[]" :src="returnImg(scope.row)" :preview-src-list="returnImg(scope.row)"></imgComp>
            </template>
        </el-table-column>
        <el-table-column
        prop="goods_name"
        align="center"
        label="商品名称">
        </el-table-column>
        <el-table-column
        prop="address"
        align="center"
        label="商品天数">
            <template slot-scope="scope">
                <el-input v-model="scope.row.use_date" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" :disabled="disabled" @input="numberInput(scope.row)"></el-input>天
                <div class="errorMsg" v-if="!scope.row.use_date">请选择</div>
            </template>
        </el-table-column>
        <el-table-column label="礼物位置" align="center" v-if="isShowLocation">
            <template slot-scope="scope">
                <el-select v-model="scope.row.sort" placeholder="请选择" :disabled="disabled">
                    <el-option
                    v-for="item in locationFunc"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                    :disabled="item.disabled">
                    </el-option>
                </el-select>
                <div class="errorMsgCopy" v-if="!scope.row.sort">请选择</div>
            </template>
        </el-table-column>
        <el-table-column
        align="center"
        label="操作">
            <template slot-scope="scope">
                <el-button type="danger" @click="deleteParams(scope.$index)" :disabled="disabled">删除</el-button>
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
        list: { // 选中的商品
            type: Array,
            default: []
        },
        disabled: { // 是否禁止输入
            type: Boolean,
            default: false
        },
        isShowLocation: { // 是否显示商品位置
            type: Boolean,
            default: false
        },
        max: { // 最大输入
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
            locationListCopy: MAPDATA.LOCATIONLIST
        };
    },
    computed: {
        // 商品位置
        locationFunc() {
            if(this.locationList && this.locationList.length > 0) { // 传入位置列表
                return this.locationList
            } else { // 不传入
                let array = JSON.parse(JSON.stringify(this.locationListCopy))
                this.list.forEach(item => {
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
        returnImg(row) {
            if(row.goods_animation_path) {
                return row.goods_animation_path
            } else {
                return row.goods_image
            }
        },
        // 删除
        deleteParams(index) {
            this.list.splice(index, 1)
        },
        // 输入天数
        numberInput(row) {
            if(this.max && Number(row.use_date) > this.max) {
                row.use_date = this.max
            }
        }
    }
}
</script>

<style lang="scss">
.shoppingComp-table-box {
    padding-left: 30px;
    box-sizing: border-box;
    .el-table {
        width: 100%;
        tbody {
            td {
                .el-input {
                    width: 100px;
                }
                .errorMsg {
                    color: #FF4949;
                    font-size: 12px;
                    margin-left: -80px;
                }
                .errorMsgCopy {
                    color: #FF4949;
                    font-size: 12px;
                    margin-left: -60px;
                }
            }
        }
    }
}
</style>