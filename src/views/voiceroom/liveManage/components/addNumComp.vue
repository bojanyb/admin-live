<template>
    <div class="number-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" label-suffix=":" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="商品类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择靓号类型">
                        <el-option v-for="item in goodsNumTypeList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类" prop="class">
                    <el-select v-model="ruleForm.class" placeholder="请选择商品分类">
                        <el-option v-for="item in goodsNumClassList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                    <el-select v-model="ruleForm.name" placeholder="请选择商品名称">
                        <el-option v-for="item in shopList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可购买" prop="isBuy">
                    <el-radio-group v-model="ruleForm.isBuy">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品出售期限">
                    <div class="sellItem" style="display: flex;" v-for="(item,index) in ruleForm.time_limit" :key="index">
                        <el-input v-model="item.day" placeholder="请输入时间" oninput="this.value=this.value.replace(/[^\d]/g,'');" clearable></el-input>
                        <el-input v-model="item.money" placeholder="请输入价格（钻石）" oninput="this.value=this.value.replace(/[^\d]/g,'');" clearable></el-input>
                        <el-button type="primary" v-if="(ruleForm.time_limit.length - 1) <= index "  @click="handleAdd">添加</el-button>
                        <el-button type="danger" v-else-if="(ruleForm.time_limit.length - 1) > index"  @click="handleDel">删除</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="商品展示图片">
                    <uploadImg ref="uploadImg" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="商品生效时间">
                    <el-date-picker
                    v-model="timer"
                    type="datetime"
                    placeholder="选择商品生效时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                    @change="timeChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品过期时间">
                    <el-date-picker
                    v-model="timer2"
                    type="datetime"
                    placeholder="选择商品过期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                    @change="timeChange2">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入api
import { add } from '@/api/shopping.js'
export default {
    components: {
        uploadImg
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增商品'
            } else if(this.status === 'update') {
                return '修改商品'
            } else {
                return '查看商品'
            }
        },
        StartPicker() { // 开始时间配置
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        EndPicker() { // 结束时间配置
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        startTime() { // 开始时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < now && this.status === 'add') {
                        cb(new Error('商品生效时间不可小于当前时间'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        endTime() { // 结束时间限制
            let start = this.ruleForm.start_time
            let now = new Date().getTime()
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < now && this.status === 'add') {
                        cb(new Error('商品生效时间不可小于当前时间'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        limitRules() { // 商品出售期限 - 必填
            let array = this.ruleForm.time_limit
            let isStatus = false
            array.forEach((item,index) => {
                if(!item.day || !item.money) {
                    isStatus = true
                }
            })
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(isStatus) {
                        cb(new Error(`请填写所有数据`))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
    },
    data() {
        return {
            dialogVisible: false,
            goodsNumTypeList: MAPDATA.GOODNUMTYPE,
            goodsNumClassList: MAPDATA.GOODNUMCLASS,
            shopList: [],
            goodsType: 1,
            status: 'add',
            oldParams: {},
            timer : null,
            timer2 : null,
            ruleForm: {
                type: '',
                class: '',
                name: '',
                isBuy: 1,
                time_limit: [
                    {
                        day: '',
                        money: ''
                    }
                ],
                face: '',
            },
            rules: {
                type: [
                    { required: true, message: '请选择商品类型', trigger: 'change' }
                ],
                class: [
                    { required: true, message: '请输入商品分类', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.close()
        },
        load(status, row) {
            this.status = status
            if(status !== 'add') {
                this.oldParams = row
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                params.noble_level = params.noble_level ? params.noble_level : null
                if(params.goods_animation_path) {
                    this.goodsType = 1
                } else if(params.goods_image) {
                    this.goodsType = 2
                }
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.end_time = Math.floor(params.end_time / 1000)
                    if(this.goodsType === 1) { // 最终选择
                        params.goods_image = ''
                    } else if(this.goodsType === 2) {
                        params.goods_animation_path = ''
                    }
                    add(params).then(res => {
                        if(res.code === 2000) {
                            this.dialogVisible = false
                            this.$emit('onSearch')
                        }
                    }).catch(err => {
                        this.$message.error(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 新增商品出售期限
        handleAdd() {
            let s = this.ruleForm
            if(s.time_limit.length < 3) {
                s.time_limit.push({
                    day: '',
                    money: ''
                })
            }
        },
        // 删除商品出售期限 
        handleDel(index){
            let s = this.ruleForm
            s.time_limit.splice(index, 1)
        },
        // 重置
        resetForm(formName) {
            this.close()
        },
        // 关闭弹窗
        close() {
            this.$confirm('关闭后数据不会保存，确定关闭吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dialogVisible = false
                this.$emit('onSearch')
            }).catch(() => {});
        },
        // 销毁组件
        destoryComp() {
            this.$emit('destoryComp')
        },
        // 重置字段验证
        validateField(name) {
            this.$refs.ruleForm.validateField([name])
        },
        timeChange(row){
            console.log("生效时间:",row)
        },
        timeChange2(row){
            console.log("失效时间:",row)
        },
    },
    mounted() {
    }
}
</script>

<style lang="scss">
.number-add-box {
    .el-dialog{
        margin-top: 5vh !important;
    }
    .el-form {
        .el-form-item__label::before {
            margin-right: 0px !important;
        }
        .el-input {
            width: 300px;
        }
        .el-textarea {
            width: 300px;
        }
        .limit-content {
            .el-form-item__content {
                display: flex;
                // align-items: center;
                .el-button {
                    height: 36px;
                    margin-left: 10px;
                }
            }
        }
        .goodsImg {
            .el-form-item__label::before {
                content: '*';
                color: #ff4949;
            }
        }
        .sellItem{
            margin-bottom: 10px;
            .el-input{
                width: 165px;
                margin-right: 5px;
            }
        }
    }
}
</style>
