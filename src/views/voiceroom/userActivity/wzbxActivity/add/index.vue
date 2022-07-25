<template>
    <div class="zzbxActivity-add">
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="800px"
            :before-close="handleClose"
            @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="108px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="activity_type_id">
                    <el-select v-model="ruleForm.activity_type_id" :disabled="disabled" placeholder="请选择活动名称">
                        <el-option v-for="item in activetyList" :disabled="item.disabled" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动类别" prop="type">
                    <el-select v-model="ruleForm.type" :disabled="disabled" placeholder="请选择活动类别">
                        <el-option label="派对" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单次抽奖砖石" prop="cost">
                    <el-input onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" :disabled="disabled" v-model="ruleForm.cost"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker
                    :disabled="disabled"
                    v-model="ruleForm.start_time"
                    value-format="timestamp"
                    type="datetime"
                    :picker-options="StartPicker"
                    placeholder="请选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="end_time" :rules="EndRules">
                    <el-date-picker
                    :disabled="disabled"
                    v-model="ruleForm.end_time"
                    :picker-options="EndPicker"
                    value-format="timestamp"
                    type="datetime"
                    placeholder="请选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="添加礼物">
                    <el-button type="primary" :disabled="disabled" @click="$refs.gift.handleAddGiftShow()">添 加</el-button>
                </el-form-item>
                <gift ref="gift" :isShowProperty="true" :status="status" :isShowLocation="false" :activityType="code" :list="ruleForm.gifts"></gift>
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
// 礼物组件
import gift from '@/components/gift/index.vue'
// 引入公共方法
import { errStatus } from '@/utils/common.js'

export default {
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    components: {
        gift
    },
    computed: {
        title() {
            if(this.status === 'add') {
                return '新增'
            } else if(this.status === 'update') {
                return '修改'
            }
            return '查看'
        },
        StartRules() {
            let params = {}
            let start = this.ruleForm.start_time
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(start < new Date().getTime()) {
                        cb(new Error('开始时间不能小于当前时间!'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        EndRules() {
            let params = {}
            let start = this.ruleForm.start_time
            let end = this.ruleForm.end_time
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(end < new Date().getTime()) {
                        cb(new Error('结束时间不能小于当前时间!'))
                    } if(start && end <= start) {
                        cb(new Error('结束时间不能小于开始时间!'))
                    } else {
                        cb()
                    }
                }
            }
            return params
        },
        StartPicker() {
            return {
                disabledDate: (time) => {
                    return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                }
            }
        },
        EndPicker() {
            return {
                disabledDate: (time) => {
                    if(!this.ruleForm.start_time) {
                        return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
                    }
                    return time.getTime() < this.ruleForm.start_time  - 24 * 60 * 60 * 1000;
                }
            }
        },
        disabled() {
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    data() {
        return {
            status: 'add',
            code: 'wzbx',
            dialogVisible: false,
            activetyList: [],
            ruleForm: {
                id: null,
                activity_type_id: null,
                type: 2,
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
        // 获取活动名称
        activetyListFunc() {
            getActivetyList().then(res => {
                if(res.data.list && res.data.list.length > 0) {
                    res.data.list.forEach(item => {
                        item.disabled = false
                        this.list.forEach(a => {
                            if(item.name === a.name) {
                                item.disabled = true
                            }
                        })
                    })
                }
                this.activetyList = res.data.list;
            })
        },
        async loadParams(status, row) {
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                params.start_time = params.start_time * 1000
                params.end_time = params.end_time * 1000
                let res = await getActivetyHasGiftList({ activity_id: params.id })
                if(res.data.list && res.data.list.length > 0) {
                    res.data.list.forEach(item => {
                        item.probability = item.probability / 100000
                    })
                }
                this.$set(params, 'gifts', res.data.list)
                this.ruleForm = params
            }
            this.dialogVisible = true
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

                    let isNum = this.ruleForm.gifts.find(item => { return !item.gift_number })
                    if(isNum) {
                        this.$message.error('请先输入礼物数量')
                        return
                    }

                    let params = {...this.ruleForm}
                    params.start_time = Math.floor(params.start_time / 1000)
                    params.end_time = Math.floor(params.end_time / 1000)
                    params.gifts = []
                    s.gifts.forEach(item => {
                        params.gifts.push({
                            id: item.id,
                            type: item.type,
                            probability: (item.probability * 100000).toFixed(0),
                            gift_number: Number(item.gift_number)
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
.zzbxActivity-add {
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
