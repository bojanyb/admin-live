// 推广补单
<template>
    <div class="promote-order-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-add="true" :show-search-btn="true" :show-batch-pass="true" batchFuncName="导入CSV" @add="add" @onSearch="onSearch" @batchPass="batchPass"></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 新增组件 -->
        <orderComp v-if="isDestoryComp" ref="orderComp" @destoryComp="destoryComp" @getList="getList"></orderComp>

        <!-- 导入csv -->
        <uploadExcel v-if="isDestoryComp" ref="uploadExcel" @destoryComp="destoryComp" @getList="getList" title="推广补单导入"></uploadExcel>
    </div>
</template>

<script>
// 引入api
import { replenishmentDel } from '@/api/recommend'
// 引入导入组件
import uploadExcel from './components/uploadExcel.vue'
// 引入新增组件
import orderComp from './components/orderComp.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'

export default {
    components: {
        tableList,
        SearchPanel,
        orderComp,
        uploadExcel
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '用户ID',
                    isNum: true,
                    placeholder: '请输入用户ID'
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.userHistory.replenishment,
                columns: [
                    {
                        label: '添加时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                        }
                    },
                    {
                        label: '用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '推广ID',
                        prop: 'promoter_user_number'
                    },
                    {
                        label: '操作人',
                        prop: 'op_user'
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: false // 是否销毁组件
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams, ...this.dateTimeParams }
            return {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number
            }
        },
        // 查询
        onSearch() {
            this.getList()
        },
        // 新增
        add() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.orderComp.loadParams()
            }, 50);
        },
        // 删除数据
        async deleteParams(row) {
            this.form = row
            this.$confirm('确认要删除当前数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await replenishmentDel({ id: row.id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 导入
        batchPass() {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.uploadExcel.loadParams()
            }, 50);
        }
    }
}
</script>

<style lang="scss">
.promote-order-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>