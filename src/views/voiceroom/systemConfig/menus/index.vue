<template>
    <div class="menus-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
            <!-- <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel> -->
        </div>

        <tableList :cfgs="cfgs" ref="tableList" @saleAmunt="saleAmunt"></tableList>

        <addComp v-if="isDestoryComp" ref="addComp" :menuList="menuList" @destoryComp="destoryComp" @getList="getList"></addComp>
    </div>
</template>

<script>

// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入新增 - 修改组件
import addComp from './components/add.vue'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
export default {
    components: {
        tableList,
        SearchPanel,
        addComp
    },
    mixins: [mixins],
    data() {
        return {
            menuList: [],
            isDestoryComp: false
        };
    },
    computed: {
        forms() {
            return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '菜单名称',
                    placeholder: '请输入菜单名称'
                },
                {
                    name: 'activity_type_id',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '状态',
                    placeholder: '请选择',
                    options: MAPDATA.MENUSTATUSLIST
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.system.getAllPermission,
                defaultExpandAll: false,
                children: 'child',
                columns: [
                    {
                        label: '菜单名称',
                        prop: 'title',
                        align: 'left'
                    },
                    {
                        label: '排序',
                        prop: 'sort'
                    },
                    {
                        label: '路由地址',
                        prop: 'h5_path'
                    },
                    {
                        label: '状态',
                        render: (h, params) => {
                            let data = MAPDATA.MENUSTATUSLIST.find(item => { return item.value === params.row.status })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props : { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                                h('el-button', { props : { type: 'success'}, style: {
                                    display: params.row.child && params.row.child.length > 0 ? 'unset' : 'unset'
                                }, on: {click:()=>{this.add(params.row)}}}, '新增')
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
                user_number: s.user_number,
                nickname: s.nickname,
                phone: s.phone
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
        add(row) {
            this.load('add', row)
        },
        // 修改
        update(row) {
            this.load('update', row)
        },
        load(status, row) {
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs.addComp.loadParams(status, row)
            }, 50);
        },
        // 列表返回数据
        saleAmunt(res) {
            let arr = JSON.parse(JSON.stringify(res.list))
            if(arr && arr.length > 0) {
                let prv = (list) => { // 递归最后一级隐藏箭头
                    list.forEach(item => {
                        if(item.child && item.child.length > 0) {
                            prv(item.child, item)
                        } else {
                            delete item.child
                        }
                    })
                }
                prv(arr)


                arr.forEach(item => {
                    if(item.child && item.child.length > 0) {
                        item.child.forEach(a => {
                            if(a.child && a.child.length > 0) {
                                delete a.child
                            }
                        })
                    }
                })
            }
            this.menuList = arr || []

        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        }
    }
}
</script>

<style lang="scss" scoped>
.menus-box {
    padding: 20px;
    box-sizing: border-box;
}
</style>