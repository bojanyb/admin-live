<template>
    <div class="userAdd-box">
        <drawer 
        size="470px"
        :title="title"
        ref="drawer"
        :isShowUpdate="true"
        @cancel="cancel"
        @submitForm="submitForm"
        @closed="closed"
        :disabled="disabled"
        @update="update">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="leftBox">
                    <el-form-item label="用户ID" prop="user_number" class="mustBox">
                        <el-input v-model="ruleForm.user_number" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="autograph">
                        <el-input v-model="ruleForm.autograph"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" class="mustBox">
                        <el-input v-model="ruleForm.phone" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status" class="mustBox">
                        <div class="statusBox">
                            <span v-for="(item,index) in statusList" :key="index" :class="[{ 'hign': statusIndex === item.value }, { 'hignBox': item.value == 2 && statusIndex == 2 }]"  @click="statusClick(item.value)">
                                {{ item.name }}
                            </span>
                        </div>
                    </el-form-item>
                </div>
                <div class="centerBox">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="ruleForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" class="mustBox">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别" :disabled="true">
                            <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属公会" prop="guild_name" class="mustBox">
                        <el-input v-model="ruleForm.guild_name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="是否已绑卡" prop="is_bindcard" class="mustBox">
                        <el-button type="primary" @click="isShowBindcard">{{ ruleForm.is_bindcard ? '是' : '否' }}</el-button>
                    </el-form-item>
                </div>
                <div class="rightBox">
                    <el-form-item label="头像" prop="face" class="photoBox mustBox">
                        <uploadImg :imgUrl="ruleForm.face" :disabled="true" :isDefault="true"></uploadImg>
                        <el-button type="primary" @click="replaceImg">替换默认头像</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </drawer>


        <el-dialog
        title="用户编辑"
        :visible.sync="dialogVisible"
        width="950px"
        :before-close="handleClose"
        @closed="closed"
        :close-on-click-modal="false"
        class="userAdd-dialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="leftBox">
                    <el-form-item label="用户ID" prop="user_number" class="mustBox">
                        <el-input v-model="ruleForm.user_number" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="个性签名" prop="autograph">
                        <el-input v-model="ruleForm.autograph"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" class="mustBox">
                        <el-input v-model="ruleForm.phone" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status" class="mustBox">
                        <div class="statusBox">
                            <span v-for="(item,index) in statusList" :key="index" :class="[{ 'hign': statusIndex === item.value }, { 'hignBox': item.value == 2 && statusIndex == 2 }]"  @click="statusClick(item.value)">
                                {{ item.name }}
                            </span>
                        </div>
                    </el-form-item>
                </div>
                <div class="centerBox">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="ruleForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" class="mustBox">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别" :disabled="true">
                            <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属公会" prop="guild_name" class="mustBox">
                        <el-input v-model="ruleForm.guild_name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="是否已绑卡" prop="is_bindcard" class="mustBox">
                        <el-button type="primary" @click="isShowBindcard">{{ ruleForm.is_bindcard ? '是' : '否' }}</el-button>
                    </el-form-item>
                </div>
                <div class="rightBox">
                    <el-form-item label="头像" prop="face" class="photoBox mustBox">
                        <uploadImg :imgUrl="ruleForm.face" :disabled="true" :isDefault="true"></uploadImg>
                        <el-button type="primary" @click="replaceImg">替换默认头像</el-button>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 封禁组件 -->
        <blocked ref="blocked" @evaluationFunc="evaluationFunc"></blocked>
        <!-- 绑卡组件 -->
        <bindStuck ref="bindStuck"></bindStuck>
    </div>
</template>

<script>

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
        bindStuck
    },
    data() {
        return {
            dialogVisible: false,
            statusList: MAPDATA.USERSTATUSLISTTWO,
            sexList: MAPDATA.SEXLIST,
            statusIndex: null,
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
    methods: {
        // 获取数据
        loadParams(row) {
            this.openComp()
            this.oldParams = row
            let params = JSON.parse(JSON.stringify(row))
            params.phone = params.phone ? params.phone : '无'
            params.guild_name = params.guild_name ? params.guild_name : '无'
            this.statusIndex = params.status
            params.blockedParams = {} // 用来接收封禁返回的数据

            this.$set(this.$data, 'ruleForm', params)
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        handleClose() {
            this.resetForm()
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
                            this.dialogVisible = false
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
            this.statusIndex = index
            if(index === 2) {
                this.$refs.blocked.loadParams()
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
    .userAdd-dialog {
        .el-dialog__body {
            padding-right: 40px;
            box-sizing: border-box;
            .el-form {
                display: flex;
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

                .photoBox {
                    .el-form-item__content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        .el-button {
                            margin-top: 20px;
                        }
                    }
                }

                .centerBox {
                    margin-left: 20px;
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
            }
        }
        .el-dialog__footer {
            padding-right: 40px;
            box-sizing: border-box;
        }
    }
}
</style>