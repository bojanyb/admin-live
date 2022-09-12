<template>
    <div class="recommend-promotion-system-groupCom">
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
            <div class="searchParams">
                <SearchPanel v-model="searchParams" :forms="forms" :show-add="true" :show-search-btn="true" @add="add" @onSearch="onSearch"></SearchPanel>
            </div>
            <div class="tableList">
                <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
export default {
    components: {
        tableList,
        SearchPanel
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'user_id',
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
                url: REQUEST.CashHisity.list,
                columns: [
                    {
                        label: '创建时间',
                        prop: 'addtime',
                        width: '160px',
                        render: (h, params) => {
                            return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '推广商ID',
                        prop: 'user_id'
                    },
                    {
                        label: '推广单价',
                        prop: 'addtime',
                        render: (h, params) => {
                            return h('span', params.row.addtime ? timeFormat(params.row.addtime, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '推广组管理',
                        prop: 'money',
                        render: (h, params) => {
                            return h('span', params.row.orderDetails.money)
                        }
                    },
                    {
                        label: '推广成员管理',
                        render: (h, params) => {
                            return h('span', params.row.orderDetails.money / 100)
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '删除')
                            ])
                        }
                    }
                ]
            }
        }
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss">
.recommend-promotion-system-groupCom {

}
</style>