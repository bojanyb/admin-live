<template>
    <div class="systemConfig-guild-class-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" :isHidePage="true"></tableList>

        <!-- 新增 - 修改组件 -->
        <classComp v-if="isDestoryComp" ref="classComp" @destoryComp="destoryComp" @getList="getList"></classComp>
    </div>
</template>

<script>
// 引入api
import { delConfigRebate } from '@/api/system.js'
// 引入新增 - 修改组件
import classComp from './components/classComp.vue'
// 引入菜单组件
import SearchPanel from '@/components/SearchPanel/final.vue'
// 引入列表组件
import tableList from '@/components/tableList/TableList.vue'
// 引入api
import REQUEST from '@/request/index.js'
// 引入公共参数
import mixins from '@/utils/mixins.js'
// 引入公共map
import MAPDATA from '@/utils/jsonMap.js'
import { numChangeThousand } from '@/utils/common.js'
export default {
    mixins: [mixins],
    components: {
        SearchPanel,
        tableList,
        classComp
    },
    computed: {
        forms() {
            return [
                {
                    name: 'code',
                    type: 'select',
                    value: null,
                    keyName: 'value',
                    optionLabel: 'name',
                    label: '公会等级',
                    placeholder: '请选择',
                    options: MAPDATA.CLASSLIST
                }
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.system.guild.rebateConfig,
                columns: [
                    {
                        label: '公会评级',
                        render: (h, params) => {
                            let data = MAPDATA.CLASSLIST.find(item => { return item.value === params.row.code })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
                        label: '流水范围',
                        render: (h, params) => {
                            return h('span', numChangeThousand(params.row.start) + '~' + numChangeThousand(params.row.end))
                        }
                    },
                    {
                        label: '周返点比例',
                        prop: 'week_rebate'
                    },
                    {
                        label: '评级奖励类型',
                        prop: 'rebate',
                        render: (h, params) => {
                            let data = MAPDATA.GUILDCONFIGURATIONRATETYPELIST.find(item => { return item.value === params.row.rewards_type })
                            return h('span', data ? data.name : '无')
                        }
                    },
                    {
						label: '评级奖励',
						prop: 'rewards'
					},
                    {
						label: '操作',
						minWidth: '120px',
						fixed: 'right',
						render: (h, params) => {
							return h('div', [
								h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id, 1)}}}, '删除')
							])
						}
					}
                ]
            }
        }
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
        };
    },
    methods: {
        // 配置参数
        beforeSearch(params) {
            let s = { ...this.searchParams }
            return {
                page: params.page,
                pagesize: params.size,
                code: s.code
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
        // 添加
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
                this.$refs.classComp.loadParams(status, row)
            }, 50);
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 删除公会等级配置
        async deleteParams(id) {
            this.$confirm('确认删除当前公会等级配置吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await delConfigRebate({ id: id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        }
    }
}
</script>

<style lang="scss">
.systemConfig-guild-class-box {

}
</style>