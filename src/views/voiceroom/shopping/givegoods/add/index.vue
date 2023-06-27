<template>
    <div class="givegoods-box">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="620px"
            :before-close="handleClose"
            :close-on-click-modal="false"
            @closed="closed">
            <div class="goods">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="用户ID" prop="user_number">
                        <el-input v-model="ruleForm.user_number" placeholder="被赠送用户ID"></el-input>
                    </el-form-item>
                    <el-form-item label="赠送商品" prop="goods_id" :rules="goodsComputed">
                        <el-button v-for="item in goodsOptions" :key="item.value" type="primary" size="mini" @click="selectClick(item.value)">{{ item.name }}</el-button>
                    </el-form-item>
                    <el-form-item label="" v-if="list.length > 0">
                        <div class="goods_List">
                            <div class="goods_box" v-for="(item,index) in list" :key="index">
                                <span>{{ item.goods_name }}</span>
                                <el-button type="danger" @click="deleteData(index)">删除</el-button>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="赠送时长" prop="day">
                        <el-select v-model="ruleForm.day" placeholder="请选择赠送时长">
                        <el-option v-for="(item,index) in durationList" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="赠送原因" prop="remark">
                        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <goodsBank v-if="goodsBankVisible" ref="goodsBank" :list="list" :goodsType="goodsType" :isLimit="1" @validateField="validateField" @distoryComp="distoryComp"></goodsBank>
    </div>
</template>

<script>
// 引入商品库组件
import goodsBank from '../../components/goodsBank.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入api
import { goodsSend } from '@/api/shopping'
// 引入公共参数
import mixins from "@/utils/mixins.js";

export default {
    mixins: [mixins],
    components: {
        goodsBank
    },
    data() {
        return {
            list: [],
            durationList: MAPDATA.DURATION, // 时长列表
            ruleForm: {
                goods_id: '',
                user_number: '',
                day: null,
                remark: ''
            },
            dialogVisible: false,
            rules: {
                user_number: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '请输入赠送原因', trigger: 'blur' }
                ],
                day: [
                    { required: true, message: '请选择赠送时长', trigger: 'change' }
                ],
                goods_id: [
                    { required: true, message: '请选择赠送商品', trigger: 'change' }
                ]
            },
            goodsOptions: MAPDATA.SHOPPING,
            goodsType: null,
            goodsBankVisible: false,
        };
    },
    computed: {
        goodsComputed() {
            let params = {}
            params = {
                validator: (rules, val, cb) => {
                    if(this.list.length < 1) {
                        cb(new Error('请选择一个赠送商品'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        title() {
            if(this.status === 'add') {
                return '新增赠送商品'
            } else if(this.status === 'update') {
                return '修改赠送商品'
            }
            return '查看赠送商品'
        }
    },
    methods: {
        loadParams(status, row) {
            this.status = status
            if(status !== 'add') {

            }
            this.dialogVisible = true
        },
        // 选择商品
      selectClick(goodsType) {
           this.goodsType = goodsType;
           this.goodsBankVisible = true;
            setTimeout(() => {
                this.$refs.goodsBank.drawer = true
                this.$refs.goodsBank.giftList()
            }, 30);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    params.goods_id = this.list[0].id
                    goodsSend(params).then(res => {
                        this.handleClose()
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 删除商品
        deleteData(index) {
            if(this.list.length > 0) {
                this.list.splice(index, 1)
            }
        },
        // 重置字段验证
        validateField() {
            this.$refs.ruleForm.validateField(['goods_id'])
        },
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 销毁弹窗
        closed() {
            this.$emit('destoryComp')
      },
      // 销毁组件
      distoryComp() {
        this.goodsBankVisible = false;
      },
    }
}
</script>

<style lang="scss">
.givegoods-box {
    padding: 20px;
    box-sizing: border-box;
    .goods {
        padding: 30px;
        box-sizing: border-box;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
        .el-form {
            .el-input {
                width: 400px;
            }
            .el-textarea {
                width: 400px;
            }
            .goods_List {
                .goods_box {
                    width: 400px;
                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
                    padding: 10px 20px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                }
                >div:last-child {
                    margin-bottom: 0px;
                }
            }
        }
    }
}
</style>
