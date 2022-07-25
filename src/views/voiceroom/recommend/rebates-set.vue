<template>
    <div class="recommend-rebates-set-box">
        <div class="btnBox">
            <el-button type="primary" v-if="!isSubmit" @click="edit">编辑</el-button>
            <el-button v-if="isSubmit" @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="success" v-if="isSubmit" @click="submitForm('ruleForm')">确定</el-button>
        </div>
        <div class="mainBox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                <el-form-item label="主播推广员返点" prop="input" :rules="inputParams">
                    <div class="ConBox">
                        <el-input v-model="ruleForm.input" ref="anchor" :disabled="disabled" placeholder="请输入"></el-input>
                        ‰
                    </div>
                </el-form-item>
                <el-form-item label="用户推广员返点" prop="value" :rules="valueParams">
                    <div class="ConBox">
                        <el-input v-model="ruleForm.value" :disabled="disabled" placeholder="请输入"></el-input>
                        ‰
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: 1,
            isSubmit: false,
            ruleForm: {
                value: '',
                input: ''
            },
            rules: {}
        };
    },
    computed: {
        disabled() { // 禁止输入
            return !this.isSubmit
        },
        inputParams() { // 主播返点限制
            return this.inputNum('input', '主播')
        },
        valueParams() { // 用户返点限制
            return this.inputNum('value', '用户')
        }
    },
    methods: {
        inputNum(name, tit) {
            let params = {}
            params = {
                validator: (rule, val, cb) => {
                    if(!this.ruleForm[name]) {
                        cb(new Error(`请输入${tit}返点`))
                    } else {
                        if(this.ruleForm[name] > 9) {
                            cb(new Error(`${tit}最大配置为9‰`))
                        } else if(this.ruleForm[name] < 1) {
                            cb(new Error(`${tit}最小配置为1‰`))
                        } else {
                            cb()
                        }
                    }
                }
            }
            return params
        },
        edit() {
            this.isSubmit = !this.isSubmit
            setTimeout(() => { // 聚焦需要在置灰解除之后执行
                this.$refs.anchor.focus()
            }, 0);
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isSubmit = !this.isSubmit
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.isSubmit = !this.isSubmit
        }
    }
}
</script>

<style lang="scss">
.recommend-rebates-set-box {
    padding: 20px;
    box-sizing: border-box;
    .mainBox {
        margin-top: 30px;
        .el-form-item {
            width: 400px;
            padding: 17px 30px;
            box-sizing: border-box;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
            .ConBox {
                .el-input {
                    width: 100px;
                    input {
                        border: none;
                        border-bottom: 1px solid #ccc;
                        border-radius: 0px;
                        text-align: center;
                    }
                    input::placeholder {
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>