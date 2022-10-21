<template>
    <div class="systemConfig-guild-class-classComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="610px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <div class="formBox">
                    <el-form-item label="奖励名称" prop="name">
                        <el-input v-model="ruleForm.name" maxlength="10" placeholder="仅支持中英文数字"></el-input>
                    </el-form-item>
                </div>
                <div class="formBox">
                    <el-form-item label="起始流水" prop="start" :rules="startRules">
                        <el-input onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.start" maxlength="10" placeholder="起始流水"></el-input>
                    </el-form-item>
                    <el-form-item label="结束流水" prop="end" :rules="endRules">
                        <el-input onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.end" maxlength="10" placeholder="结束流水"></el-input>
                    </el-form-item>
                </div>
                <div class="formBox">
                    <el-form-item label="评级奖励类型" prop="rewards_type">
                        <el-select v-model="ruleForm.rewards_type" placeholder="请选择">
                            <el-option v-for="item in rewards_typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评级奖励" prop="rewards">
                        <el-input onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');" v-model="ruleForm.rewards"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { saveSettlementConfig } from '@/api/videoRoom.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '添加周奖励配置'
            } else if(this.status === 'update') {
                return '修改周奖励配置'
            }
        },
        startRules() { // 起始流水
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(!this.ruleForm.start) {
                        cb(new Error('请输入起始流水'))
                    } else {
                        if(this.ruleForm.end) {
                            if(Number(this.ruleForm.start) >= Number(this.ruleForm.end)) {
                                cb(new Error('起始流水不可大于等于结束流水'))
                            } else {
                                cb()
                            }
                        } else {
                            cb()
                        }
                    }
                }
            }
            return params
        },
        endRules() { // 结束流水
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(!this.ruleForm.end) {
                        cb(new Error('请输入结束流水'))
                    } else {
                        if(this.ruleForm.start) {
                            if(Number(this.ruleForm.end) <= Number(this.ruleForm.start)) {
                                cb(new Error('结束流水不可小于等于起始流水'))
                            } else {
                                cb()
                            }
                        } else {
                            cb()
                        }
                    }
                }
            }
            return params
        },
    },
    data() {
        return {
            status: 'add', // 当前状态
            dialogVisible: false,
            codeList: MAPDATA.CLASSLIST, // 公会等级
            rewards_typeList: MAPDATA.GUILDCONFIGURATIONRATETYPELIST, // 评级类型
            ruleForm: {
                id: null,
                name: null,
                start: '',
                end: '',
                rewards: '',
                rewards_type: null,
                type: 2
            },
            rules: {
                name: [
                    {  required: true, 
                        message: '请输入奖励名称', 
                        trigger: 'blur',
                        validator: (rules, val, cb) => {
                            let value = val.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/ig, '')
                            this.ruleForm.name = value
                            return cb()
                        }
                 }
                ],
                start: [
                    { required: true, message: '请输入起始流水', trigger: 'blur' }
                ],
                end: [
                    { required: true, message: '请输入结束流水', trigger: 'blur' }
                ],
                rewards_type: [
                    { required: true, message: '请选择评级奖励类型', trigger: 'change' }
                ],
                rewards: [
                    { required: true, message: '请输入评级奖励', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.status = status
            this.dialogVisible = true
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            }
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = { ...this.ruleForm }
                    let res = await saveSettlementConfig(params)
                    if(res.code === 2000) {
                        if(this.status === 'add') {
                            this.$success('新增成功')
                        } else {
                            this.$success('修改成功')
                        }
                        this.dialogVisible = false
                        this.$emit('getList')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.systemConfig-guild-class-classComp-box {
    .formBox {
        display: flex;
        .el-select {
            width: 170px;
        }
        .el-input {
            width: 170px;
        }
    }
}
</style>