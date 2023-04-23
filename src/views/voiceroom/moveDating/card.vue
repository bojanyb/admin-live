<template>
    <div class="app-container moveDating-box">
        <div class="searchParams">
            <SearchPanel v-model="searchParams" :forms="forms" :show-reset="true" :show-search-btn="true" :show-add="true" @onReset="reset" @onSearch="onSearch" @add="add"></SearchPanel>
        </div>

		<tableList :cfgs="cfgs" ref="tableList" :isHidePage="true"></tableList>

        <!-- 详情组件 -->
        <cardComp v-if="isDestoryComp" ref="cardComp" @destoryComp="destoryComp" @getList="getList"></cardComp>
    </div>
</template>

<script>
// 引入api
import { deleteParams, serachTag } from '@/api/moveDating'
// 引入详情组件
import cardComp from './components/cardComp.vue'
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
export default {
    mixins: [mixins],
    components: {
        tableList,
        SearchPanel,
        cardComp
    },
    data() {
        return {
            isDestoryComp: false, // 是否销毁组件
            sound_tagList: [], // 音色分类
        }
    },
    computed: {
        forms() {
            return [
                {
                    name: 'sound_tag',
                    type: 'select',
                    value: '全部',
                    keyName: 'id',
                    optionLabel: 'sound_tag',
                    label: '音色分类名',
                    clearable: true,
                    placeholder: '请选择音色分类名',
                    options: this.sound_tagList
                },
            ]
        },
        cfgs() {
            return {
                vm: this,
                url: REQUEST.move.Heartbeat,
                columns: [
                    {
                        label: '音色ID',
                        prop: 'id'
                    },
                    {
                        label: '音色分类名',
                        prop: 'sound_tag'
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                        render: (h, params) => {
                            let sex = MAPDATA.SEXLIST.find(item=> item.value == params.row.sex);
                            return h('div', sex ? sex.name : '男')
                        }
                    },
                    {
                        label: '封面',
                        isimg: true,
                        prop: 'img',
                        imgWidth: '50px',
                        imgHeight: '50px'
                    },
                    {
                        label: '声音签名',
                        isimg: true,
                        prop: 'audio',
                        imgWidth: '50px',
                        imgHeight: '50px',
                        minWidth: '170px'
                    },
                    {
                        label: '排序权重',
                        prop: 'sort'
                    },
                    {
                        label: '操作',
                        minWidth: '100px',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('el-button', { props: { type: 'primary'}, on: {click:()=>{this.update(params.row)}}}, '修改'),
                                h('el-button', { props: { type: 'danger'}, on: {click:()=>{this.deleteParams(params.row.id)}}}, '删除')
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
                sound_tag: s.sound_tag == "全部" ? "" : s.sound_tag
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
                this.$refs.cardComp.loadParams(status, row)
            }, 50);
        },
        // 删除
        async deleteParams(id) {
            this.$confirm('确认删除当前数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await deleteParams({ id })
                if(res.code === 2000) {
                    this.$success('删除成功')
                    this.getList()
                }
            }).catch(() => {});
        },
        // 销毁组件
        destoryComp() {
            this.isDestoryComp = false
        },
        // 获取音色分类
        async serachTagFunc() {
            let res = await serachTag()
            this.sound_tagList = res.data
            this.sound_tagList.unshift({id: 0, sound_tag: "全部"})
        }
    },
    created() {
        this.serachTagFunc()
    }
}
</script>

<style lang="scss">
.moveDating-box {

}
</style>