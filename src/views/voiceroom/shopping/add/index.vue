<template>
    <div class="shopping-add-box">
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品类型" prop="goods_type">
                    <el-select v-model="ruleForm.goods_type" placeholder="请选择商品类型">
                        <el-option v-for="item in goodsTypeList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类" prop="category_id">
                    <el-select v-model="ruleForm.category_id" placeholder="请选择商品分类">
                        <el-option v-for="item in goodsTypeList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model="ruleForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="是否可以购买" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model="ruleForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品简介" prop="goods_describe">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入商品简介"
                    v-model="ruleForm.goods_describe">
                    </el-input>
                </el-form-item>
                <el-form-item label="不可购买原因" prop="goods_describe">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入商品简介"
                    v-model="ruleForm.goods_describe">
                    </el-input>
                </el-form-item>
                

                




                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                
                <el-form-item label="活动时间" required>
                    <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                    </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    data() {
        return {
            dialogVisible: true,
            goodsTypeList: MAPDATA.SHOPPING,
            goodsClassifyList: MAPDATA.CLASSIFY,
            ruleForm: {
                goods_type: '',
                category_id: '',
                goods_name: '',
                goods_describe: ''
            },
            rules: {}
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    }
}
</script>

<style lang="scss" scoped>
.shopping-add-box {

}
</style>
