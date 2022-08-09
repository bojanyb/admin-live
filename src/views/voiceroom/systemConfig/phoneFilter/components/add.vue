<template>
    <div class="phone-filter-add-box">
        <el-dialog
        title="添加虚拟号码"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :show-close="false"
        @closed="closed">
            <div class="formBox">
                <div class="inputBox">
                    <el-input v-model="user_id" placeholder="请输入虚拟号码"></el-input>
                    <el-button type="success" @keyup.native.enter="submit" @click="submit">添加</el-button>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { addVirtualPhoneField, addPhoneRoll } from '@/api/system.js'

export default {
    props: {
        tabIndex: { // 当前坐标
            type: String,
            default: ''
        }
    },
    data() {
        return {
            dialogVisible: false,
            user_id: null
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 提交
        async submit() {
            if(!this.user_id) {
                this.$message.error('请输入虚拟字段')
                return false
            }
            let res;
            // 号码列表添加
            if(this.tabIndex === '0') {
                res = await addVirtualPhoneField({ field: this.user_id })
                if(res.code === 2000) {
                    this.$message.success('新增成功')
                    this.user_id = ''
                    this.$emit('getList')
                }
            } else {
                // 黑白名单添加
                let params = {
                    phone: this.user_id,
                    type: Number(this.tabIndex)
                }
                res = await addPhoneRoll(params)
                if(res.code === 2000) {
                    this.$message.success('新增成功')
                    this.user_id = ''
                    this.$emit('getList')
                }
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
.phone-filter-add-box {
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