<template>
    <div class="recommend-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" @onReset="reset" @onSearch="onSearch"></SearchPanel>
        </div>

        <tableList :cfgs="cfgs" ref="tableList"></tableList>

        <!-- 详情组件 -->
        <component v-if="isDestoryComp" :ref="Comp" :is="Comp" @destoryComp="destoryComp"></component>
    </div>
</template>

<script>
// 引入详情组件
import bindAnchorComp from './components/bindAnchorComp.vue'
import bindUserComp from './components/bindUserComp.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
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
        bindAnchorComp,
        bindUserComp
    },
    mixins: [mixins],
    computed: {
        forms() {
            return [
                {
                    name: 'user_number',
                    type: 'input',
                    value: '',
                    label: '推荐人ID',
                    isNum: true,
                    placeholder: '请输入推荐人ID'
                },
                {
                    name: 'setting_flg',
                    type: 'select',
                    value: '',
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '状态',
                    placeholder: '请选择',
                    options: MAPDATA.PROMOTIONTYPELIST
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.userHistory.recommender,
                columns: [
                    {
                        label: '推荐人ID',
                        render: (h, params) => {
                            return h('span', params.row.user_number || '无')
                        }
                    },
                    {
                        label: '推荐人昵称',
                        render: (h, params) => {
                            return h('span', params.row.nickname || '无')
                        }
                    },
                    {
                        label: '推荐类型',
                        render: (h, params) => {
                            let data = MAPDATA.PROMOTIONTYPELIST.find(item => { return item.value === params.row.setting_flg })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '绑定用户/主播数',
                        prop: 'invite_count',
                        render: (h, params) => {
                            let data = MAPDATA.PROMOTIONTYPELIST.find(item => { return item.value === params.row.setting_flg })
                            let name = params.row.invite_count + ' ' + data.name
                            return h('span', {
                                on: {click:()=>{this.details(params.row)}}
                            }, name )
                        }
                    },
                    {
                        label: '当日收益（喵粮）',
                        prop: 'today_gain'
                    },
                    {
                        label: '总收益（喵粮）',
                        prop: 'total_gain'
                    }
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: true, // 是否销毁组件
            Comp: '' // 组件名称
        };
    },
    methods: {
        // 刷新列表
        getList() {
            this.$refs.tableList.getData()
        },
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                user_number: s.user_number,
                setting_flg: s.setting_flg
            }
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
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 查看详情
        details(row) {
            let name;
            if(row.setting_flg === 1) {
                name = 'bindAnchorComp'
            } else {
                name = 'bindUserComp'
            }
            this.Comp = name
            this.isDestoryComp = true
            setTimeout(() => {
                this.$refs[name].loadParams(row.user_id, row.setting_flg)
            }, 50);
        }
    }
}
</script>

<style lang="scss">
.recommend-box {
    padding: 20px;
    box-sizing: border-box;
    .btnBox {
        margin-bottom: 20px;
    }
}
</style>