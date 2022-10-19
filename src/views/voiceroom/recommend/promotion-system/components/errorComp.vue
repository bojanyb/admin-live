<template>
    <div class="promotion-system-errorComp">
        <el-dialog
        title="失败列表"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
            <div class="tableBox">
                <el-table
                :data="list"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    data() {
        return {
            dialogVisible: false,
            list: []
        };
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 获取数据
        loadParams(list) {
            this.dialogVisible = true
            this.list = list
        }
    }
}
</script>

<style lang="scss">
.promotion-system-errorComp {

}
</style>