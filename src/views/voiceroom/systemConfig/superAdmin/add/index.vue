<template>
    <div class="superAdmin-add-box">
        <el-dialog
            title="新增超管"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
            @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="108px" class="demo-ruleForm">
                <el-form-item label="单次抽奖砖石" prop="cost">
                    <el-input onkeydown="this.value=this.value.replace(/^0+/,'');" onkeyup="this.value=this.value.replace(/[^\d]/g,'');" :disabled="disabled" v-model="ruleForm.cost"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button @click="resetForm">取 消</el-button>
                    <el-button :disabled="disabled" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
		getActivetyList,
		getActivetyGiftSave,
		getActivetyHasGiftList,
	} from '@/api/videoRoom'
// 引入公共方法
import { errStatus } from '@/utils/common.js'

export default {
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            status: 'add',
            code: 'zzbx',
            dialogVisible: false,
            activetyList: [],
            ruleForm: {
                id: null,
                activity_type_id: null,
                type: 1,
                cost: null,
                start_time: null,
                end_time: null,
                gifts: []
            },
            rules: {
                activity_type_id: [
                    { required: true, message: '请选择活动名称', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择活动类别', trigger: 'change' }
                ],
                cost: [
                    { required: true, message: '请输入单次抽奖砖石', trigger: 'blur' }
                ],
                start_time: [
                    { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
                ],
                end_time: [
                    { type: 'date', required: true, message: '请选择结束时间', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        handleClose() {
            this.resetForm()
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let s = this.ruleForm

                    let { isMax, everyGift, allProbability } = errStatus(s)

                    if(isMax) {
                        this.$message.error('所有大礼物价格和概率必须一致')
                        return false
                    }

                    if(everyGift) {
                        this.$message.error('礼物概率不能为0')
                        return false
                    }

                    if(allProbability) {
                        this.$message.error('一个大礼物和所有小礼物概率之和必须是100%')
                        return false
                    }

                    let params = {...this.ruleForm}
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.end_time = Math.floor(params.end_time / 1000)
                    params.gifts = []
                    s.gifts.forEach(item => {
                        params.gifts.push({
                            id: item.id,
                            type: item.type,
                            probability: (item.probability * 100000).toFixed(0)
                        })
                    })
                    getActivetyGiftSave(params).then(res => {
                        this.dialogVisible = false
                        this.$message.success('创建成功!')
                        this.$emit('getList')
                    }).catch(err => {
                        this.$message.error(err)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            if(this.status !== 'see') {
                this.$confirm('关闭后数据不会保存，确定关闭吗？')
                .then(_ => {
                    this.dialogVisible = false
                })
                .catch(_ => {});
            } else {
                this.dialogVisible = false
            }
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    },
    created() {
        this.activetyListFunc()
    }
}
</script>

<style lang="scss">
.superAdmin-add-box {
    .el-dialog__body {
        padding: 30px 20px 10px 20px;
    }
    .footer {
        .el-form-item__content {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
