<template>
    <div class="activity-giveHistoryComp-box">
        <el-dialog
        title="后台增发"
        :visible.sync="dialogVisible"
        width="710px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                <div class="leftBox">
                    <el-form-item label="增发类型" prop="currency">
                        <el-select v-model="ruleForm.currency" placeholder="请选择增发类型">
                            <el-option v-for="(item,index) in currencyComp" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户ID" prop="user_number" class="numberBox">
                        <el-input v-model="ruleForm.user_number"></el-input>

                        <el-button type="success" @click="seeUser">查询</el-button>
                    </el-form-item>
                    <el-form-item label="增发数额" prop="amount" :rules="verifyAmount">
                        <el-input v-model="ruleForm.amount" onkeydown="this.value=this.value.replace(/^0+/,'');" oninput="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                    </el-form-item>
                    <el-form-item label="增发说明" prop="remark">
                        <el-input v-model="ruleForm.remark" :rows="4" type="textarea"></el-input>
                    </el-form-item>
                </div>
                <div class="right_Con_Box" v-if="userList.length > 0" v-for="(item,index) in userList" :key="index">
                    <div class="upBox">
                        <img :src="item.face" alt="">
                        <div class="rightBox">
                            <div class="name">{{ item.nickname }}</div>
                            <div class="id">ID：{{ item.user_number }}</div>
                        </div>
                    </div>
                    <div class="downBox">
                        <p>用户等级：<span>{{ item.user_rank }}</span></p>
                        <p>魅力等级：<span>{{ item.live_rank }}</span></p>
                        <p>实名信息：<span>{{ item.real_name ? item.real_name : '无' }}</span></p>
                        <p>公会ID：<span>{{ item.guild_number ? item.guild_number : "无" }}</span></p>
                        <p>公会名称：<span>{{ item.guild_name ? item.guild_name : '无' }}</span></p>
                        <p>注册时间：<span>{{ item.create_time }}</span></p>
                        <p>用户余额：<span style="color: #ff4949;font-size: 17px;">{{ form.balance }}</span></p>
                    </div>
                </div>
                <div class="right_Con_Box emptyBox" v-if="userList.length <= 0">暂无数据</div>
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
import { getUserWallet, getUserAddMoney } from '@/api/videoRoom'
import { userList } from '@/api/user'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    data() {
        return {
            dialogVisible: false,
            userList: [], // 查询用户
            ruleForm: {
                currency: null,
                user_number: '',
                amount: '',
                remark: ''
            },
            form: {},
            rules: {
                user_number: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                currency: [
                    { required: true, message: '请选择增发类型', trigger: 'change' }
                ],
                amount: [
                    { required: true, message: '请输入增发数额', trigger: 'blur' },
                ],
                remark: [
                    { required: true, message: '请输入增发说明', trigger: 'blur' },
                    { min: 1, max: 100, message: '增发说明最大限制为100个字符', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        // 增发类型
        currencyComp() {
            let arr = JSON.parse(JSON.stringify(MAPDATA.FINANCEGIVETYPELIST))
            return arr.filter(item => { return item.name !== '全部' })
        },
        verifyAmount() { // 验证增发数额
            let params = {}
            params = {
                required: true,
                validator: (rules, val, cb) => {
                    if(!this.ruleForm.amount) {
                        cb(new Error('请输入增发数额'))
                    } else {
                        if(Number(this.ruleForm.amount) > 10000000) {
                            cb(new Error('充值数量最大范围10000000'))
                        } else {
                            cb()
                        }
                    }
                }
            }
            return params
        }
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams() {
            this.dialogVisible = true
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let res = await getUserAddMoney(this.ruleForm)
                    if(res.code === 2000) {
                        this.$success('赠送成功')
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
        // 查询用户
        async seeUser() {
            if(!this.ruleForm.user_number) {
                this.$warning('请输入用户ID')
                return false
            }
            let res = await userList({ user_number: this.ruleForm.user_number })
            if(res.code === 2000) {
                if(res.data.list.length <= 0) {
                    this.$warning('查询不到数据')
                } else {
                    res.data.list[0].create_time = timeFormat(res.data.list[0].create_time, 'YYYY-MM-DD HH:mm:ss', true)
                    this.userList = res.data.list || []
                }

                this.handleUserInfo()
            }
        },
        // 获取用户余额
        async handleUserInfo() {
            let params = {
                user_number: this.ruleForm.user_number
            }
            let res = await getUserWallet(params)
            this.form = { ...res.data }
            this.form.balance = Number(this.form.diamond) + Number(this.form.gain)
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.activity-giveHistoryComp-box {
    .el-select {
        width: 305px;
    }
    .numberBox {
        .el-input {
            width: 215px;
        }

        .el-button {
            margin-left: 20px;
        }
    }

    .el-dialog__body {
        .el-form {
            display: flex;
        }
    }

    .right_Con_Box {
        width: 240px;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
        padding: 10px 20px;
        box-sizing: border-box;
        margin-left: 20px;
        height: 270px;
        .upBox {
            display: flex;
            align-items: center;
            >img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .rightBox {
                margin-left: 20px;
                .name {
                    font-size: 16px;
                }
                .id {
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
        }
        .downBox {
            margin-top: 15px;
            p {
                line-height: 27px;
            }
        }
    }

    .emptyBox {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>