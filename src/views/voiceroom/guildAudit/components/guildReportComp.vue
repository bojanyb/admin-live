<template>
    <div class="guildReportComp-box">
        <el-dialog
        :visible.sync="dialogVisible"
        width="400px"
        :close-on-click-modal="false"
        :before-close="handleClose"
        @closed="closed">
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="room_number"
                    label="房间ID"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="not_guild_free"
                    label="收入"
                    align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
// 引入api
import { getNotGuildFree } from '@/api/videoRoom'
export default {
    data() {
        return {
            dialogVisible: false,
            tableData: []
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        async loadParams(params) {
            this.dialogVisible = true
            let res = await getNotGuildFree(params)
            this.tableData = res.data.list || []
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
        }
    }
}
</script>

<style lang="scss">
.guildReportComp-box {

}
</style>