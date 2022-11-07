<!-- banner图片配置 -->
<template>
    <div class="banner-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>
        <div class="tableList">
            <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>
        </div>
        <!-- 新增/修改 -->
        <add ref="add" v-if="isDestoryComp" :type="'banner_img'" @onSearch="onSearch" @destoryComp="destoryComp"></add>
    </div>
</template>

<script>
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入api
import { delResource } from '@/api/activity.js'
// 引入公共方法
import { timeFormat } from '@/utils/common.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
// 引入新增组件
import add from './components/addComp.vue'

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
                    label: '活动名称',
                    placeholder: '请输入活动名称'
                },
                {
                    name: 'type',
                    type: 'select',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '活动状态',
                    placeholder: '请选择',
                    clearable: true,
                    options: MAPDATA.ACTIVESTATUS
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.activity.resourceList,
                columns: [
                    {
                        label: '开始时间',
                        render: (h, params) => {
                            return h('span', params.row.start_time ? timeFormat(params.row.start_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '结束时间',
                        render: (h, params) => {
                            return h('span', params.row.end_time ? timeFormat(params.row.end_time, 'YYYY-MM-DD HH:mm:ss', true) : '--')
                        }
                    },
                    {
                        label: '活动名称',
                        prop: 'name'
                    },
                    {
                        label: 'banner图片',
                        isimg: true,
                        prop: 'banner_img',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '闪屏图片',
                        isimg: true,
                        prop: 'flash_img',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '房间游标图片',
                        isimg: true,
                        prop: 'room_img',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '权重',
                        prop: 'sort',
                    },
                    {
                        label: '状态',
                        render: (h, params) => {
                            let data = MAPDATA.ACTIVESTATUS.find(item => { return item.value === params.row.status })
                            return h('div', { class: { 'bounce_fa': true } }, [
                                h('span', data ? data.name : '--')
                            ])
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, style: {
                                    display: params.row.status === 2 ? 'unset' : 'none'
                                }, on: {click:()=>{this.update(params.row, 2)}}},'修改'),
                                h('el-button', { props: { type: 'danger'}, style: {
                                    display: params.row.status === 2 ? 'unset' : 'none'
                                }, on: {click:()=>{this.down(params.row, 2)}}},'删除')
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
            let s = {...this.searchParams}
            return {
                page: params.page,
                pagesize: params.pagesize,
                type: s.type,
                name: s.name,
            }
        },
        // 查询
        reset() {
            this.searchParams = {}
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
        // 修改
        update(row) {
            this.load('update', row)
        },
        // 删除
        down(row, status) {
            let params = {
                id: row.id
            }
            delResource(params).then(res => {
                if(res.code === 2000) {
                    this.onSearch()
                }
            })
        },
        // 加载
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
        }
    }
}
</script>

<style lang="scss">
.banner-box {
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