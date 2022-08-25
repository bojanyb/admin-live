<template>
    <div class="addMember-box">
        <drawer 
        size="470px"
        title="查看心动主播"
        ref="drawer"
        @cancel="cancel"
        @closed="closed"
        :disabled="disabled">
            <el-form slot="body" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm" label-suffix=":" :hide-required-asterisk="status === 'see'">
                <el-form-item label="用户ID" prop="user_number">
                    <el-input v-model="ruleForm.user_number" :disabled="disabled" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname" :disabled="disabled" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item label="用户头像" prop="nickname">
                    <uploadImg ref="uploadImg" :disabled="disabled" v-model="ruleForm.face" :imgUrl="ruleForm.face" name="face" accept=".png,.jpg,.jpeg"></uploadImg>
                </el-form-item>
                <el-form-item label="用户性别" prop="sex">
                    <el-select v-model="ruleForm.sex" :disabled="disabled" placeholder="请选择用户性别">
                        <el-option v-for="item in sexList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="个性签名" prop="autograph">
                    <el-input v-model="ruleForm.autograph" :disabled="disabled" placeholder="请输入个性签名"></el-input>
                </el-form-item>
            </el-form>
        </drawer>
        <el-dialog
        title="添加心动主播"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :show-close="false"
        @closed="closed">
            <div class="formBox">
                <div class="inputBox">
                    <el-input v-model="user_number" placeholder="请输入用户ID"></el-input>
                    <el-button type="success" @keyup.native.enter="addAnchor" @click="addAnchor">添加</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入抽屉组件
import drawer from '@/components/drawer/index'
// 引入api
import { addHeartAnchor } from '@/api/moveDating.js'
// 引入上传组件
import uploadImg from '@/components/uploadImg/index.vue'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'

export default {
    components: {
        drawer,
        uploadImg
    },
    data() {
        return {
            status: 'add', // 当前状态
            dialogVisible: false,
            user_number: null,
            ruleForm: {},
            rules: {},
            sexList: MAPDATA.SEXLIST
        };
    },
    computed: {
        disabled() {
            if(this.status === 'see') {
                return true
            }
            return false
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(status, row) {
            this.status = status
            if(status !== 'add') {
                this.openComp()
                let params = JSON.parse(JSON.stringify(row))
                this.$set(this.$data, 'ruleForm', params)
            } else {
                this.dialogVisible = true
            }
        },
        openComp(status = true) {
            this.$refs.drawer.loadParams(status)
        },
        // 添加心动主播
        async addAnchor() {
            if(!this.user_number) {
                this.$warning('请输入用户ID')
                return false
            }
            let res = await addHeartAnchor({ user_number: this.user_number })
            if(res.code === 2000) {
                this.$success('新增成功')
                this.user_number = ''
                this.$emit('getList')
            }
        },
        // 关闭弹窗
        cancel() {
            this.openComp(false)
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.addMember-box {
    .formBox {
        .inputBox {
            display: flex;
            .el-input {
                width: 200px;
                margin-right: 20px;
            }
        }
    }
    .userListBox {
        margin-top: 30px;
        max-height: 400px;
        overflow-y: auto;
        padding: 1px;
        box-sizing: border-box;
        .userBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 30px;
            box-sizing: border-box;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);
            margin-bottom: 10px;
            .leftBox {
                display: flex;
                align-items: center;
                >img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                >span.name {
                    margin: 0px 30px 0px 70px;
                    display: block;
                    width: 115px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
            
        }
    }
    .userListBox::-webkit-scrollbar {
        display: none;
    }

    .el-drawer__wrapper {
        .el-select {
            width: 325px;
        }
    }
}
</style>