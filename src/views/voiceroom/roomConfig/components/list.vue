<template>
    <div class="app-container roomConfig-list-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" @rowClick="rowClick"></tableList>

        <!-- 新增组件 -->
        <addHeat v-if="isDestoryComp" ref="addHeat" @destoryComp="destoryComp" @getList="getList"></addHeat>
    </div>
</template>

<script>
// 引入api
import { deleteRoomHot } from '@/api/house.js'
// 引入新增组件
import addHeat from './addHeat.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        addHeat
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            searchParams: {
                belong: 2
            }
        };
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
                url: REQUEST.house.roomHotList,
                columns: [
                    {
                        label: '添加时间',
                        minWidth: '160px',
                        prop: 'create_time'
                    },
                    {
                        label: '房间ID',
                        prop: 'room_number'
                    },
                    {
                        label: '增加热度',
                        minWidth: '120px',
                        prop: 'hot_value'
                    },
                    {
                        label: '有效时间',
                        minWidth: '310px',
                        render: (h, params) => {
                            return h('div', [
                                h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '无'),
                                h('span', ' 至 '),
                                h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '无'),
                            ])
                        }
                    },
                    {
                        label: '状态',
                        prop: 'status'
                    },
                    {
                        label: '备注',
                        minWidth: '120px',
                        prop: 'remark',
                        showOverFlow: true
                    },
                    {
                        label: '操作',
                        width : '200px',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                belong: s.belong,
                room_number: s.room_number
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 重置
        reset() {
            this.searchParams = {
                belong: 2
            }
            this.getList()
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        add() {
           this.load('add')
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        // 查看
        rowClick(row) {
            this.load('see', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addHeat.loadParams(status, row)
            }, 50);
        },
        // 删除
        async deleteParams(id) {
            this.$confirm('是否确认删除该数据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await deleteRoomHot({ id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>