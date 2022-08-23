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
                <imgComp ref="imgComp" :tagList="[]" :src="returnImg(scope.row)"></imgComp>
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
                <el-select v-model="scope.row.use_date" placeholder="请选择">
                    <el-option
                    v-for="item in scope.row.time_limit"
                    :key="item.day"
                    :label="item.money"
                    :value="item.day">
                    </el-option>
                </el-select>
                <div class="errorMsg" v-if="!scope.row.use_date">请选择</div>
            </template>
        </el-table-column>
        <el-table-column
        align="center"
        label="操作">
            <template slot-scope="scope">
                <el-button type="danger" @click="deleteParams(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
// 引入图片组件
import imgComp from '@/components/tableList/imgComp.vue'
export default {
    components: {
        imgComp
    },
    props: {
        list: { // 选中的商品
            type: Array,
            default: []
        }
    },
    data() {
        return {

        };
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
                .imgComp-box {
                    .el-image {
                        img {
                            height: 50px;
                        }
                    }
                }
                .el-select {
                    width: 100px;
                }
                .errorMsg {
                    color: #FF4949;
                    font-size: 12px;
                    margin-left: -50px;
                }
            }
        }
    }
}
</style>