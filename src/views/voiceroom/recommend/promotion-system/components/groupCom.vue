<template>
    <div class="recommend-promotion-system-groupCom">
        <el-dialog
        title="推广组列表"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose">
            <div class="searchParams">
                <SearchPanel v-model="searchParams" :forms="forms" :show-add="true" :show-search-btn="true" @add="add" @onSearch="onSearch"></SearchPanel>
            </div>
            <div class="tableList">
                <tableList :cfgs="cfgs" ref="tableList"></tableList>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增组件 -->
        <add v-if="isDestoryComp" ref="add" @destoryComp="destoryComp" :type="type"></add>
    </div>
</template>

<script>
// 引入新增组件
import add from './add.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
export default {
    mixins: [mixins],
    components: {
        tableList,
        SearchPanel,
        add
    },
    data() {
        return {
            dialogVisible: false,
            ruleForm: {},
            isDestoryComp: false, // 是否销毁组件
            type: null // 类型
        };
    },
    computed: {
        forms() {
            let arr = [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '推广组ID',
                    isNum: true,
                    placeholder: '请输入推广组ID'
                },
                {
                    name: 'price',
                    type: 'input',
                    value: '',
                    label: '推广单价',
                    isNum: true,
                    placeholder: '请输入推广单价'
                }
            ]
            let arr1 = [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '推广组ID',
                    isNum: true,
                    placeholder: '请输入推广组ID'
                },
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '推广成员ID',
                    isNum: true,
                    placeholder: '请输入推广成员ID'
                },
            ]
            return this.type === 2 ? arr : arr1
        },
        cfgs() {
            let arr = [
                {
                    label: '添加时间',
                    render: (h, params) => {
                        return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : '无')
                    }
                },
                {
                    label: '推广组ID',
                    prop: 'user_number'
                }
            ]
            let arr1 = [
                {
                    label: '推广单价',
                    prop: 'price'
                }
            ]
            let arr2 = [
                {
                    label: '推广成员ID',
                    prop: 'price'
                }
            ]
            let arr3 = [
                {
                    label: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row)}}}, '删除')
                        ])
                    }
                }
            ]
            return {
                vm: this,
                url: REQUEST.userHistory.index,
                columns: this.type === 2 ? [ ...arr, ...arr1, ...arr3 ] : [ ...arr, ...arr2, ...arr3 ]
            }
        }
    },
    methods: {
        // 关闭弹窗
        handleClose() {
            this.dialogVisible = false
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            let data = {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number,
                pid: this.ruleForm.id,
                price: s.price
            }
            if(this.type === 2) {

            } else if(this.type === 3) {
                delete data.price
            }
            return data
        },
        // 获取数据
        loadParams(row, type) {
            this.dialogVisible = true
            this.ruleForm = row
            this.type = type
        },
        // 查询
        reset() {
            this.searchParams = {}
            this.dateTimeParams = {}
            this.getList()
        },
        // 重置
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
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.add.loadParams(status, row)
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss">
.recommend-promotion-system-groupCom {

}
</style>