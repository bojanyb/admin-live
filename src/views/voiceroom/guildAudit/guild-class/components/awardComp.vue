<template>
    <div class="guildAudit-guild-class-awardComp-box">
        <div class="searchParamsBox">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
        <tableList :cfgs="cfgs" ref="tableList"></tableList>


        <!-- 新增组件 -->
        <add v-if="isDestoryComp" ref="add" @destoryComp="destoryComp" @getList="getList"></add>
    </div>
</template>

<script>
// 引入api
import { delStatisticsroom } from '@/api/user.js'
// 引入新增组件
import add from '../../guildRebates/components/add.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        add
    },
    computed: {
        forms() {
            return [
                {
                    name: 'room_number',
                    type: 'input',
                    value: '',
                    label: '房间ID',
                    isNum: true,
                    placeholder: '请输入房间ID'
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.guild.statisticsroomS,
                columns: [
                    {
                        label: '添加时间',
                        render: (h, params) => {
                            return h('span', params.row.add_duration_statistics_time ? timeFormat(params.row.add_duration_statistics_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '房间ID',
                        prop: 'room_number'
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.delStatisticsroomFunc(params.row.id)}}}, '移除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            isDestoryComp: false // 是否销毁组件
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
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                room_number: s.room_number
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 重置
        reset() {
            this.searchParams = {}
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        add() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.add.loadParams()
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 移除24小时房间
        async delStatisticsroomFunc(id) {
            this.$confirm('确认移除当前房间?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await delStatisticsroom({ id })
                if(res.code === 2000) {
                    this.$success('移除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 销毁组件
        closed() {
            this.$emit('destoryComp')
            this.$emit('getList')
        }
    }
}
</script>

<style lang="scss">
.guildAudit-guild-class-awardComp-box {
    // padding: 20px;
    // box-sizing: border-box;
}
</style>