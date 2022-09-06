<template>
    <div class="serviceConfig-userComp-box">
        <drawer 
        size="450px"
        :title="title"
        ref="drawer"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="用户ID" prop="user_number" class="numberBox">
                    <el-input v-model="ruleForm.user_number" oninput="this.value=this.value.replace(/[^\d]/g,'');" :disabled="disabled"></el-input>

                    <el-button type="success" @click="seeUser">查询</el-button>
                </el-form-item>

                <div class="userBox" v-if="userList.length > 0">
                    <div class="sunBox" v-for="(item,index) in userList" :key="index">
                        <div class="leftBox">
                            <img :src="item.face" alt="">
                        </div>
                        <div class="rightBox">
                            <div class="name">{{ item.nickname }}</div>
                            <div class="user">ID：{{ item.user_number }}</div>
                        </div>
                    </div>
                </div>

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
            </el-form>
        </drawer>
    </div>
</template>

<script>
// 引入api
import { userList } from '@/api/user'
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { save } from '@/api/risk'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        drawer
    },
    data() {
        return {
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
                return '新增用户处罚'
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
                    this.userList = res.data.list || []
                }
            }
        },
        // 获取数据
        loadParams(status, row) {
            this.openComp()
            this.status = status
            if(status !== 'add') {
                let params = JSON.parse(JSON.stringify(row))
                if(typeof params.type === 'number') {
                    params.type = [params.type]
                }
                params.ban_duration = params.ban_duration ? params.ban_duration : ''
                this.$set(this.$data, 'ruleForm', params)
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
                    let params = { ...this.ruleForm }
                    let res = await save(params)
                    if(res.code === 2000) {
                        this.$success('添加成功')
                        this.openComp(false)
                        this.$emit('getList')
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
                    this.openComp(false)
                }).catch(() => {});
            } else {
                this.openComp(false)
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

    .numberBox {
        .el-input {
            width: 215px;
        }

        .el-button {
            margin-left: 20px;
        }
    }

    .userBox {
        margin-bottom: 20px;
        .sunBox {
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            padding: 10px 20px;
            box-sizing: border-box;
            .leftBox {
                display: flex;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
            }
            .rightBox {
                margin-left: 20px;
                .name {
                    margin-bottom: 15px;
                }
                .user {
                    font-size: 14px;
                    color: #ccc;
                }
            }
        }
    }
}
</style>