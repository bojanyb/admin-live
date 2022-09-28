<template>
    <div class="guildAudit-guildRebates-add-box">
        <el-dialog
        title="新增24小时房间"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        @closed="closed">
            <div class="formBox">
                <div class="sunBox">
                    <span>房间ID</span>
                    <el-input v-model="room_number" placeholder="请先输入房间ID"></el-input>
                </div>
                <el-button :disabled="!room_number" type="success" @click="addStatisticsroomFunc">添加</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { addStatisticsroom } from '@/api/user.js'
export default {
    data() {
        return {
            dialogVisible: false,
            room_number: ''
        };
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
        // 添加24小时房间
        async addStatisticsroomFunc() {
            let res = await addStatisticsroom({ room_number: this.room_number })
            if(res.code === 2000) {
                this.$success('添加成功')
                this.dialogVisible = false
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
.guildAudit-guildRebates-add-box {
    .formBox {
        display: flex;
        margin-bottom: 20px;
        .sunBox {
            display: flex;
            align-items: center;
            margin-right: 10px;
            >span {
                font-size: 15px;
                margin-right: 10px;
            }
            .el-input {
                width: 180px;
            }
        }
    }
}
</style>