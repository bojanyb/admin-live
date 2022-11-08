<template>
    <div class="shop-add-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" label-suffix=":" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="商品类别" prop="category">
                    <el-select v-model="ruleForm.category" placeholder="请选择商品类别" @change="handleChange(ruleForm.category)" :disabled="status === 'update'">
                        <el-option v-for="item in goodsNumTypeList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入商品分类" maxlength="10" clearable/>
                </el-form-item>
                <el-form-item label="显示状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择显示状态">
                        <el-option v-for="item in showStatus" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否默认选中" prop="selected">
                    <el-select v-model="ruleForm.selected" placeholder="请选择是否默认选中">
                        <el-option v-for="item in checkedStatus" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权重状态" prop="sort">
                    <el-input v-model="ruleForm.sort" placeholder="请输入权重状态" oninput="this.value=this.value.replace(/[^\d]/g,'');" clearable/>
                </el-form-item>
                <el-form-item label="icon图片" prop="icon">
                    <uploadImg ref="uploadImg" v-model="ruleForm.icon" :imgUrl="ruleForm.icon" name="icon" @validateField="validateField" accept=".png,.jpg,.jpeg"></uploadImg>
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
// 引入api
import { addTypePrettyNumber, updateTypePrettyNumber, getTypeOption } from '@/api/videoRoom.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入图片上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入api
import { add } from '@/api/shopping.js'
// 获取图片真实宽高
import { fileReader } from '@/utils/fileReader.js'
// 引入公共方法
import { isProportion } from '@/utils/common.js'

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
            goodsNumTypeList: MAPDATA.GOODNUMTYPE,
            goodsNumClassList: [],
            showStatus: MAPDATA.SHOWSTATUS,
            checkedStatus: MAPDATA.CHECKEDSTATUS,
            goodsType: 1,
            status: 'add',
            oldParams: {},
            ruleForm: {},
            rules: {
                category: [
                    { required: true, message: '请选择商品类别', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入商品分类', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择显示状态', trigger: 'change' }
                ],
                selected: [
                    { required: true, message: '请选择是否默认选中', trigger: 'change' }
                ],
                sort: [
                    { required: true, message: '请输入权重状态', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请上传icon图标', trigger: 'blur' }
                ],
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
            console.log(status);
            this.status = status
            if(status !== 'add') {
                this.oldParams = row
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                this.$set(this.$data, 'ruleForm', params)
                this.getPrettyNumTypeList(this.ruleForm.category)
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
                    if (this.status === 'add') {
                        addTypePrettyNumber(params).then(res => {
                           if(res.code === 2000) {
                               this.dialogVisible = false
                               this.$emit('onSearch')
                           }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    } else if (this.status === 'update') {
                        params.id = params.id + ''
                        updateTypePrettyNumber(params).then(res => {
                            if(res.code === 2000) {
                               this.dialogVisible = false
                               this.$emit('onSearch')
                           }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                     }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
        handleChange(category) {
            this.getPrettyNumTypeList(category)
        },
        // 获取靓号类型
        async getPrettyNumTypeList(category) {
        this.goodsNumClassList = []
        if (category || category === 0) {
            const response = await getTypeOption({ category })
            if (response.code === 2000) {
            const tempArr = Array.from(
                Array.isArray(response.data) ? response.data : []
            )
            this.goodsNumClassList =
                tempArr.reduce((prev, curr) => {
                prev.push({
                    name: curr.name,
                    value: curr.type_id,
                });
                return prev
                }, []) || []
            }
        }
        },
    },
    mounted() {}
}
</script>

<style lang="scss">
.shop-add-box {
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
