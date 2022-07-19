<template>
    <div class="shopping-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" label-suffix=":" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="商品类型" prop="goods_type">
                    <el-select v-model="ruleForm.goods_type" placeholder="请选择商品类型">
                        <el-option v-for="item in goodsTypeList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类" prop="category_id">
                    <el-select v-model="ruleForm.category_id" placeholder="请选择商品分类">
                        <el-option v-for="item in goodsClassifyList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="贵族等级" prop="category_id" v-if="ruleForm.category_id === 4 || ruleForm.category_id === 5">
                    <el-select v-model="ruleForm.category_id" placeholder="请选择贵族等级">
                        <el-option v-for="item in nobilityList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先推荐" prop="is_first">
                    <el-select v-model="ruleForm.is_first" placeholder="优先推荐">
                        <el-option v-for="item in priorityGiveList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model="ruleForm.goods_name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品简介">
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
                <el-form-item label="商品出售期限" prop="goods_describe" class="limit-content" v-if="ruleForm.can_buy === 1" :rules="limitRules">
                    <div class="limit-fa">
                        <div class="limit" v-for="(item,index) in ruleForm.time_limit" :key="index">
                            <el-input v-model="item.day" :maxlength="2" placeholder="请输入天数"></el-input>
                            <el-input v-model="item.money" oninput="this.value=this.value.replace(/[^\d]/g,'');" onkeydown="this.value=this.value.replace(/^0+/,'');" placeholder="请输入价格（喵粮）"></el-input>
                            <el-button type="danger" v-if="ruleForm.time_limit.length > 1" @click="deleteData(index)">删除</el-button>
                        </div>
                    </div>
                    <el-button @click="addData">添加</el-button>
                    
                </el-form-item>
                <el-form-item label="商品播放类型" prop="play_type">
                    <el-radio-group v-model="ruleForm.play_type">
                        <el-radio :label="1">Lottie</el-radio>
                        <el-radio :label="2">SVGA</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品列表图片" prop="goods_bg_small">
                    <upload v-model="ruleForm.goods_bg_small" :imgUrl="ruleForm.goods_bg_small" name="goods_bg_small" ref="upload" @validateField="validateField" accept=".png,.jpg,.jpeg" :beforeUpload="beforeUpload"></upload>
                    <div>上传图片大小为230*230及同比尺寸</div>
                </el-form-item>
                <el-form-item label="商品背景图" prop="goods_bg_big">
                    <upload v-model="ruleForm.goods_bg_big" :imgUrl="ruleForm.goods_bg_big" name="goods_bg_big" ref="upload" accept=".png,.jpg,.jpeg" @validateField="validateField"></upload>
                </el-form-item>
                <el-form-item label="商品图片类型" prop="goodsType" class="goodsImg">
                    <el-radio-group v-model="goodsType" @change="goodsChange">
                        <el-radio :label="1">商品特效</el-radio>
                        <el-radio :label="2">商品静态图</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品特效" prop="goods_animation_path" v-if="goodsType === 1">
                    <upload v-model="ruleForm.goods_animation_path" :imgUrl="ruleForm.goods_animation_path" name="goods_animation_path" ref="goods_animation_path"  :accept="limitUploadType" @validateField="validateField"></upload>
                </el-form-item>
                <el-form-item label="商品静态图" prop="goods_image" v-if="goodsType === 2">
                    <upload v-model="ruleForm.goods_image" :imgUrl="ruleForm.goods_image" accept=".png,.jpg,.jpeg" name="goods_image" ref="goods_image" @validateField="validateField"></upload>
                </el-form-item>
                <el-form-item label="商品生效时间" prop="start_time" :rules="startTime">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    value-format="timestamp"
                    type="datetime"
                    :picker-options="StartPicker"
                    placeholder="选择商品生效时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品过期时间" prop="end_time" :rules="endTime">
                    <el-date-picker
                    v-model="ruleForm.end_time"
                    value-format="timestamp"
                    type="datetime"
                    :picker-options="EndPicker"
                    placeholder="选择商品过期时间">
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
import upload from '@/components/uploadImg/index.vue'
// 引入api
import { add } from '@/api/shopping.js'
// 获取图片真实宽高
import { fileReader } from '@/utils/fileReader.js'
// 引入公共方法
import { isProportion } from '@/utils/common.js'

export default {
    components: {
        upload
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
        limitUploadType() { // 限制上传文件格式
            if(this.ruleForm.play_type === 1) {
                return '.zip'
            } else if(this.ruleForm.play_type === 2) {
                return '.svg,.svga'
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            goodsTypeList: MAPDATA.SHOPPING,
            goodsClassifyList: MAPDATA.CLASSIFY, // 分类
            nobilityList: MAPDATA.NOBILITYCLASSLIST, // 贵族等级
            priorityGiveList: MAPDATA.PRIORITYGIVE,
            goodsType: 1,
            status: 'add',
            oldParams: {},
            ruleForm: {
                goods_type: '',
                category_id: '',
                goods_name: '',
                can_buy: 1,
                goods_describe: '',
                reason: '',
                is_first: null,
                time_limit: [
                    {
                        day: '',
                        money: ''
                    }
                ],
                play_type: null,
                goods_animation_path: '',
                goods_image: '',
                start_time: '',
                end_time: '',
                goods_bg_big: '',
                goods_bg_small: ''
            },
            rules: {
                goods_type: [
                    { required: true, message: '请选择商品类型', trigger: 'change' }
                ],
                category_id: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                is_first: [
                    { required: true, message: '请选择是否优先推荐', trigger: 'change' }
                ],
                goods_name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
                ],
                goods_describe: [
                    { required: true, message: '请输入商品简介', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                reason: [
                    { required: true, message: '请输入不可购买原因', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                play_type: [
                    { required: true, message: '请选择商品播放类型', trigger: 'change' }
                ],
                can_buy: [
                    { required: true, message: '请选择是否可以购买', trigger: 'change' }
                ],
                goods_bg_small: [
                    { required: true, message: '请上传商品列表图片', trigger: 'change' }
                ],
                goods_bg_big: [
                    { required: true, message: '请上传商品背景图', trigger: 'change' }
                ],
                goods_animation_path: [
                    { required: true, message: '请上传商品特效', trigger: 'change' }
                ],
                goods_image: [
                    { required: true, message: '请上传商品静态图', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.close()
        },
        // 图片上传之前
        beforeUpload(file) {
            // 获取图片尺寸 长宽
            const f = file
            const [w, h] = [230,230]
            return new Promise((resolve, reject) => {
                fileReader(f)
                .then(fileConfig => {
                    const { width, height } = fileConfig
                    const isJPG = f.type === 'image/jpeg' || f.type === 'image/png'
                    const imageSize = isProportion(w, h, width, height)
                    if (!isJPG) {
                        this.$message.error('只能上传jpg/png文件')
                    }
                    if (!imageSize) {
                        this.$message.error(`图片尺寸只能为${w}*${h}及同比尺寸`)
                    }
                    const r = isJPG && imageSize
                    if (r) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                })
                .catch(() => {
                    reject(false)
                })
            })
        },
        // 商品类型切换 - 删除图片
        goodsChange(v) {
            let s = this.oldParams
            if(v === 1) { // 这里用来做记忆用户操作
                if(JSON.stringify(s) === '{}' || !s.goods_animation_path) {
                    this.$refs.goods_animation_path.imageUrl = ''
                    this.ruleForm.goods_animation_path = ''
                }
            } else {
                if(JSON.stringify(s) === '{}' || !s.goods_image) {
                    this.$refs.goods_image.imageUrl = ''
                    this.ruleForm.goods_image = ''
                }
            }
        },
        load(status, row) {
            this.status = status
            if(status !== 'add') {
                this.oldParams = row
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
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
                            this.close()
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
        addData() {
            let s = this.ruleForm
            if(s.time_limit.length < 3) {
                s.time_limit.push({
                    day: '',
                    money: ''
                })
            }
        },
        // 删除商品出售期限
        deleteData(index) {
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
        }
    }
}
</script>

<style lang="scss">
.shopping-add-box {
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
        .limit-fa {
            .limit {
                display: flex;
                align-items: center;
                .el-input {
                    width: 150px;
                }
            }
        }
        .goodsImg {
            .el-form-item__label::before {
                content: '*';
                color: #ff4949;
            }
        }
        
    }
}
</style>
