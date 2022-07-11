<template>
    <div class="guildDetails-box">
        <el-dialog
        title="公会明细"
        :visible.sync="dialogVisible"
        width="850px"
        :before-close="handleClose">
            <div class="formBox">
                <el-select v-model="type" placeholder="请选择" @change="typeChange">
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


        <addMember ref="addMember" v-if="isDestoryComp" @destoryComp="destoryComp" @getList="getList"></addMember>
    </div>
</template>

<script>

// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 新增添加成员组件
import addMember from './addMember.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
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
        cfgs1() {
            return {
                vm: this,
                url: REQUEST.guild.getGuildUserList,
                columns: [
                    {
                        label: '成员ID',
                        prop: 'guild_number'
                    },
                    {
                        label: '成员昵称',
                        prop: 'guild_number'
                    },
                    {
                        label: '加入时间',
                        width: '180px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
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
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.deleteParams(params.row)}}}, '移除')
                            ])
                        }
                    }
                ]
            }
        },
        cfgs2() {
            return {
                vm: this,
                url: REQUEST.guild.list,
                columns: [
                    {
                        label: '厅ID',
                        prop: 'guild_number'
                    },
                    {
                        label: '所属成员ID',
                        prop: 'guild_number'
                    },
                    {
                        label: '绑定时间',
                        width: '180px',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
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
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.deleteParams(params.row)}}}, '移除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: false,
            dialogVisible: false,
            type: 1,
            cfgs: {},
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
    mounted() {
        this.cfgs = this.cfgs1
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.guildParams }
            return {
                page: params.page,
                pagesize: params.size,
                guild_id: s.guild_number
            }
        },
        // 移除
        deleteParams(row, status) {
            this.$confirm('是否确定移除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {});
        },
        handleClose() {
            this.dialogVisible = false
        },
        // 切换类型
        typeChange(v) {
            if(v === 1) {
                this.cfgs = this.cfgs1
            } else {
                this.cfgs = this.cfgs2
            }
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
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
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