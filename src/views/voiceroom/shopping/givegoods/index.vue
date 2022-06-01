// 赠送商品统计
<template>
    <div class="shopping-givegoods-box">
        <el-button class="add" type="success" @click="handleAdd">新增</el-button>
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>

        <addComp ref="addComp" :list="list" v-if="isDestoryComp" @getList="getList" @destoryComp="destoryComp"></addComp>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入新增/修改
import addComp from './add/index.vue'
import { getActivetyGiftADelete, getActivetyGiftSave, getActivetyHasGiftList } from '@/api/videoRoom'

export default {
    components: {
        tableList,
        SearchPanel,
        addComp
    },
    mixins: [mixins],
    data() {
        return {
            status: 'add',
            isDestoryComp: false,
            list: []
        }
    },
    computed: {
        cfgs() {
            return {
                vm: this,
                url: REQUEST.shopping.sendlog,
                columns: [
                    {
                        label: '被赠送用户ID',
                        prop: 'user_number'
                    },
                    {
                        label: '商品名称',
                        prop: 'goods_name'
                    },
                    {
                        label: '赠送时长',
                        prop: 'day',
                        render: (h, params) => {
                            let data = MAPDATA.DURATION.find(item => { return item.value == params.row.day })
                            return h('span', data ? data.name : '--')
                        }
                    },
                    {
                        label: '赠送时间',
                        render: (h, params) => {
                            return h('span', params.row.create_time ? timeFormat(params.row.create_time, 'YYYY-MM-DD HH:mm:ss', true) : "")
                        }
                    },
                    {
                        label: '赠送原因',
                        prop: 'remark'
                    },
                    {
                        label: '操作人',
                        prop: 'op_user'
                    }
                ]
            }
        },
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
    },
    methods:{
        // 配置参数
        beforeSearch(params) {
            let s = this.searchParams
            return {
                page: params.page,
                user_number: s.user_number
            }
        },
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 新增
        handleAdd() {
            this.load('add')
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        // 查看
        see(row) {
            this.load('see', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addComp.loadParams(status, row)
            }, 100);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
            this.onSearch()
        },
        // 冻结
        freeze(row) {
            this.$confirm('确认冻结当前活动？')
            .then(_ => {
                row.end_time = Math.floor(new Date().getTime() / 1000)
                getActivetyHasGiftList({ activity_id: row.id }).then(data => {
                    row.gifts = data.data.list
                    getActivetyGiftSave(row).then(res => {
                        this.$message.success('冻结成功!')
                        this.getList()
                    }).catch(err => {
                        this.$message.error('冻结失败!')
                    })
                })
            })
            .catch(_ => {});
        },
        // 删除
        deleteFunc(row) {
            this.$confirm('确认删除当前活动？')
            .then(_ => {
                getActivetyGiftADelete({id: row.id}).then(res => {
                    this.$message.success('删除成功!')
                    this.getList()
                }).catch(err => {
                    this.$message.error('删除失败!')
                })
            })
        },
        // 获取列表数据
        saleAmunt(data) {
            this.list = data.list
        },
        onSearch() {
            this.$refs.tableList.getData()
        },
        reset() {
            this.searchParams = {}
            this.onSearch()
        }
    }
}
</script>

<style lang="scss">
.shopping-givegoods-box {
    padding: 20px;
    box-sizing: border-box;
    .add {
        margin-bottom: 20px;
    }
    >.el-form {
        .el-input {
            width: 300px;
        }
    }
    .tableList {
        // margin-top: 22px;
    }
}
</style>