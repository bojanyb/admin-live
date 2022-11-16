<!-- 商品列表 -->
<template>
    <div class="shop-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>

        <add ref="add" v-if="isDestoryComp" @onSearch="onSearch" @destoryComp="destoryComp"></add>
    </div>
</template>

<script>
// 引入api
import { delTypePrettyNumber, updateTypePrettyNumber } from '@/api/videoRoom.js'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入api
import { down } from '@/api/shopping.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入新增组件
import add from './components/addShopComp.vue'

export default {
    components: {
        tableList,
        SearchPanel,
        add
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'name',
                    type: 'input',
                    value: '',
                    label: '分类名称',
                    placeholder: '请输入分类名称'
                },
                {
                    name: 'category',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '商品类别',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.GOODNUMTYPE
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.prettyNumber.prettyNumberType,
                columns: [
                    {
                        label: '创建时间',
                        prop: 'create_time'
                    },
                    {
                        label: '商品类别',
                        prop: 'category',
                        render: (h, params) => {
                            let data = MAPDATA.GOODNUMTYPE.find(item => { return item.value === params.row.category })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '商品分类',
                        prop: 'name'
                    },
                    {
                        label: '图标',
                        isimg: true,
                        prop: 'icon',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '权重状态',
                        prop: 'sort',
                    },
                    {
                        label: '显示状态',
                        render: (h, params) => {
                            let data = MAPDATA.SHOWSTATUS.find(item => { return item.value === params.row.status })
                            return h('div', { class: { 'bounce_fa': true } }, [
                                h('span', data ? data.name : '--')
                            ])
                        }
                    },
                    {
                        minWidth: '100px',
                        label: '是否默认选中',
                        prop: 'selected',
                        isSwitch: true,
                        isTrueValue: 1,
                        isFalseValue: 0,
                        change: (v, row) => {
                            this.handleSelectCalculator(row, v)
                        },
                        render: (h) => {
                            return h('span', '')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                            h('el-button', { props: { type: 'primary', size: 'mini' }, on: {click:()=>{this.update(params.row)}}}, '修改'),
                            h('el-button', { props: { type: 'danger', size: 'mini' }, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除'),
                            ])
                        }
                    }
                ]
            }
        },
    },
    data() {
        return {
            ruleForm: {
                alreadyMoney: null,
                deductMoney: null
            },
            searchParams: {
              category: 0,
              name: ''
            },
            isDestoryComp: false // 销毁组件
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = {...this.searchParams, ...this.dateTimeParams}
            return {
                page: params.page,
                pagesize: params.size,
                name: s.name,
                category: s.category,
                start_time: Math.floor(s.start_time / 1000),
                end_time: Math.floor(s.end_time / 1000),
            }
        },
        // 设置时间段
        setDateTime(arr) {
            const date = arr ? {
                start_time: arr[0],
                end_time: arr[1]
            } : {}
            this.$set(this, 'dateTimeParams', date)
        },
        // 清空日期选择
        emptyDateTime() {
            this.dateTimeParams = {}
        },
        // 查询
        reset() {
            this.searchParams = {
              category: 0,
              name: ''
            }
            this.dateTimeParams = {
                activity_type_id: 1
            }
            this.getList()
        },
        // 重置
        onSearch() {
            this.getList()
        },
        // 列表返回数据
        saleAmunt(data) {
            // this.ruleForm.allMoney = data.total_money ? data.total_money / 100 : 0
        },
        // 新增
        add() {
            this.load('add')
        },
        update(row) {
            this.load('update', row)
        },
        down(row, status) {
            let params = {
                id: row.id,
                status: status
            }
            down(params).then(res => {
                if(res.code === 2000) {
                    this.onSearch()
                }
            })
        },
        // 删除
        async deleteParams(id) {
            this.$confirm('确认删除当前靓号吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await delTypePrettyNumber({ id: id + '' })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        load(status,row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.add.dialogVisible = true
                this.$refs.add.load(status, row)
            }, 100);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 是否默认选中
        async handleSelectCalculator(row, v) {
            let params = {
                ...row,
                category: row.category + '',
                status: row.status + '',
                selected: row.selected + '',
                id: row.id + ''
            }
            let res = await updateTypePrettyNumber(params)
            if(+res.code === 2000) {
                this.$success('操作成功')
                this.getList()
            }
        }
    }
}
</script>

<style lang="scss">
.shop-box {
    padding: 20px;
    box-sizing: border-box;
    .model {
        margin-bottom: 20px;
    }
    .bounce_fa {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .bounce {
            position: absolute;
            left: 0;
            font-size: 17px;
            color: #ff4949;
            font-weight: 600;
            transform: translateY(5px);
            animation: bounce 1s infinite;
        }

        @keyframes bounce {
            0% {
                transform: translateY(5px);
            }
            50% {
                transform: translateY(-5px);
            }
            100% {
                transform: translateY(5px);
            }
        }
    }
}
</style>