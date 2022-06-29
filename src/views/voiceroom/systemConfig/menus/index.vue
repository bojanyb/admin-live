<template>
    <div class="menus-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        <addComp ref="addComp"></addComp>
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
            property: 'value',
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
                url: REQUEST.user.list,
                border: true,
                defaultExpandAll: true,
                children: 'children',
                hasChildren: 'hasChildren',
                columns: [
                    {
                        label: '用户ID',
                        width: '95px',
                        prop: 'user_number'
                    },
                    {
                        label: '昵称',
                        width: '110px',
                        prop: 'nickname'
                    },
                    {
                        label: '头像',
                        isimg: true,
                        prop: 'face',
                        imgWidth: '50px'
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
        add() {
            this.addComp.$refs.dialogVisible = true
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