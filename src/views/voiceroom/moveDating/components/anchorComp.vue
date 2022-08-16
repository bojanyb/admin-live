<template>
    <div class="addMember-box">
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
// 引入api
import { addHeartAnchor } from '@/api/moveDating.js'

export default {
    data() {
        return {
            dialogVisible: false,
            user_number: null
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 添加心动主播
        async addAnchor() {
            if(!this.user_number) {
                this.$message.error('请输入用户ID')
                return false
            }
            let res = await addHeartAnchor({ user_number: this.user_number })
            if(res.code === 2000) {
                this.$message.success('新增成功')
                this.user_number = ''
                this.$emit('getList')
            }
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