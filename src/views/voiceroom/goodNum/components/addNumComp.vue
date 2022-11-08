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
                <el-form-item label="商品类型" prop="category">
                    <el-select v-model="ruleForm.category" placeholder="请选择靓号类型"  @change="handleChange(ruleForm.category)">
                        <el-option v-for="item in goodsNumTypeList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类" prop="type_id">
                    <el-select v-model="ruleForm.type_id" placeholder="请选择商品分类">
                        <el-option v-for="item in goodsNumClassList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="number">
                    <el-input
                        v-model="ruleForm.number"
                        placeholder="请输入商品名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="是否可购买" prop="buy">
                    <el-radio-group v-model="ruleForm.buy">
                        <el-radio :label="0">是</el-radio>
                        <el-radio :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品出售期限">
                    <div class="sellItem" style="display: flex;" v-for="(item,index) in ruleForm.price" :key="index">
                        <el-input v-model="item.day" placeholder="请输入时间" oninput="this.value=this.value.replace(/[^\d]/g,'');" clearable></el-input>
                        <el-input v-model="item.price" placeholder="请输入价格（钻石）" oninput="this.value=this.value.replace(/[^\d]/g,'');" clearable></el-input>
                        <el-button type="primary" v-if="(ruleForm.price.length - 1) <= index "  @click="handleAdd">添加</el-button>
                        <el-button type="danger" v-else-if="(ruleForm.price.length - 1) > index"  @click="handleDel">删除</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="商品生效时间">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择商品生效时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
                    clearable
                    @change="timeChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品过期时间">
                    <el-date-picker
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择商品过期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
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
// 引入api
import { addPrettyNumber, updatePrettyNumber, getTypeOption } from '@/api/videoRoom.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
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
            let array = this.ruleForm.price
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
            goodsNumClassList: [],
            shopList: [],
            status: 'add',
            oldParams: {},
            ruleForm: {
                category: '',
                type_id: '',
                number: '',
                buy: '1',
                price: [
                    {
                        day: '',
                        price: ''
                    }
                ],
                start_time: null,
                end_time: null
            },
            rules: {
                category: [
                    { required: true, message: '请选择商品类别', trigger: 'change' }
                ],
                type_id: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                number: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' }
                ],
                buy: [
                    { required: true, message: '请选择是否可购买', trigger: 'change' }
                ]
            },
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
                this.$set(this.$data, 'ruleForm', params)
                this.getPrettyNumTypeList(row.category)
            }
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.end_time = Math.floor(params.end_time / 1000)
                    const tempData = {
                        ...params,
                        price: params.price,
                        type_id: params.type_id + '',
                        category: params.category + '',
                        buy: params.buy + '',
                        number: params.number + '',
                        start_time: params.start_time + '',
                        end_time: params.end_time + ''
                    }
                    if (this.status === 'add') {
                        addPrettyNumber(tempData).then(res => {
                           if(res.code === 2000) {
                               this.dialogVisible = false
                               this.$emit('onSearch')
                           }
                        }).catch(err => {
                            this.$message.error(err)
                        })
                    } else if (this.status === 'update') {
                        tempData.id = params.id + ''
                        updatePrettyNumber(tempData).then(res => {
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
        // 新增商品出售期限
        handleAdd() {
            let s = this.ruleForm
            if(s.price.length < 3) {
                s.price.push({
                    day: '',
                    price: ''
                })
            }
        },
        // 删除商品出售期限 
        handleDel(index){
            let s = this.ruleForm
            s.price.splice(index, 1)
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
        handleChange(category) {
            this.getPrettyNumTypeList(category)
        },
        // 获取靓号类型
        async getPrettyNumTypeList(category) {
         const response = await getTypeOption({ category })
         if(response.code === 2000) {
            const tempArr =  Array.from(
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
