<template>
    <div class="addMember-box">
        <el-dialog
        title="添加成员"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :show-close="false"
        @closed="closed">
            <div class="formBox">
                <div class="inputBox">
                    <el-input v-model="user_id" placeholder="请输入用户ID"></el-input>
                    <el-button type="success" @keyup.native.enter="addUser" @click="addUser">邀请</el-button>
                </div>
                <!-- <div class="userListBox">
                    <div class="userBox" v-for="(item, index) in userList" :key="item.id">
                        <div class="leftBox">
                            <img :src="item.face" alt="">
                            <span class="name">{{ item.nickname }}</span>
                            <span>{{ item.phone }}</span>
                        </div>
                        <el-button type="danger" @click="deleteData(index)">删除</el-button>
                    </div>
                </div> -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { getUser, addGuildUser } from '@/api/user.js'

export default {
    props: {
        guildParams: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            dialogVisible: false,
            user_id: null,
            userList: []
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取用户
        async addUser() {
            if(!this.user_id) {
                this.$message.error('请输入用户ID')
                return false
            }

            let res = await getUser({ page: 1, user_number: this.user_id })
            if(res.code === 2000) {
                if(res.data.list && res.data.list.length <= 0) {
                    this.$message.error('找不到用户')
                    return false
                }
                this.submit(res.data.list)
            }
        },
        // 提交
        async submit(list) {
            let params = {
                user_id: [],
                guild_id: this.guildParams.id
            }
            list.forEach(item => {
                params.user_id.push(item.id)
            })
            params.user_id = JSON.stringify(params.user_id)
            let res = await addGuildUser(params)
            if(res.code === 2000) {
                this.$message.success('操作成功')
                this.user_id = ''
            }
            this.$emit('getList')
        },
        // 删除
        deleteData(index) {
            this.userList.splice(index, 1)
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
}
</style>