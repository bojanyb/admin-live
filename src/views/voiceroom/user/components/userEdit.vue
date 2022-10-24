<template>
    <div class="userAdd-box">
        <drawer 
        size="660px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <div class="userBox">
                    <el-form-item label="用户ID" prop="user_number" :class="{'mustBox': status !== 'see'}">
                        <el-input v-model="ruleForm.user_number" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="ruleForm.nickname" :disabled="disabled"></el-input>
                    </el-form-item>
                </div>
                <div class="userBox selectBox">
                    <el-form-item label="个性签名" prop="autograph">
                        <el-input v-model="ruleForm.autograph" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" :class="{'mustBox': status !== 'see'}">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别" :disabled="true">
                            <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="userBox">
                    <el-form-item label="手机号" prop="phone" :class="{'mustBox': status !== 'see'}">
                        <el-input v-model="ruleForm.phone" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="所属公会" prop="guild_name" :class="{'mustBox': status !== 'see'}">
                        <el-input v-model="ruleForm.guild_name" :disabled="true"></el-input>
                    </el-form-item>
                </div>
                <div class="userBox btnBox">
                    <!-- <el-form-item label="状态" prop="status" :class="{'mustBox': status !== 'see'}">
                        <div class="statusBox" :class="{'statusDisabled': disabled}">
                            <span v-for="(item,index) in statusList" :key="index" :class="[{ 'hign': statusIndex === item.value }, { 'hignBox': item.value == 2 && statusIndex == 2 }]"  @click="statusClick(item.value)">
                                {{ item.name }}
                            </span>
                        </div>
                    </el-form-item> -->
                    <el-form-item label="是否为官方用户" prop="sex" :class="{'mustBox': status !== 'see'}">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别" :disabled="true">
                            <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否已绑卡" prop="is_bindcard" class="isBindCard" :class="{'mustBox': status !== 'see'}">
                        <el-button type="primary" @click="isShowBindcard" :disabled="disabled">{{ ruleForm.is_bindcard ? '是' : '否' }}</el-button>
                    </el-form-item>
                </div>
                <el-form-item label="头像" prop="face" class="photoBox" :class="{'mustBox': status !== 'see'}">
                    <uploadImg :imgUrl="ruleForm.face" :disabled="true" :isDefault="true"></uploadImg>
                    <el-button type="primary" @click="replaceImg" :disabled="disabled">替换默认头像</el-button>
                </el-form-item>
            </el-form>
        </drawer>
        
        <!-- 封禁组件 -->
        <blocked ref="blocked" @evaluationFunc="evaluationFunc" @blockedCancel="blockedCancel"></blocked>
        <!-- 绑卡组件 -->
        <bindStuck ref="bindStuck"></bindStuck>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { edit, getUserSave, defaultFace } from '@/api/user.js'
// 公共图片组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入封禁组件
import blocked from './blocked.vue'
// 引入是否绑卡组件
import bindStuck from '../components/bindStuck.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        uploadImg,
        blocked,
        bindStuck,
        drawer
    },
    data() {
        return {
            dialogVisible: false,
            statusList: MAPDATA.USERSTATUSLISTTWO,
            sexList: MAPDATA.SEXLIST,
            statusIndex: null,
            status: 'see',
            defaultImg: require('@/assets/default.png'), // 默认头像
            ruleForm: {
                user_number: '',
                nickname: '',
                autograph: '',
                sex: '',
                guild_name: '',
                phone: '',
                is_bindcard: 0,
                status: '',
                face: '',
                blockedParams: {}
            },
            oldParams: {}, // 老数据用来对比的
            rules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                autograph: [
                    { required: false, message: '请输入个性签名', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        title() { // 标题
            if(this.status === 'add') {
                return '新增用户'
            } else if(this.status === 'update') {
                return '修改用户资料'
            } else {
                return '查看用户资料'
            }
        },
        disabled() { // 禁止修改
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    methods: {
        // 获取数据
        loadParams(status, row) {
            this.openComp()
            this.status = status
            let params = JSON.parse(JSON.stringify(row))
            params.phone = params.phone ? params.phone : '无'
            params.guild_name = params.guild_name ? params.guild_name : '无'
            this.statusIndex = params.status
            params.blockedParams = {} // 用来接收封禁返回的数据
            this.$set(this.$data, 'ruleForm', params)

            this.oldParams = JSON.parse(JSON.stringify(this.ruleForm))
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        handleClose() {
            this.openComp()
        },
        // 取消
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
        // 组件取消
        blockedCancel() {
            this.statusIndex = this.oldParams.status
            this.ruleForm.status = this.oldParams.status
        },
        // 修改
        update() {
            this.status = 'update'
        },
        // 卡列表
        isShowBindcard() {
            if(this.ruleForm.is_bindcard) {
                this.$refs.bindStuck.dialogVisible = true
				this.$refs.bindStuck.getList(this.ruleForm.id)
            }
        },
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let s = this.ruleForm
                    let x = this.oldParams
                    let params = {
                        user_id: s.id,
                        nickname: s.nickname,
                        autograph: s.autograph
                    }
                    let res = await edit(params)
                    if(res.code === 2000) {
                        if(this.statusIndex !== 1 || x.status !== 1) { // 封禁 - 启用
                            let obj = {
                                status: this.statusIndex,
                                remark: s.blockedParams.remark,
                                kill_time: s.blockedParams.kill_time,
                                id: s.id
                            }
                            if(this.statusIndex === 1) {
                                delete obj.kill_time
                                delete obj.remark
                            }
                            await getUserSave(obj)
                        }
                        if(s.face !== x.face) { // 设置默认头像
                            await await defaultFace({ user_id: s.id })
                        }
                        setTimeout(() => {
                            this.$success('修改成功')
                            this.openComp(false)
                            this.$emit('getList')
                        }, 50);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm() {
            this.$confirm('关闭后数据不会保存，确定关闭吗？')
            .then(_ => {
                this.dialogVisible = false
            })
            .catch(_ => {});
        },
        // 替换默认头像
        replaceImg() {
            this.$set(this.ruleForm, 'face', this.defaultImg)
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp');
        },
        // 状态切换
        statusClick(index) {
            if(!this.disabled) {
                this.statusIndex = index
                if(index === 2) {
                    this.$refs.blocked.loadParams()
                }
            }
        },
        // 封禁组件返回数据
        evaluationFunc(row) {
            this.ruleForm.blockedParams = row
        }
    }
}
</script>

<style lang="scss">
.userAdd-box {
    .el-drawer {
        .el-drawer__body {
            .el-form {
                .statusBox {
                    display: flex;
                    >span {
                        display: flex;
                        width: 80px;
                        height: 38px;
                        justify-content: center;
                        align-items: center;
                        border-radius: 5px;
                        margin-right: 20px;
                        cursor: pointer;
                        border: 1px solid #ccc;
                    }
                    >span.hign {
                        background: #1890FF;
                        color: #fff;
                        border: 1px solid #1890FF;
                    }
                    >span.hignBox {
                        background: #F56C6C;
                        border: 1px solid #F56C6C;
                    }
                    >span:last-child {
                        margin-right: 0px;
                    }
                }

                .statusDisabled {
                    >span {
                        background: #F5F7FA;
                        color: #C0C4CC;
                        border: 1px solid #F5F7FA;
                    }
                }

                .el-form-item {
                    margin-bottom: 30px;
                }

                .mustBox {
                    .el-form-item__label::before {
                        content: '*';
                        color: #ff4949;
                        margin-right: 4px;
                    }
                }

                .btnBox {
                    .isBindCard {
                        margin-left: 8px;
                    }
                }

                .selectBox {
                    .el-select {
                        width: 188px;
                    }
                }

                .userBox {
                    display: flex;
                }

                .photoBox {
                    .el-button {
                        margin: 20px 0px 0px 30px;
                    }
                }
            }
        }
        .el-dialog__footer {
            padding-right: 40px;
            box-sizing: border-box;
        }
    }
}
</style>