<template>
    <div class="serviceConfig-userComp-box">
        <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="700px"
        :before-close="handleClose"
        @closed="closed">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <div class="inputBox">
                    <el-form-item label="用户ID" prop="user_number" class="numberBox">
                        <el-input v-model="ruleForm.user_number" :disabled="disabled" @input="numberInput"></el-input>

                        <el-button type="success" @click="seeUser">查询</el-button>
                    </el-form-item>
                    <el-form-item label="处罚类型" prop="type">
                        <el-select v-model="ruleForm.type" multiple placeholder="请选择" :disabled="disabled">
                            <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="处罚时间" prop="ban_duration">
                        <el-select v-model="ruleForm.ban_duration" placeholder="请选择" :disabled="disabled">
                            <el-option v-for="(item,index) in timeList" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="处罚备注" prop="remark">
                        <el-input type="textarea" :rows="4" v-model="ruleForm.remark" :disabled="disabled"></el-input>
                    </el-form-item>
                </div>
                <div class="infoBox" v-if="userList.length > 0" v-for="(item,index) in userList" :key="index">
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
                        <p>用户状态: <span>{{ item.statusText ? item.statusText : "无" }}</span></p>
                        <p>公会名称：<span>{{ item.guild_name ? item.guild_name : '无' }}</span></p>
                        <p>注册时间：<span>{{ item.create_time }}</span></p>
                    </div>
                </div>
                <div class="infoBox emptyBox" v-if="userList.length <= 0">暂无数据</div>
                
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
import { getUserReportDeal } from '@/api/videoRoom'
// 引入api
import { userList,punishStatus } from '@/api/user'
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { save } from '@/api/risk'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
import moment from 'moment'
export default {
    components: {
        drawer
    },
    data() {
        return {
            dialogVisible: false,
            timeList: MAPDATA.DURATION, // 处罚时长
            typeList: MAPDATA.USERPUNISHTYPELIST, // 处罚类型
            status: 'add',
            userList: [], // 查询用户
            ruleForm: {
                user_number: '',
                type: [],
                ban_duration: '',
                remark: ''
            },
            oldParams: {}, // 老数据
            form: {},
            rules: {
                user_number: [
                    { required: true, message: '请输入用户ID', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择处罚类型', trigger: 'change' }
                ],
                ban_duration: [
                    { required: true, message: '请选择处罚时间', trigger: 'change' }
                ],
                remark: [
                    { required: true, message: '请输入处罚备注', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                if(JSON.stringify(this.form) !== '{}') {
                    return '处理用户举报'
                } else {
                    return '新增用户处罚'
                }
            } else if(this.status === 'see') {
                return '查看用户处罚'
            }
        },
        disabled() { // 禁止输入
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    methods: {
        numberInput() {
            this.ruleForm.user_number = this.ruleForm.user_number.replace(/[^\d]/g, '')
        },
        handleClose() {
            this.dialogVisible = false
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
                    res.data.list[0].create_time = moment(res.data.list[0].create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
                    this.userList = res.data.list || []
                    this.getPunishStatus(res.data.list[0].id)
                }
            }
        },
         // 用户封禁状态
         async getPunishStatus(user_id){
            let res = await punishStatus({ user_id })
            if(res.code === 2000) {
                this.userList[0].statusText = res.data.status;
            }
        },
        // 获取数据
        loadParams(status, row) {
            this.dialogVisible = true
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                if(typeof params.type === 'number') {
                    params.type = [params.type]
                }
                params.ban_duration = params.ban_duration ? params.ban_duration : ''
                this.$set(this.$data, 'ruleForm', params)
                this.seeUser()
            } else if(status === 'add' && row) {
                let params = JSON.parse(JSON.stringify(row))
                let data = {}
                data.user_number = params.feedback_user_id
                data.ban_duration = null
                data.remark = ''
                data.type = []
                this.$set(this.$data, 'ruleForm', data)
                this.$set(this.$data, 'form', params)
                this.seeUser()
            }

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 提交
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if(this.status === 'add' && JSON.stringify(this.form) !== '{}') {
                        let data = { ...this.form, ...this.ruleForm }
                        let s = {
                            id: data.id,
                            ban_duration: data.ban_duration * 24 * 60 * 60,
                            reply: data.remark,
                            type: data.type
                        }
                        let res = await getUserReportDeal(s)
                        if(res.code === 2000) {
                            this.$message.success('处理成功')
                            this.dialogVisible = false
                            this.$emit('getList')
                        }
                    } else {
                        let params = { ...this.ruleForm }
                        let res = await save(params)
                        if(res.code === 2000) {
                            this.$success('添加成功')
                            this.dialogVisible = false
                            this.$emit('getList')
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        cancel() {
            if(JSON.stringify(this.oldParams) !== JSON.stringify(this.ruleForm)) { // 记录数据 - 有改动就提示
                this.$confirm('关闭弹窗将不会保留您的更改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogVisible = false
                }).catch(() => {});
            } else {
                this.dialogVisible = false
            }
        },
        // 修改
        update() {
            this.status = 'update'
        }
    }
}
</script>

<style lang="scss">
.serviceConfig-userComp-box {
    .el-select {
        width: 305px;
    }
    .el-textarea {
        width: 305px;
    }

    .el-form {
        display: flex;
    }

    .inputBox {
        .numberBox {
            .el-input {
                width: 215px;
            }

            .el-button {
                margin-left: 20px;
            }
        }
    }

    .infoBox {
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
            margin-top: 20px;
            p {
                line-height: 28px;
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