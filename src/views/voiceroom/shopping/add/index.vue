<template>
    <div class="shopping-add-box">
        <el-dialog
        :title="title"
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
                    <el-input v-model="ruleForm.goods_name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品简介" prop="goods_describe">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入商品简介"
                    v-model="ruleForm.goods_describe">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否可以购买" prop="can_buy">
                    <el-radio-group v-model="ruleForm.can_buy">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="不可购买原因" prop="reason" v-if="ruleForm.can_buy === 2">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入不可购买原因"
                    v-model="ruleForm.reason">
                    </el-input>
                </el-form-item>
                <el-form-item label="商品出售期限" prop="goods_describe"  v-if="ruleForm.can_buy === 1">
                    <div class="limit" v-for="(item,index) in ruleForm.time_limit" :key="index">
                        <el-input v-model="item.day" placeholder="请输入天数"></el-input>
                        <el-input v-model="item.money" placeholder="请输入价格（喵粮）"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="商品播放类型" prop="play_type">
                    <el-radio-group v-model="ruleForm.play_type">
                        <el-radio :label="1">Lottie</el-radio>
                        <el-radio :label="2">SVGA</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品列表图片" prop="resource">
                    <upload ref="upload"></upload>
                </el-form-item>
                <el-form-item label="商品背景图" prop="resource">
                    <upload ref="upload"></upload>
                </el-form-item>
                <el-form-item label="商品播放类型" prop="play_type">
                    <el-radio-group v-model="goodsType">
                        <el-radio :label="1">商品特效</el-radio>
                        <el-radio :label="2">商品静态图</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品特效" prop="goods_animation_path" v-if="goodsType === 1">
                    <upload v-model="ruleForm.goods_animation_path" ref="upload"></upload>
                </el-form-item>
                <el-form-item label="商品静态图" prop="goods_image" v-if="goodsType === 2">
                    <upload v-model="ruleForm.goods_image" ref="upload"></upload>
                </el-form-item>
                <el-form-item label="商品生效时间" prop="start_time">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择商品生效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品过期时间" prop="end_time">
                    <el-date-picker
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择商品过期时间">
                    </el-date-picker>
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
// 引入图片上传组件
import upload from '@/components/uploadImg/index.vue'

export default {
    components: {
        upload
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增商品'
            } else if(this.status === 'update') {
                return '修改商品'
            } else {
                return '查看商品'
            }
        }
    },
    data() {
        return {
            dialogVisible: true,
            goodsTypeList: MAPDATA.SHOPPING,
            goodsClassifyList: MAPDATA.CLASSIFY,
            goodsType: 1,
            status: 'add',
            ruleForm: {
                goods_type: '',
                category_id: '',
                goods_name: '',
                can_buy: 2,
                goods_describe: '',
                reason: '',
                time_limit: [
                    {
                        day: '',
                        money: ''
                    },
                    {
                        day: '',
                        money: ''
                    },
                    {
                        day: '',
                        money: ''
                    }
                ],
                play_type: null,
                goods_animation_path: '',
                goods_image: '',
                start_time: '',
                end_time: ''
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

<style lang="scss">
.shopping-add-box {
    .el-form {
        .el-input {
            width: 300px;
        }
        .limit {
            display: flex;
            align-items: center;
            .el-input {
                width: 150px;
            }
        }
    }
}
</style>
