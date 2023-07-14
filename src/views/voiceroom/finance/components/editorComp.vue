<template>
    <div class="editor-temp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="destoryComp">
            <el-form :model="ruleForm" :rules="rules" label-suffix=":" ref="ruleForm" label-width="110px" class="demo-ruleForm">

              <div class="editor-content">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="收款账户">
                      {{ "622************7671" }}
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="开户银行">
                      {{ "中国工商银行齐齐哈尔市分行核算中心" }}
                    </el-form-item>
                  </el-col>
                </el-row>

                  <!-- <el-col :span="24">
                    <el-form-item label="开户银行">
                      {{ "中国工商银行齐齐哈尔市分行核算中心" }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="开户名称">
                      {{ "北京微世界科技有限公司" }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="提现金额">
                      {{ "50000" }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="异常扣除">
                      {{ "0" }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="提现金额">
                      {{ "50000" }}
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="提现金额">
                      {{ "50000" }}
                    </el-form-item>
                  </el-col>
                </el-row> -->
              </div>

                <el-form-item label="商品类型" prop="category">
                    <el-select v-model="ruleForm.category" placeholder="请选择靓号类型"  @change="handleChange(ruleForm.category)" :disabled="status === 'update'">
                        <el-option v-for="item in goodsNumTypeList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类" prop="type_id">
                    <el-select v-model="ruleForm.type_id" placeholder="请选择商品分类">
                        <el-option v-for="item in goodsNumClassList" :label="item.name" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="number" v-if="ruleForm.category === 0 && status === 'add'"
                :rules="[
                    { required: true, validator: validateNumber, trigger: 'blur' },
                ]"
                >
                    <el-input
                        v-input-num="true"
                        v-model="ruleForm.number"
                        placeholder="请输入商品名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="number" v-if="ruleForm.category === 1 && status === 'add'"
                :rules="[
                    { required: true, validator: validateNumber1, trigger: 'blur' },
                ]"
                >
                    <el-input
                        v-input-num="true"
                        v-model="ruleForm.number"
                        placeholder="请输入商品名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="number" v-if="ruleForm.category === '' || status === 'update'"
                :rules="[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ]"
                >
                    <el-input
                        v-input-num="true"
                        v-model="ruleForm.number"
                        placeholder="请输入商品名称"
                        :disabled="status === 'update'"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="4" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="是否可购买" prop="buy">
                    <el-radio-group v-model="ruleForm.buy" @change="handleBuyChange(ruleForm.buy)">
                        <el-radio label="0">是</el-radio>
                        <el-radio label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="商品出售期限" v-if="ruleForm.buy === '0'">
                    <div class="sellItem" style="display: flex;" v-for="(item,index) in ruleForm.price" :key="index">
                        <!-- <el-input v-model="item.day" placeholder="请输入时间" v-input-num="true" clearable></el-input> -->
                        <!-- <el-input v-model="item.price" placeholder="请输入价格（钻石）" v-input-num="true" clearable></el-input> -->
                        <el-input-number v-model="item.day" placeholder="请输入时间" :min="1" :precision="0" :controls="false" clearable></el-input-number>
                        <el-input-number v-model="item.price" placeholder="请输入价格（钻石）" :min="1" :precision="0" :controls="false" clearable></el-input-number>
                        <el-button type="primary" v-if="(ruleForm.price.length - 1) <= index "  @click="handleAdd">添加</el-button>
                        <el-button type="danger" v-else-if="(ruleForm.price.length - 1) > index"  @click="handleDel">删除</el-button>
                    </div>
                </el-form-item>
                <!-- <el-form-item label="商品生效时间" prop="start_time" :rules="StartRules">
                    <el-date-picker
                    v-model="ruleForm.start_time"
                    type="datetime"
                    placeholder="选择商品生效时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
                    :picker-options="StartPicker"
                    clearable
                    @change="timeChange">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品过期时间" prop="end_time" :rules="EndRules">
                    <el-date-picker
                    v-model="ruleForm.end_time"
                    type="datetime"
                    placeholder="选择商品过期时间"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="timestamp"
                    :picker-options="EndPicker"
                    clearable
                    @change="timeChange2">
                    </el-date-picker>
                </el-form-item> -->
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
import { debounce } from '@/utils'
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
        // StartRules() { // 开始时间限制
        //     let params = {}
        //     let start = this.ruleForm.start_time
        //     params = {
        //         required: true,
        //         validator: (rules, val, cb) => {
        //             if(!start) {
        //                 cb(new Error('请选择开始时间'))
        //             } else {
        //                 cb()
        //             }
        //         }
        //     }
        //     return params
        // },
        // EndRules() { // 结束时间限制
        //     let params = {}
        //     let start = this.ruleForm.start_time
        //     let end = this.ruleForm.end_time
        //     params = {
        //         required: true,
        //         validator: (rules, val, cb) => {
        //             if(end < new Date().getTime()) {
        //                 cb(new Error('结束时间不能小于当前时间!'))
        //             } if(start && end <= start) {
        //                 cb(new Error('结束时间不能小于开始时间!'))
        //             } else {
        //                 cb()
        //             }
        //         }
        //     }
        //     return params
        // },
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
      const validateNumber = (rule, value, callback) => {
        let reg = /^\d*[13579]$/
				if (!value) {
					callback(new Error('密码不能为空'))
        } else if (value.length + '' === '1') {
          callback(new Error('长度不能为一位数'))
        }
        else {
					callback()
				}
      }
      const validateNumber1 = (rule, value, callback) => {
        let reg = /^\d*[2468]$/
				if (!value) {
					callback(new Error('密码不能为空'))
        } else {
					callback()
				}
			}
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
                buy: '0',
                price: [
                    {
                        day: undefined,
                        price: undefined
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
            validateNumber: validateNumber,
            validateNumber1: validateNumber1
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
                params.buy = params.buy + ''
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                this.$set(this.$data, 'ruleForm', params)
                this.getPrettyNumTypeList(row.category)
            }
        },
        // 提交
        submitForm : debounce(async function (){
            const isEmpty = this.ruleForm.price.some(item => {
               return item.day === '' || item.day == null || item.price === ''|| item.price == null
            })
            const isNum = this.ruleForm.price.every((item) => {
              return item.price > 0
            })

            // 商品类型
            const number = this.ruleForm.number.toString();
            if(this.ruleForm.category == 0){ // 用户靓号
              if(number.length !== 5 && number.length !== 7 && number.length !== 9){
                this.$message.error("用户靓号只支持5位、7位、9位");
                return
              }
            }else if(this.ruleForm.category == 1){ // 房间靓号
              if(number.length !== 4 && number.length !== 6 && number.length !== 8){
                this.$message.error("房间靓号只支持4位、6位、8位");
                return
              }
            }
            if (isEmpty && this.ruleForm.buy === '0') {
                this.$message.error('请确保商品出售期限没有空值！')
                return false
            }

            if (!isNum && this.ruleForm.buy === '0') {
                this.$message.error('请确保商品价格在0以上！')
                return false
            }
            // 不可购买时 初始化 price 字段数据，后台接口不兼容空数据
            if(this.ruleForm.buy === '1'){
                this.ruleForm.price = []
            }

            this.$refs["ruleForm"].validate((valid) => {
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
        }, 500),
        // 新增商品出售期限
        handleAdd() {
            let s = this.ruleForm
            if(s.price.length < 3) {
                s.price.push({
                    day: undefined,
                    price: undefined
                })
            }
        },
        // 删除商品出售期限
        handleDel(index){
            let s = this.ruleForm
            s.price.splice(index, 1)
        },
        // 重置
        resetForm() {
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
        },
        handleBuyChange(buyStatus) {
        if (buyStatus === '1') {
          this.$set(this.ruleForm, 'price', [{ day: undefined, price: undefined }])
        } else if (buyStatus === '0' && JSON.stringify(this.ruleForm.price) === '[]') {
          this.$set(this.ruleForm, 'price', [{ day: undefined, price: undefined }])
        }
        }
    },
    mounted() {}
}
</script>

<style lang="scss">
.editor-temp-box {
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
