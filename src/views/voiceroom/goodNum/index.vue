<!-- 靓号仓库 -->
<template>
    <div class="depot-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="curBtnArr.includes('PrettyNumber@add')" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
        <addNumComp ref="add" v-if="isDestoryComp" @onSearch="onSearch" @destoryComp="destoryComp"></addNumComp>
    </div>
</template>

<script>
// 引入api
import { delPrettyNumber, updatePrettyNumber, getTypeOption } from '@/api/videoRoom.js'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入新增组件
import addNumComp from './components/addNumComp.vue'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'

export default {
    components: {
        tableList,
        SearchPanel,
        addNumComp
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'number',
                    type: 'input',
                    value: '',
                    label: '商品名称',
                    isNum: true,
                    placeholder: '请输入商品名称'
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
                    linkage: true,
                    options: MAPDATA.GOODNUMTYPE,
                    handler: {
                        change: (v) => {
                            this.getPrettyNumTypeList(v)
                        }
                    }
                },
                {
                    name: 'type_id',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '商品分类',
                    placeholder: '请选择',
                    clearable: true,
                    options: this.goodsNumClassList
                },
                {
                    name: 'show_status',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '使用状态',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.GOODNUMSTATUS
                },
                {
                    name: 'dateTimeParams',
                    type: 'datePicker',
                    dateType: 'datetimerange',
                    format: "yyyy-MM-dd HH:mm:ss",
                    label: '时间选择',
                    value: '',
                    handler: {
                        change: v => {
                            this.emptyDateTime()
                            this.setDateTime(v)
                        },
                        selectChange: (v, key) => {
                            this.emptyDateTime()
                        }
                    }
                }
            ]
        },
      cfgs() {
            const arr = [
                    {
                        label: '创建时间',
                        prop: 'create_time'
                    },
                    {
                        label: '商品名称',
                        prop: 'number'
                    },
                    {
                        label: '商品类型',
                        prop: 'cate'
                    },
                    {
                        label: '商品分类',
                        prop: 'type_name'
                    },
                    {
                        label: '使用状态',
                        prop: 'show_status',
                        render: (h, params) => {
                            let data = MAPDATA.GOODNUMSTATUS.find(item => { return item.value === params.row.show_status })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '操作',
                        minWidth: '160px',
                        render: (h, params) => {
                            return h('div', [
                              h('el-button', {
                                props: { type: 'primary', size: 'mini' },
                                style: { display: (params.row.show_status === 1 && this.curBtnArr.includes('PrettyNumber@update')) ? 'unset' : 'none' },
                                on: { click: () => { this.update(params.row) } }
                              }, '修改'),
                              h('el-button', {
                                props: { type: 'danger', size: 'mini' },
                                style: { display: (params.row.show_status === 1 && this.curBtnArr.includes('PrettyNumber@del') ) ? 'unset' : 'none' },
                                on: { click: () => { this.deleteParams(params.row.id) } }
                              }, '删除'),
                              h('el-button', {
                                props: { type: 'success', size: 'mini' },
                                style: {
                                    display: (params.row.show_status === 1 && this.curBtnArr.includes('PrettyNumber@update')) ? 'unset' : 'none'
                                },
                                on: { click: () => { this.down(params.row, 0) } }
                              }, '上架'),
                              h('el-button', {
                                props: { type: 'info', size: 'mini' },
                                style: {
                                    display: (params.row.show_status === 2 && this.curBtnArr.includes('PrettyNumber@update')) ? 'unset' : 'none'
                                },
                                on: { click: () => { this.down(params.row, 1) } }
                              }, '下架')
                            ])
                        }
                    },
                    {
                        label: '备注说明',
                        prop: 'desc'
                    },
                ]
            return {
                vm: this,
                url: REQUEST.prettyNumber.prettyNumber,
                columns: this.curBtnArr.includes('PrettyNumber@index') ? arr : []
            }
        },
    },
    data() {
        return {
            ruleForm: {
                alreadyMoney: null,
                deductMoney: null
            },
            isDestoryComp: false, // 销毁组件
            searchParams: {
                category: '',
                type_id: '',
                show_status: ''
            },
            goodsNumClassList: []
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
                show_status: s.show_status,
                user_number: s.user_number,
                number: s.number,
                category: s.category,
                type_id: s.type_id,
                page: params.page,
                pagesize: params.size,
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
            this.searchParams = {}
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
                ...row,
                type_id: row.type_id + '',
                category: row.category + '',
                number: row.number + '',
                price: row.price,
                start_time: row.start_time + '',
                end_time: row.end_time + '',
                id: row.id + '',
                status: status + ''
            }
            updatePrettyNumber(params).then(res => {
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
                let res = await delPrettyNumber({ id: id + '' })
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
        // 获取靓号类型
        async getPrettyNumTypeList(category) {
        this.goodsNumClassList = []
        if (category || category === 0) {
            const response = await getTypeOption({ category })
            if (response.code === 2000) {
            const tempArr = Array.from(
                Array.isArray(response.data) ? response.data : []
            )
            this.goodsNumClassList =
                tempArr.reduce((prev, curr) => {
                prev.push({
                    name: curr.name,
                    value: curr.type_id,
                });
                return prev
                }, []) || []
            }
        }
        this.getList()
        },
    }
}
</script>

<style lang="scss">
.depot-box {
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
