<template>
    <div class="roomConfig-typeComp-box">
        <el-dialog
        title="设置房间分类"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
            <div class="btnBox">
                <el-button type="success" @click="add">新增</el-button>
            </div>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                    prop="id"
                    align="center"
                    label="分类ID">
                </el-table-column>
                <el-table-column
                    prop="name"
                    align="center"
                    label="分类名称">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" v-if="scope.row.id !== 1" @click="deleteTypes(scope.row.id)">移除</el-button>
                        <div style="line-height: 36px;" v-else>默认分类</div>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 内嵌弹窗 -->
            <el-dialog
            width="400px"
            title="新增房间分类"
            custom-class="typeComp-custom-dialog-box"
            :visible.sync="innerVisible"
            append-to-body>
                <el-select v-model="type_id" placeholder="请选择">
                    <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="success" @click="bindTypes">添加</el-button>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">取 消</el-button>
                </span>
            </el-dialog>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { roomTypes, roomBindType, delBind } from '@/api/house.js'
export default {
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            innerVisible: false,
            typeList: [],
            type_id: null,
            room_number: null
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        // 获取参数
        async loadParams(row, list) {
            this.dialogVisible = true
            this.room_number = row.room_number
            await this.getTypes(row.room_number)
            this.typeList = list
        },
        add() {
            this.innerVisible = true
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        },
        // 获取分类
        async getTypes(room_number) {
            let res = await roomTypes({ room_number })
            this.tableData = res.data.list || []
        },
        // 绑定分类
        async bindTypes() {
            let { room_number, type_id } = this.$data
            let res = await roomBindType({ room_number, type_id })
            if(res.code === 2000) {
                this.$success('添加成功')
                this.getTypes(this.room_number)
            }
        },
        // 移除分类
        async deleteTypes(id) {
            let res = await delBind({ id })
            if(res.code === 2000) {
                this.$success('移除成功')
                this.getTypes(this.room_number)
            }
        }
    }
}
</script>

<style lang="scss">
.roomConfig-typeComp-box {
    .el-dialog__body {
        padding: 10px 20px 30px 20px;
        .btnBox {
            margin-bottom: 20px;
        }
    }
}

.typeComp-custom-dialog-box {
    .el-dialog__body {
        .el-button {
            margin-left: 20px;
        }
    }
}
</style>