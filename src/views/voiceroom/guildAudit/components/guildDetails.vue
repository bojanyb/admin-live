<template>
    <div class="guildDetails-box">
        <el-dialog
        title="公会明细"
        :visible.sync="dialogVisible"
        width="850px"
        top="5vh"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @closed="closed">
            <div class="formBox">
                <el-select v-model="type" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="success" v-if="type === 1" @click="add">新增</el-button>
            </div>
            <tableList :cfgs="cfgs" ref="tableList"></tableList>
        </el-dialog>


        <addMember ref="addMember" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList" :guildParams="guildParams"></addMember>
    </div>
</template>

<script>
// 引入api
import { removeGuildUser, removeGuildRoom, bindRoom } from '@/api/user.js'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 新增添加成员组件
import addMember from './addMember.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
    props: {
        guildParams: {
            type: Object,
            default: {}
        }
    },
    mixins: [mixins],
    components: {
        tableList,
        addMember
    },
    computed: {
        cfgs() {
            let arr = [
                {
                    label: '成员ID',
                    width: '100px',
                    prop: 'user_number'
                },
                {
                    label: '成员昵称',
                    prop: 'nickname'
                },
                {
                    label: '加入时间',
                    width: '160px',
                    prop: 'create_time'
                },
                {
                    label: '当日流水（喵粮）',
                    width: '150px',
                    prop: 'today_flow'
                },
                {
                    label: '总流水（喵粮）',
                    width: '130px',
                    prop: 'total_flow'
                },
                {
                    label: '操作',
                    width: '200px',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'danger'}, style: {
                                display: params.row.is_admin === 1 ? 'none' : 'unset'
                            }, on: {click:()=>{this.deleteParams(params.row, 1)}}}, '移除'),
                            h('span', { style: {
                                marginRight: params.row.has_bind_room? '10px' : '0px',
                                display: params.row.is_admin === 1 ? 'unset' : 'none'
                            } }, '公会长'),
                            h('el-button', { props: { type: 'primary'}, style: {
                                display: params.row.has_bind_room ? 'none' : 'unset'
                            }, on: {click:()=>{this.bindHall(params.row.user_id, 1)}}}, '绑定厅'),
                        ])
                    }
                }
            ]
            let arr2 = [
                {      
                    label: '厅ID',
                    prop: 'room_number'
                },
                {
                    label: '所属成员ID',
                    render: (h,params) => {
                        return h('div', [
                            h('div', params.row.nickname),
                            h('div', params.row.user_number),
                        ])
                    }
                },
                {
                    label: '绑定时间',
                    width: '180px',
                    prop: 'create_time'
                },
                {
                    label: '当日流水（喵粮）',
                    width: '150px',
                    prop: 'today_flow'
                },
                {
                    label: '总流水（喵粮）',
                    prop: 'total_flow'
                },
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.deleteParams(params.row, 2)}}}, '移除')
                        ])
                    }
                }
            ]
            let name = this.type === 1 ? 'getGuildUserList' : 'getGuildRoomList'
            return {
                vm: this,
                url: REQUEST.guild[name],
                columns: this.type === 1 ? arr : arr2
            }
        }
    },
    data() {
        return {
            isDestoryComp: false,
            dialogVisible: false,
            type: 1,
            options: [
                {
                    name: '成员',
                    value: 1
                },
                {
                    name: '绑定厅',
                    value: 2
                },
            ]
        };
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.guildParams }
            return {
                page: params.page,
                pagesize: params.size,
                guild_id: s.id
            }
        },
        // 移除
        async deleteParams(row, status) {
            this.$confirm('是否确定移除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res;
                if(status === 1) {
                    res = await removeGuildUser({ user_id: row.user_id })
                } else if(status === 2) {
                    res = await removeGuildRoom({ room_number: row.room_number })
                }
                if(res.code === 2000) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                }
            }).catch(() => {});
        },
        handleClose() {
            this.dialogVisible = false
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 新增
        add() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addMember.dialogVisible = true
            }, 50);
        },
        closed() {
            this.$emit('destoryComp')
            this.$emit('getList')
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 绑定厅
        async bindHall(user_id) {
            this.$confirm('是否确认绑定当前厅?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await bindRoom({ user_id, guild_id: this.guildParams.id })
                if(res.code === 2000) {
                    this.$success('绑定成功')
                    this.getList()
                }
            }).catch(() => {});
        }
    }
}
</script>

<style lang="scss">
.guildDetails-box {
    .el-dialog__body {
        padding: 10px 20px 30px 20px;
    }
    .formBox {
        margin-bottom: 20px;
        .el-select {
            width: 100px;
            margin-right: 20px;
        }
    }
}
</style>